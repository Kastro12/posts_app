export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const objectToQueryString = (obj: { [key: string]: any }): string => {
  const keys = Object.keys(obj);
  const keyValuePairs = keys.map((key) => {
    return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
  });
  return keyValuePairs.join("&");
};

export const linkToParamObject = (link: string) => {
  const params: URLSearchParams = new URLSearchParams(link);
  const paramsObject: { [key: string]: string } = {};

  params.forEach((value, key) => {
    paramsObject[key] = value;
  });

  return paramsObject;
};

export const getUniqueItems = (
  arr: { [key: string]: any }[],
  key: string
): any[] => {
  const uniqueItems: { [key: string]: boolean } = {};
  const result: any[] = [];

  arr.forEach((item) => {
    if (!uniqueItems[item[key]]) {
      uniqueItems[item[key]] = true;
      result.push(item[key]);
    }
  });

  return result;
};
