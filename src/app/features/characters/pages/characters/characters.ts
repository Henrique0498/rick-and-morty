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
import { CharactersState } from '@features/characters/state/characters.state';

@Component({
  selector: 'characters-page',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
  imports: [CommonModule, RouterLink],
})
export class CharactersPage implements AfterViewInit {
  private state = inject(CharactersState);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;
  loading$ = this.state.loading$;
  isFirstLoad$ = this.state.isFirstLoad$;
  characters$ = this.state.characters$;
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
