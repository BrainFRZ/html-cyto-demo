import React from 'react';
import Graph from '../graph/Graph';
import { blocksConfig } from '../graph/configs/BlocksConfig';
import { PaneMessage } from '../util/index';

export default function GraphViewer(props) {
  const { graphId, analysis } = props;
  if (!graphId)
    return <PaneMessage content='Click a procedure name to show its graph' />

  const style = {
    height: '800px',
    width: '95%',
    borderStyle: 'inset',
  };
  return (<Graph style={style} config={blocksConfig} graphs={analysis.graphs} graphId={graphId} />);
}