import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LocationsState } from '@features/locations/state/locations.state';

@Component({
  selector: 'location-page',
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
  imports: [CommonModule, RouterLink],
})
export class LocationsPage implements AfterViewInit {
  private state = inject(LocationsState);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;
  loading$ = this.state.loading$;
  isFirstLoad$ = this.state.isFirstLoad$;
  locations$ = this.state.locations$;
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
