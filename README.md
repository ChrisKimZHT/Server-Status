# Server-Status

Forked from [yb/uptime-status](https://github.com/yb/uptime-status)

通过 UptimeRobot API 获取服务在线状态，通过后端 cURL 获取服务器证书状态的状态面板。

前端使用 Javascript + React 编写，后端使用 Python3 + Flask 编写。

## 效果预览

![](https://assets.zouht.com/img/md/Server-Status-README-04.png)



![](https://assets.zouht.com/img/md/Server-Status-README-05.png)

## 部署方式

### 前端

1. 前往 [UptimeRobot](https://uptimerobot.com/) 添加站点监控，并在 My Settings 页面获取 API Key.

2. 在右侧 `Releases` 页面中下载已构建的前端代码并解压。

3. 修改 `config.js` 配置文件，具体如下：
   - `title`: 网站标题
   - `navbar`: 导航栏链接
   - `icpLicense`: ICP 备案号（留空不显示）
   - `uptimeTitle`: 服务状态页面标题
   - `uptimeAPI`: UptimeRobot API 地址，默认使用我的公开节点。
   - `apiKeys`: UptimeRobot API Key (Monitor-Specific API Keys 或 Read-Only API Key)
   - `uptimeDisplayCount`: 显示的日志天数
   - `uptimeDisplayLink`: 服务状态页面是否提供跳转链接
   - `certTitle`: 证书状态页面标题
   - `certAPI`: 后端服务器地址，默认使用我的公开节点。
   - `monitorDomains`: 需要监控证书的站点
   - `certDisplayCount`: 证书时长余量粒度
   - `certDisplayLink`: 证书状态页面是否提供跳转链接

4. 上传至网站空间，只要支持静态页面即可。

### 后端

1. 配置 Python3 环境。
2. 在右侧 `Releases` 页面中下载后端代码并解压。
3. 安装依赖：`pip install -r requirement.txt`
4. 运行后端：`python app.py`
5. 测试后端
   - `/`：显示 Hello World!
   - `/uptime`：服务状态
   - `/cert`：证书状态

**公开 API**

若不想自建后端，可使用我公开的后端服务，地址为：https://api.chriskim.top/

该后端使用阿里云 FC + CDN 部署，**但不对可用性做出保证**，建议有能力的话自己部署。

## 注意事项

**1. 推荐部署方式**

建议将监控页面部署在独立的服务器上，防止服务器异常时监控页面也发生异常。

可以采用的部署方案是：前端使用储存桶（如阿里云 OSS）、后端使用函数计算（如阿里云 FC）

**2. 前端路由问题**

由于使用 React 编写并使用了路由功能，为防止 404 需要进行额外配置。

- 如果使用 Nginx 搭建，配置文件需要添加：

```nginx
location / {
  try_files $uri /index.html;
}
```

- 如果使用储存桶搭建，需要将 404 页也指向 index.html，以阿里云 OSS 设置界面为例：

![](https://assets.zouht.com/img/md/Server-Status-README-03.png)

**3. 后端 cURL 版本问题**

不同版本的 cURL 返回的格式可能不同，导致正则表达式匹配异常。

如果系统的 cURL 不兼容，可以单独[下载](https://curl.se/download.html) cURL 二进制，放置在后端根目录，然后将 `check_cert` 函数内的 `command ` 前加 `./` 即可。

**4. 后端云函数部署建议**

如果使用云函数部署后端，建议关闭程序内置缓存功能，将 `cache.memoize` 内的 `timeout` 改为 0.
