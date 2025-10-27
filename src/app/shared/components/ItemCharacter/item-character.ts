import { Component, Input } from '@angular/core';
import { TypeCharacter } from '../../../core/services/apis/characters/types';

@Component({
  selector: 'component-item-character',
  templateUrl: './item-character.html',
  styleUrl: './item-character.scss',
})
export class ItemCharacter {
  @Input() character!: TypeCharacter;
}
