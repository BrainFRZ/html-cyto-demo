import { generateHTMLBlock, generateHTMLTag } from '../util/LabelGenerator';

export const getLabel = (blockAddr, state) => {
  const [labelData, setLabels] = state;
  const { code, labels } = labelData; 
  if (blockAddr in labels)
    return labels[blockAddr];
  let newLabel;
  if (blockAddr in code)
    newLabel = generateHTMLBlock(code[blockAddr]);
  else
    newLabel = generateHTMLTag(blockAddr);
  setLabels({code: {...labelData.code}, labels: {...labelData.labels, blockAddr: newLabel}});
  return newLabel;
}