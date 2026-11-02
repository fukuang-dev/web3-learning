# Foundry 与合约安全

状态：未开始。第 5～6 周学习 Forge、Cast、Anvil、单元测试、fuzz/invariant、OpenZeppelin 和漏洞复现修复。

进入阶段后再初始化工程，采用 Foundry 常规 `src/`、`test/`、`script/` 结构并锁定编译器及依赖版本。依赖采用子模块还是包管理届时决定；不要将未锁定的依赖拷贝或构建缓存当学习源码提交。

部署记录只保存去除凭证的网络、合约地址、交易哈希及验证结果；`broadcast/`、`out/`、`cache/` 不提交。详见 [90 天路线](../docs/learning-roadmap.md)。
