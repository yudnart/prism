import { Person } from '../common/Person';

type StudentProfile = {
  lastEnrolledDate: Date;
  enrollmentStatus: 'Enrolled' | 'Suspended' | 'Inactive';
};

type Course = {
  courseId: string;
  enrolledDate: Date;
  startDate: Date;
  endDate: Date;
  title: string;
  status: 'Passed' | 'Failed' | 'Incomplete';
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
};

export type Student = Person & {
  profile: StudentProfile;
  courses: Course[];
};
