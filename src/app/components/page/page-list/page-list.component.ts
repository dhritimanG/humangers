import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {PageService} from '../../../services/page.service.client';
import {WebsiteService} from '../../../services/website.service.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  userId: string;
  pages = [{}];
  username: string;
  wid: string;
  pid: string;
  page: any;
  pageName: string;
  mykey: any;


  constructor(private activatedRoute: ActivatedRoute,
              private webService: WebsiteService,
              private userService: UserService,
              private pageService: PageService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.wid = params['wid'];
        }
      );
    this.userService.findUserById(this.userId)
      .subscribe(
        (user: any) => {
          this.username = user.username;
        }
      );
      this.webService.findApplicationById(this.wid)
          .subscribe((websites: any) => {
                this.page = websites;
                this.pageName = this.page.pages;
                this.mykey = Object.keys(this.pageName);
                this.pid = this.page._id;

      });
    // this.pageService.findPageByWebsiteId(this.wid)
    //   .subscribe(
    //     (pages: any) => {
    //       this.pages = pages;
    //       this.page = pages;
    //       console.log(this.pages);
    //     }
    //   );
  }

}
