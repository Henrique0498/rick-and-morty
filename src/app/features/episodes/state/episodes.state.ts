import { DestroyRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, finalize, switchMap } from 'rxjs';
import { EpisodesApiService } from '@core/services/apis/episodes';
import { TypeEpisode } from '@core/services/apis/episodes/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class EpisodesState {
  private api = inject(EpisodesApiService);

  private totalPages: number | undefined = undefined;
  private initialized = false;

  private page$ = new BehaviorSubject(1);
  private searchTermSubject$ = new BehaviorSubject('');
  searchTerm$ = this.searchTermSubject$.asObservable();

  loading$ = new BehaviorSubject(false);
  isFirstLoad$ = new BehaviorSubject(true);

  private results$ = new BehaviorSubject<TypeEpisode[]>([]);
  episodes$ = this.results$.asObservable();

  constructor() {
    const destroyRef = inject(DestroyRef);

    combineLatest([this.page$, this.searchTermSubject$])
      .pipe(
        switchMap(([page, search]) => {
          if (!this.loading$.value) {
            this.loading$.next(true);
            return this.api.findAll({ page, name: search }).pipe(
              finalize(() => {
                this.loading$.next(false);
                this.isFirstLoad$.next(false);
              })
            );
          }
          return [] as any;
        }),
        takeUntilDestroyed(destroyRef)
      )
      .subscribe((res: any) => {
        if (res?.info) {
          this.totalPages = res.info?.pages ?? 1;
          if (res.info?.prev === null) {
            this.results$.next(res.results);
          } else {
            this.results$.next([...this.results$.value, ...res.results]);
          }
        }
      });
  }

  initIfNeeded() {
    if (!this.initialized) {
      this.initialized = true;
    }
  }

  search(term: string) {
    this.page$.next(1);
    this.searchTermSubject$.next(term.trim());
  }

  loadMore() {
    const next = this.page$.value + 1;
    if (!this.loading$.value && (this.totalPages === undefined || next <= this.totalPages)) {
      this.page$.next(next);
    }
  }
}
