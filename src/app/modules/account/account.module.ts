import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in';
import { AccountRoutingModule } from './account-routing.module';
import { CoreModule, LayoutModule } from '@/core';

@NgModule({
  declarations: [SignInComponent],
  imports: [CoreModule, LayoutModule, AccountRoutingModule],
})
export class AccountModule {}
