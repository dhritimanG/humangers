import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../../services/website.service.client';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

  text: string;
  userId: string;
  wid: string;
  pid: string;
  wgid: string;
  widget: any;
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
      // console.log(this.pid);
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
      type: 'HTML',
      html: this.text
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
    this.widget['type'] = 'HTML';
    this.widget['html'] = this.text;
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
