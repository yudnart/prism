import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'heroChartBarSolid',
    },
    loadChildren: () =>
      import('@/modules/dashboard').then(m => m.DashboardModule),
  },
  {
    path: 'users',
    data: {
      id: 'users',
      title: 'Users',
      icon: 'heroUsersSolid',
    },
    loadChildren: () => import('@/modules/users').then(m => m.UsersModule),
  },
  {
    path: 'account',
    loadChildren: () => import('@/modules/account').then(m => m.AccountModule),
  },
  {
    path: 'system',
    loadChildren: () => import('@/modules/system').then(m => m.SystemModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
