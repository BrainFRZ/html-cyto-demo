export const generateHTMLTag = tag => {
  const width = tag.length * 10 + 8;
  const height = 18;
  return ([
    (`<div style="max-width:${width}px;max-height:${height}px">
        <div style="font-family:Courier;font-weight:bold;background-color:#0016b5;color:#FFFFFF;padding:0px 0px 0px 5px;height:100%;margin:0px">
          ${tag}
        </div>
      </div>`), width, height]);
}

const AUTO_HEX_DIGITS = 6;
const INSTR_WIDTH = 80;
const SIDE_PAD = 10;
export const generateHTMLBlock = block => {
  const blockCode = [];
  let width = 0, lineWidth = 0, code = '', height = 10;
  block.forEach(instr => {
    if (instr.label)
      [code, lineWidth] = generateHTMLLabelLine(instr.label);
    else
      [code, lineWidth] = generateHTMLInstrLine(instr.mnemonic, instr.args);
    blockCode.push(code);
    width = Math.max(width, lineWidth);
    height += 18;
  });
  return ([
    (`<div style="max-width:${width}px">
        <div style="font-family:Courier;font-weight:bold;background-color:#F5EABA;color:#00a5e7;padding:5px 0px 5px 13px">
          ${blockCode.join('<br />')}
        </div>
      </div>`), width, height]);
}

const generateHTMLLabelLine = label => [`<font color="#0016b5">${label}:</font>`, label.length*10+SIDE_PAD];
const generateHTMLInstrLine = (mnemonic, args) => {
  let code = `<span style="display:inline-block;width:${INSTR_WIDTH}px">${mnemonic}</span>`;
  let argsStr = args.join(', ');
  let groups = argsStr.match(/\d+|\D+/g); // split arg on digits
  let width = INSTR_WIDTH+SIDE_PAD;
  let groupWidth = 0, groupCode = '';
  groups.forEach(group => {
    [groupCode, groupWidth] = (/^\d+$/.test(group)) ? generateHTMLNumSpan(group) : [group, group.length*10];
    code += groupCode;
    width += groupWidth;
  });
  return [code, width];
};
const generateHTMLNumSpan = numStr => {
  if (numStr.length > AUTO_HEX_DIGITS)
    numStr = numToHex(numStr);
  return [`<font color="#e67800">${numStr}</font>`, numStr.length*10];
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