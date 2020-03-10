import Dump from './../demo';
const code = Dump.analysisOutput.code;

export default function getLabel(blockAddr) {
  let label;
  if (blockAddr in code)
    label = generateHTMLBlock(code[blockAddr]);
  else
    label = generateHTMLTag(blockAddr);
  return label;
}

const generateHTMLTag = tag => {
  const width = tag.length * 10 + 8;
  const height = 20;
  const backgroundColor = '#0016b5';
  const style = `font-family:Courier;font-weight:bold;background-color:${backgroundColor};color:#FFFFFF`;
  return ([
    (`<div style="${style}">
        ${tag}
      </div>`), width, height, backgroundColor]);
}

const AUTO_HEX_DIGITS = 6;
const INSTR_WIDTH = 80;
const SIDE_PAD = 10;
export const generateHTMLBlock = block => {
  const blockCode = [], backgroundColor='#F5EABA';
  const gutterWidth = getGutterWidth(block);
  let width = 0, lineWidth = 0, code = '', height = 0;
  block.forEach(instr => {
    if (instr.label)
      [code, lineWidth] = generateHTMLLabelLine(instr.label);
    else
      [code, lineWidth] = generateHTMLInstrLine(instr.mnemonic, instr.args);
    code = generateGutterSpan(instr.addr, gutterWidth) + code;
    blockCode.push(code);
    width = Math.max(width, lineWidth);
    height += 18;
  });
  width += 10 + gutterWidth;
  return ([
    (`<div style="font-family:Courier;font-weight:bold;background-color:${backgroundColor};color:#00a5e7">
        ${blockCode.join('<br />')}
      </div>`), width, height, backgroundColor]);
}

const generateHTMLLabelLine = label => [`<span style="color:#0016b5;margin:0px 0px 0px 5px">${label}:</span>`, label.length*10+SIDE_PAD];
const generateHTMLInstrLine = (mnemonic, args) => {
  let code = `<span style="display:inline-block;width:${INSTR_WIDTH}px;margin:0px 0px 0px 5px">${mnemonic}</span>`;
  let argsStr = args.join(', ');
  let groups = argsStr.match(/\d+|\D+/g); // split arg on digits
  let width = INSTR_WIDTH+SIDE_PAD+5;
  let groupWidth = 0, groupCode = '';
  if (groups) {
    groups.forEach(group => {
      [groupCode, groupWidth] = (/^\d+$/.test(group)) ? generateHTMLNumSpan(group) : [group, group.length*10];
      code += groupCode;
      width += groupWidth;
    });
  }
  return [code, width];
};
const generateHTMLNumSpan = numStr => {
  if (numStr.length > AUTO_HEX_DIGITS)
    numStr = numToHex(numStr);
  return [`<font color="#e67800">${numStr}</font>`, numStr.length*10];
}
const generateGutterSpan = (addr, width) => {
  const backgroundColor = '#e6e6e6';
  return `<span style="width:${width}px;background-color:${backgroundColor};color:#000000;font-weight:normal;margin:0px 0px 0px -5px">`+
          `${addr}</span>`;
}

const getGutterWidth = block => {
  const lastAddr = block.slice(-1);  // Addrs are in increasing order
  return lastAddr.length * 10 + 10;
}

/* global BigInt */
const numToHex = nStr => {
  let positive = true;
  let bigNum = BigInt(nStr);

  if (bigNum < 0) {
    positive = false;
    bigNum = twosCompliment(bigNum);
  }

  // Pad an uneven number of bits with 0 for parsability
  let hex = bigNum.toString(16);
  if (hex.length % 2) {
    hex = '0' + hex;
  }

  // Pad an extra byte to avoid ambiguity if positive and first bit is set
  let hiByte = parseInt(hex.slice(0, 2), 16);
  let hiBit = (0x80 & hiByte);
  if (positive && hiBit) {
    hex = '00' + hex;
  }

  return '0x' + hex;
}

// Perform Two's Compliment to get opposite signed hex value
function twosCompliment(bigNum) {
  bigNum = -bigNum;
  let binary = (bigNum).toString(2)
  let prefix = '';
  while (binary.length % 8) {
    binary = '0' + binary;
  }
  if ('1' === binary[0] && -1 !== binary.slice(1).indexOf('1')) {
    prefix = '11111111';
  }
  binary = binary.split('').map(i => ('0' === i ? '1' : '0')).join('');
  return BigInt('0b' + prefix + binary) + BigInt(1);
}