window.Config = {
  // 网页设置
  title: '服务器状态',
  navbar: [
    {
      text: '主页',
      url: 'https://www.chriskim.cn/'
    },
    {
      text: '博客',
      url: 'https://www.zouht.com/'
    },
    {
      text: 'GitHub',
      url: 'https://github.com/ChrisKimZHT'
    },
  ],
  icpLicense: '',

  // 服务状态设置
  uptimeAPI: 'https://cors.status.org.cn/uptimerobot/v2/getMonitors',
  apiKeys: [
    'm788929911-c34f907a6baee22a878e9ade',
    'm788931826-4c77125aaadad880a8ab47d5',
    'm793139583-410b84b326e917d434cc58fc',
  ],
  uptimeDisplayCount: 90,
  uptimeDisplayLink: true,

  // 证书状态设置
  certAPI: 'http://127.0.0.1:5000/',
  monitorDomains: [
    'www.chriskim.cn',
    'www.zouht.com',
  ],
  certDisplayCount: 90,
  certDisplayLink: true,
};
