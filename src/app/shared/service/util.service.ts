import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {forkJoin, Observable} from 'rxjs';

@Injectable()
export class UtilService {

  constructor(private http: HttpClient) {
  }

  pingServices(): Observable<any> {
    const request: Observable<any>[] = [
      this.http.head(`${environment.apiEndpoint}/util/ping`),
      this.http.head(`${environment.authEndpoint}/api/util/ping`)
    ];
    return forkJoin(request);
  }
}
