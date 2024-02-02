import { UserContext } from '@/core/services/user-context.service';
import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public data: UserContext[] = [];

  constructor() {
    this.resolveData();
    console.log(this.data);
  }

  private resolveData() {
    for (let i = 0; i < 25; i++) {
      this.data.push({
        _id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        birthDate: faker.date.birthdate(),
        email: faker.internet.email(),
        giveName: faker.person.firstName(),
        surname: faker.person.lastName(),
        jobTitle: faker.person.jobTitle(),
        subscription: faker.helpers.arrayElement([
          'free',
          'basic',
          'premium',
          'enterprise',
        ]),
      } as UserContext);
    }
  }
}
