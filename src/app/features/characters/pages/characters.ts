import { Component, signal } from '@angular/core';
import { TypeCharacter, TypeGetAllCharacters } from '../../../core/services/apis/characters/types';
import { CharactersApiService } from '../../../core/services/apis/characters';
import { ItemCharacter } from '../../../shared/components/ItemCharacter/item-character';

@Component({
  selector: 'characters-page',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
  imports: [ItemCharacter],
})
export class CharactersPage {
  characters$: TypeCharacter[] = [];

  alertDisabled = true;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private userService: CharactersApiService) {
    this.getUsers();
  }

  getUsers() {
    this.userService.findAll({ page: 1 }).subscribe({
      next: (users) => (this.characters$ = users.results),
      error: () => this.messageError('Falha ao carregar os usuários'),
    });
  }

  messageSuccess(message: string) {
    this.alertType = 'success';
    this.alertMessage = message;
    this.alertDisabled = false;

    this.alertTimeOut();
  }

  messageError(message: string) {
    this.alertType = 'error';
    this.alertMessage = message;
    this.alertDisabled = false;

    this.alertTimeOut();
  }

  alertTimeOut() {
    setTimeout(() => {
      this.alertDisabled = true;
    }, 2000);
  }
}
