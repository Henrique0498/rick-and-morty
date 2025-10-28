import { Component, Input } from '@angular/core';
import { TypeCharacter } from '../../../core/services/apis/characters/types';
import { RouterLink } from '@angular/router';
import { TypeLocation } from '../../../core/services/apis/locations/types';

@Component({
  selector: 'component-item-location',
  templateUrl: './item-location.html',
  imports: [RouterLink],
  styleUrl: './item-location.scss',
})
export class ItemLocation {
  @Input() location!: TypeLocation;

  get aboutLink(): string {
    return `/locations/${this.location?.id ?? ''}`;
  }
}
