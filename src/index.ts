// import Adapter from './Adapter';

// const globalAdapter = new Adapter({});

// function adapter(setting, data) {
//   const adp = globalAdapter.create(setting);
//   if (arguments.length === 1) {
//     return adp;
//   }
//   return adp(data);
// }

// adapter.addEnum = globalAdapter.addEnum;
// adapter.addEmap = globalAdapter.addEmap;
// adapter.addFormat = globalAdapter.addFormat;

// export default adapter;
// export { Adapter };
import createRules from './createRules';

createRules(
  {
    user: 'name',
    sex: { $enum: ['先生', '女士', '保密'] },
    age: Number,
    books: {
      name: true,
      type: { $emap: { m1: '武侠小说', m2: '神话小说', m3: '历史小说' } },
      price: { $default: '未知', $value: (value) => `￥${value.toFixed(2)}` },
    },
    address: (value) => value.join(''),
  },
  {}
);
