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
      import('@/modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  {
    path: 'users',
    data: {
      id: 'users',
      title: 'Users',
      icon: 'heroUsersSolid',
    },
    loadChildren: () =>
      import('@/modules/users/users.module').then(m => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
