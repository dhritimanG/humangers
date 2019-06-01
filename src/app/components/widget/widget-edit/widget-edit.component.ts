import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {WebsiteService} from "../../../services/website.service.client";

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  //   template: '<html><body><strong><h1>Hello</h1></strong></body></html>',
  styleUrls: ['./widget-edit.component.css'],
})
export class WidgetEditComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widget = {};
  type: string;

  constructor(private widgetService: WidgetService,
              private activatedRoutes: ActivatedRoute,
              private webService: WebsiteService) {
  }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(params => {
      this.userId = params['userId'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
      console.log('Hello from widget edit');
      // this.widgetService.findWidgetById(this.widgetId)
      //   .subscribe(
      //     (widget: any) => {
      //       this.widget = widget;
      //       this.type = widget.type;
      //       // console.log(widget.html);
      //     }
      //   );
        this.webService.findWidgetByIndex(this.websiteId, this.pageId, this.widgetId)
            .subscribe(
            (widget: any) => {
              this.widget = widget;
              this.type = widget.type;
              console.log(widget.html);
              console.log(widget.type);
            }
          );
    });
  }
}
