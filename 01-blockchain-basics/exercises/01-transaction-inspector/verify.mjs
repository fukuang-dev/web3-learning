// 导师演示的场景检查；不验证学习者作业，也不证明生产支付安全。
import assert from 'node:assert/strict';
import { transaction, receipt, head } from './sample-data.mjs';
import { analyzeTransaction as analyze } from './analyze-transaction.mjs';

const cases = [
  ['成功回执报告成功与 3 次确认', () => {
    assert.deepEqual(analyze(transaction, receipt, head), { execution: 'succeeded', confirmations: 3n });
  }],
  ['失败回执不能报告成功', () => {
    assert.equal(analyze(transaction, { ...receipt, status: '0x0' }, head).execution, 'reverted');
  }],
  ['无回执保留为尚未获得结果', () => {
    assert.deepEqual(analyze(transaction, null, head), { execution: 'receipt-unavailable', confirmations: 0n });
  }],
  ['未知状态不能默认成功', () => {
    assert.equal(analyze(transaction, { ...receipt, status: '0x2' }, head).execution, 'unknown');
  }],
  ['包含块本身计第 1 次确认', () => {
    assert.equal(analyze(transaction, receipt, 100n).confirmations, 1n);
  }],
  ['错配回执被拒绝', () => {
    assert.throws(() => analyze(transaction, { ...receipt, transactionHash: `0x${'d'.repeat(64)}` }, head), /哈希/);
  }],
  ['链头落后于回执时不生成错误确认数', () => {
    assert.throws(() => analyze(transaction, receipt, 99n), /链头/);
  }],
];
for (const [name, run] of cases) {
  run();
  console.log(`PASS ${name}`);
}
console.log(`${cases.length}/${cases.length} 导师演示检查通过；学习者作业尚未验收。`);
