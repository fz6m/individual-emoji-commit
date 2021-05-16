
export const typeOf = (obj: any) => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

export const TYPE = {
    string: 'String',
    object: 'Object',
    array: 'Array'
};

export const isString = (v: any): v is string => typeOf(v) === TYPE.string;

export const isObject = (v: any): v is object => typeOf(v) === TYPE.object;

export const isArray = (v: any): v is any[] => typeOf(v) === TYPE.array;
