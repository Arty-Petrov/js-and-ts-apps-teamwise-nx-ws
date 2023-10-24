import { User } from '@service/shared-types';
import { updatedDiff } from 'deep-object-diff';

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

  getUpdatedFields(user: Partial<User>): Partial<User> {
    const oldUser = {...this};
    const newUser = {...user};
    return {...updatedDiff(oldUser, newUser)} as unknown as Partial<User>;
  }

  fillEntity(entity: User): void {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.dateBirth = entity.dateBirth;
    this.isAdmin = entity.isAdmin;
  }
}
