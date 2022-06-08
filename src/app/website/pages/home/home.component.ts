import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CocktailService } from '../../../services/cocktail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  details: string | null = null;
  prevParams: any = {};
  constructor(
    private route: ActivatedRoute,
    private cocktailService: CocktailService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cocktailService.updateCocktailList(params);
      this.details = params['cocktail'];
      this.scrollToTop();
    });
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        currentScroll = currentScroll / 1.2;
        window.requestAnimationFrame(smoothscroll);
        document.body.scrollTop = currentScroll;
      } else {
        document.body.scrollTop = 0;
      }
    })();
  }
}
