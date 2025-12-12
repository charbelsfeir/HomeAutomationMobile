import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AuthenticationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
