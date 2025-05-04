import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FilmResult} from '../types/filmResult';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'https://swapi.tech/api/films';

  getFilms(): Observable<FilmResult> {
    return this.httpClient.get<FilmResult>(this.apiUrl);
  }
}
