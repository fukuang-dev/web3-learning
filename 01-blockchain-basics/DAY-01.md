# 今日学习任务

**学习日期：** 2026-11-02（Asia/Shanghai）  
**当前阶段：** 第 1 阶段 · 第 1 周 · 第 1 天  
**学习主题：** 从支付订单认识区块、交易和回执  
**预计耗时：** 90 分钟，可在 60～120 分钟内按理解速度调整  
**当前状态：** 学习中，等待你的练习和问答验收

> 这是重新生成后的第一天入口。从上到下阅读即可，相关代码、练习和作答文件都在本地。

## 一、今天要学什么

今天只解决一个问题：**用户点击付款后，你如何判断“发生了什么”，以及“还不能确定什么”？**

完成后，你应能：

1. 区分业务订单、链上交易、区块和交易回执。
2. 找出区块高度、区块哈希、父区块哈希以及交易哈希。
3. 读懂执行成功、执行失败、暂时没有回执三种观察结果。
4. 写一个小脚本提取区块信息，并留下可复现的运行记录。

建议用时：概念 25 分钟 → 演示 15 分钟 → 动手 35 分钟 → 问答和记录 15 分钟。
今天先不安装 wagmi/viem、数据库或钱包；这些会在相应前置知识通过后引入。不重讲 JS/React/TS 语法。

## 二、为什么要学

你的金融支付经验可以直接用来理解这里的边界：**“请求已受理”与“订单已完成”是不同的业务事实。**

设想一个商户订单：用户在收银台点击付款，钱包随后返回一串交易哈希。此时前端知道这次提交的交易标识，但还需要继续观察执行结果，并验证实际支付是否满足订单要求。

招聘校准后的课程强调完整交付：前端显示、链上结果、后端订单需要各有证据。今天先建立这套判断习惯，后续再实现钱包交互、持久化、幂等和故障恢复。招聘来源与教学取舍已归档在 [调研报告](../06-company-research/2026-11-02-hiring-requirements.md)，今天无需重新阅读整份报告。

## 三、核心知识讲解

### 1. 先把四种对象分开

| 对象 | 回答的问题 | 你熟悉的支付业务类比 |
| --- | --- | --- |
| 订单 order | 谁应向谁付多少，当前业务流程到哪一步？ | 商户后台的业务订单 |
| 交易 transaction | 哪个账户请求链执行什么操作？ | 一次支付操作请求，但授权和执行机制不同 |
| 区块 block | 哪些交易按什么顺序被纳入链上的这一批记录？ | 有序记录批次；还涉及多节点共识，不能完全等同数据库批次 |
| 回执 receipt | 某笔被包含的交易执行结果是什么，产生了哪些日志？ | 执行结果记录，尚不是商户订单的完整到账结论 |

订单号由你的业务系统定义，交易哈希是交易标识，二者不能互相替代。一个订单还可能涉及授权交易和支付交易；先记住这种关系，今天不实现完整订单模型。

### 2. 区块为什么叫“链”上的区块

区块通过父区块哈希建立前后关联。高度告诉你位置，哈希帮助你识别具体区块。分叉或重组时，同一高度可能出现不同的区块，因此“高度一样”不足以证明是同一个区块。

今天只看执行层 RPC 返回的字段，不深入共识算法：

| 字段 | 今天需要知道的含义 |
| --- | --- |
| `block.number` | 区块高度，如十六进制 `0x64` 对应十进制 100 |
| `block.hash` | 当前区块的标识 |
| `block.parentHash` | 父区块的标识 |
| `block.transactions` | 交易列表；本课样本采用交易哈希数组 |

真实 RPC 也可按参数返回完整交易对象数组。今天按样本明确给定的结构编程，不先处理所有数据格式。

### 3. 从钱包操作到执行结果

```text
业务系统创建订单
      ↓
用户准备付款 → 钱包签名 → 广播交易 → 等待被包含
                                      ↓
                             在区块中执行 → 回执
                                      ↓
                        继续确认链上结果与订单条件
```

