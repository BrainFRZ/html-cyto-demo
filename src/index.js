import React from 'react';
import ReactDOM from 'react-dom';
//import Dump from './demo.js';
//import { generateHTMLBlock, generateHTMLTag } from './graph/LabelGenerator';
import GraphViewer from './GraphViewer';

//const code = Dump.analysisOutput.code;

function App() {
  const graphId = '__libc_csu_init';
  return <GraphViewer graphId={graphId} />;
}

ReactDOM.render(<App />, document.getElementById('root'));

/*
  const block = code["4160"];
  const [html, width, height] = generateHTMLBlock(block);
  return (<>
    <div dangerouslySetInnerHTML={{__html: html}} />
    <br /><br /><br />
    <div style={{fontFamily:'Roboto'}}>{`Width: ${width}`}</div>
    <div style={{fontFamily:'Roboto'}}>{`Height: ${height}`}</div>
  </>);
*/