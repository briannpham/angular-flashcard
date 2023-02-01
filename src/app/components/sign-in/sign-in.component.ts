import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  userForm = this.formBuiler.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(2)]],
  });
  constructor(
    private userService: UserService,
    private formBuiler: FormBuilder
  ) {}

  onSubmit() {
    this.userService.onSignIn(this.userForm.value).subscribe((result: any) => {
      console.log(result);
    });
    this.userForm.reset();
  }

  get email() {
    return this.userForm.get('email');
  }
}
