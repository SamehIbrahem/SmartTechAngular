import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  images = [1, 2, 3].map((e) => `https://picsum.photos/900/500?random&t=${e}`);
  constructor(config: NgbCarouselConfig) {
    config.interval = 1000;
   }

  ngOnInit() {
  }

}
