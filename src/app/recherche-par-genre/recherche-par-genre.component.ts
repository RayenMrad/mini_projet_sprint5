import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { CommonModule } from '@angular/common';
import { Genre } from '../model/genre.model';
import { ChansonService } from '../services/chanson.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-genre',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-genre.component.html',
  styles: ``,
})
export class RechercheParGenreComponent implements OnInit {
  chansons!: Chanson[];
  IdGenre!: number;
  genres!: Genre[];

  constructor(private chansonService: ChansonService) {}

  ngOnInit(): void {
    this.chansonService.listeGenres().subscribe((cats) => {
      this.genres = cats._embedded.genres;
      console.log(cats);
    });
  }

  onChange() {
    this.chansonService.rechercherParGenre(this.IdGenre).subscribe((prods) => {
      this.chansons = prods;
    });
  }
}
