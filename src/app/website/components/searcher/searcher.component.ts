import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { CocktailService } from '../../../services/cocktail.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  animations: [
    trigger('toggleMenu', [
      state(
        'visible',
        style({
          transform: 'scaleY(1)',
        })
      ),
      state(
        'hidden',
        style({
          transform: 'scaleY(0.001)',
        })
      ),
      transition('hidden => visible', [animate('300ms')]),
      transition('visible => hidden', [animate('100ms')]),
    ]),
  ],
})
export class SearcherComponent implements OnInit {
  @ViewChild('searchFilter') searchFilter!: ElementRef;
  @ViewChild('searchFilterMenu') menu!: ElementRef;

  filterIsOpen = false;
  searchText = '';
  filterType = 'Cocktail';
  constructor(
    private cocktailService: CocktailService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.searchFilter.nativeElement.contains(e.target) &&
        e.target !== this.menu.nativeElement
      ) {
        this.filterIsOpen = false;
      }
    });
  }

  ngOnInit(): void {}

  toggleFilter() {
    this.filterIsOpen = !this.filterIsOpen;
  }

  handleFilter(type: string) {
    this.filterType = type;
    this.filterIsOpen = false;
  }

  onSubmit() {
    const filter = this.filterType === 'Cocktail' ? 's' : 'i';
    this.router.navigate([], {
      queryParams: {
        ...(filter === 's'
          ? { search_c: this.searchText }
          : { search_i: this.searchText }),
      },
    });
    this.cocktailService.getByName(filter, this.searchText);
  }
}
