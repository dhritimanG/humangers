import { WebsiteService } from './../../../services/website.service.client';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  pid: string;
  userId: string;
  widget: any;
  wid: string;
  drugCode: string;
  drugDesc: string;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private widgetService: WidgetService,
              private websiteService: WebsiteService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.wid = params['wid'];
          this.pid = params['pid'];
        }
      );
  }

  create() {
    console.log(this.drugCode);
    console.log(this.drugDesc);
    const widget = {
      drugCode: this.drugCode,
      drugDesc: this.drugDesc
    };
    // this.widget = this.widgetService.createWidget(this.pid, widget)
    this.widget = this.websiteService.addWidgetsToPage(this.wid, this.pid, widget)
      .subscribe(
        (new_widget: any) => {
          this.router.navigate([
            'user/',
            this.userId,
            'application',
            this.wid,
            'page',
            this.pid,
            'widget']);
        }
      );
  }
}
