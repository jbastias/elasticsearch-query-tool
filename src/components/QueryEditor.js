import React, { Component } from 'react';
// import brace from 'brace';
import AceEditor from 'react-ace';

// import 'brace/mode/json';
import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

function onChange(newValue) {
  console.log('change',newValue);
}

class QueryEditor extends Component { 

  render() {
    return (
      <AceEditor

        mode="javascript"
        theme="solarized_dark"
        onChange={onChange}
        editorProps={{$blockScrolling: true}}
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
    );

  }

}

export default QueryEditor;
