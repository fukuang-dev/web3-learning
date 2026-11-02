# Stablecoin Payment Gateway

状态：规划中，尚无实现。对应既有路线的 Web3 Merchant Payment Gateway。

目标：React/TypeScript/Vite + wagmi/viem 收银台，Solidity/Foundry/OpenZeppelin 合约，Node/TypeScript API 与 PostgreSQL，可恢复的链上同步 worker。

按 [90 天路线 M1～M4](../docs/learning-roadmap.md) 推进：创建订单 → 连接钱包/查询余额 → 授权与测试代币支付 → 合约记录订单 → 事件同步 → 商户交易记录 → 全额退款 → 安全测试与交付。

退款实现前先确定代币归属、授权和资金路径。退款需关联原付款人并验证权限、防重入和防重复退款；不得向用户演示尚未验证的退款能力。

最终归档启动命令、锁定版本、架构、合约/接口说明、成功与失败测试、恢复演练、英文摘要和真实演示证据。Node 教学实现不代表 Go 等生产经验。

仅单测试链和单测试 ERC-20，不使用真实稳定币、真实资金或主网；测试代币没有真实稳定价值。
