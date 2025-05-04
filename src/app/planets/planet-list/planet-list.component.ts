import {Component, inject, signal} from '@angular/core';
import {PlanetStore} from '../../stores/planet.store';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs';

@Component({
  selector: 'app-planet-list',
  imports: [],
  templateUrl: './planet-list.component.html',
  styleUrl: './planet-list.component.scss'
})
export class PlanetListComponent {
  readonly store = inject(PlanetStore);
  private readonly query = signal('');

  constructor() {
    toObservable(this.query).pipe(
      takeUntilDestroyed(),
      debounceTime(300),
      distinctUntilChanged(),
      tap(query => this.store.loadPlanets(query)),
    ).subscribe();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.query.set(input.value);
  }
}
