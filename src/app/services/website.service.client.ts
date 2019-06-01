import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class WebsiteService {

  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;

  // api = {
  //   'createWebsite'   : this.createWebsite,
  //   "findApplicationById" : this.findApplicationById,
  //   'findWebsitesByUser' : this.findWebsitesByUser,
  //   "updateApplication" : this.updateApplication,
  //   "deleteApplication" : this.deleteApplication
  // };

  createApplication(userID: String, website: any) {
    console.log('inside web of website client');
    website.developerId = userID;
    return this.http.post(this.baseUrl + '/api/user/' + userID + '/application', website)
      .map((res: Response) => {
          const data = res.json();
          return data;
        });
  }

  findApplicationById(appId: String) {
    return this.http.get(this.baseUrl + '/api/application/' + appId)
      .map((res: Response) => {
          const data = res.json();
          return data;
        });
  }

  findApplicationsByUser(userId: String) {
    return this.http.get(this.baseUrl + '/api/user/' + userId + '/application')
      .map((res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  updateApplication(appId: String, application: any) {
    console.log('update web of website client');
    return this.http.put(this.baseUrl + '/api/application/' + appId, application)
      .map((res: Response) => {
          const data = res.json();
          return data;
        });
  }

  deleteApplication(appId: String) {
    return this.http.delete(this.baseUrl + '/api/application/' + appId)
      .map((res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }
  addPagesToApplication(appId, page) {
      return this.http.put(this.baseUrl + '/api/application/' + appId + '/page', page)
          .map((res: Response) => {
                  const data = res.json();
                  return data;
              });
  }
  addWidgetsToPage(appId, pid, widget) {
      return this.http.put(this.baseUrl + '/api/application/' + appId + '/page/' + pid + '/widget', widget)
          .map((res: Response) => {
              const data = res.json();
              return data;
          });
  }
  deletePage(appId, pid) {
        return this.http.delete(this.baseUrl + '/api/application/' + appId + '/page/' + pid)
            .map((res: Response) => {
                    const data = res.json();
                    return data;
                });
    }
    updatePage(currPage, appId, pid, page) {
        return this.http.put(this.baseUrl + '/api/application/' + appId + '/currPage/' + currPage + '/page/' + pid, page)
            .map((res: Response) => {
                const data = res.json();
                return data;
            });
    }

    deleteWidget(appId, pid, widget) {
      console.log(widget);
        return this.http.delete(this.baseUrl + '/api/application/' + appId + '/page/' + pid + '/widget/' + widget)
            .map((res: Response) => {
                const data = res.json();
                return data;
            });
    }

    findWidgetByIndex(appId, pid, widgetIndex) {
        return this.http.get(this.baseUrl + '/api/application/' + appId + '/page/' + pid + '/widget/' + widgetIndex)
            .map((res: Response) => {
                return res.json();
            });
    }

    updateWidget(appId, pid, widgetIndex, widget) {
      console.log(widgetIndex);
      console.log(widget);
        return this.http.put(this.baseUrl + '/api/application/' + appId + '/page/' + pid + '/widget/' + widgetIndex, widget)
            .map((res: Response) => {
                const data = res.json();
                return data;
            });
    }

}
