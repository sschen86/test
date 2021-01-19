import DEFAULT from './default';

const ppid = 0;

class Adapter2 {
  constructor({ strict = DEFAULT.strict, clears = DEFAULT.clears }) {
    // ..

    console.info(888);
  }

  addEnum() {
    // ...
  }
}

export default Adapter;

function Adapter({ strict = DEFAULT.strict, clears = DEFAULT.clears }) {
  const enums = {};
  const emaps = {};
  const formats = {};

  this.addEnum = createAdd(enums);
  this.addEmap = createAdd(emaps);
  this.addFormat = createAdd(formats);
  this.create = createTransform;

  function createTransform(setting) {
    const { $strict = strict, $clears } = setting;
    const $clearsValues = $clears === true ? clears : $clears || [];
    const allRules = {}; // 转化规则集合

    initRules(setting, []);

    let rootData = null;

    return (data) => transform(data);

    // data: 输入的数据， dataIndex：数据下标，dataRow：数据所在记录，rootData：数据所在根数据
    function transform(data, dataIndex?, dataRow?) {
      if (!rootData) {
        rootData = data;
      }
      const dataWrapper = { $data: data };
      walkDatas(data, [], dataIndex, dataWrapper, dataRow);
      return dataWrapper.$data;
    }

    // data: 输入的数据，dataKeys：数据完整的key路径，dataIndex：数据所在下标，dataWrapper：数据容器，dataRow数据所在对象引用
    function walkDatas(data, dataKeys, dataIndex, dataWrapper, dataRow) {
      const rules = allRules[dataKeys];
      if (rules) {
        rules.forEach((rule) =>
          rule.exec(data, dataWrapper, dataIndex, dataRow)
        );
      } else if (!$strict) {
        // 非严格模式，深度遍历，逐条进行数据适配
        let nextData;
        if (!data || typeof data !== 'object' || data instanceof Date) {
          nextData = data;
        } else if (Array.isArray(data)) {
          nextData = [];
          data.forEach((item, i) => {
            walkDatas(item, dataKeys, i, nextData, data);
          });
        } else {
          nextData = {};
          for (const key in data) {
            walkDatas(
              data[key],
              dataKeys.concat(key),
              dataIndex,
              nextData,
              data
            );
          }
        }
        addData(dataWrapper, nextData, dataKeys[dataKeys.length - 1], {
          prevData: data,
        });
      }
    }

    console.info('uuu');
  }
}

// const DEFAULT_STRICT = $strict || DEFAULT.$strict;
// const DEFAULT_CLEARS = $clears || DEFAULT.$clears;
// const enums = {};
// const emaps = {};
// const formats = {};

function createAdd(typeSet) {
  return function addItem(name, value) {
    if (typeof name === 'string') {
      return (typeSet[name] = value);
    }
    if (typeof name === 'object') {
      const items = name;
      for (const name in items) {
        typeSet[name] = items[name];
      }
    }
  };
}

// adapter({
//   $strict: true,
//   $clears: [],
//   ppk: {
//     $key: 'kkk',
//   },
// });
