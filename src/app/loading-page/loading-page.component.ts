import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
})
export class LoadingPageComponent implements OnInit {
  constructor(private readonly _router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this._router.navigate([''], { replaceUrl: true });
    }, 2500);
  }
}
