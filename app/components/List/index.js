
import React, { memo } from 'react';
import PropTypes from 'prop-types';

//Bootstrap
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
          {props.data.map((item, index) => {
            return (
              <tr>
                <td className="text-center" key={index}>{index}</td>
                <td key={item.date}>{item.date}</td>
                <td key={item.start}>{item.start}</td>
                <td key={item.end}>{item.end}</td>
              </tr>
            );
          })}

        </tbody>
      </Table>

    </div>
  );
}

List.propTypes = {
  data: PropTypes.any
};

export default memo(List);
