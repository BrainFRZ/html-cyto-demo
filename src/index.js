import React from 'react';
import ReactDOM from 'react-dom';
import Dump from './demo.js';
import { generateHTMLBlock } from './LabelGenerator';

const code = Dump.analysisOutput.code;

function App() {
  const block = code["4160"];
  const [html, width] = generateHTMLBlock(block);
  return (<>
    <div dangerouslySetInnerHTML={{__html: html}} />
    <div style={{fontFamily:'Roboto'}}>{`Width: ${width}`}</div>
  </>);
}

ReactDOM.render(<App />, document.getElementById('root'));