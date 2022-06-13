import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements OnInit {
  @Input() ingredients: any;
  @Input() measures: any;
  @Output() onClose = new EventEmitter();

  @HostListener('document:click', ['$event'])
  clickOutside(e: Event) {
    if (!this.elementRef.nativeElement.contains(e.target)) this.onClose.emit();
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  getImgUrl(ingredient: string) {
    return `http://www.thecocktaildb.com/images/ingredients/${encodeURI(
      ingredient
    )}-Medium.png`;
  }

  onClick() {
    this.onClose.emit();
  }
}
