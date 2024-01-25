import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@/core';
import { UsersComponent } from './users.component';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {
      parentId: 'users',
      title: 'Users',
      icon: 'heroUsersSolid',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(USERS_ROUTES)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
