export const blocksConfig = (labelState) => ({
  style: [{
      selector: 'node',
      style: {
        'background-color': getBackgroundColor(labelState), // dark blue '#0016b5'
        'label': getLabel(labelState),
        'text-valign': 'center',
        'shape': 'rectangle',
        'height': calcHeight(labelState),
        'width': calcWidth(labelState),
        'text-wrap': 'wrap',
        'font-family': 'Courier New',
        'color': '#FFFFFF', // white
        'border-width': '1px',
        'border-color': '#000000',
        'font-weight': 'bold'
      }
    }, {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'line-color': '#6783F3', // default dark blue
        'line-style': getStyle('line-style', 'solid'),
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#6783F3'
      }
    },
  ],
  headless: true
});
function getStyle(prop, defaultStyle) {
  return element => {
    const style = element.data('style');
    if (style && style[prop])
      return style[prop];
    else
      return defaultStyle;
  }
}

function getBackgroundColor(labelStore, code) {
  return element => {
    return '#0016b5';
  }
}
function getLabel(labelStore, code) {
  return element => {
    return element.data('label');
  }
}
function calcHeight(labelStore, code) {
  return element => {
    return '18px';
  }
}
function calcWidth(labelStore, code) {
  return element => {
    const label = element.data('label');
    console.log(`label in calcWidth: ${label}`);
    return label.length * 10 + 8;
  }
}