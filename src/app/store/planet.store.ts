import {computed, inject, Injectable, signal} from '@angular/core';
import {PlanetService} from '../services/planet.service';
import {Planet} from '../types/planetResults';
import {catchError, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PlanetStore {
  private readonly planetService = inject(PlanetService);

  private readonly planets = signal<Planet[]>([]);
  private readonly loading = signal<boolean>(false);
  private readonly error = signal<string | null>(null);

  readonly planetState = computed(() => ({
    planets: this.planets(),
    loading: this.loading(),
    error: this.error()
  }));

  loadPlanets(query?: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.planetService.getPlanets(query)
      .pipe(
        tap(planets => {
          this.planets.set(planets);
          this.loading.set(false);
        }),
        catchError(() => {
          this.error.set('Failed to load planets');
          this.loading.set(false);
          return of(null);
        })
      ).subscribe();
  }
}
