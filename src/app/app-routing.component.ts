import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {DesktopComponent} from './desktop/desktop.component';
import {AuthGuard} from './authentication/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'desktop/list',
    pathMatch: 'full'
  },
  {
    path: 'desktop',
    loadChildren: () => import('./desktop/desktop.module').then(m => m.DesktopModule),
    component: DesktopComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
