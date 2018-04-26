import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AceEditor from 'react-ace';

import { req } from '../utils';

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

class QueryEditor extends Component { 

  constructor(props) {
    super(props);
    
    this.state = {
      value: defaultValue,
    };
  }

  onChange = (newValue) => {


    this.setState({ value: newValue });


  }

  runQuery = (e) => {
    e.preventDefault();
    // console.log(this.state.value);

    const esUrl = process.env.REACT_APP_ES_URL;
    const index = process.env.REACT_APP_ES_INDEX;
    const key = process.env.REACT_APP_ES_SECRET_KEY;
    const collection = 'presentation';

    // const { REACT_APP_ES_URL, REACT_APP_ES_INDEX, REACT_APP_ES_SECRET_KEY } = process.env;
    // console.log('??', REACT_APP_ES_URL, REACT_APP_ES_INDEX, REACT_APP_ES_SECRET_KEY);
    // console.log(esUrl, index, key, collection);

    const searchObj = this.state.value;

    const queryObj = { query: { constant_score: { filter: { term: searchObj } } } };

    return req({
      method: 'GET',
      url: `${esUrl}/${index}/${collection}/_search`,
      body: JSON.stringify(queryObj)
      // ,
      // headers: {
      //   SECRET_KEY: key
      // }
    }).then(res => {
      if (res.statusCode !== 200) return null;

      // console.log(JSON.stringify(res.body, null, 2));

      return JSON.parse(res.body);
    }).then(body => {

      alert(JSON.stringify(body, null, 2));

      if (!body) return null;
      if (body.hits.total === 0) return null;

      // console.log(JSON.stringify(body, null, 2));

      return body;
    });




    // req()
    // .then(data => console.log(data));

  }; 

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="solarized_dark"
          onChange={this.onChange}

          // onChange={this.props.onChange}

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
          <Button onClick={this.runQuery} className="mt-1 mb-3" color="success">Run Query</Button>
        </div>
      </div>
    );

  }

}

export default QueryEditor;
