import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharactersApiService } from '@core/services/apis/characters';
import { TypeCharacter } from '@core/services/apis/characters/types';
import { BehaviorSubject, combineLatest, finalize, scan, switchMap } from 'rxjs';

@Component({
  selector: 'characters-page',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
  imports: [CommonModule, RouterLink],
})
export class CharactersPage implements AfterViewInit {
  private apiService = inject(CharactersApiService);
  private platformId = inject(PLATFORM_ID);
  private totalPage: number | undefined = undefined;

  private page$ = new BehaviorSubject(1);
  private searchTerm$ = new BehaviorSubject('');

  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;
  loading$ = new BehaviorSubject(false);
  isFirstLoad$ = new BehaviorSubject(true);

  characters$ = combineLatest([this.page$, this.searchTerm$]).pipe(
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
    scan((acc: TypeCharacter[], res) => {
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
