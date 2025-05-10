import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Genre } from '../model/genre.model';
@Component({
  selector: 'app-update-chanson',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-chanson.component.html',
  styles: ``,
})
export class UpdateChansonComponent implements OnInit {
  currentChanson = new Chanson();
  genres!: Genre[];
  updatedGenId?: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

    private chansonService: ChansonService
  ) {}
  ngOnInit() {
    this.chansonService.listeGenres().subscribe((cats) => {
      this.genres = cats._embedded.genres;
      console.log(cats);
    });

    this.chansonService
      .consulterChanson(this.activatedRoute.snapshot.params['id'])
      .subscribe((prod) => {
        this.currentChanson = prod;
        this.updatedGenId = this.currentChanson.genre!.idGen;
      });
  }

  updateChanson() {
    this.currentChanson.genre = this.genres.find(
      (cat) => cat.idGen == this.updatedGenId
    )!;

    this.chansonService.updateChanson(this.currentChanson).subscribe((prod) => {
      this.router.navigate(['chansons']);
    });
  }
}
