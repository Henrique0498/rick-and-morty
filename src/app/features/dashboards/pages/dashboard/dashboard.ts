import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharactersApiService } from '@core/services/apis/characters';
import { EpisodesApiService } from '@core/services/apis/episodes';
import { LocationApiService } from '@core/services/apis/locations';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  imports: [CommonModule, RouterLink],
})
export class DashboardPage {
  protected readonly title = signal('rick-and-morty');

  private charactersApi = inject(CharactersApiService);
  private episodesApi = inject(EpisodesApiService);
  private locationsApi = inject(LocationApiService);

  stats$: Observable<{ characters: number; episodes: number; locations: number }> = forkJoin({
    characters: this.charactersApi.findAll({ page: 1 }).pipe(map((r) => r.info.count)),
    episodes: this.episodesApi.findAll({ page: 1 }).pipe(map((r) => r.info.count)),
    locations: this.locationsApi.findAll({ page: 1 }).pipe(map((r) => r.info.count)),
  });
}
