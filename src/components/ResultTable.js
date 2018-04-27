import React, { Component } from 'react';
import { makeData } from "../utils";

import ReactTable from "react-table";
import 'react-table/react-table.css';

class ResultTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: makeData()
    };
  }

  makeColumns = () => {
    if (this.props.results) {
      const { results } = this.props;
      const data = JSON.parse(results);
      if (data.hits && data.hits.total >= 1) {
        const columns = Object.keys(data.hits.hits[0]._source);
        const headers = columns.map(item => item.split('').map((letter, index) => index === 0 ? letter.toUpperCase() : letter ).join(''))
        const header = [];
        columns.forEach((col, index) => header.push({ Header: headers[index], accessor: col }) );
        return header;
      }
    }
    return ([{ Header: 'N/A' }]);
  };


  makeData = () => {
    if (this.props.results) {
      const { results } = this.props;
      const data = JSON.parse(results);

      if (data.hits && data.hits.total >= 1) {
        return data.hits.hits.map(item => item._source);
      }

    }
    return ([{  }]);
  };

  render() {
    return (
      <div>
        <ReactTable
          columns={this.makeColumns()}
          data={this.makeData()}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default ResultTable;
