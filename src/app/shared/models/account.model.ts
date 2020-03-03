// import { Domain } from './domain.model';

export interface Account {
  id?: string;
  uid?: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  age?: number;
  city?: string;
  address?: string;
  state?: string;
  creationDate?: Date;
  modificationDate?: Date;
}
