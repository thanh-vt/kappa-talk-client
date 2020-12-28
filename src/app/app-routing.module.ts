import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'chat-client',
    loadChildren: () => import('./chat-module/chat-module.module').then(m => m.ChatModuleModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat-client'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
