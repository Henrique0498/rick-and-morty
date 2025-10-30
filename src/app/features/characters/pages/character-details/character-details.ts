import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharactersApiService } from '@core/services/apis/characters';
import { GenderFormatPipe } from '@shared/pipes/gender-format.pipe';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'character-page',
  templateUrl: './character-details.html',
  styleUrl: './character-details.scss',
  imports: [RouterLink, CommonModule, GenderFormatPipe],
})
export class CharacterDetailsPage {
  private route = inject(ActivatedRoute);
  private apiService = inject(CharactersApiService);

  character$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => {
      if (id) {
        return this.apiService
          .findOne(id)
          .pipe(map((response) => ({ ...response, type: response.type || 'Desconhecido' })));
      }

      throw new Error('ID não fornecido');
    })
  );
}
