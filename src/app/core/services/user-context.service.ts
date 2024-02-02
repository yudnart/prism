import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';

@Injectable({ providedIn: 'root' })
export class UserContextService {
  private _user!: UserContext;
  public get user(): UserContext {
    if (!this._user) {
      this._user = this.resolveUserContext();
    }
    return this._user;
  }

  private resolveUserContext(): UserContext {
    return {
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
    } as UserContext;
  }
}

export type UserContext = {
  _id: string;
  avatar: string;
  birthDate: Date;
  email: string;
  giveName: string;
  surname: string;
  jobTitle: string;
  subscription: string;
};
