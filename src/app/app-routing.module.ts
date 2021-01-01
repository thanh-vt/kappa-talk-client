import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'features',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'features'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
