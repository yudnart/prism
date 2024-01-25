import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@/modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('@/modules/account/account.module').then(m => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
