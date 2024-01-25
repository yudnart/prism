import { NgModule } from '@angular/core';
import { CoreModule } from '@/core/core.module';
import { UserRoutingModule } from '@/modules/users/users-routing.module';
import { UsersComponent } from '@/modules/users/users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CoreModule, UserRoutingModule],
})
export class UsersModule {}
