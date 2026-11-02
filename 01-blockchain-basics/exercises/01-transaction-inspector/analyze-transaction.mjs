// 教学函数：只观察执行状态，不能据此给订单入账。
export function analyzeTransaction(transaction, receipt, head) {
  if (!receipt) {
    return { execution: 'receipt-unavailable', confirmations: 0n };
  }
  if (receipt.transactionHash.toLowerCase() !== transaction.hash.toLowerCase()) {
    throw new Error('回执与交易哈希不匹配');
  }
  const includedAt = BigInt(receipt.blockNumber);
  if (head < includedAt) throw new Error('链头落后于回执区块，请重新同步');
  // 含当前交易区块计 1 次确认。本例假设回执区块仍在规范链中。
  const confirmations = head - includedAt + 1n;
  const execution = receipt.status === '0x1' ? 'succeeded'
    : receipt.status === '0x0' ? 'reverted' : 'unknown';
  return { execution, confirmations };
}
