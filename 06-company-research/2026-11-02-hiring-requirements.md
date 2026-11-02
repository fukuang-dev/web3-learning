# 招聘要求调研与课程映射

调研日期：2026-11-02（Asia/Shanghai）。用途：用真实岗位校准教学，非投递建议或录用预测。

## 1. 范围与证据边界

本次访问四家公司的招聘入口，选取支付全栈、前端、后端、合约等相邻岗位，共 8 个工程岗位样本。仅使用公司官网或公司招聘系统的内容；搜索中的第三方聚合站未作为要求证据。不是全量职位抓取，也不代表整个 Web3 市场的统计。

访问结果：

| 公司 | 用户提供入口 | 实际入口与读取情况 |
| --- | --- | --- |
| Coinbase | https://www.coinbase.com/careers | 跳转地区版本；从官网职位列表进入具体 JD，正文可直接读取 |
| Chainlink | https://chain.link/careers | 本次返回 404；使用 [Chainlink Labs Careers](https://chainlinklabs.com/careers) 及其 [Open roles](https://chainlinklabs.com/open-roles)，职位列表动态加载 |
| Circle | https://www.circle.com/careers | 跳转 [Circle Careers](https://careers.circle.com/us/en)；动态列表解析有限，岗位正文取自官方 Workday 页的搜索索引 |
| Uniswap | https://www.uniswap.org/careers | 本次工具无法访问；使用 [Uniswap Labs Careers](https://careers.uniswap.org/)；岗位正文取自公司 Ashby 页的搜索索引 |

“检索日期”不等于职位发布日期。Coinbase 的下列岗位当日仍在官网列表中且可读；其他岗位能检索到官方内容，但动态页面直接解析有限，不能保证此刻仍接受申请。Circle 索引约 5 天～3 周前，Chainlink 样本约 2 周前，Uniswap 样本约 1 天～1 个月前；这些是工具报告的抓取时间，不是新增职位时间。未来使用前重新核对。

## 2. 岗位证据卡

以下均为概述，不整页复制 JD。招聘明确要求、优先项与导师推导分别记录。

### CB-1｜Coinbase：Software Engineer, CDP - Payment Acceptance

