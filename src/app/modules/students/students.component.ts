import { Student } from '@/@shared/services/students/student';
import { StudentsService } from '@/@shared/services/students/students.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  private readonly _studentSubject = new BehaviorSubject<Student[]>([]);
  public readonly students$ = this._studentSubject.asObservable();

  constructor(private readonly _studentsService: StudentsService) {
    // Intentionally blank
  }

  ngOnInit(): void {
    this.loadData();
  }
  private async loadData() {
    const data = await this._studentsService.find();
    this._studentSubject.next(data);
  }
}
