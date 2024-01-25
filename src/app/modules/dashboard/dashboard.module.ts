import { NgModule } from '@angular/core';
import { CoreModule } from '@/core/core.module';
import { DashboardComponent } from '@/modules/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CoreModule, DashboardRoutingModule],
})
export class DashboardModule {}
