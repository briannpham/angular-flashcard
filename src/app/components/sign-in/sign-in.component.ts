import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private formBuiler: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    this.userService.onSignIn(this.userForm.value).subscribe((result: any) => {
      this.userService.user = result;
      this.userForm.reset();
      this.router.navigateByUrl('/dashboard');
    });
  }

  get email() {
    return this.userForm.get('email');
  }
}
