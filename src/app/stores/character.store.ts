import {computed, inject, Injectable, signal} from '@angular/core';
import {CharacterService} from '../services/character.service';
import {Character} from '../types/characterResults';
import {catchError, of, tap} from 'rxjs';
import {CharacterDetails} from '../types/characterResult';

@Injectable({providedIn: 'root'})
export class CharacterStore {
  private readonly characterService = inject(CharacterService);

  private readonly characters = signal<Character[]>([]);
  private readonly character = signal<CharacterDetails | null>(null);
  private readonly loading = signal<boolean>(false);
  private readonly error = signal<string | null>(null);

  readonly charactersState = computed(() => ({
    characters: this.characters(),
    loading: this.loading(),
    error: this.error()
  }));
  readonly characterState = computed(() => ({
    character: this.character(),
    loading: this.loading(),
    error: this.error()
  }));

  loadCharacters(): void {
    this.loading.set(true);
    this.error.set(null);

    this.characterService.getCharacters()
      .pipe(
        tap(characterResults => {
          this.characters.set(characterResults.results);
          this.loading.set(false);
        }),
        catchError(() => {
          this.error.set('Failed to load characters');
          this.loading.set(false);
          return of(null);
        })
      ).subscribe();
  }

  loadCharacter(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.character.set(null);

    this.characterService.getCharacter(id)
      .pipe(
        tap(characterResult => {
          this.character.set(characterResult.result);
          this.loading.set(false);
        }),
        catchError(() => {
          this.error.set('Failed to load character details');
          this.loading.set(false);
          return of(null);
        })
      )
      .subscribe();
  }
}
