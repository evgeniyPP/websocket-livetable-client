import { LiveTableActionType } from '../../../utils/constants';

export function updateLiveTable(prevTable, actions) {
  return actions.reduce((table, action) => {
    switch (action.type) {
      case LiveTableActionType.Data:
        return action.data;
      case LiveTableActionType.Insert:
        return insertData(table, action);
      case LiveTableActionType.Delete:
        return deleteData(table, action);
      case LiveTableActionType.Update:
        return updateData(table, action);
      case LiveTableActionType.Move:
        return moveData(table, action);
      default:
        return table;
    }
  }, prevTable);
}

function insertData(table, action) {
  return [...table.slice(0, action.data.pos), ...action.data.rows, ...table.slice(action.data.pos)];
}

function deleteData(table, action) {
  return table.filter(({ id }) => !action.data.includes(id));
}

function updateData(table, action) {
  return table.map(row => {
    const index = action.data.findIndex(updatedRow => updatedRow.id === row.id);

    if (index !== -1) {
      return action.data[index];
    }

    return row;
  });
}

function moveData(table, action) {
  table = [...table];

  action.data.forEach(move => {
    table.splice(move.to, 0, table.splice(move.from, 1)[0]);
  });

  return table;
}
