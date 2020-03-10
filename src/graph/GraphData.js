import NodeData from './NodeData';
import EdgeData from './EdgeData';

/**
 * Converts an analysis output graph adjacency list to cytoscape data format.
 * @param {Object} graphData graph data
 * @param {Object} refData node reference data
 * @returns {Array} cytoscape data
 */
export default function GraphData(graphData) {
  /**
   * Convert graph data to cytoscape data
   * @param {Object} graphData graph data
   * @returns {Array} cytoscape data
   */
  function exportGraph(graphData) {
    const { graph, start } = graphData;

    /**
     * Convert node id to cytoscape data
     * @param {String} nodeId node id
     * @returns {Object} cytoscape data
     */
    function exportNode(nodeId) {
      const data = {
        entrypoint: start.includes(nodeId) ? true : undefined
      };
      return NodeData(nodeId, data);
    }

    const data = [];
    for (const [nodeId, children] of Object.entries(graph)) {
      data.push(exportNode(nodeId));

      for (const [childId, edge] of Object.entries(children)) {
        if (!graph[childId])
          data.push(exportNode(childId));
        const edgeId = `${nodeId}-${childId}`;
        data.push(EdgeData(edgeId, nodeId, childId, edge));
      }
    }
    return data;
  }

  const cyData = exportGraph(graphData);
  return cyData;
}
