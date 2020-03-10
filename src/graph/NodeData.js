/**
 * NodeData generator.
 * Converts a graph node to cytoscape data format.
 * @param {String} id node id
 * @param {Object} data node data
 * @param {Object} [data.style] style data
 * @returns {Object} cytoscape data
 */
function NodeData(id, data) {
  const { style, ...rest } = data;
  return {
    group: 'nodes',
    data: {
      id,
      label: `${id}`,
      style,
      ...rest
    }
  };
}

export default NodeData;
