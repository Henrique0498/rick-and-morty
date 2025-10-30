import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocationApiService } from '@core/services/apis/locations';
import { NotFoundComponent } from '@shared/components/notFound/not-found';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'location-page',
  templateUrl: './location-details.html',
  styleUrl: './location-details.scss',
  imports: [RouterLink, CommonModule, NotFoundComponent],
})
export class LocationDetailsPage {
  private route = inject(ActivatedRoute);
  private apiService = inject(LocationApiService);
  private toast = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);
  loading = signal(false);

  location$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => {
      const numericId = Number(id);
      if (!id || isNaN(numericId)) {
        this.toast.error('ID inválido da localização', 'Erro');
        this.loading.set(false);
        return of(null);
      }

      this.loading.set(true);
      return this.apiService.findOne(String(numericId)).pipe(
        catchError(() => {
          this.toast.error('Erro ao buscar localização', 'Erro');
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      );
    })
  );
}
