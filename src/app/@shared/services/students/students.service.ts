import { faker } from '@faker-js/faker';
import { Student } from './student';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly _students: Student[] = [];

  constructor() {
    this.initializeData();
  }

  public find(skip = 0, take = 25) {
    return Promise.resolve(this._students.slice(skip, skip + take));
  }

  private initializeData() {
    for (let i = 0; i < 1000; i++) {
      this._students.push({
        id: faker.string.uuid(),
        givenName: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        dateOfBirth: faker.date.birthdate(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country(),
        },
      } as Student);
    }
  }
}
