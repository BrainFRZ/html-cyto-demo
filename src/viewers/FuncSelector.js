import React from 'react';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

export default function FuncSelector(props) {
  const { setGraph, analysis } = props;
  const funcNames = analysis.funcs;
  const funcLinks = funcNames.map((name, index) =>
    <div key={index}>
      <Link key={name} style={{fontFamily: 'Roboto', paddingLeft: '10px'}} href='#'
            onClick={(e) => handleClick(e, name, setGraph)}>
        {name}
      </Link>
    </div>);
  return <Paper style={{width: '200px', overflow: 'auto'}}>{funcLinks}</Paper>;
}

function handleClick(e, name, setGraph) {
  e.preventDefault();
  setGraph(name);
}