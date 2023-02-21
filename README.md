# Server-Status

Forked from [yb/uptime-status](https://github.com/yb/uptime-status)

通过 UptimeRobot API 获取服务在线状态，通过后端 cURL 获取服务器证书状态的状态面板。

前端使用 Javascript + React 编写，后端使用 Python3 + Flask 编写。

### 效果预览

![](https://assets.zouht.com/img/md/Server-Status-README-01.png)



![](https://assets.zouht.com/img/md/Server-Status-README-02.png)

### 部署方式

**前端**

- 前往 [UptimeRobot](https://uptimerobot.com/) 添加站点监控，并在 My Settings 页面获取 API Key.
- 在右侧 `Releases` 页面中下载已构建的前端代码并解压。
- 修改 `config.js` 配置文件，具体如下：
  - `title`: 网站标题
  - `navbar`: 导航栏链接
  - `icpLicense`: ICP 备案号（留空不显示）
  - `uptimeAPI`: UptimeRobot API 地址，默认使用 [yb](https://github.com/yb) 搭建的反代节点。
  - `apiKeys`: UptimeRobot API Key
  - `uptimeDisplayCount`: 显示的日志天数
  - `uptimeDisplayLink`: 服务状态页面是否提供跳转链接
  - `certAPI`: 后端服务器地址，默认不提供，需要自己搭建后端
  - `monitorDomains`: 需要监控证书的站点
  - `certDisplayCount`: 证书时长余量粒度
  - `certDisplayLink`: 证书状态页面是否提供跳转链接
- 上传至网站空间，只要支持静态页面即可。

**后端**

- 配置 Python3 环境。
- 在右侧 `Releases` 页面中下载后端代码并解压。
- 安装依赖：`pip install -r requirement.txt`
- 运行后端：`python app.py`

### 注意事项

1. UptimeRobot API Key 支持 Monitor-Specific API Keys 和 Read-Only API Key
2. 不同版本 cURL 查询证书返回的内容可能不同，会导致后端 500 错误，今后会进行适配。
3. 由于使用 React 编写并使用了路由功能，为防止 404 需要进行额外配置：

如果使用 Nginx 搭建，配置文件需要添加：

```nginx
location / {
  try_files $uri /index.html;
}
```

如果使用储存桶搭建，需要将 404 页也指向 index.html，以阿里云 OSS 设置界面为例：

![](https://assets.zouht.com/img/md/Server-Status-README-03.png)