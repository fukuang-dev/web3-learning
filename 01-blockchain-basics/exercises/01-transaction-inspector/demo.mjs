import { block, transaction, receipt, head } from './sample-data.mjs';
import { analyzeTransaction } from './analyze-transaction.mjs';

console.log('数据来源：虚构的离线教学样本（非真实链上数据）');
console.log('区块高度：', BigInt(block.number).toString());
console.log('区块哈希：', block.hash);
console.log('交易数量：', block.transactions.length);
console.log('成功回执：', analyzeTransaction(transaction, receipt, head));
console.log('失败回执：', analyzeTransaction(transaction, { ...receipt, status: '0x0' }, head));
console.log('暂无回执：', analyzeTransaction(transaction, null, head));
console.log('以上均未验证订单、代币、金额、收款方或最终性，不能据此标记支付成功。');
