import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { studentIcon } from './@shared/icons/student.icon';

const routes: Routes = [
  {
    path: '',
    data: {
      id: 'dashboard',
      title: 'Dashboard',
      iconRef: 'heroChartBarSolid',
    },
    loadChildren: () =>
      import('@/modules/dashboard').then(m => m.DashboardModule),
  },
  {
    path: 'students',
    data: {
      id: 'students',
      title: 'Students',
      icon: studentIcon,
    },
    loadChildren: () =>
      import('@/modules/students').then(m => m.StudentsModule),
  },
  {
    path: 'users',
    data: {
      id: 'users',
      title: 'Users',
      iconRef: 'heroUsersSolid',
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
