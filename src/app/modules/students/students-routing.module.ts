import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@/core';
import { StudentsComponent } from './students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

export const STUDENTS_ROUTES: Routes = [
  {
    path: '',
    component: StudentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '{studentId}',
    component: StudentDetailsComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(STUDENTS_ROUTES)],
})
export class StudentsRoutingModule {}
