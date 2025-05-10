import { Routes } from '@angular/router';
import { ChansonsComponent } from './chansons/chansons.component';
import { AddChansonComponent } from './add-chanson/add-chanson.component';
import { UpdateChansonComponent } from './update-chanson/update-chanson.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { chansonGuard } from './chanson.guard';

export const routes: Routes = [
  { path: 'chansons', component: ChansonsComponent },
  {
    path: 'add-chanson',
    component: AddChansonComponent,
    canActivate: [chansonGuard],
  },
  { path: 'updateChanson/:id', component: UpdateChansonComponent },
  { path: 'rechercheParGenre', component: RechercheParGenreComponent },
  { path: 'rechercheParNom', component: RechercheParNomComponent },
  { path: 'listeGenres', component: ListeGenresComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },

  { path: '', redirectTo: 'chansons', pathMatch: 'full' },
];
