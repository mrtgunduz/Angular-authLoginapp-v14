import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { PostService } from 'src/app/_services/post/post.service';
import { User } from 'src/app/models/user.mode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;
  successMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _auth: AuthenticationService,
    private _post: PostService,
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.value;
  }
  createForm() {
    this.loginForm = this.fb.group({
      username: ['kminchelle', [Validators.required]],
      password: ['0lelplR', [Validators.required]],
    });
  }
  async submit() {
    const { username, password } = this.f;
    try {
      const user: User | undefined = await lastValueFrom(
        this._auth.logIn(username, password),
      );
      if (user.token !== null) {
        // Başarılı giriş durumunda mesaj göstermek için successMessage değişkenini kullan
        this.successMessage = 'Giriş başarılı. Yönlendiriliyorsunuz...';
        setTimeout(() => {
          this.router.navigate(['/home']);
          this._post.hideLogout = true;
        }, 2000); // 2 saniye sonra yönlendirme yap
      }
    } catch (error: any) {
      this._post.hideLogout = false;
      console.error('Error occurred during login:', error);
      if (error.status === 400) {
        // Unauthorized
        this.loginForm.setErrors({ invalidCredentials: true });
      }
    }
  }
}
