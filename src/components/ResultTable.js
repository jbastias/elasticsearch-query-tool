import React, { Component } from 'react';
import { makeData } from "../utils";

import ReactTable from "react-table";
import 'react-table/react-table.css';


class ResultTable extends Component {

  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }

  render() {

    const { data } = this.state;

    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                },
                {
                  Header: "Status",
                  accessor: "status"
                }
              ]
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>




    );
  }
}

export default ResultTable;
