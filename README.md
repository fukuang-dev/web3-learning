# Web3 全栈开发学习仓库

面向具有 React / TypeScript 和金融支付经验的前端工程师。目标：通过约 12 周建立 Web3 支付产品全栈基础与可验证作品集，覆盖区块链、合约、测试安全、DApp 和支付后端；按掌握情况调整节奏。

## 从这里开始

1. 阅读 [90 天学习路线](docs/learning-roadmap.md)、[12 周详细路线](00-roadmap/ROADMAP.md) 和 [当前进度](00-roadmap/PROGRESS.md)。
2. 开始 [第 1 天：从支付订单认识区块、交易和回执](01-blockchain-basics/DAY-01.md)。
3. 在仓库根目录执行 `node 01-blockchain-basics/exercises/01-transaction-inspector/demo.mjs`。
4. 完成 [练习题](01-blockchain-basics/exercises/01-transaction-inspector/README.md)，提交代码和自己的解释，等待审查与知识测试。

## 目录用途

- `00-roadmap/`：路线、进度、每日记录、知识关系和错题。
- `01-blockchain-basics/`：基础专题及对应练习。
- `resources/`：导师规范原文和官方资料入口。
- `06-company-research/`：[官方招聘岗位调研与课程映射](06-company-research/2026-11-02-hiring-requirements.md)，区分岗位要求与教学取舍。
- `docs/`：[90 天路线](docs/learning-roadmap.md) 与 [个人 Git 隔离](docs/git-isolation.md)。
- [02-solidity/](02-solidity/README.md)：Solidity 基础与 ERC-20。
- [03-foundry/](03-foundry/README.md)：合约开发、测试和安全。
- [04-web3-frontend/](04-web3-frontend/README.md)：钱包、合约交互和交易体验。
- [05-payment-gateway/](05-payment-gateway/README.md)：Stablecoin Payment Gateway 项目规划。
- `07-interview-preparation/` 在需要时创建；后续代码按当前学习任务逐步补充。

## 工作约定

每天 1～2 小时。讲解 → 演示 → 练习 → 审查 → 测试 → 归档 → 更新进度。
只推进当前任务；未通过练习和测试不标记已掌握。真实的学习时间和个人理解由学习者填写，导师不代填。

只使用测试网络、测试代币和本地开发链。禁止真实资金、主网资金和真实用户私钥。不要提交助记词、私钥或 RPC 凭证。

个人 GitHub 目标：[fukuang-dev/web3-learning](https://github.com/fukuang-dev/web3-learning)，默认分支 `main`。提交使用 GitHub noreply 邮箱，通过项目本地配置和 hooks 防止误用公司身份或误推公司 GitLab，详见 [隔离说明](docs/git-isolation.md)。

当前只有首课离线演示，没有 `package.json`，不需要安装依赖。先确认 `node --version` 为 22+，再运行上面的演示命令。合约、前端和支付项目均未完成；只有学习者练习及测试通过后才更新掌握状态。

## 招聘要求如何进入课程

2026-11-02 已根据 Coinbase、Chainlink Labs、Circle、Uniswap Labs 的 8 个工程岗位样本修订路线：加强 API/数据库、缓存一致性、可靠同步、测试、可观测性与交付。该调研包含动态页面搜索索引证据，不保证所有岗位当下仍开放。12 周学习不等于具备资深岗位年限。


## Portfolio goal

A practical Web3 learning journey covering Solidity, Ethereum, smart contracts, Foundry, and Web3 frontend development. The planned capstone is a Stablecoin Payment Gateway with test-token payments, event synchronization, merchant records, and verified refunds. Current status: first blockchain lesson prepared; learner exercises and assessments are pending. Local chains and test networks only.
