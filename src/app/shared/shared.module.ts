import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScrollToBottomDirective} from './directive/scroll-to-bottom.directive';


@NgModule({
  declarations: [
    ScrollToBottomDirective],
  exports: [
    ScrollToBottomDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
