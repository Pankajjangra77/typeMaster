import faker from 'faker';

export const generate = (count = 15) => {
  return new Array(count)
    .fill()
    .map(_ => faker.random.word())
    .join(' ');
};