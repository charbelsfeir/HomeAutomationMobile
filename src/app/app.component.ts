import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    this._router.navigate(['loading']);
  }
}
