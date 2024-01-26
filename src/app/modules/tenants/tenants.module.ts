import { NgModule } from '@angular/core';
import { TenantsComponent } from './tenants.component';
import { CoreModule } from '@/core/core.module';
import { TenantsRoutingModule } from './tenants-routing.module';

@NgModule({
  declarations: [TenantsComponent],
  imports: [CoreModule, TenantsRoutingModule],
})
export class TenantsModule {}
