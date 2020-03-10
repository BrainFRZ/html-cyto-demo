import React, { useState, useEffect } from 'react';
import Graph from './graph/Graph';
import { blocksConfig } from './graph/Configs';

export default function GraphViewer(props) {
  const { graphId } = props;
  const labelState = useState({});

  useEffect(() => {
    console.log("Label state updated");
    return () => {};
  }, [labelState]);

  const style = {
    height: '500px',
    width: '800px',
    borderStyle: 'inset',
  };
  return (<Graph style={style} labelState={labelState} config={blocksConfig} graphId={graphId} />);
}