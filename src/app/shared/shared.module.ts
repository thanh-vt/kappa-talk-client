import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollToBottomDirective} from './directive/scroll-to-bottom.directive';
import {LoadingComponent} from './component/loading/loading.component';
import {AuthService} from './service/auth.service';
import {OverlayModule} from '@angular/cdk/overlay';
import {LoadingService} from './service/loading.service';
import {UtilService} from './service/util.service';

@NgModule({
  declarations: [
    LoadingComponent,
    ScrollToBottomDirective
  ],
  exports: [
    ScrollToBottomDirective
  ],
  imports: [
    CommonModule, OverlayModule
  ],
  providers: [AuthService, LoadingService, UtilService]
})
export class SharedModule {
}
