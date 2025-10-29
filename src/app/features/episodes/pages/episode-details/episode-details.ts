import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EpisodesApiService } from '@core/services/apis/episodes';
import { EpisodeFormatPipe } from '@shared/pipes/episode-format.pipe';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'episode-page',
  templateUrl: './episode-details.html',
  styleUrl: './episode-details.scss',
  imports: [RouterLink, CommonModule, EpisodeFormatPipe],
})
export class EpisodeDetailsPage {
  private route = inject(ActivatedRoute);
  private apiService = inject(EpisodesApiService);

  episode$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => {
      if (id) return this.apiService.findOne(id);
      throw new Error('ID não fornecido');
    })
  );
}
