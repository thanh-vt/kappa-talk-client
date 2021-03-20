import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadingOverlayRef, LoadingService} from '../service/loading.service';
import {finalize} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loadingRef: LoadingOverlayRef;
    Promise.resolve(null).then(() => loadingRef = this.loadingService.open());
    return next.handle(req).pipe(
      finalize(() => {
        if (loadingRef) {
          loadingRef.close();
        }
      })
    );
  }

}
