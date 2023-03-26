export function AutoUpdate(data1: Object, data2: Object): Object {
	const test = Object.assign(data1, data2);

	/* Object.entries(data1)
		.filter((data) => listKey.includes(data[0]))
		.map((elm, i) => {
			(elm[1] = ['123']), console.log(elm);
		});*/

	return test;
}
