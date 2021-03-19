import {Injectable, OnDestroy} from '@angular/core';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment';
import {Observable, Subject, Subscription} from 'rxjs';
import {Client, CompatClient, Message} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService implements OnDestroy{
  private client: CompatClient;
  private clientNew: Client;
  private connectionStatus: Subject<any> = new Subject();
  private subscription: Subscription = new Subscription();

  constructor() {
  }

  public init(username: string, token: string): Observable<any> {
    // this.client = Stomp.over(() => new SockJS(`${environment.wsEndpoint}?access_token=${token}`));
    // this.client.connect({login: username, passcode: token}, () =>   {
    //   this.connectionStatus.next();
    // }, error => {
    //   console.error(error);
    //   this.connectionStatus.error(error);
    // });
    this.clientNew = new Client({
      reconnectDelay: 0,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 0,
      webSocketFactory: () => new SockJS(`${environment.wsEndpoint}?access_token=${token}`),
      debug: (str) => {
        // if (str.includes('PING') || str.includes('PONG') || str.includes('Received data')) {
        //   //
        // } else {
          console.log(str);
        // }

      }
    });
    this.clientNew.activate();
    this.clientNew.onConnect = (frame) => {
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      if (this.clientNew.connected) {
        // console.log(frame);
        this.connectionStatus.next();
      }
    };
    this.clientNew.onStompError = (frame) => {
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      // console.log(frame);
      this.connectionStatus.error(frame.body);
    };
    return this.connectionStatus;
  }

  public watch(queue: string, callbackFn?: (message: Message) => any, headers?: any) {
    // this.subscription.add(this.client.subscribe(queue, callbackFn, headers));
    this.subscription.add(this.clientNew.subscribe(queue, callbackFn, headers));
  }

  public send(destination: string, message: string): void {
    // this.client.send(destination, {}, message);
    this.clientNew.publish({destination, headers: {}, body: message});
  }

  public close(): void {
    // if (this.client && this.client.connected) {
    //   this.client.disconnect(null);
    //   this.subscription.unsubscribe();
    // }
    if (this.clientNew && this.clientNew.connected) {
      this.clientNew.deactivate()
      .then(r => console.log(r))
      .catch(e => console.error(e));
    }
  }

  public forceClose(): void {
    // if (this.client && this.client.connected) {
    //   this.client.disconnect(null);
    //   this.subscription.unsubscribe();
    // }
    if (this.clientNew && this.clientNew.connected) {
      this.clientNew.forceDisconnect();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
