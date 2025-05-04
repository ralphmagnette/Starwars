import {inject, Injectable, signal} from '@angular/core';
import {catchError, of, tap} from 'rxjs';
import {FilmService} from '../services/film.service';
import {FilmDetails} from '../types/filmResult';

@Injectable({providedIn: 'root'})
export class FilmStore {
  private readonly filmService = inject(FilmService);

  private readonly films = signal<FilmDetails[]>([]);
  private readonly loading = signal<boolean>(false);
  private readonly error = signal<string | null>(null);

  loadFilms(): void {
    this.loading.set(true);
    this.error.set(null);

    this.filmService.getFilms()
      .pipe(
        tap(films => {
          this.films.set(films.result);
          this.loading.set(false);
        }),
        catchError(() => {
          this.error.set('Failed to load planets');
          this.loading.set(false);
          return of(null);
        })
      ).subscribe();
  }

  filmsForCharacterUrl(characterUrl: string): FilmDetails[] {
    return this.films().filter(film => film.properties.characters.includes(characterUrl));
  }
}
