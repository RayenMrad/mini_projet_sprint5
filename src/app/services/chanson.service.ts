import { Injectable } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GenreWrapper } from '../model/GenreWrapped.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChansonService {
  chansons!: Chanson[]; //un tableau de Produit
  chanson!: Chanson; //un tableau de Produit
  genres!: Genre[];

  apiURL: string = 'http://localhost:5000/chansons/api';
  apiURLGen: string = 'http://localhost:5000/chansons/gen';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.genres = [
      { idGen: 1, nomGen: 'rap' },
      { idGen: 2, nomGen: 'pop' },
      { idGen: 3, nomGen: 'rock' },
    ];
    /*this.chansons = [
      {
        idChanson: 1,
        nomChanson: 'identity',
        duree: 3.14,
        dateSortie: new Date('01/14/2020'),
        genre: { idGen: 1, descriptionGen: 'aa', nomGen: 'rap' },
      },
      {
        idChanson: 2,
        nomChanson: 'uzi',
        duree: 4.56,
        dateSortie: new Date('12/17/2019'),
        genre: { idGen: 2, descriptionGen: 'aa', nomGen: 'pop' },
      },
      {
        idChanson: 3,
        nomChanson: 'peace',
        duree: 2.34,
        dateSortie: new Date('11/11/2021'),
        genre: { idGen: 3, descriptionGen: 'aa', nomGen: 'rock' },
      },
    ];*/
  }

  listeChansons(): Observable<Chanson[]> {
    //return this.http.get<Chanson[]>(this.apiURL);
    /*let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Chanson[]>(this.apiURL + '/all', {
      headers: httpHeaders,
    });*/
    return this.http.get<Chanson[]>(this.apiURL + '/all');
  }

  ajouterChanson(prod: Chanson): Observable<Chanson> {
    /*let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Chanson>(this.apiURL + '/addchan', prod, {
      headers: httpHeaders,
    });*/
    return this.http.post<Chanson>(this.apiURL + '/addchan', prod);
  }

  supprimerChanson(id: number) {
    const url = `${this.apiURL}/delchan/${id}`;
    /*let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });*/
    return this.http.delete(url);
  }

  consulterChanson(id: number): Observable<Chanson> {
    const url = `${this.apiURL}/getbyid/${id}`;
    /*let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Chanson>(url, { headers: httpHeaders });*/
    return this.http.get<Chanson>(url);
  }
  updateChanson(prod: Chanson): Observable<Chanson> {
    /*let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Chanson>(this.apiURL + '/updatechan', prod, {
      headers: httpHeaders,
    });*/
    return this.http.put<Chanson>(this.apiURL + '/updatechan', prod);
  }

  listeGenres(): Observable<GenreWrapper> {
    /* let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<GenreWrapper>(this.apiURLGen, {
      headers: httpHeaders,
    });*/
    return this.http.get<GenreWrapper>(this.apiURLGen);
  }

  consulterGenre(id: number): Genre {
    return this.genres.find((cat) => cat.idGen == id)!;
  }

  rechercherParGenre(idCat: number): Observable<Chanson[]> {
    const url = `${this.apiURL}/chansgen/${idCat}`;
    return this.http.get<Chanson[]>(url);
  }

  rechercherParNom(nom: string): Observable<Chanson[]> {
    const url = `${this.apiURL}/chansByName/${nom}`;
    return this.http.get<Chanson[]>(url);
  }

  ajouterGenre(cat: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.apiURLGen, cat, httpOptions);
  }
}
