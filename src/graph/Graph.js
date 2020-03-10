import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import GraphData from './GraphData';
import Dump from './../demo.js';

export default function Graph(props) {
  const { style, labelState, config, graphId, layout='cose' } = props;
  const [labelStore, updateStore] = labelState;
  const graphData = Dump.analysisOutput.graphs[graphId];
  const data = GraphData(graphData);
  const cyElem = useRef(undefined);
  const cyRef = useRef(cytoscape(config(labelState)));
  const cy = cyRef.current;
  console.log(config(labelState));
  console.log(cy);

  useEffect(() => {
    cy.mount(cyElem.current);
    return () => cy.unmount();
  });

  useEffect(() => {
    cy.add(data);
    cy.layout({name: layout, directed: true}).run();
    return () => cy.nodes().remove();
  });

//  return (<div style={style}>Graph goes here</div>);
  return (
    <div
      ref={ cyElem }
      style={{
        flex: '1 1 1%',
        display: 'block',
        minHeight: 0,
        width: '100%',
        ...style}}
    />);
}