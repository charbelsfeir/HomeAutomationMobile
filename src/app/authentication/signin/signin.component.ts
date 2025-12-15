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
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class SigninComponent implements OnInit {
  passToShow = false;
  formGrp = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthService
  ) {}

  ngOnInit() {}

  goToSignUp(): void {
    this._router.navigate(['../signup'], { relativeTo: this._route });
  }

  login(event: any): void {
    event.preventDefault();
    if (this.formGrp.valid) {
      this._authService
        .signIn({
          email: this.formGrp.get('email')!.value!,
          password: this.formGrp.get('password')!.value!,
        })
        .then((response) => {
          if (response) {
            localStorage.setItem('userID', this.formGrp.get('email')?.value!);
            this._router.navigateByUrl('/tabs');
          } else {
            alert('Unable to sign in user');
          }
        });
    }
  }

  forgotPassword(): void {}
}
