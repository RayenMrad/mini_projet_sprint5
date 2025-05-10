import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-chanson',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-chanson.component.html',
})
export class AddChansonComponent implements OnInit {
  newChanson = new Chanson();

  genres!: Genre[];
  newIdGen!: number;
  newGenre!: Genre;

  constructor(private chansonService: ChansonService, private router: Router) {}

  addChanson() {
    this.newChanson.genre = this.genres.find(
      (cat) => cat.idGen == this.newIdGen
    )!;
    this.chansonService.ajouterChanson(this.newChanson).subscribe((prod) => {
      console.log(prod);
      this.router.navigate(['chansons']);
    });
  }

  ngOnInit(): void {
    // this.chansons = this.chansonsService.getChansons();
    //this.genres = this.chansonService.listeGenres();
    this.chansonService.listeGenres().subscribe((cats) => {
      this.genres = cats._embedded.genres;
      console.log(cats);
    });
  }
}
