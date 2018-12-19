import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Product } from '../../models';
import { ProductsService } from '../../services';

@Component({
  selector: 'app-we-recommend',
  templateUrl: './we-recommend.component.html',
  styleUrls: ['./we-recommend.component.scss']
})
export class WeRecommendComponent implements OnInit {
  @ViewChild('slide') slide: ElementRef;
  carouselItems: Product[];
  position: number = 0;
  animationContinues: boolean = false;

  @Output() changed: EventEmitter<any> = new EventEmitter<boolean>();

  constructor(private productsService: ProductsService) {/**/ }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.carouselItems = products;
      },
      (err: any) => {/**/}
    );
  }

  positionAnimation(direction: number): void {
    const animationSpeed: number = 10;
    const shift: number = 150;
    const fps: number = 50;
    const position: number = parseInt(this.slide.nativeElement.style.left, 10);

    if (this.animationContinues) {
      return;
    }

    this.animationContinues = true;

    const timer: any = setInterval(() => {

      if (direction === -1) {
        if (this.position >= position + shift) {
          clearInterval(timer);
          this.animationContinues = false;
        } else {
          this.position += animationSpeed;
        }
      }

      if (direction === 1) {
        if (this.position <= position - shift) {
          clearInterval(timer);
          this.animationContinues = false;
        } else {
          this.position -= animationSpeed;
        }
      }

    }, 1000 / fps);
  }

  prev(): void {
    this.positionAnimation(-1);
  }

  next(): void {
    this.positionAnimation(1);
  }

  clickOnProduct(id: string): void {
    this.changed.emit(id);
  }
}
