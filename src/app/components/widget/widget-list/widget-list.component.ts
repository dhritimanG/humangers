import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {WidgetService} from '../../../services/widget.service.client';
import { DomSanitizer } from '@angular/platform-browser';
import {WebsiteService} from '../../../services/website.service.client';


@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  userId: string;
  widgets: [{}];
  wid: string;
  pid: string;
  user: any;
  page: any;
  pageName: any;
  index: any;


  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private widgetService: WidgetService,
              private webService: WebsiteService,
              public sanitizer: DomSanitizer,
              private router: Router) { }


  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.wid = params['wid'];
          this.pid = params['pid'];
        }
      );
      this.webService.findApplicationById(this.wid)
          .subscribe((websites: any) => {
              this.page = websites;
              this.pageName = this.page.pages;
              this.widgets = this.pageName[this.pid].widgets;
              console.log(this.widgets);
          });
  }

  // updatePosition(event: Object) {
  //   this.widgetService.updateWidgetPosition(this.pid, event['startIndex'], event['endIndex'])
  //     .subscribe((data) => {
  //       if (data && data.success === true) {
  //         console.log('success');
  //       }else {
  //         console.log('error in updating position');
  //       }
  //     });
  // }

    delete(widget) {
        const index = this.widgets.findIndex(function(item){
            return item === widget;
        });

        this.webService.deleteWidget(this.wid, this.pid, index)
            .subscribe(
                (widgets: any) => {
                    console.log(this.widgets);
                    this.router.navigate(['user/' + this.userId, 'application', this.wid, 'page', this.pid, 'widget']);
                }
            );
    }

    goToEdit(widget) {
      // console.log(widget.html);
        this.index = this.widgets.findIndex(function(item){
            return item === widget;
        });
        console.log(this.index);
        this.router.navigate(['user/' + this.userId, 'application', this.wid, 'page', this.pid, 'widget', this.index]);
    }

}
