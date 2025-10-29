import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocationApiService } from '@core/services/apis/locations';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'location-page',
  templateUrl: './location-details.html',
  styleUrl: './location-details.scss',
  imports: [RouterLink, CommonModule],
})
export class LocationDetailsPage {
  private route = inject(ActivatedRoute);
  private apiService = inject(LocationApiService);

  location$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => {
      if (id) return this.apiService.findOne(id);
      throw new Error('ID não fornecido');
    })
  );

  date$ = this.location$.pipe(
    map((location) => format(new Date(location.created), 'MMMM dd, yyyy', { locale: ptBR }))
  );
}
