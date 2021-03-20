import {createAction} from '@ngrx/store';

export const UTIL_ACTION = {

  pingServices: createAction<any>(
    '[UTIL] PingService'
  ),

  pingServicesSuccess: createAction<any>(
    '[UTIL] PingServiceSuccess'
  ),

  pingServicesFailed: createAction<any>(
    '[UTIL] PingServiceFailed'
  )
};
