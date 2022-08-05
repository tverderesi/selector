function TableDrilldown(data) {
  let drilled_data = [[]];
  for (let row = 0; row < data.length; row++) {
    drilled_data.push([]);
    for (let column = 0; column < 2; column++) {
      drilled_data[row].push(data[row].children[column].outerText);
    }
  }
  return drilled_data;
}

export { TableDrilldown };
