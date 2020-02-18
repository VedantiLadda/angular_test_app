import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { IUser } from '../user';
import { GenericValidator } from 'src/app/shared/generic-validator';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Login';
  errorMessage: string;
  loginForm: FormGroup;
  user: IUser;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      username: {
        required: 'User name is required.',
        minlength: 'User name must be at least three characters.',
        maxlength: 'User name cannot exceed 50 characters.'
      },
      password: {
        required: 'Password is required.',
        minlength: 'User name must be at least three characters.',
        maxlength: 'User name cannot exceed 50 characters.'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      password: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]]
    });
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.loginForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe((value) => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      if (this.loginForm.dirty) {
        const u = { ...this.user, ...this.loginForm.value };
        var status: boolean;
        this.loginService.authenticateUser(u).subscribe({
          next: data => {
            status = this.setStatus(data)
            if (status == false) {
              this.errorMessage = "Please enter the correct credentials";
            }
            else {
              this.onSaveComplete();
            }
          },
          error: err => this.errorMessage = err
        });
      }
    }
    else {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.loginForm.reset();
    this.router.navigate(['/welcome']);
  }

  setStatus(data: any): boolean {
    if (data.length > 0) {
      this.loginService.setLoginStatus(true);
      if (data[0].type == "admin")
        this.loginService.setAdminStatus(true);
      else
        this.loginService.setAdminStatus(false);
      return true;
    }
    else {
      this.loginService.setAdminStatus(false);
      this.loginService.setLoginStatus(false);
      return false;
    }
  }

}
