import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [AccountRoutingModule],
})
export class AccountModule {}
