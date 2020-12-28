import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatModuleRoutingModule} from './chat-module-routing.module';
import {ChatContainerComponent} from './chat-container/chat-container.component';
import {ChatProfileComponent} from './chat-profile/chat-profile.component';
import {ChatContentComponent} from './chat-content/chat-content.component';
import {ChatPanelComponent} from './chat-panel/chat-panel.component';
import {ChatListComponent} from './chat-list/chat-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

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
    ChatModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ChatModuleModule {
}
