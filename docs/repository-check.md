# 仓库发布检查记录

日期：2026-11-02（Asia/Shanghai）。本记录只归档仓库准备，不代表学习者完成练习。

## 初始状态

本地路径为 `~/Documents/web3-learning`；在 Documents 范围检查只发现此同名目录。已有独立 Git，初始分支 master、无提交、无 remote，共 18 个文件，无 package.json。全局公司邮箱已由项目级个人 noreply 配置覆盖，全局与公司项目均未修改。

## 内容与安全

发布前对当前全部 36 个文件进行模式扫描和人工审阅；没有发现真实私钥、助记词、生产凭证、访问令牌或私人联系信息。允许的邮箱仅个人 GitHub noreply；`git@github.com` 为 SSH URL。VERIFICATION 中的 64 位十六进制串已核对为 sample-data 生成的虚构区块哈希，不是私钥。扫描不能证明不存在任何未知形式的秘密，后续每次提交继续检查。

没有 node_modules、构建/缓存/广播产物或超过 5 MiB 的文件。`.gitignore` 已补充证书容器、钱包备份、秘密目录和前端缓存。使用 `git check-ignore --no-index` 检查 12 个凭证/产物路径均被忽略，`.env.example` 保持可跟踪；示例也不能含真实秘密。

检查过程中出现了同一工作区新增的首课入口、答案空模板、验证脚本、记录与历史归档；已经读取并保留一并提交，没有替换学习者内容。未生成练习答案，学习掌握计数仍为 0。

## 实际验证

- Node.js v24.14.1；运行 demo.mjs 退出码 0：高度 100、交易数 1、成功/失败分别 3 次观察确认，无回执为 0。
- 运行 verify.mjs：7/7 导师演示检查通过；不计学习者作业验收。
- hooks 的 `sh -n` 通过；个人身份通过，模拟错误作者邮箱被拦截。
- 个人目标的精确 HTTPS/SSH 地址通过；模拟 GitLab、其他 GitHub owner、伪造主机名均被拦截，全程为本地检查。
- 当前文档本地链接已检查；历史 revisions 是原样快照，内部相对引用按原目录上下文阅读。

## GitHub 与发布策略

GitHub 插件核实账号 `fukuang-dev`（ID 188038396），创建前同名仓库不存在。浏览器创建 Public 仓库，插件与页面均确认成功、默认分支 main、归属个人账号；description 与用户指定一致。`git ls-remote --symref origin` 返回成功且为空，远程没有既有提交。

唯一 origin：`https://github.com/fukuang-dev/web3-learning.git`。正常提交、正常 push，不使用 force，不丢弃历史；本地 hooks 只作防误操作检查，不能替代凭证隔离或内容审阅。

推送后必须重新读取远程 main 并与本地 HEAD 对照，再 fetch/clone 比较 Git tree、文件数及内容；未完成这些检查前不宣称远程一致。实际 SHA 在 Git 历史及本次任务验收回复中提供，避免把文档自身的 SHA 写进自身形成循环。

## 首次发布的实际结果

2026-11-02 完成 GitHub CLI 个人账号授权，核实 login 为 `fukuang-dev`，仅设置仓库本地 credential helper；原先 HTTPS 无凭证和 SSH 未认证的问题已解决。CLI 使用独立配置目录，未修改全局 Git 认证。正常执行 `git push -u origin main`，建立 main 对 origin/main 的跟踪。

随后从公开 URL 独立匿名克隆，实际逐项断言通过：

- 首次提交：`cba4982132f820509cfeba9cc80200de33b25dac`。
- 首次文件树：`3caaa73a118e096ed32a211eec87ca17cf2a19c0`。
- 本地与独立克隆 HEAD 相同，完整递归 tree 条目及文件模式相同。
- 37 个跟踪文件的远程内容与本地逐字节相同，工作区干净。
- GitHub 元数据确认 owner 为个人账号、可见性 public、默认分支 main；仓库 description 在创建页面确认与用户指定一致。

本次追加验证记录后另作正常提交并推送，保留首次提交历史；最终 HEAD 和最终一致性检查见本次任务验收回复。没有 force push，没有访问公司 GitLab，没有新增学习者掌握或错题记录。
