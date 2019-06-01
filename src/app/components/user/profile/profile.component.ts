import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';
import {SharedService} from "../../../services/shared.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  userId: String;
  username: String;
  firstName: String;
  user: any;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }
  logout() {
    this.userService.logout()
      .subscribe((status) => {
        this.router.navigate(['/landing']);
      });
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.user = this.sharedService.user || {};
        // this.username = this.sharedService.user.username;
        // this.firstName = this.sharedService.user.firstName;
        // this.userId = this.sharedService.user._id;
        console.log(this.user.username);
        console.log(this.user.websites);
      });




    // this.user = this.sharedService.user;
    // this.userId = this.user._id;
    // console.log(this.sharedService.user);





    // this.route.params.subscribe(params =>
    // this.userId = params['userId']);
    // // this.user = this.userService.findUserById(this.userId);
    // this.userService.findUserById(this.userId)
    //   .subscribe((user: User) => {
    //     this.user = user;
    //   });
  }

}
