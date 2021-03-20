import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  getOnlineUsers(): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}/users/online`);
  }

  getChatInfo(fromUser: string, toUser: string): Observable<ChatInfoModel> {
    return this.http.get(`${environment.apiEndpoint}/chat-info?from=${fromUser}&to=${toUser}`) as Observable<ChatInfoModel>;
  }
}