[官方 JD，页面 ID 8164730 / 岗位编号 P77903](https://www.coinbase.com/careers/positions/8164730)。地点：Remote - USA。

- 明确要求：3 年以上 Go 与 TypeScript/React 全栈生产交付；关系数据库建模、迁移、性能及事务正确性；API 设计与可观测性；文档和运行手册。
- 职责技术：React/Next.js、WalletConnect、wagmi/viem、gRPC、PostgreSQL、Temporal；覆盖结算、退款和对账。
- 课程推导：支付网关方向很贴近，但 Node.js 学习项目不能证明 Go 生产经验；先补数据库和可靠工作流，再设 Go 专项。

### CB-2｜Coinbase：Senior Frontend Engineer, Portfolio

[官方 JD，8285182 / P78774](https://www.coinbase.com/careers/positions/8285182)。地点：Remote - USA。

- 明确要求：5 年以上前端经验、React/TypeScript、实时数据 UI、REST/GraphQL 集成、性能、可访问性与测试。
- 课程推导：用户的金融数据经验可迁移；作品集需要准确的数据展示、测量结果和端到端交付说明。

### CB-3｜Coinbase：Senior Software Engineer, Frontend (Consumer - Payments)

[官方 JD，8029035 / P77525](https://www.coinbase.com/careers/positions/8029035)。地点：Remote - USA。

- 明确要求：5 年以上、React 和 React Native、规模化产品交付、可靠性与用户体验、SLO 及延迟/可用性改进。
- 课程推导：增加支付过程异常 UX 和性能测量；React Native 是此岗位缺口，列作后续方向，不要求本轮另做移动端。

### CL-1｜Chainlink Labs：Senior Software Engineer CCIP

[官方 Ashby JD](https://jobs.ashbyhq.com/chainlink-labs/8485e325-111f-4370-b3c6-0ed95872144f)。Remote，索引列出美国及部分欧洲、拉美等指定地区；未据此确认中国大陆资格。

- 可核实要求：Go、Rust 或 TypeScript 后端工程经验；在加密项目或远程工程组织交付的经验。
- 职责：安全跨链消息执行、EVM 可靠性、RPC 性能、故障诊断及架构设计。
- 课程推导：补 RPC 故障处理、可恢复同步和诊断能力；CCIP 作为完成支付主线后的扩展，不在首个项目实现跨链桥。本次没有核实可直接匹配的 Chainlink 全栈岗位，不把后端岗位包装成全栈要求。

### CI-1｜Circle：Senior Software Engineer, Frontend

[官方 Workday JD，JR101099](https://circle.wd1.myworkdayjobs.com/en-US/Circle/job/Senior-Software-Engineer--Frontend_JR101099)。美国多个城市，remote first in US。

- 核心要求：4 年以上复杂 Web UI、React/TS、测试与维护性、产品判断、沟通与 AI 辅助开发。
- 工作范围：Web3 应用、Web SDK、开发者工具、共享可访问组件及持续交付。
- 优先项：Node.js、开发者平台、SDK、Web3 或区块链经验。
- 课程推导：增加小型 TypeScript SDK、可访问性和测试；优先项不描述为硬性门槛。

### CI-2｜Circle：Senior Software Engineer

[官方 Workday JD，URL JR100013-1，正文编号 JR100013-EG](https://circle.wd1.myworkdayjobs.com/en-US/Circle/job/Senior-Software-Engineer_JR100013-1)。美国 remote-first 地点。

- 明确要求：至少 6 年 Java/Go 等面向对象语言开发，支付经验、REST、SQL/schema、云和可扩展生产软件、测试及持续交付；还要求小团队技术架构领导经验。
- 职责：连接区块链和传统金融的 API、微服务、数据及消息系统。
- 课程推导：保留支付优势，强化数据库/API；语言、领导经验与生产规模仍属长期缺口，不能凭 12 周作品集声称达到。

### UNI-1｜Uniswap Labs：Senior Frontend Infrastructure Engineer

[官方 Ashby JD](https://jobs.ashbyhq.com/uniswap/c9fe612e-7c29-47a4-b2a3-2a9d1185f5ef)。New York，Hybrid。

- 明确要求：5 年以上、React 与 React Native、共享基础设施/开发工具、架构、自动化与独立交付。
- 职责：React Query 数据层、组件体系、性能、CI/CD、QA 和 BFF。
- 加分：wagmi/viem 等生态开源贡献；加密经验也是加分项，岗位接受无加密经验者。
- 课程推导：增加缓存一致性、交易后数据刷新、测试和文档贡献；不能把“懂 Solidity”误设成所有 Web3 前端岗的硬门槛。

### UNI-2｜Uniswap Labs：Senior Smart Contract Engineer

[官方 Ashby JD](https://jobs.ashbyhq.com/uniswap/9a047e27-54dd-44df-9c0c-4ca6bc2d57bf/)。New York，Hybrid。

- 明确要求：4 年以上生产 Solidity 合约经验，深入理解 EVM，以及复杂合约主网部署经历；复杂数学实现是加分项。
- 课程推导：合约路径需要长期积累；本课程仅用测试网建立基础，不能用主网资金“补经历”，也不将此资深协议岗位当作 12 周结业标准。

## 3. 对学习者的定位（导师判断）

建议主线：**具有金融支付背景的 Web3 产品全栈工程师**，从前端优势扩展至合约交互、支付 API、数据库和链上同步。相邻方向包括 Web3 前端、SDK/开发者工具和支付集成。

用户已陈述 React/TS 和支付经验，但未验证年限、后端水平、英语或生产规模；这些仍需练习或面谈验证，不计算虚假的岗位匹配率。Solidity 协议专家、分布式基础设施专家为后续分支。

## 4. 能力矩阵与课程改动

P0 = 本轮核心；P1 = 本轮时间允许的小扩展；P2 = 结业后专项。优先级是教学取舍，不是招聘方的统一分级。

| 能力 | 证据 | 优先级与课程安排 | 可检查的产出 |
| --- | --- | --- | --- |
| React/TS 产品工程 | CB-2、CI-1、UNI-1 | P0，第 7～8 周；跳过语法重讲 | 收银台与商户后台、可访问性、异常 UX |
| wagmi/viem 与钱包交易 | CB-1 | P0，第 1～2 周读链，第 7～8 周交互 | 错链、拒签、执行失败与刷新测试 |
| API、数据库与事务 | CB-1、CI-2 | P0，第 2 周认识模型，第 6 周薄 API，第 9～12 周应用 | PostgreSQL 迁移、唯一约束、事务与 API 测试 |
| 可靠工作流/故障处理 | CB-1、CL-1 | P0，第 9～12 周 | 可恢复同步、幂等、补扫、重试和重组演练 |
| 结算与对账 | CB-1、CI-2 | P0：订单/支付记录对账；退款 P2 | 不一致清单及恢复记录；不扩张成完整账务平台 |
| 测试与安全 | CB-1、CI-1、UNI-1；合约属原学习目标 | P0，第 3 周起 | Foundry + API 集成 + 最小关键路径 E2E |
| 可观测性与交付文档 | CB-1、CB-3、UNI-1 | P0，贯穿项目 | 结构化日志、同步延迟指标、CI、运行手册 |
| SDK 与数据缓存 | CI-1、UNI-1 | 缓存 P0；薄 SDK P1，第 8～12 周 | 查询键包含 chain/account；SDK 示例及失败契约 |
| EVM / Solidity 深度 | UNI-2 | 基础 P0；复杂协议 P2 | 支付合约与安全测试；后续协议源码报告 |
| Go / gRPC / Temporal / Next.js | CB-1，CI-2 部分重叠 | P2；本轮理解架构取舍，Node/REST 作教学实现 | 明确列出未覆盖要求；后续复写单个后端模块 |
| Oracle / CCIP、DeFi 机制 | CL-1 / UNI-2 的业务背景 | P2；基础风险仍在第 5～6 周讲解 | 后续独立小实验，不并入核心支付网关 |
| AI 辅助与人工验证 | CB-1、CI-1、UNI-1 | P0，融入现有审查流程 | 说明生成部分、验证依据和人工修正，不增加独立工具课 |
| 英文与源码阅读 | CI-1 沟通、CB-1 文档、UNI-1 开源 | P0，每阶段短报告 | 英文 README 摘要、代码路径说明、设计取舍 |

认证、商户数据隔离、webhook、重组回滚和金额精度等是结合原支付项目目标推导的工程练习，不宣称每份 JD 都逐项要求。Foundry、Docker、GitHub Actions、Playwright 等具体教学工具也不冒充四家公司的统一指定技术栈。

## 5. 与原大纲相比

保留五阶段及全部基础主题，增加数据库/API的渐进铺垫、前端数据一致性、关键流程自动化、可靠性与作品集证据。支付项目仍按里程碑推进；补充的高阶要求进入 P2，而非全塞进 12 周。

12 周定位为约 120 小时的基础训练与可演示作品集，不等同于 3～6 年生产经验。当前首课与学习进度不跳级。新版路线见 [ROADMAP](../00-roadmap/ROADMAP.md)，原版见 [v1 快照](../00-roadmap/revisions/ROADMAP-2026-11-02-v1.md)。

## 6. 后续复核规则

每个阶段开始前在当前学习会话中复查相关官方 JD，记录新增/关闭/修改及课程影响；需要时保留新日期快照。优先完成已确认核心能力，避免因零散新工具不断重写课程。不创建定时抓取或后台自动化。

投递前单独核对地点、remote 国家范围、工作许可、年限及语言要求；remote 不代表全球可雇佣。本次不确认个人申请资格，也未提交任何申请。
