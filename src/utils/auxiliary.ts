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
