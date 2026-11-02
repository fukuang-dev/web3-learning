# 第 1 天导师示例验证记录

验证日期：2026-11-02（Asia/Shanghai）。运行环境：Node.js v24.14.1。

以下是本次实际执行输出，不是预填的学习者作业结果。所有输入均为虚构离线数据。

## demo.mjs

命令（仓库根目录）：

```sh
node 01-blockchain-basics/exercises/01-transaction-inspector/demo.mjs
```

实际输出，退出码 0：

```text
数据来源：虚构的离线教学样本（非真实链上数据）
区块高度： 100
区块哈希： 0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
交易数量： 1
成功回执： { execution: 'succeeded', confirmations: 3n }
失败回执： { execution: 'reverted', confirmations: 3n }
暂无回执： { execution: 'receipt-unavailable', confirmations: 0n }
以上均未验证订单、代币、金额、收款方或最终性，不能据此标记支付成功。
```

## verify.mjs

命令（仓库根目录）：

```sh
node 01-blockchain-basics/exercises/01-transaction-inspector/verify.mjs
```

实际输出，退出码 0：

```text
PASS 成功回执报告成功与 3 次确认
PASS 失败回执不能报告成功
PASS 无回执保留为尚未获得结果
PASS 未知状态不能默认成功
PASS 包含块本身计第 1 次确认
PASS 错配回执被拒绝
PASS 链头落后于回执时不生成错误确认数
7/7 导师演示检查通过；学习者作业尚未验收。
```

## 验证范围

验证成功、失败、无回执、未知状态、包含块确认计数、错配回执和链头落后七个场景。不验证真实 RPC、共识/最终性、重组检测、ERC-20 资金流、业务订单，也不验证学习者尚未编写的 inspect-block.mjs。
