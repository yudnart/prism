import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(ACCOUNT_ROUTES)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
