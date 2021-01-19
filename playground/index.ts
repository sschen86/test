import adapter from '../src/index';

const nextData = adapter(
  {
    name: 'user',
  },
  {
    name: 'xxxx',
  }
);

console.info({ nextData });
