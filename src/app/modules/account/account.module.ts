import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in';
import { AccountRoutingModule } from './account-routing.module';
import { CoreModule } from '@/core';

@NgModule({
  declarations: [SignInComponent],
  imports: [CoreModule, AccountRoutingModule],
})
export class AccountModule {}
