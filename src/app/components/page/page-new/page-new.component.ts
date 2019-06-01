import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {WebsiteService} from '../../../services/website.service.client';


@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  @ViewChild('f') pageForm: NgForm;
  userId: string;
  pages = [{}];
  page: any;
  name: {};
  route: string;
  wid: string;
  user: any;


  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private pageService: PageService, private webService: WebsiteService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.wid = params['wid'];
        }
      );
    this.pageService.findPageByWebsiteId(this.wid)
      .subscribe(
        (pages: any) => {
          this.pages = pages;
        }
      );

  }

  create() {
    console.log('new page');
    this.name = this.pageForm.value.pageName;
    this.route = this.pageForm.value.pageDesc;
    const page = {
        name: this.name,
        route: this.route
    };
    //   const pages = {
    //       name: this.name,
    //           route: this.route
    //       };
    this.page = this.webService.addPagesToApplication(this.wid, page)
        .subscribe((new_page: any) => {
            console.log(new_page);
            this.router.navigate(['user/', this.userId, 'application', this.wid, 'page']);
          });
    // const page = {
    //   name: this.name, route: this.route
    // };
    // this.page = this.pageService.createPage(this.wid, page)
    //   .subscribe((new_page: any) => {
    //       console.log(new_page);
    //       this.router.navigate(['user/', this.userId, 'application', this.wid, 'page']);
    //     });
  }

}
