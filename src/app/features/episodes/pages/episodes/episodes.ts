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
import { TypeEpisode } from '@core/services/apis/episodes/types';
import { EpisodesApiService } from '@core/services/apis/episodes';
import { EpisodeFormatPipe } from '@shared/pipes/episode-format.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'episodes-page',
  templateUrl: './episodes.html',
  styleUrl: './episodes.scss',
  imports: [CommonModule, EpisodeFormatPipe, RouterLink],
})
export class EpisodesPage implements AfterViewInit {
  private apiService = inject(EpisodesApiService);
  private platformId = inject(PLATFORM_ID);
  private totalPage: number | undefined = undefined;

  private page$ = new BehaviorSubject(1);
  private searchTerm$ = new BehaviorSubject('');

  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;
  loading$ = new BehaviorSubject(false);
  isFirstLoad$ = new BehaviorSubject(true);

  episodes$ = combineLatest([this.page$, this.searchTerm$]).pipe(
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
    scan((acc: TypeEpisode[], res) => {
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
