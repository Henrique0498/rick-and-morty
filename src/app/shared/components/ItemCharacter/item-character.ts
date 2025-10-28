import { Component, Input } from '@angular/core';
import { TypeCharacter } from '../../../core/services/apis/characters/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'component-item-character',
  templateUrl: './item-character.html',
  imports: [RouterLink],
  styleUrl: './item-character.scss',
})
export class ItemCharacter {
  @Input() character!: TypeCharacter;

  get aboutLink(): string {
    return `/characters/${this.character?.id ?? ''}`;
  }
}
