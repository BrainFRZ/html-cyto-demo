import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import GraphData from './GraphData';
import { htmlLabelConfig } from './configs/HTMLLabelConfig';
import nodeHtmlLabel from 'cytoscape-node-html-label';
nodeHtmlLabel(cytoscape);

export default function Graph(props) {
  const { style, config, graphId, layout='cose', graphs } = props;
  const graphData = graphs[graphId];
  const data = GraphData(graphData);
  const cyElem = useRef(undefined);
  const cyRef = useRef(cytoscape(config));
  const cy = cyRef.current;

  useEffect(() => {
    cy.mount(cyElem.current);
    cy.nodeHtmlLabel(htmlLabelConfig);
    return () => cy.unmount();
  }, []);

  useEffect(() => {
    cy.add(data);
    cy.layout({name: layout, directed: true}).run();
    return () => cy.nodes().remove();
  }, [graphId]);

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