import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Planet, PlanetResults} from '../types/planetResults';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'https://swapi.tech/api/planets';

  getPlanets(query: string = ''): Observable<Planet[]> {
    return this.httpClient.get<PlanetResults>(`${this.apiUrl}?name=${query}`).pipe(
      map(planetResults => {
        if (planetResults.results) {
          return planetResults.results;
        }

        if (planetResults.result) {
          return planetResults.result.map(planet => ({
            name: planet.properties.name,
            uid: planet.uid,
            url: ""
          }));
        }

        return []
      })
    );
  }
}
