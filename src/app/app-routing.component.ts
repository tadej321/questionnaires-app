import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DesktopComponent} from './desktop/desktop.component';
import {AuthGuard} from './authentication/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'desktop',
    loadChildren: () => import('./desktop/desktop.module').then(m => m.DesktopModule),
    component: DesktopComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'desktop/list',
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
