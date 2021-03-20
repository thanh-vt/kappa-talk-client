import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {UtilService} from '../../shared/service/util.service';
import {UTIL_ACTION} from './util.action';

@Injectable({
  providedIn: 'root'
})
export class UtilEffect {

  @Effect({dispatch: true, useEffectsErrorHandler: true})
  pingService$ = this.actions$.pipe(
    ofType(UTIL_ACTION.pingServices),
    mergeMap(() => this.utilService.pingServices()
      .pipe(
        map(() => {
          console.log('Ping services successfully!');
          return UTIL_ACTION.pingServicesSuccess();
        }),
        catchError(() => {
          console.log('Ping services failed!');
          return of(UTIL_ACTION.pingServicesFailed());
        })
      ))
  );

  constructor(private actions$: Actions, private utilService: UtilService) { }
}
