import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingRoutingModule} from './setting-routing.module';
import {StoreModule} from '@ngrx/store';
import {settingFeatureKey} from '../store/setting/setting.state';
import {settingReducer} from '../store/setting/setting.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SettingRoutingModule,
    StoreModule.forFeature(settingFeatureKey, settingReducer)
  ]
})
export class SettingModule {
}
