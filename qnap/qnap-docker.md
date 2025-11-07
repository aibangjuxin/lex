- docker.json
- /share/CACHEDEV1_DATA/.qpkg/container-station/etc/docker.json

/etc/init.d/container-station.sh restart

非常好的问题 👍。
你现在可以拉取镜像（docker pull registry.cn-hangzhou.aliyuncs.com/rancher/k3s），说明你能访问阿里云容器镜像服务 (ACR)。
如果你想列出该仓库中所有可用的 tag（版本号），可以用以下几种方法 👇。

⸻

🧩 方法一：通过 ACR 官方 API 获取标签列表（推荐）

阿里云容器镜像服务支持 REST API 查询镜像信息。

# 示例：列出 registry.cn-hangzhou.aliyuncs.com/rancher/k3s 仓库下的所有 tag

curl -s <https://registry.cn-hangzhou.aliyuncs.com/v2/rancher/k3s/tags/list> | jq

输出示例：

{
"name": "rancher/k3s",
"tags": [
"v1.27.4-k3s1",
"v1.28.2-k3s2",
"v1.29.0-k3s1",
"latest"
]
}

说明：
• 这个接口是标准 Docker Registry V2 API。
• 如果该仓库是公开的（如 Rancher 官方镜像），无需认证即可访问。
• 如果是私有镜像仓库，则需要加上认证头。

⸻

🧩 方法二：通过 Docker CLI + Registry API 手动查

你也可以利用 docker 自带的认证 token 获取：

# 1. 获取登录 token（若仓库私有）

TOKEN=$(curl -s "<https://registry.cn-hangzhou.aliyuncs.com/v2/token?service=registry.aliyuncs.com&scope=repository:rancher/k3s:pull>" | jq -r .token)

# 2. 列出 tags

curl -s -H "Authorization: Bearer $TOKEN" \
"<https://registry.cn-hangzhou.aliyuncs.com/v2/rancher/k3s/tags/list>" | jq

⸻

🧩 方法三：通过阿里云控制台查看 1. 登录 阿里云容器镜像服务控制台￼ 2. 进入仓库 rancher/k3s 所在的命名空间 3. 打开镜像详情页 4. 切换到「版本」或「Tag 列表」页签即可查看所有 tag

⸻

⚠️ 注意事项
• 如果 curl 返回 unauthorized: authentication required，说明该镜像是私有的。
• 公共镜像仓库（如 Rancher 官方）通常不需要认证。
• API 地址格式固定：

https://<registry>/v2/<namespace>/<repository>/tags/list

⸻

✅ 总结表

方式 是否需登录 命令示例 适用场景
REST API（curl） 否（公开仓库） curl <https://registry.cn-hangzhou.aliyuncs.com/v2/rancher/k3s/tags/list> 最通用
带 Token 的 API 是（私有仓库） curl -H "Authorization: Bearer $TOKEN" ... 私有镜像
控制台查看 需登录 GUI 操作 图形界面方便

⸻

是否希望我帮你写一个 脚本，可以输入仓库名（例如 rancher/k3s），自动列出所有 tag？
