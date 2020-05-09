import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DesktopComponent} from './desktop/desktop.component';
import {AuthGuard} from './authentication/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'desktop',
    loadChildren: () => import('./desktop/desktop.module').then(m => m.DesktopModule),
    component: DesktopComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
