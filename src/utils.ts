export const concatClassName = (cl: any[]) => {
  return cl.filter(c => typeof c === 'string').join(' ')
}

export const deepCopy = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.reduce((arr, item, i) => {
      arr[i] = deepCopy(item);
      return arr;
    }, []);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((newObj: any, key) => {
      newObj[key] = deepCopy(obj[key]);
      return newObj;
    }, {})
  }
}

export const emptyArrayFromSize = (size: number) => Array(size).fill(false).map(() => Array(size).fill(false))