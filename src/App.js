import React, { Component } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Input, Button } from 'reactstrap';
import classnames from 'classnames';
import './App.css';

import ResultTable from './components/ResultTable';
import QueryEditor from './components/QueryEditor';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Container>
          <header className="App-header">
            <h1 className="App-title">Elastic Search Query Tool</h1>
          </header>

          <Row>
            <Col sm="12">
              <QueryEditor />
              <div className="text-left">
                <Button className="mt-1 mb-3" color="success">Query</Button>
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

// const App = () => <div>booo</div>;
export default App;
