import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../../../models/cocktail.model';

import { CocktailService } from '../../../services/cocktail.service';

import { DataMappingService } from '../../../services/data-mapping.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() id!: string;

  loading = true;
  cocktail: Cocktail | null = null;

  instructions: 'EN' | 'ES' | 'DE' | 'FR' | 'IT' = 'EN';
  ingridients = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
  ];

  constructor(
    private cocktailService: CocktailService,
    private dataMappingService: DataMappingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cocktailService.getOne(this.id).subscribe((data) => {
      this.cocktail = data;
    });
  }

  getInstructions(type: string) {
    return this.dataMappingService.mapInstructions(type);
  }
  getIngridients(type: string) {
    return this.dataMappingService.mapIngridients(type);
  }
  getMeasures(type: string) {
    return this.dataMappingService.mapMeasures(type);
  }

  handleTabChange(type: string) {
    switch (type) {
      case 'EN':
        this.instructions = 'EN';
        break;
      case 'ES':
        this.instructions = 'ES';
        break;
      case 'DE':
        this.instructions = 'DE';
        break;
      case 'FR':
        this.instructions = 'FR';
        break;
      case 'IT':
        this.instructions = 'IT';
        break;
    }
  }

  onClose() {
    this.removeQueryParams();
  }
  removeQueryParams() {
    this.router.navigate([], {
      queryParams: { cocktail: null },
      queryParamsHandling: 'merge',
    });
  }
}
