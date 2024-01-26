import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantsComponent } from './tenants.component';

export const TENANTS_ROUTES: Routes = [
  {
    path: '',
    component: TenantsComponent,
    data: {
      parentId: 'tenants',
      title: 'Tenants',
      icon: 'heroChartBarSolid',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(TENANTS_ROUTES)],
  exports: [RouterModule],
})
export class TenantsRoutingModule {}
