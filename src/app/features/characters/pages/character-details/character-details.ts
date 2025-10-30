import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharactersApiService } from '@core/services/apis/characters';
import { GenderFormatPipe } from '@shared/pipes/gender-format.pipe';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { NotFoundComponent } from '@shared/components/notFound/not-found';

@Component({
  selector: 'character-page',
  templateUrl: './character-details.html',
  styleUrl: './character-details.scss',
  imports: [RouterLink, CommonModule, GenderFormatPipe, NotFoundComponent],
})
export class CharacterDetailsPage {
  private route = inject(ActivatedRoute);
  private apiService = inject(CharactersApiService);
  private toast = inject(ToastrService);
  loading = signal(false);

  character$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => {
      const numericId = Number(id);
      if (!id || isNaN(numericId)) {
        this.toast.error('ID inválido do personagem', 'Erro');
        this.loading.set(false);
        return of(null);
      }

      this.loading.set(true);
      return this.apiService.findOne(String(numericId)).pipe(
        catchError(() => {
          this.toast.error('Erro ao buscar personagem', 'Erro');
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      );
    })
  );
}
