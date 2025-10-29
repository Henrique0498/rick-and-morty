import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { BehaviorSubject, combineLatest, switchMap, scan, finalize } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TypeLocation } from '@core/services/apis/locations/types';
import { LocationApiService } from '@core/services/apis/locations';

@Component({
  selector: 'location-page',
  templateUrl: './location.html',
  styleUrl: './location.scss',
  imports: [CommonModule, RouterLink],
})
export class LocationsPage implements AfterViewInit {
  private apiService = inject(LocationApiService);
  private platformId = inject(PLATFORM_ID);
  private totalPage: number | undefined = undefined;

  private page$ = new BehaviorSubject(1);
  private searchTerm$ = new BehaviorSubject('');

  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;
  loading$ = new BehaviorSubject(false);
  isFirstLoad$ = new BehaviorSubject(true);

  locations$ = combineLatest([this.page$, this.searchTerm$]).pipe(
    switchMap(([page, search]) => {
      if (!this.loading$.value) {
        this.loading$.next(true);

        return this.apiService.findAll({ page, name: search }).pipe(
          finalize(() => {
            this.loading$.next(false);
            this.isFirstLoad$.next(false);
          })
        );
      }

      return [];
    }),
    scan((acc: TypeLocation[], res) => {
      if (res.info?.prev === null) {
        this.totalPage = res.info?.pages ?? 1;
        return res.results;
      }
      return [...acc, ...res.results];
    }, [])
  );

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.loadMore();
        }
      });
      observer.observe(this.infiniteAnchor.nativeElement);
    }
  }

  onSearch(term: string) {
    this.page$.next(1);
    this.searchTerm$.next(term.trim());
  }

  loadMore() {
    const result = this.page$.value + 1;

    if (
      !this.loading$.value &&
      (this.totalPage === undefined || result <= this.totalPage) &&
      !this.loading$.value
    ) {
      this.page$.next(result);
    }
  }
}
