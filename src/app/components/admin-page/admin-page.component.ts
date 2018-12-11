import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router) {
    this.router.navigate(['admin', 'statistics']); // can't do this in app-routing.module
  }

  ngOnInit(): void {/**/
  }

  statisticsClick(): void {
    this.router.navigate(['admin', 'statistics']);
  }

  categoryClick(): void {
    this.router.navigate(['admin', 'category']);
  }

  productClick(): void {
    this.router.navigate(['admin', 'product']);
  }
}
