import React, { Component } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Input, Button } from 'reactstrap';
import classnames from 'classnames';
import './App.css';

import ResultTable from './components/ResultTable';
import QueryEditor from './components/QueryEditor';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      value: null,
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  onChangeContent = (newValue) => {
    console.log('change: ', newValue);
    this.setState({ value: newValue });
  }

  seeState = () => {
    alert(this.state.value);

    this.setState({ value: { a: "B" } });

  };

  runQuery = (e) => {
    e.preventDefault();
    // console.log(this.state.value);

    alert(JSON.stringify(this.state.value, null, 2));


    // const esUrl = process.env.REACT_APP_ES_URL;
    // const index = process.env.REACT_APP_ES_INDEX;
    // const key = process.env.REACT_APP_ES_SECRET_KEY;
    // const collection = 'presentation';

    // // const { REACT_APP_ES_URL, REACT_APP_ES_INDEX, REACT_APP_ES_SECRET_KEY } = process.env;
    // // console.log('??', REACT_APP_ES_URL, REACT_APP_ES_INDEX, REACT_APP_ES_SECRET_KEY);
    // // console.log(esUrl, index, key, collection);

    // const searchObj = this.state.value;

    // const queryObj = { query: { constant_score: { filter: { term: searchObj } } } };

    // return req({
    //   method: 'GET',
    //   url: `${esUrl}/${index}/${collection}/_search`,
    //   body: JSON.stringify(queryObj)
    //   // ,
    //   // headers: {
    //   //   SECRET_KEY: key
    //   // }
    // }).then(res => {
    //   if (res.statusCode !== 200) return null;

    //   // console.log(JSON.stringify(res.body, null, 2));

    //   return JSON.parse(res.body);
    // }).then(body => {

    //   alert(JSON.stringify(body, null, 2));

    //   if (!body) return null;
    //   if (body.hits.total === 0) return null;

    //   // console.log(JSON.stringify(body, null, 2));

    //   return body;
    // });




    // req()
    // .then(data => console.log(data));

  }; 



  render() {
    return (
      <div className="App">
        <Container>
          <header className="App-header mt-1">
            <h1 className="App-title">Elastic Search Query Tool</h1>
          </header>

          <Row>
            <Col sm="12">
              <QueryEditor onChange={this.onChangeContent} updateCode={this.updateCode} />
              <div className="text-left">
                <Button onClick={this.runQuery} className="mt-1 mb-3" color="success">Run Query</Button>
                <Button onClick={this.seeState} className="mt-1 mb-3" color="danger">See State</Button>
                
              </div>
            </Col>
          </Row>

           <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Results
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Results Table
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Results</h4>
                    <Input type="textarea" name="text" id="exampleText" />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <h4>Results Table</h4>
                    <ResultTable />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>


        </Container>
      </div>
    );
  }
}

export default App;
