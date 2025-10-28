import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject, combineLatest, switchMap, scan, finalize } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TypeEpisode } from '../../../core/services/apis/episodes/types';
import { EpisodesApiService } from '../../../core/services/apis/episodes';

@Component({
  selector: 'episodes-page',
  templateUrl: './episodes.html',
  styleUrl: './episodes.scss',
  imports: [CommonModule],
})
export class EpisodesPage implements AfterViewInit {
  private page$ = new BehaviorSubject(1);
  private searchTerm$ = new BehaviorSubject('');
  private totalPage: number | undefined = undefined;
  loading$ = new BehaviorSubject(false);

  episodes$ = combineLatest([this.page$, this.searchTerm$]).pipe(
    switchMap(([page, search]) => {
      if (!this.loading$.value) {
        this.loading$.next(true);

        return this.episodeService
          .findAll({ page, name: search })
          .pipe(finalize(() => this.loading$.next(false)));
      }

      return [];
    }),
    scan((acc: TypeEpisode[], res) => {
      if (res.info?.prev === null) {
        this.totalPage = res.info?.pages ?? 1;

        return res.results;
      }

      return [...acc, ...res.results];
    }, []),
    finalize(() => this.loading$.next(false))
  );

  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;

  constructor(
    private episodeService: EpisodesApiService,
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
