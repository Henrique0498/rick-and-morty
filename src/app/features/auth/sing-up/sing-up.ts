import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from '@core/store/auth/auth.actions';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sing-up.html',
  styleUrls: ['./sing-up.scss'],
})
export class SingUpPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const { name, email, password, confirmPassword, birthdate } = this.form.value;

    if (password !== confirmPassword) {
      this.error = 'As senhas não conferem';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.auth
      .register({
        name,
        email,
        password,
        birthDate: birthdate,
        avatar: 'https://i.pravatar.cc/300?img=24',
      })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ user, token }) => {
          localStorage.setItem('auth_token', token);
          this.store.dispatch(loginSuccess({ user, token }));
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err.message ?? 'Falha ao cadastrar. Tente novamente.';
        },
      });
  }
}
