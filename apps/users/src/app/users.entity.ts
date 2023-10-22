import { User } from '@service/shared-types';

export default class UserEntity {
  id?: string;
  name: string;
  email: string;
  dateBirth: Date;
  isAdmin: boolean;

  constructor(entity: User) {
    this.fillEntity(entity);
  }

  toObject(): UserEntity {
    return {...this};
  }

  fillEntity(entity: User): void {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.dateBirth = entity.dateBirth;
    this.isAdmin = entity.isAdmin;
  }
}
