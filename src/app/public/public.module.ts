import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {LoginComponent} from './login/login.component';
import {PublicComponent} from './public.component';
import {ErrorComponent} from './error/error.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {AuthService} from './service/auth.service';


@NgModule({
  declarations: [LoginComponent, PublicComponent, ErrorComponent, AccessDeniedComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ],
  providers: [AuthService]
})
export class PublicModule {
}
