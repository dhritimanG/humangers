import {Component, OnInit, ViewChild} from '@angular/core';
import {  Router } from '@angular/router';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service.client';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  // properties
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg: String;


  constructor(private sharedService: SharedService, private userService: UserService, private router: Router) {

  }

  landing() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.login(this.username, this.password)
      .subscribe((user: any) => {
        if (user) {
          this.sharedService.user = user;
          this.router.navigate(['/user']);
        } else {
          this.errorFlag = true;
          this.errorMsg = 'Invalid username or password !';
        }

      });
  }

  ngOnInit() {
  }

}
