import { Entity } from '@shared/entity/entity';

export interface Author extends Entity {
  firstName: string;
  lastName: string;
  birthDate: string;
}
