import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { CocktailListComponent } from './components/cocktail-list/cocktail-list.component';
import { CocktailItemComponent } from './components/cocktail-item/cocktail-item.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { FilterComponent } from './components/filter/filter.component';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { FilterItemComponent } from './components/filter-item/filter-item.component';
import { DetailsComponent } from './components/details/details.component';
import { LoadingComponent } from './components/loading/loading.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    CocktailDetailsComponent,
    CocktailListComponent,
    CocktailItemComponent,
    SearcherComponent,
    FilterComponent,
    FilterListComponent,
    FilterItemComponent,
    DetailsComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, WebsiteRoutingModule, FormsModule],
})
export class WebsiteModule {}
