import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsRoutingModule } from './students-routing.module';
import { CoreModule } from '@/core';
import { SharedModule } from '@/@shared/shared.module';

@NgModule({
  declarations: [StudentsComponent, StudentDetailsComponent],
  imports: [CoreModule, SharedModule, StudentsRoutingModule],
})
export class StudentsModule {}
