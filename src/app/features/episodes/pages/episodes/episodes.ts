import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EpisodeFormatPipe } from '@shared/pipes/episode-format.pipe';
import { RouterLink } from '@angular/router';
import { EpisodesState } from '@features/episodes/state/episodes.state';

@Component({
  selector: 'episodes-page',
  templateUrl: './episodes.html',
  styleUrl: './episodes.scss',
  imports: [CommonModule, EpisodeFormatPipe, RouterLink],
})
export class EpisodesPage implements AfterViewInit {
  private state = inject(EpisodesState);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;
  loading$ = this.state.loading$;
  isFirstLoad$ = this.state.isFirstLoad$;
  episodes$ = this.state.episodes$;
  searchTerm$ = this.state.searchTerm$;

  ngAfterViewInit() {
    this.state.initIfNeeded();
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
    this.state.search(term);
  }

  loadMore() {
    this.state.loadMore();
  }
}
