import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { ItemCharacter } from '../../../shared/components/ItemCharacter/item-character';
import { BehaviorSubject, combineLatest, switchMap, scan, finalize } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TypeLocation } from '../../../core/services/apis/locations/types';
import { LocationApiService } from '../../../core/services/apis/locations';
import { ItemLocation } from '../../../shared/components/ItemLocation/item-location';
import { ButtonComponent } from '../../../shared/components/button/button';

@Component({
  selector: 'location-page',
  templateUrl: './location.html',
  styleUrl: './location.scss',
  imports: [CommonModule, ButtonComponent],
})
export class LocationsPage implements AfterViewInit {
  private page$ = new BehaviorSubject(1);
  private searchTerm$ = new BehaviorSubject('');
  private totalPage: number | undefined = undefined;
  loading$ = new BehaviorSubject(false);
  locations$ = combineLatest([this.page$, this.searchTerm$]).pipe(
    switchMap(([page, search]) => {
      if (!this.loading$.value) {
        this.loading$.next(true);

        return this.locationService
          .findAll({ page, name: search })
          .pipe(finalize(() => this.loading$.next(false)));
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
  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;

  constructor(
    private locationService: LocationApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
