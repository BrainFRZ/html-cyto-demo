import getLabel from '../../util/LabelGenerator';

export const blocksConfig = ({
  style: [{
      selector: 'node',
      style: {
        'background-color': getBackgroundColor(), // dark blue '#0016b5'
        'label': getHTMLLabel(),
        'text-valign': 'center',
        'shape': 'rectangle',
        'height': calcHeight(),
        'width': calcWidth(),
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

function getBackgroundColor() {
  return element => {
    const addr = element.data('label');
    const [label, width, height, backgroundColor] = getLabel(addr);
    return backgroundColor;
  }
}
function getHTMLLabel() {
  return element => {
    const addr = element.data('label');
    const [label, width, height, backgroundColor] = getLabel(addr);
    return element.data('label');
  }
}
function calcHeight() {
  return element => {
    const addr = element.data('label');
    const [label, width, height, backgroundColor] = getLabel(addr);
    return height+1;
  }
}
function calcWidth() {
  return element => {
    const addr = element.data('label');
    const [label, width, height, backgroundColor] = getLabel(addr);
    return width+1;
  }
}