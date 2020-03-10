import getLabel from './../../util/LabelGenerator';

export const htmlLabelConfig = ([
  {
    query: 'node',
    valign: 'center',
    valignBox: 'center',
    tpl(element) {
      console.log(element);
      const addr = element.label;
      const [label, width, height, backgroundColor] = getLabel(addr);
      return label;
    }
  }
]);