签名表示授权某项操作，不代表该操作已经执行。交易被包含后仍可能执行失败。现代 Ethereum JSON-RPC 回执的 `status` 用 `0x1` 表示执行成功、`0x0` 表示失败。出处：[Transactions](https://ethereum.org/en/developers/docs/transactions/)、[JSON-RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/)。

后续使用 viem 时，SDK 的类型可能已转换，例如状态是字符串枚举，数量是 bigint；今天的十六进制判断对应原始 RPC 样本，不直接照搬到 SDK 返回值。

### 4. 观察结果与业务判断分开保存

下面是本课演示函数的输出契约，**不是生产订单状态机**：

| execution | 能说明什么 | 仍需注意 |
| --- | --- | --- |
| `succeeded` | 这份回执报告执行成功 | 尚未核验支付合约、订单、代币、金额、收款方及最终性 |
| `reverted` | 这份回执报告执行失败 | 一次失败不能代表订单以后不能重试；被包含的失败交易仍会消耗费用 |
| `receipt-unavailable` | 当前没有拿到回执 | 不能直接断言一定 pending，也不能判定支付成功或失败 |
| `unknown` | 样本状态值未被识别 | 保留未知结果，不默认成功 |

确认次数今天只作入门：若交易在高度 100、观察到链头 102，并且交易所在区块仍在规范链中，本课按包含块算第一次确认，得到 `102 - 100 + 1 = 3`。这是带前提的计算，不是最终性证明。

专题复习看 [区块、交易与回执笔记](01-blocks-transactions-receipts.md)。Gas、签名机制、事件解码和重组恢复暂时只知道用途，后续再逐项练习。

## 四、代码演示

### 1. 运行环境和命令

环境：Node.js 22+，本机已用 v24.14.1 验证。零第三方依赖，无需 `npm install`。

```sh
cd ~/Documents/web3-learning
node 01-blockchain-basics/exercises/01-transaction-inspector/demo.mjs
```

**数据是虚构的离线样本**，不是抓取的真实交易，哈希不能拿去浏览器查证。本课不发送交易、不连接钱包、不需要任何私钥。

### 2. 按这个顺序读代码

| 文件 | 职责 | 阅读重点 |
| --- | --- | --- |
| [sample-data.mjs](exercises/01-transaction-inspector/sample-data.mjs) | 提供区块、交易、回执和链头样本 | 找到各对象用来关联的 hash 和 blockNumber |
| [analyze-transaction.mjs](exercises/01-transaction-inspector/analyze-transaction.mjs) | 观察回执状态 | 无回执先返回；检查哈希归属；使用 bigint；未知状态不当成功 |
| [demo.mjs](exercises/01-transaction-inspector/demo.mjs) | 演示三个场景 | 同一套观察函数如何处理不同输入 |

完整演示入口如下，导入的模块已保存在同目录：

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

关键实现解释：前两行分离数据与观察逻辑；`BigInt(...).toString()` 输出十进制高度；`.length` 统计样本交易数；三个函数调用只改变回执输入，以比较不同执行观察结果。完整函数的分支解释在专题笔记第 6 节。

预期得到高度 `100`、交易数 `1`，以及 `succeeded / 3n`、`reverted / 3n`、`receipt-unavailable / 0n`。控制台中的 `n` 是 bigint 的显示后缀。

### 3. 查看导师验证结果

```sh
node 01-blockchain-basics/exercises/01-transaction-inspector/verify.mjs
```

它验证演示的正常与错误分支，不是你的作业答案，也不代表你已掌握。实际输出和检查范围见 [验证记录](exercises/01-transaction-inspector/VERIFICATION.md)。

## 五、动手练习

作业目录：`01-blockchain-basics/exercises/01-transaction-inspector/`。

### 练习 A：自己写区块摘要（约 20 分钟）

自行创建 `inspect-block.mjs`：

- 导入现有样本，不修改导师样本来凑输出。
- 写一个可以接收区块和交易哈希的函数，输出十进制高度、区块哈希、父区块哈希、交易数，以及目标交易是否在列表中。
- 调用它检查原始区块，再检查 `transactions: []` 的副本。
- 原始样本交易数应为 1 且包含目标；空区块应为 0 且不包含目标，均不能崩溃。
- 代码注释解释一个与链上数据有关的判断，不要求重讲基础语法。

运行自己的脚本：

```sh
node 01-blockchain-basics/exercises/01-transaction-inspector/inspect-block.mjs
```

这条命令要在你创建文件之后再运行。此处不提供完整实现。

### 练习 B：留下自己的分析（约 15 分钟）

打开已准备好的 [answers.md](exercises/01-transaction-inspector/answers.md)，填写：

1. 用自己的话解释四种对象及关系。
2. 成功、失败、无回执三个场景下，你会如何向用户显示，并给出依据。
3. 对三个知识测试问题作答。
4. 粘贴自己的命令、实际输出、实际耗时和卡住的问题。

模板目前全部待填写，不含参考答案或完成标记。更详细的交付要求见 [练习说明](exercises/01-transaction-inspector/README.md)。

## 六、今日验收标准

- [ ] 自写脚本在普通与空交易区块下均能正确运行。
- [ ] 能区分订单号、交易哈希、区块高度、区块哈希。
- [ ] 能根据回执说明观察结果，并指出业务判断缺少的证据。
- [ ] 能解释为什么“多次确认”仍依赖规范链假设。
- [ ] `answers.md` 有自己的论述、真实运行输出和耗时。
- [ ] 导师完成代码审查与问答追问后，再更新掌握状态。

**完成后在聊天中告诉我“第 1 天作业已保存”。** 我会读取本地文件审查，不需要你把全部代码再次粘贴到聊天。

今天的教材、运行记录和作答入口已经归档；你的个人理解和耗时留待你完成。尚未提交练习，所以进度仍为“学习中”。通过后再用 viem 分析真实测试链交易；未通过则先补本课薄弱项。
