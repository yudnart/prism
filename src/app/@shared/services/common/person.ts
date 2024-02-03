import { PostalAddress } from './postal-address';

export type Person = {
  id: string;
  givenName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address: PostalAddress;
};
