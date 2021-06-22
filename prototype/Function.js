export class ProxyFn {
  constructor(p) {
    return new Proxy(p, {
      get(target, propKey) {
        switch (propKey) {
          case 'delay':
            return function (timer, ...params) {
              setTimeout(() => {
                target.call(target, ...params);
              }, timer || 300);
            };
          default:
            return Reflect.get(target);
        }
      },
      set(target, propKey, value) {
        return Reflect.set(target, propKey, value);
      },
    });
  }
}

