import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { ChansonService } from '../services/chanson.service';
import { UpdateGenreComponent } from '../update-genre/update-genre.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-genres',
  standalone: true,
  imports: [CommonModule, UpdateGenreComponent],
  templateUrl: './liste-genres.component.html',
  styles: ``,
})
export class ListeGenresComponent implements OnInit {
  genres!: Genre[];
  updatedGen: Genre = { idGen: 0, nomGen: '' };
  ajout: boolean = true;

  constructor(private chansonService: ChansonService) {}
  ngOnInit(): void {
    this.chansonService.listeGenres().subscribe((cats) => {
      this.genres = cats._embedded.genres;
      console.log(cats);
    });
  }

  genreUpdated(cat: Genre) {
    console.log('Cat updated event', cat);
    this.chansonService.ajouterGenre(cat).subscribe(() => this.chargerGenres());
  }

  chargerGenres() {
    this.chansonService.listeGenres().subscribe((cats) => {
      this.genres = cats._embedded.genres;
      console.log(cats);
    });
  }

  updateGen(cat: Genre) {
    this.updatedGen = cat;
    this.ajout = false;
  }
}
