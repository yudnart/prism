import { NgModule } from '@angular/core';
import { CoreModule } from '@/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CoreModule, DashboardRoutingModule],
})
export class DashboardModule {}
