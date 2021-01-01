import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {RxStompConfig} from '@stomp/rx-stomp/esm6';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: RxStompConfig
    },
    {
      provide: RxStompService
      // ,
      // useFactory: rxStompServiceFactory,
      // deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
