# 个人学习仓库 Git 隔离

唯一目标仓库：`https://github.com/fukuang-dev/web3-learning.git`。默认分支 `main`；不添加公司 GitLab remote，不修改全局 Git 或公司项目配置。

本地身份采用 `fukuang-dev` 与 `188038396+fukuang-dev@users.noreply.github.com`。邮箱依据已核实 GitHub 账号 ID 和 login 构造，用于隐藏个人邮箱。

## 新克隆后的配置

Git hooks 不会随克隆自动启用。在仓库根目录运行：

```sh
git config --local user.useConfigOnly true
git config --local user.name fukuang-dev
git config --local user.email 188038396+fukuang-dev@users.noreply.github.com
git config --local core.hooksPath .githooks
git config --local push.default simple
git config --local remote.pushDefault origin
git config --local credential.https://github.com.useHttpPath true
git config --local credential.https://github.com.username fukuang-dev
```

`pre-commit` 检查有效作者/提交者邮箱，`pre-push` 只接受此个人仓库的精确 HTTPS 或 SSH 地址，拦截其他目标，包括公司 GitLab。它们是防误操作措施，可被显式绕过，不构成操作系统或账号级安全边界。Git 提交邮箱不代表推送认证身份；HTTPS 认证使用个人 GitHub 账号，SSH 若启用也须单独核实个人密钥，不复用公司身份。

## 提交前

```sh
git remote -v
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
git status --short
git diff --cached --check
git diff --cached --stat
```

人工审查暂存文件，检查私钥、助记词、凭证、用户数据、大文件和产物；`.gitignore` 不能替代敏感信息检查，已跟踪文件也不会因新增忽略规则而自动移除。发现疑似秘密时暂停提交，不把秘密粘贴到日志；若曾泄露，先撤销凭证，再单独评估历史清理。

不得 force push 或覆盖远程历史。远程非空、权限或分叉问题先调查。
