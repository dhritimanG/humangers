import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {PageService} from '../../../services/page.service.client';
import {WebsiteService} from '../../../services/website.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  @ViewChild('f') pageEditForm: NgForm;
  userId: string;
  page: any;
  pages = [{}];
  name: string;
  description: string;
  pid: string;
  wid: string;
  mykey: any;
  pageName: string;
  route: string;
  currPage: string;

  constructor(private pageService: PageService,
              private webService: WebsiteService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.wid = params['wid'];
          this.pid = params['pid'];
          this.currPage = this.pid;
        }
      );
    this.pageService.findPageById(this.pid)
      .subscribe(
        (page: any) => {
          this.page = page;
        }
      );
      this.webService.findApplicationById(this.wid)
          .subscribe((websites: any) => {
              this.page = websites;
              this.pageName = this.page.pages;
              this.mykey = Object.keys(this.pageName);
              this.route = this.pageName[this.pid].route;
              console.log(this.route);
              console.log(this.pid);
          });
  }

  update() {
      console.log(this.pid);
      const p = {
          name: this.pid,
          route: this.route
      };
    this.webService.updatePage(this.currPage, this.wid, this.pid, p)
      .subscribe((page: any) => {
          this.router.navigate(['user/' + this.userId, 'application', this.wid, 'page']);
        }
      );
  }

  delete() {
    this.webService.deletePage(this.wid, this.pid)
      .subscribe((page: any) => {
          this.router.navigate(['user/' + this.userId, 'application', this.wid, 'page']);
        }
      );
  }

}
