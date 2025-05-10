import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { CommonModule } from '@angular/common';
import { ChansonService } from '../services/chanson.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chansons',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chansons.component.html',
})
export class ChansonsComponent implements OnInit {
  chansons!: Chanson[]; //un tableau de chînes de caractères
  constructor(
    private chansonService: ChansonService,
    public authService: AuthService
  ) {
    //this.chansons = chansonService.listeChansons();
  }

  supprimerChanson(p: Chanson) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.chansonService.supprimerChanson(p.idChanson!).subscribe(() => {
        console.log('chanson supprimé');
        this.chargerChansons();
      });
  }
  chargerChansons() {
    this.chansonService.listeChansons().subscribe((prods) => {
      console.log(prods);
      this.chansons = prods;
    });
  }

  ngOnInit(): void {
    // this.chansons = this.chansonsService.getChansons();
    this.chargerChansons();
  }
}
