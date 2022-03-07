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
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.details = params['cocktail'];
      }
    });
  }
}
