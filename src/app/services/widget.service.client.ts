import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class WidgetService {
  pageId

  constructor(private http: Http) {
  }
  baseUrl = environment.baseUrl;
  FDAUrl;

  api = {
    'createWidget'   : this.createWidget,
    'findWidgetById' : this.findWidgetById,
    'findWidgetsByPageId' : this.findWidgetsByPageId,
    'updateWidget' : this.createPrescription,
    'deleteWidget' : this.deleteWidget
  };

  createPrescription(doctorId: string, prescription: any) {
    console.log(" in create prescription---------------------------------");
    this.FDAUrl = "https://api_basics.fda.gov/drug/event.json?api_key=yourAPIKeyHere&search=product_ndc:"+ "68071-3212" + "&limit=1";
    return this.http.get(this.FDAUrl)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  createWidget(pageId: string, widget: any) {
    console.log(" in create widget--------------------------------------");
    widget.pageId = pageId;
    return this.http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findWidgetById(widgetId: string) {
    return this.http.get(this.baseUrl + '/api/widget/' + widgetId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  findWidgetsByPageId(pageId: string) {
    return this.http.get(this.baseUrl + '/api/page/' + pageId + '/widget')
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateWidget(widgetId: string, widget: any) {
    return this.http.put(this.baseUrl + '/api/widget/' + widgetId, widget)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  deleteWidget(widgetId: string) {
    return this.http.delete(this.baseUrl + '/api/widget/' + widgetId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateWidgetPosition(pageId, initial, final) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget?initial='
      + initial + '&final=' + final;
    return this.http.put(url, null)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

}
