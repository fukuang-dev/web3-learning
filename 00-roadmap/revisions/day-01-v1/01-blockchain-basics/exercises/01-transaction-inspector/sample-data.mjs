// 完全虚构的教学数据，不来自真实链，哈希不可用于区块浏览器查询。
const txHash = `0x${'a'.repeat(64)}`;
const blockHash = `0x${'b'.repeat(64)}`;
export const block = {
  number: '0x64', // JSON-RPC QUANTITY：100
  hash: blockHash,
  parentHash: `0x${'c'.repeat(64)}`,
  transactions: [txHash],
};
export const transaction = {
  hash: txHash,
  from: `0x${'1'.repeat(40)}`,
  to: `0x${'2'.repeat(40)}`,
  value: '0x0',
  blockNumber: block.number,
};
export const receipt = {
  transactionHash: txHash,
  blockHash,
  blockNumber: block.number,
  status: '0x1',
  gasUsed: '0x5208',
  logs: [],
};
export const head = 102n;
