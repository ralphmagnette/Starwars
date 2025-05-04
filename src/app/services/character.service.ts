import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CharacterResults} from '../types/characterResults';
import {Observable} from 'rxjs';
import {CharacterResult} from '../types/characterResult';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'https://swapi.tech/api/people';

  getCharacters(): Observable<CharacterResults> {
    return this.httpClient.get<CharacterResults>(this.apiUrl);
  }

  getCharacter(id: string): Observable<CharacterResult> {
    return this.httpClient.get<CharacterResult>(`${this.apiUrl}/${id}`);
  }
}
