import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@/core';
import { TenantsComponent } from './tenants/tenants.component';
import { IdentityComponent } from './identity/identity.component';

export const SYSTEM_ROUTES: Routes = [
  {
    path: 'tenants',
    component: TenantsComponent,
    canActivate: [AuthGuard],
    data: {
      parentId: 'system',
      id: 'tenants',
      title: 'Tenants',
      iconRef: 'heroSquare3Stack3dSolid',
    },
  },
  {
    path: 'identity',
    component: IdentityComponent,
    canActivate: [AuthGuard],
    data: {
      parentId: 'system',
      id: 'identity',
      title: 'Identity',
      iconRef: 'heroUserGroupSolid',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(SYSTEM_ROUTES)],
})
export class SystemRoutingModule {}
