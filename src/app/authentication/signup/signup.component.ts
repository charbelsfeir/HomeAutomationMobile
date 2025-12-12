import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SignupComponent implements OnInit {
  passToShow = false;
  formGrp = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthService
  ) {}

  ngOnInit() {}

  goToSignIn(): void {
    this._router.navigate(['../signin'], { relativeTo: this._route });
  }

  signup(event: any): void {
    event.preventDefault();
    if (this.formGrp.valid) {
      this._authService
        .signUp({
          email: this.formGrp.get('email')!.value!,
          password: this.formGrp.get('password')!.value!,
        })
        .then((response) => {
          if (response) {
            this._router.navigateByUrl('/tabs');
          } else {
            alert('Unable to sign up user');
          }
        });
    }
  }

  forgotPassword(): void {}
}
