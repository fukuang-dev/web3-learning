# 90 天 Web3 学习路线

更新：2026-11-02（Asia/Shanghai）。这是学习计划，不是完成记录。第 1～84 天对应 12 周，第 85～90 天用于补缺、复盘与作品集整理；日程从实际学习开始计算，阶段未验收则顺延。

已有 [12 周路线 v2](../00-roadmap/ROADMAP.md) 及历史快照保持原样。本文件按最新目标补充 WalletConnect、测试代币退款和最后 6 天验收；退款由旧路线的后续扩展调整为本次计划交付，仍须先完成资金路径设计与安全测试。不要跳过前置学习赶日期。每天建议 1～2 小时，实际耗时由学习者记录；原路线约 120h 只是预算，新增范围需要时延长。

## 阶段与交付

| 时间 | 学习主题 | 可验证产出与通过标准 |
| --- | --- | --- |
| 第 1～2 周 / 第 1～14 天 | Blockchain、Transaction、Wallet、公钥/私钥/地址、签名、Gas、EVM、ERC-20、Ethereum/L2 | 完成当前离线练习和问答；随后使用 viem 读取测试链交易/区块/回执并与浏览器核对；解释提交、执行、确认和业务支付的区别 |
| 第 3～4 周 / 第 15～28 天 | Solidity 类型、函数/可见性、修饰器、mapping/struct、event/error、继承、interface/library、ERC-20 | 计数器、权限示例、测试 ERC-20；说明整数金额、approve/transferFrom、权限和资金流；基础测试通过 |
| 第 5～6 周 / 第 29～42 天 | Forge、Cast、Anvil，单元测试、Fuzz Testing、Invariant Testing、OpenZeppelin、重入/权限/精度与 CEI | 本地部署；测试正常、回退、边界及安全性质；保留漏洞复现和修复证据；第 6 周按旧路线铺垫薄 API 和数据库事务 |
| 第 7～8 周 / 第 43～56 天 | React + TypeScript、wagmi、viem、WalletConnect、钱包连接、余额、合约读写、授权、交易/事件监听 | 收银台原型；验证错链、拒签、失败、账户切换、重复点击、缓存刷新和交易替换；不重复教授 React/TS 语法 |
| 第 9～12 周 / 第 57～84 天 | Stablecoin Payment Gateway；复用旧路线 M1～M4，加入测试代币退款设计和验证 | 单测试链、单测试 ERC-20、订单与支付合约、可恢复事件同步、商户记录、退款、安全测试、启动说明和演示证据 |
| 第 85～90 天 | 修复缺口、回归、安全复核、英文摘要与作品集 | 从干净环境复现；整理演示、架构、测试和限制；逐项复核未完成任务，不能把未通过内容标为掌握 |

## 支付网关里程碑

项目路径：[05-payment-gateway/](../05-payment-gateway/README.md)。作品名称 Stablecoin Payment Gateway，对应既有 Web3 Merchant Payment Gateway 主线。只模拟稳定币支付，不宣称测试代币具备真实稳定价值。

1. **M1 / 第 9 周：订单与退款设计。** 创建/查询订单、唯一订单号、商户隔离、整数金额、chain/token/商户绑定、超时策略。先写清付款后代币由谁持有、谁有退款权限、是否托管；通过设计审查再实现退款。
2. **M2 / 第 10 周：支付闭环。** 连接钱包、余额/授权、测试代币支付、合约记录订单和事件、防重复支付、失败反馈；验证测试商户实际到账。
3. **M3 / 第 11 周：同步与退款。** 事件幂等、持久游标、补扫、确认策略、重组恢复与对账；采用全额退款最小范围，退款关联原付款人/订单/代币/金额，防越权与重复退款。资金若已直达商户，需商户授权或主动转回，不能假设网关可扣款；退款交易单独确认，链上失败不能把订单标为已退款。
4. **M4 / 第 12 周：安全与交付。** 商户交易记录、退款记录、区块浏览器链接、日志、CI、正常与异常 E2E。覆盖支付/退款重入、权限、错链、错代币、金额精度、重复支付/退款、余额不足、RPC 中断、重组和重启补扫。退款未验收则项目未完整结项，延长学习时间。

## 第 85～90 天安排

- 第 85 天：对照功能和安全清单列缺口，补失败用例。
- 第 86 天：回归合约与 API 测试，复核权限与支付/退款资金路径。
- 第 87 天：重组、RPC 故障、重启恢复、幂等与对账演练。
- 第 88 天：从干净环境启动，复核钱包和关键交易体验。
- 第 89 天：整理英文简介、架构、测试记录与演示；只写实际完成内容。
- 第 90 天：阶段知识测试、代码讲解、作品集复核和下一阶段计划。

## 目录与记录约定

保留编号目录：`01-blockchain-basics/` → `02-solidity/` → `03-foundry/` → `04-web3-frontend/` → `05-payment-gateway/`。不再创建重复的 `solidity/`、`foundry/`、`web3-frontend/` 树。后续进入相应阶段再建具体工程、锁定版本与依赖；当前不生成练习答案或整套教程。

每次按讲解 → 演示 → 独立练习 → 审查 → 测试 → 归档 → 更新进度推进。[PROGRESS](../00-roadmap/PROGRESS.md) 是掌握状态来源，[LEARNING-LOG](../00-roadmap/LEARNING-LOG.md) 只追加真实记录。

## 官方资料

2026-11-02 核对官方入口；本路线不固定软件版本，进入阶段时复核稳定版及兼容性并提交锁文件。

- [Ethereum 开发文档](https://ethereum.org/developers/docs/)
- [Solidity 文档](https://docs.soliditylang.org/en/latest/)：latest 可能指向开发文档，实际工程选择已发布稳定版本。
- [Foundry](https://www.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [wagmi React](https://wagmi.sh/react/getting-started)
- [viem](https://viem.sh/)：本次文档读取工具未能解析其 Markdown 响应，进入读链任务时再核对具体 API。
- [WalletConnect](https://docs.walletconnect.com/network)：连接与会话基础；具体 DApp connector 在前端阶段核对。

全程仅本地链、测试网络和测试代币；不记录真实钱包私钥、助记词、生产凭证或真实用户数据。
