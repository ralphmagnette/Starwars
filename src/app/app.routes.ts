import {Routes} from '@angular/router';
import {CharacterListComponent} from './characters/character-list/character-list.component';
import {CharacterDetailsComponent} from './characters/character-details/character-details.component';
import {PlanetListComponent} from './planets/planet-list/planet-list.component';

export const routes: Routes = [
  {path: 'characters', component: CharacterListComponent},
  {path: 'characters/:id', component: CharacterDetailsComponent},
  {path: 'planets', component: PlanetListComponent},
  {path: '', redirectTo: 'characters', pathMatch: 'full'},
];
