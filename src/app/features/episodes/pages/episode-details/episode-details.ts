import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EpisodesApiService } from '@core/services/apis/episodes';
import { NotFoundComponent } from '@shared/components/notFound/not-found';
import { EpisodeFormatPipe } from '@shared/pipes/episode-format.pipe';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'episode-page',
  templateUrl: './episode-details.html',
  styleUrl: './episode-details.scss',
  imports: [RouterLink, CommonModule, EpisodeFormatPipe, NotFoundComponent],
})
export class EpisodeDetailsPage {
  private route = inject(ActivatedRoute);
  private apiService = inject(EpisodesApiService);
  private toast = inject(ToastrService);
  loading = signal(false);

  episode$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => {
      const numericId = Number(id);
      if (!id || isNaN(numericId)) {
        this.toast.error('ID inválido do episódio', 'Erro');
        this.loading.set(false);
        return of(null);
      }

      this.loading.set(true);
      return this.apiService.findOne(String(numericId)).pipe(
        catchError(() => {
          this.toast.error('Erro ao buscar episódio', 'Erro');
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      );
    })
  );
}
