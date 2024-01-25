import { NgModule } from '@angular/core';
import { CoreModule } from '@/core/core.module';
import { SignInComponent } from '@/modules/account/sign-in/sign-in.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [SignInComponent],
  imports: [CoreModule, AccountRoutingModule],
})
export class AccountModule {}
