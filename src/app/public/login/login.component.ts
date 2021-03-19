import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AUTH_ACTIONS} from '../../store/auth/auth.actions';
import {RootState} from '../../store';
import {LoginPayload} from '../model/login-payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });

  constructor(private fb: FormBuilder, private store: Store<RootState>) {
  }

  ngOnInit(): void {
  }

  login(): void {
    const payload: LoginPayload = this.loginForm.value;
    this.store.dispatch(AUTH_ACTIONS.login(payload));
  }

}
