import {Component, computed, effect, inject} from '@angular/core';
import {CharacterStore} from '../../store/character.store';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {FilmStore} from '../../store/film.store';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-character-details',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent {
  readonly characterStore = inject(CharacterStore);
  private readonly filmStore = inject(FilmStore);
  private readonly route = inject(ActivatedRoute);

  private readonly characterId = toSignal(this.route.params.pipe(map(params => params['id'])));
  private readonly character = computed(() => this.characterStore.characterState().character);

  constructor() {
    effect(() => {
      const id = this.characterId();
      this.characterStore.loadCharacter(id);
    });

    this.filmStore.loadFilms();
  }

  filmsForCharacter = computed(() => {
    const character = this.character();
    if (!character) return [];
    return this.filmStore.filmsForCharacterUrl(character.properties.url);
  });
}
