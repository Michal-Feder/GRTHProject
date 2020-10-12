
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Table from 'react-bootstrap/Table';
import messages from './messages';
import './style.scss';

function List(props) {
  // if(props)
  //   throw new Error("error in list component");
  return (
    <div className="list">
      <div className="lst">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th></th>
              <th>
                <FormattedMessage {...messages.th_1} />
              </th>
              <th>   
                <FormattedMessage {...messages.th_2} />
              </th>
              <th> 
                <FormattedMessage {...messages.th_3} />
              </th>
            </tr>
          </thead>
          <tbody>
            {props.data && props.data.map((item, index) => (
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
    </div>
  );
}

List.propTypes = {
  data: PropTypes.any
};

export default memo(List);
