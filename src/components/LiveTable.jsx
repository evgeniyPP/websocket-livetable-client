const LiveTable = props => {
  return (
    <table className="live-table">
      <thead>
        <tr>
          <th className="live-table__cell live-table__cell_column_id">id</th>
          <th className="live-table__cell">text</th>
        </tr>
      </thead>
      <tbody>
        {props.table.map(row => (
          <tr key={row.id.toString()}>
            <td className="live-table__cell live-table__cell_column_id">{row.id}</td>
            <td className="live-table__cell">{row.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LiveTable;
