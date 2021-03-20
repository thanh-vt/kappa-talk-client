import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootState} from './store';
import {UTIL_ACTION} from './store/util/util.action';
import {selectUtil} from './store/util/util.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  util$ = this.store.select(selectUtil);

  constructor(private store: Store<RootState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(UTIL_ACTION.pingServices());
  }



}
