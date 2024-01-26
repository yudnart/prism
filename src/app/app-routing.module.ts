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
    path: 'tenants',
    data: {
      id: 'tenants',
      title: 'Tenants',
      icon: 'heroSquare3Stack3dSolid',
    },
    loadChildren: () => import('@/modules/tenants').then(m => m.TenantsModule),
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
