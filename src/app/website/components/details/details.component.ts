import {
  Component,
  Renderer2,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Cocktail } from '../../../models/cocktail.model';

import { CocktailService } from '../../../services/cocktail.service';

import { DataMappingService } from '../../../services/data-mapping.service';

import { Router } from '@angular/router';

import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [
    trigger('toggleDetails', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('300ms', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class DetailsComponent implements OnInit, OnDestroy {
  @ViewChild('details') details: ElementRef | null = null;
  @Input() id!: string;
  loading = true;
  iDetails = false;
  private listener: any;
  toggleIDeatils() {
    this.iDetails = !this.iDetails;
  }

  cocktail: Cocktail | null = null;
  ingridientList: any = [];
  measureList: any = [];

  instructions: 'EN' | 'ES' | 'DE' | 'FR' | 'IT' = 'EN';
  ingredients = [
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
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.cocktailService.getOne(this.id).subscribe((data) => {
      this.cocktail = data;
      this.getIngredientList(data);
      this.getMeasureList(data);
      this.setEventListener();
      this.loading = false;
    });
  }
  ngOnDestroy(): void {
    this.listener();
  }

  setEventListener() {
    this.listener = this.renderer.listen('document', 'click', (e: Event) => {
      if (this.details) {
        if (!this.iDetails) {
          if (!this.details.nativeElement.contains(e.target)) {
            this.onClose();
          }
        }
      }
    });
  }

  getInstructions(type: string) {
    return this.dataMappingService.mapInstructions(type);
  }
  getIngredients(type: string) {
    return this.dataMappingService.mapIngredients(type);
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

  handleTagFilter(type: string, tag: string) {
    console.log(type, tag);
    this.cocktailService.getByTag(type, tag);
  }

  getIngredientList(data: any) {
    let ingredientList: any[] = [];
    this.ingredients.forEach((ingredient) => {
      if (data[this.getIngredients(ingredient)])
        ingredientList.push(data[this.getIngredients(ingredient)]);
    });
    this.ingridientList = ingredientList;
  }
  getMeasureList(data: any) {
    let measureList: any[] = [];
    this.ingredients.forEach((ingredient) => {
      measureList.push(data[this.getMeasures(ingredient)]);
    });
    this.measureList = measureList;
  }
}
