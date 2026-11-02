# 区块、交易与交易回执

学习日期：2026-11-02（Asia/Shanghai）｜第 1 阶段，第 1 周，第 1 天｜预计 60～90 分钟。
状态：教材已提供，尚未通过学习者练习验收。

2026-11-02 按招聘校准路线更新：每天的学习顺序以 [DAY-01](DAY-01.md) 为准，本文件作为持续维护的专题复习笔记。

## 1. 什么是它

今天只建立三个概念：

- **交易（transaction）**：请求链上状态发生变化的指令，例如转账或调用支付合约。签名授权机制将在后续课展开。
- **区块（block）**：承载按顺序执行的交易等信息，关联前一个区块。
- **交易回执（receipt）**：交易被包含并执行后可查询的执行记录，包含执行状态、所在区块、Gas 消耗和日志等。

可以类比支付系统中的操作请求、账本批次和处理结果，但区块链还涉及多节点共识、分叉及最终性，不能把它完全当成单机数据库。

## 2. 为什么需要它

你做过入金、出金和订单状态。在 Web3 中，钱包批准、交易提交、链上执行和商户订单确认发生在不同时间。
前端拿到交易哈希时，不能马上给订单显示「已支付」。本课练习让你先读懂执行证据，再逐步加入业务校验。

## 3. 底层工作原理

以普通钱包发起的交易为例：

```text
用户准备操作 → 钱包签名 → 广播 → 等待被包含
                                  ↓
                         区块中执行 → 生成回执
                                  ↓
                继续观察规范链、确认/最终性及业务条件
```

节点执行交易并验证结果，网络通过共识确定被接受的链。交易执行失败也可能被包含在区块中，因此「已上链」不等于「执行成功」。被包含的回退交易仍会支付执行费用；业务状态修改回滚不能理解为所有影响都消失。

区块高度表示位置，区块哈希标识具体区块。发生分叉或重组时，同一高度可能对应不同区块；规范链在该高度最终选择哪一个，需要继续观察。因此只保存高度不足以识别重组。

本课只计算观察到的确认次数，不实现最终性、重组检测或真实支付入账。

## 4. 核心概念

| 字段/概念 | 含义 | 容易误读的地方 |
| --- | --- | --- |
| block.number | 区块高度 | 不是区块唯一标识 |
| block.hash | 当前区块哈希 | 与交易哈希不同 |
| block.parentHash | 父区块哈希 | 将区块按父子关系连接 |
| transaction.hash | 交易标识 | 有 hash 不代表被包含或执行成功 |
| transaction.from / to | 发起方 / 目标 | 合约调用的 to 通常是合约地址，不必是最终收款人；创建合约时 to 可为空 |
| transaction.value | 随交易携带的原生币数量，单位 wei | 不是 ERC-20 支付金额 |
| receipt.status | 现代 Ethereum 回执中的执行状态 | JSON-RPC 原始值 0x1 成功，0x0 失败；不是订单状态 |
| receipt.blockNumber / blockHash | 被包含区块的位置和身份 | 要关注区块是否仍在规范链 |
| receipt.logs | 执行产生的事件日志 | 仍须解码并核验合约与业务参数 |

JSON-RPC 数量字段常为十六进制字符串，例如 `0x64`。本例使用 BigInt 转为 100；不把金额和任意大整数直接转成 JavaScript Number。将来 viem 会把许多数量字段直接转为 bigint，并把 receipt.status 表达为字符串枚举；不能把本课原始 RPC 类型判断照搬到 SDK 返回值。

本课约定包含交易的区块算第 1 次确认：`head - includedAt + 1`。这依赖回执区块仍处于规范链的假设，不能仅凭这个公式证明最终性。

## 5. 代码示例

环境：Node.js 22+，无需安装第三方依赖。在仓库根目录运行：

```sh
node 01-blockchain-basics/exercises/01-transaction-inspector/demo.mjs
```

所有数据均为虚构的离线样本，无法通过区块浏览器检索。本课没有获取或发送真实交易。

完整可运行的演示入口如下，所导入的两个模块已保存于同目录：

```js
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
```

源文件：

- [sample-data.mjs](exercises/01-transaction-inspector/sample-data.mjs)：构造字段与三项基本对象。
- [analyze-transaction.mjs](exercises/01-transaction-inspector/analyze-transaction.mjs)：观察回执。
- [demo.mjs](exercises/01-transaction-inspector/demo.mjs)：执行演示。

