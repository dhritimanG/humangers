import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') websiteEditForm: NgForm;
  application = {};
  userId: string;
  user: any;
  wid: string;
  websites = [{}];

  constructor(private webService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.wid = params['wid'];
        }
      );
    this.webService.findApplicationById(this.wid)
      .subscribe(
        (website: any) => {
          this.application = website;
        }
      );

    this.webService.findApplicationsByUser(this.userId)
      .subscribe(
        (websites: any) => {
          this.websites = websites;
        }
      );
  }

  update() {
    this.webService.updateApplication(this.wid, this.application)
      .subscribe(
        (website: any) => {
          this.router.navigate(['user/' + this.userId, 'application']);
        }
      );
  }

  delete() {
    this.webService.deleteApplication(this.wid)
      .subscribe(
        (website: any) => {
          this.router.navigate(['user/' + this.userId, 'application']);
        }
      );
  }

}
