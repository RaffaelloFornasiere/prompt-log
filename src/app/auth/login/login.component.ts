import {Component, inject, signal} from '@angular/core';
import {AuthService} from '../auth.service';
import {InputComponent} from '../../shared/input/input.component';
import {ShineEffectDirective} from '../../shared/directives/shine.directive';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {ToastService} from '../../shared/toast/toast.service';
import {asapScheduler} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    InputComponent,
    ShineEffectDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService)
  signin = signal<boolean>(false)
  toastService = inject(ToastService);
  router = inject(Router)


  form = new FormGroup({
    username: new FormControl(undefined, [Validators.required, Validators.email]),
    password: new FormControl(undefined, [Validators.required]),
    confirmPassword: new FormControl(undefined, [this.conditionalRequired(() => this.signin())])
  }, {validators: this.passwordsMatch()})


  passwordsMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return (this.signin() && password && confirmPassword && (password !== confirmPassword)) ? {passwordsMatch: true} : null;
    }
  }

  /** An actor's name can't match the given regular expression */
  conditionalRequired(condition: () => boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const required = condition() && !control.value;
      return required ? {required: {value: control.value}} : null;
    };
  }

  passwordSignUp() {
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    console.log(this.form.invalid, this.form)
    if (this.form.invalid) {
      return
    }
    console.log(this.form.controls.username.value!, this.form.controls.password.value!)


    this.authService.passwordSignUp(this.form.controls.username.value!, this.form.controls.password.value!)
      .subscribe({
        next: () => {
          this.toastService.addToast({message:'Account created successfully', type: 'success'})
          setTimeout(() => {

          })
        },
        error: (error) => {
          this.toastService.addToast({message: error.message, type: 'error'})
        }
      })

  }

  googleSignIn() {
    this.authService.googleSignIn()
  }

  passwordSignIn() {
    this.form.markAllAsTouched()
    if (this.form.invalid) {
      return
    }
    this.authService.passwordSignIn(this.form.controls.username.value!, this.form.controls.password.value!).subscribe()
  }
}
