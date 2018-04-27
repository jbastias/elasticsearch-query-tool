import React, { Component } from 'react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Form, Input, Button } from 'reactstrap';
import classnames from 'classnames';
import './App.css';

import ResultTable from './components/ResultTable';
// import QueryEditor from './components/QueryEditor';

import AceEditor from 'react-ace';

import { req } from './utils';

import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

const defaultValue =
`
{ 
  "query": { 
    "constant_score": { 
      "filter": { 
        "term": {
          "objectId": "004h3esPX3"
        }
      } 
    } 
  } 
}
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      value: defaultValue,
      results: null,
      collection: 'presentation'
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  onChange = (newValue) => {
    // console.log('change: ', newValue);
    this.setState({ value: newValue });
  }

  updateResults = () => {
    if (this.state.results) {
      return JSON.stringify(this.state.results, null, 2);
    }
    return '';
  };

  updateCollection = (e) => {
    // console.log('val: ', e.target.value);
    this.setState({ collection: e.target.value });
  };

  runQuery = (e) => {
    e.preventDefault();
    const esUrl = process.env.REACT_APP_ES_URL;
    const index = process.env.REACT_APP_ES_INDEX;
    const collection = this.state.collection;
    const searchObj = this.state.value;

    return req({
      method: 'POST',
      url: `${esUrl}/${index}/${collection}/_search`,
      body: searchObj,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.statusCode !== 200) return null;
      // console.log(res.body);
      return JSON.parse(res.body);
    }).then(body => {
      // alert(JSON.stringify(body, null, 2));
      if (!body) return null;
      if (body.hits.total === 0) return null;
      this.setState({ results: body });
      return body;
    });

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
              {/* <QueryEditor onChange={this.onChangeContent} updateCode={this.updateCode} /> */}
              <AceEditor
                mode="javascript"
                theme="solarized_dark"
                onChange={this.onChange}
                value={this.state.value}
                editorProps={{$blockScrolling: Infinity}}
                width="100%"
                height="250px"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: false,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
              <div className="text-left">
                <Form className="form-inline" width="100%" size="lg">
                  <Button onClick={this.runQuery} className="mt-1 mb-3" color="success">Run Query</Button>
                  <Input defaultValue="presentation" onChange={this.updateCollection} className="ml-3" type="select" name="select" id="exampleSelect">
                    <option>cancellation</option>
                    <option>collaborator</option>
                    <option>coupon</option>
                    <option>download-request</option>
                    <option>formula</option>
                    <option>palette</option>
                    <option>presentation-request</option>
                    <option>presentation</option>
                    <option>team</option>
                    <option>user</option>
                    <option>slide</option>
                  </Input>
                </Form>
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
                    <Input value={this.updateResults()} rows="25"  type="textarea" name="text" id="exampleText" />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <ResultTable results={this.updateResults()} />
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