实际本机输出与预期见 [练习说明](exercises/01-transaction-inspector/README.md)。

## 6. 代码逐行解释

`demo.mjs`：

1. 第 1～2 行分别导入数据和观察函数；与以后「RPC 取数 → 本地分析」的分层相对应。
2. 第 4 行输出数据来源，避免将样本误当真实链上证据。
3. 第 5 行用 `BigInt(block.number)` 将十六进制转为整数，再以十进制输出。
4. 第 6～7 行输出区块身份与交易数量；示例的 transactions 存的是哈希列表。
5. 第 8 行处理成功回执；第 9 行只替换 status 演示失败；第 10 行演示 null 回执。
6. 第 11 行提醒：执行结果尚未完成业务验证。

`analyze-transaction.mjs`：

- 没有回执时返回 `receipt-unavailable`。它只表示本次查询没有得到回执，不能保证交易就在 pending 池中。
- 先检查回执 transactionHash 是否属于这笔交易，避免把错误对象关联起来。
- 将 blockNumber 转为 bigint。链头落后于回执区块说明观察数据不一致，直接报错，而不是输出负确认数。
- 识别 `0x1`、`0x0`，其他值保留为 unknown，不能默认成功。
- 返回的是执行观察，不返回「支付成功」。

这个函数是缩小范围的教学工具，不是生产支付判断器，也不是任意 RPC 输入的完整校验库。

## 7. 实际业务场景

先区分业务订单、链上交易、区块和回执：订单记录应付条件，交易请求链执行操作，区块组织交易，回执报告执行结果。业务订单号不是交易哈希，一个订单可能关联多次操作。第一天只建立关系，后续再做数据库模型。

商户订单可先保存交易哈希并显示「等待链上结果」；收到失败回执后提示本次交易执行失败；收到成功回执后，继续验证支付合约事件是否匹配订单、代币、收款方和金额，并按确认策略处理。

其中订单超时、迟到付款、重试和重组回滚将在支付网关阶段设计。不要用一笔交易的状态直接覆盖整张订单的业务状态。

## 8. 常见错误

- 看到 hash 立即修改订单为 paid。
- 把 receipt 为 null 当成确定 pending；也可能是节点尚未同步、交易丢弃/替换、网络错误或查错链。
- 认为执行失败的交易不可能被打包。
- 把相同高度视为相同区块。
- 认为交易执行成功就证明正确代币已经付给正确商户。
- 把演示运行通过记为自己已经掌握。

## 9. 安全注意事项

只在测试链和本地链练习，不使用真实资金或真实用户私钥。本课不连接钱包、不请求签名、不写链上状态。
RPC 凭证不写入 Git。后续真实测试链读取应核对链 ID、合约地址及浏览器网络。

## 10. 常见面试问题

**交易与交易回执的职责有什么区别？** 交易描述所请求的链上操作；回执描述其被包含后的执行结果和相关元数据。

**区块高度与区块哈希分别用来做什么？** 高度定位链上的位置，哈希识别具体区块；处理重组需要检查身份及父子关系。

独立知识测试题另见练习说明，此处不提前给出测试参考答案。

## 11. 我的理解

待学习者完成 `answers.md` 后整理；不由导师代填。特别记录自己如何区分「请求提交」「链上执行」「支付订单完成」。

## 12. 延伸学习

本次先完成练习，以下是原理资料，按需查阅，不要求今日读完：

- [Ethereum Transactions](https://ethereum.org/en/developers/docs/transactions/)：交易和生命周期。
- [Ethereum Blocks](https://ethereum.org/en/developers/docs/blocks/)：区块与链。
- [Ethereum JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/)：原始字段及 receipt.status。

资料核对日期：2026-11-02。
下一步：本课验收通过后，用 viem 读取测试链区块/交易/回执，并与浏览器核对。

## 今日练习与验收

建议安排：概念 20 分钟，运行与阅读代码 15 分钟，独立练习 25～40 分钟，问答及记录 10～15 分钟。
按照 [练习说明](exercises/01-transaction-inspector/README.md) 自行创建 `inspect-block.mjs`，填写已准备好的 `answers.md` 模板，运行并提交。只有代码检查与问答通过才更新掌握状态。
