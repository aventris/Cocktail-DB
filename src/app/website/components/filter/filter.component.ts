import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { CocktailService } from '../../../services/cocktail.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('filterMenu') menu!: ElementRef;

  menuIsOpen: Boolean = false;

  constructor(
    private cocktailService: CocktailService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.filter.nativeElement.contains(e.target) &&
        e.target !== this.menu.nativeElement
      ) {
        this.menuIsOpen = false;
      }
    });
  }

  ngOnInit(): void {}

  toggleTag() {
    this.menuIsOpen = !this.menuIsOpen;
  }
  closeMenu() {
    this.menuIsOpen = false;
  }

  handleNavigation(type: string, tag: string) {
    this.cocktailService.setURLQueryParams(type, tag);
  }
}
