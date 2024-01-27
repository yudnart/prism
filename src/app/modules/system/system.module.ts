import { NgModule } from '@angular/core';
import { CoreModule } from '@/core';
import { SystemRoutingModule } from './system-routing.module';
import { IdentityComponent } from './identity/identity.component';
import { TenantsComponent } from './tenants/tenants.component';

@NgModule({
  declarations: [IdentityComponent, TenantsComponent],
  imports: [CoreModule, SystemRoutingModule],
})
export class SystemModule {}
