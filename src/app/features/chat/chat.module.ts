import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatRoutingModule} from './chat-routing.module';
import {ChatContainerComponent} from './chat-container/chat-container.component';
import {ChatProfileComponent} from './chat-profile/chat-profile.component';
import {ChatContentComponent} from './chat-content/chat-content.component';
import {ChatPanelComponent} from './chat-panel/chat-panel.component';
import {ChatListComponent} from './chat-list/chat-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {chatFeatureKey} from '../store/chat/chat.state';
import {chatReducer} from '../store/chat/chat.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ChatEffects} from '../store/chat/chat.effects';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {ChatService} from './service/chat.service';
import {SocketClientService} from './service/socket-client.service';

@NgModule({
  declarations: [
    ChatContainerComponent,
    ChatProfileComponent,
    ChatContentComponent,
    ChatPanelComponent,
    ChatListComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(chatFeatureKey, chatReducer),
    EffectsModule.forFeature([ChatEffects]),
    NgbDropdownModule
  ],
  providers: [
    ChatService,
    SocketClientService
  ]
})
export class ChatModule {
}
