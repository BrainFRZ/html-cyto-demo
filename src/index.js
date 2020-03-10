import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { GraphViewer, FuncSelector } from './viewers/index';
import Grid from '@material-ui/core/Grid';
import Dump from './demo.js';

function App() {
  const analysis = Dump.analysisOutput;
  const [graphId, setGraphId] = useState(null);
  return (
    <Grid container>
      <Grid item xs={10}>
        <GraphViewer graphId={graphId} analysis={analysis} />
      </Grid>
      <Grid item xs={2}>
        <FuncSelector analysis={analysis} setGraph={setGraphId} />
      </Grid>
    </Grid>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));