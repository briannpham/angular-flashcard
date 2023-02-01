import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  userForm = this.formBuiler.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(2)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(
    private userService: UserService,
    private formBuiler: FormBuilder
  ) {}

  onSubmit() {
    this.userService.onSignUp(this.userForm.value).subscribe((result: any) => {
      console.log(result);
    });
    this.userForm.reset();
  }
}
