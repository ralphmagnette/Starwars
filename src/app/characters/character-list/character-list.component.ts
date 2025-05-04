import {Component, effect, inject} from '@angular/core';
import {CharacterStore} from '../../stores/character.store';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {
  readonly store = inject(CharacterStore);

  constructor() {
    effect(() => {
      this.store.loadCharacters();
    });
  }
}
