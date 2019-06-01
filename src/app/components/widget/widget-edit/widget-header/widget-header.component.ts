import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../../services/website.service.client';
@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  text: string;
  size: string;
  userId: string;
  wid: string;
  pid: string;
  wgid: string;
  widget = {};
  widgets = [{}];

  constructor(private widgetService: WidgetService,
              private activatedRoutes: ActivatedRoute,
              private webService: WebsiteService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(params => {
      this.userId = params['userId'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.wgid = params['wgid'];
      this.webService.findWidgetByIndex(this.wid, this.pid, this.wgid)
          .subscribe(
              (widget: any) => {
                this.widget = widget;
                this.text = widget['html'];
              }
          );
    });
  }

  create() {
    const widget = {
      type: 'HEADER',
      text: this.text,
      size: this.size
    };
    this.webService.addWidgetsToPage(this.wid, this.pid, widget)
        .subscribe((data) => {
          if (data) {
            this.widget = data;
            this.router.navigate(['/user', this.userId, 'application', this.wid, 'page', this.pid, 'widget']);
          }
        });
  }

  update() {
    this.widget['type'] = 'HEADER';
    this.widget['text'] = this.text;
    this.widget['size'] = this.size;
    this.webService.updateWidget(this.wid, this.pid, this.wgid, this.widget)
        .subscribe((widgets: any) => {
          this.router.navigate(['/user' , this.userId, 'application', this.wid, 'page', this.pid, 'widget']);
        });
  }

  delete() {
    this.webService.deleteWidget(this.wid, this.pid, this.wgid)
        .subscribe((widgets: any) => {
          this.router.navigate(['user/' + this.userId, 'application', this.wid, 'page', this.pid, 'widget']);
        });
  }

}
