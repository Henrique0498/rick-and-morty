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
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    const { email, password } = this.form.value;

    this.auth
      .login(email, password)
      .pipe(
        finalize(() => {
          this.loading = false;
          // Ensure UI reflects the final state after success/error
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ user, token }) => {
          this.store.dispatch(loginSuccess({ user, token }));
          this.router.navigate(['/']);
        },
        error: (err) => {
          const message = err.message ?? 'Falha ao fazer login. Tente novamente.';

          this.toastr.error(message, 'Erro ao fazer login');
        },
      });
  }
}
