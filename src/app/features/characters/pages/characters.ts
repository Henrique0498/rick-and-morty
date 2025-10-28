import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CharactersApiService } from '../../../core/services/apis/characters';
import { ItemCharacter } from '../../../shared/components/ItemCharacter/item-character';
import { BehaviorSubject, combineLatest, switchMap, scan } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TypeCharacter } from '../../../core/services/apis/characters/types';

@Component({
  selector: 'characters-page',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
  imports: [ItemCharacter, CommonModule],
})
export class CharactersPage implements AfterViewInit {
  private page$ = new BehaviorSubject(1);
  private searchTerm$ = new BehaviorSubject('');
  private loading$ = false;
  characters$ = combineLatest([this.page$, this.searchTerm$]).pipe(
    switchMap(([page, search]) => this.characterService.findAll({ page, name: search })),
    scan((acc: TypeCharacter[], res) => {
      if (res.info?.prev === null) return res.results;
      return [...acc, ...res.results];
    }, [])
  );
  @ViewChild('infiniteAnchor', { static: true })
  infiniteAnchor!: ElementRef<HTMLDivElement>;

  constructor(
    private characterService: CharactersApiService,
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
    this.page$.next(this.page$.value + 1);
  }
}
