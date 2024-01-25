import { NgModule } from '@angular/core';
import { CoreModule } from '@/core/core.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '@/modules/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CoreModule, DashboardRoutingModule],
})
export class DashboardModule {}
