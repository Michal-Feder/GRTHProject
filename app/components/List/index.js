
import React, { memo } from 'react';
import PropTypes from 'prop-types';

// Bootstrap
import Table from 'react-bootstrap/Table';

function List(props) {
  return (
    <div className="lst">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>Date</th>
            <th>start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index.date}>
              <td className="text-center" >{index}</td>
              <td>{item.date}</td>
              <td>{item.start}</td>
              <td>{item.end}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
}

List.propTypes = {
  data: PropTypes.any
};

export default memo(List);
