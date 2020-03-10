import React, { useState } from 'react';
import Graph from './graph/Graph';
import { blocksConfig } from './graph/configs/BlocksConfig';
import Dump from './demo.js';

export default function GraphViewer(props) {
  const { graphId } = props;
  const code = Dump.analysisOutput.code;
  const labelState = useState({code: code, labels: {}});

  const style = {
    height: '500px',
    width: '800px',
    borderStyle: 'inset',
  };
  return (<Graph style={style} labelState={labelState} config={blocksConfig} graphId={graphId} />);
}