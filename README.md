# Server-Status

Forked from [yb/uptime-status](https://github.com/yb/uptime-status)

通过 UptimeRobot API 获取服务在线状态，通过后端 cURL 获取服务器证书状态的状态面板。

前端使用 Javascript + React 编写，后端使用 Python3 + Flask 编写。

## 效果预览

![](https://assets.zouht.com/img/md/Server-Status-README-04.png)



![](https://assets.zouht.com/img/md/Server-Status-README-05.png)

## 部署方式

不建议将监控页面和监控对象部署到同一台服务器上，防止服务器异常时监控页面也发生异常。

可以采用的部署方案是：前端使用储存桶（如阿里云 OSS）、后端使用函数计算（如阿里云 FC）

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

1. 下载安装 [cURL](https://curl.se/download.html)，如果系统自带可跳过。
2. 配置 Python3 环境。
3. 在右侧 `Releases` 页面中下载后端代码并解压。
4. 安装依赖：`pip install -r requirement.txt`
5. 按需修改 `configs.py` 配置文件，具体如下：
   - `ENABLE_CACHE`: 是否启用内置缓存（如果使用云函数部署请禁用），默认启用
   - `UPTIME_CACHE_TIMEOUT`: 服务状态缓存时间/秒，默认 5 分钟
   - `CERT_CACHE_TIMEOUT`: 证书状态缓存时间/秒，默认 1 天
   - `UPTIMEROBOT_API`: UptimeRobot API 地址，默认官方源
   - `CURL_BIN`: cURL 程序地址，默认使用系统路径 /usr/bin/curl
6. 运行后端：`python app.py`
7. 测试后端接口

| 接口    | 调用方法  | 调用参数                                                | 内容         |
| ------- | --------- | ------------------------------------------------------- | ------------ |
| /       | GET, POST | 无                                                      | Hello World! |
| /uptime | GET, POST | 与 [UptimeRobot](https://uptimerobot.com/api/) 官方一致 | 服务监控信息 |
| /cert   | GET, POST | domain: 代查域名                                        | 域名证书信息 |

### **公开后端**

若不想自建后端，可使用我公开的后端服务，地址为：https://cdn.fc.chriskim.top/

该后端使用阿里云 FC + CDN 部署，**但不对可用性做出保证**，建议有能力的话自己部署。

## 注意事项

由于使用 React 编写并使用了路由功能，为防止 404 需要进行额外配置。

- 如果使用 Nginx 搭建，配置文件需要添加：

```nginx
location / {
  try_files $uri /index.html;
}
```

- 如果使用储存桶搭建，需要将 404 页也指向 index.html，以阿里云 OSS 设置界面为例：

![](https://assets.zouht.com/img/md/Server-Status-README-03.png)
