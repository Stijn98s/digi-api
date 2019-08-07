export function extractFilterVals(value: any): any {
  if (!value) {
    return {};
  }
  const obj = {};
  value.match(/(?:\\,|[^,])+/g).map(el => {
    return el.match(/(?:\\:|[^:])+/g);
  }).forEach(element => {
    obj[element[0]] = element[1];
  });
  return obj;
}

export function extractIncludeVals(value: any): any {
  if (!value) {
    return [];
  }
  return value.match(/(?:\\,|[^,])+/g);
}
