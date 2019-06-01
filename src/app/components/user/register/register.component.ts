import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registrationForm: NgForm;

  user: User;
  username: String;
  password: String;
  confirmPassword: String;
  errorFlag: Boolean;
  errorMsg: String;

  constructor(private sharedService: SharedService, private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new User('', '', '', '', '');
  }

  // onRegister(username, password) {
  //   this.username = username;
  //   this.password = password;
  //
  //   this.userService.register(this.username, this.password)
  //     .subscribe((user) => {
  //     this.sharedService.user = user;
  //     this.router.navigate(['/user']);
  //     });
  // }

  createUser() {
    this.user.username = this.registrationForm.value.userName;
    this.user.password = this.registrationForm.value.password;
    this.user.firstName = this.registrationForm.value.firstName;
    this.user.lastName = this.registrationForm.value.lastName;
    this.user.email = this.registrationForm.value.email;
    this.confirmPassword = this.registrationForm.value.confirmPassword;

    if (this.user['password'] !== this.confirmPassword) {
      this.errorFlag = true;
      this.errorMsg = 'Passwords do not match';
    } else {
      this.userService.createUser(this.user)
        .subscribe((user) => {
          this.sharedService.user = user;
          this.router.navigate(['/user']);
          if (this.user) {
            console.log(user);
          } else {
            console.log('yes');
            this.errorFlag = true;
            this.errorMsg = 'Could not create User!';
          }
        });
    }
  }
}
