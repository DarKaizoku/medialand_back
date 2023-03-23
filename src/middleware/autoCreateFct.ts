export function AutoCreate(data2: Object): Object {
  const DATA = Object.create(data2);

  //let longueurListKey = Object.entries(data2).length;

  const listKey = Object.keys(data2);
  const listValue = Object.values(data2);

  Object.entries(data2).map((data, i) => (DATA[listKey[i]] = listValue[i]));

  //Object.entries(data2).map((data,i) => DATA[data[0][i]] = data[1][i])

  return DATA;
}
