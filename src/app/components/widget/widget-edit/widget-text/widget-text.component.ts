import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  text: string;
  rows: string;
  placeholder: string;
  baseUrl = environment.baseUrl;
  widgets = [{}];
  widget = {};
  userId: string;
  wid: string;
  pid: string;
  wgid: string;
  formatted: string;
  name: string;

  constructor(private widgetService: WidgetService,
              private activatedRoutes: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(params => {
      this.userId = params['userId'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.wgid = params['wgid'];
    });
  }
  create() {
    this.widget['type'] = 'TEXT';
    this.widget['rows'] = this.rows;
    this.widget['text'] = this.text;
    this.widget['name'] = this.name;
    this.widget['formatted'] = this.formatted;
    this.widget['placeholder'] = this.placeholder;
    this.widgetService.createWidget(this.pid, this.widget)
      .subscribe((data) => {
        if (data) {
          this.router.navigate(['/user', this.userId, 'website', this.wid, 'page', this.pid, 'widget']);
        }
      });
  }

  update() {
    this.widget['type'] = 'TEXT';
    this.widget['rows'] = this.rows;
    this.widget['text'] = this.text;
    this.widget['name'] = this.name;
    this.widget['formatted'] = this.formatted;
    this.widget['placeholder'] = this.placeholder;
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
