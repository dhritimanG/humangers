import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  url: string;
  width: string;
  userId: string;
  wid: string;
  pid: string;
  wgid: string;
  widget = {};
  widgets = [{}];
  name: string;
  text: string;

  constructor(private widgetService: WidgetService,
              private activatedRoutes: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(params => {
      this.userId = params['userId'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.wgid = params['wgid'];
      this.widgetService.findWidgetById(this.wgid)
        .subscribe(
          (widget: any) => {
            this.widget = widget;
            this.width = widget['width'];
            this.url = widget['url'];
          }
        );
    });
  }

  create() {
    this.widget['type'] = 'YOUTUBE';
    this.widget['name'] = this.name;
    this.widget['text'] = this.text;
    this.widget['url'] = this.url;
    this.widget['width'] = this.width;
    this.widgetService.createWidget(this.pid, this.widget)
      .subscribe((data) => {
        if (data) {
          this.widget = data;
          this.router.navigate(['/user', this.userId, 'website', this.wid, 'page', this.pid, 'widget']);
        }
      });
  }

  update() {
    this.widget['widgetType'] = 'YOUTUBE';
    this.widget['width'] = this.width;
    this.widget['url'] = this.url;
    this.widgetService.updateWidget(this.wgid, this.widget)
      .subscribe(
        (widgets: any) => {
          this.router.navigate(['user/' + this.userId, 'website', this.wid, 'page', this.pid, 'widget']);
        }
      );
  }

  delete() {
    this.widgetService.deleteWidget(this.wgid)
      .subscribe(
        (widgets: any) => {
          this.router.navigate(['user/' + this.userId, 'website', this.wid, 'page', this.pid, 'widget']);
        }
      );
  }
}
