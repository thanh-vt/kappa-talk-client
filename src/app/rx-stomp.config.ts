import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';
import {RxStompConfig} from '@stomp/rx-stomp/esm6';
import {environment} from '../environments/environment';

export function socketProvider() {
  return new SockJS(environment.wsEndpoint);
}

export const defaultRxStompConfig: InjectableRxStompConfig = {
  // Which server?
  webSocketFactory: socketProvider, // use with SockJS (http-upgrade)

  // brokerURL: 'ws://localhost:8080/vengeance/ws', // use with pure websocket

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnectDelay: 5000,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: str => {
    console.log(new Date(), str);
  },
};

export function initConfig(username: string): RxStompConfig {
  return {
    webSocketFactory: socketProvider,
    connectHeaders: {
      login: username,
      passcode: username,
    },
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 5000,
    debug: str => {
      console.log(new Date(), str);
    },
  };
}


