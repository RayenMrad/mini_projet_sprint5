import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``,
})
export class RechercheParNomComponent implements OnInit {
  nomChanson!: string;
  chansons!: Chanson[];
  allChansons!: Chanson[];
  searchTerm!: string;

  constructor(private chansonService: ChansonService) {}
  ngOnInit(): void {
    this.chansonService.listeChansons().subscribe((prods) => {
      console.log(prods);
      this.chansons = prods;
    });
  }

  onKeyUp(filterText: string) {
    this.chansons = this.allChansons.filter((item) =>
      item.nomChanson!.toLowerCase().includes(filterText)
    );
  }
  rechercherChans() {
    if (this.nomChanson)
      //ou bien (this.nomChanson!=="")
      this.chansonService
        .rechercherParNom(this.nomChanson)
        .subscribe((prods) => {
          console.log(prods);
          this.chansons = prods;
        });
    else
      this.chansonService.listeChansons().subscribe((prods) => {
        console.log(prods);
        this.chansons = prods;
      });
  }
}
