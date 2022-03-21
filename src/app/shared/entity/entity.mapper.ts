import { Entity } from './entity';

export function toDictionary<T extends Entity>(
  entities: T[]
): Record<number, T> {
  return entities.reduce(
    (dictionary, entity) => ({ ...dictionary, [entity.id]: entity }),
    {}
  );
}
