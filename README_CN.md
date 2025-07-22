# WikiTok

*其他语言版本: [English](README.md)*

基于 React + TypeScript + Vite 的 TikTok 风格维基百科浏览应用，支持多语言和智能代理功能。

> **项目来源**：本项目 Fork 自 [IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok)，在原项目基础上增加了代理功能和本地化改进。感谢原作者 [@IsaacGemal](https://github.com/IsaacGemal) 的优秀工作！

## 🚀 项目特性

- **TikTok 风格界面**：垂直滚动浏览随机维基百科文章
- **多语言支持**：支持 14 种语言，带国旗图标
- **智能代理**：自动检测网络环境，在需要时使用代理
- **图片代理**：通过集成代理服务器确保维基媒体图片正常显示
- **响应式设计**：适配移动端和桌面端
- **PWA 支持**：可安装为独立应用

## 🛠️ 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS
- 自定义代理配置
- [API 代理服务器](https://github.com/shinexyt/wikipedia-proxy-server)

## 🔧 代理配置

### API 代理
本项目使用自定义代理服务器解决维基百科在某些地区的访问问题。
- **代理服务器仓库**：[shinexyt/wikipedia-proxy-server](https://github.com/shinexyt/wikipedia-proxy-server)
- **自动切换**：根据网络环境自动选择直连或代理访问
- **URL 控制**：用户可通过 `?useProxy=true/false` 强制控制代理

### 环境变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `VITE_PROXY_BASE_URL` | 生产环境代理服务器地址 | - |
| `VITE_LOCAL_BASE_URL` | 本地开发代理服务器地址 | - |

## 🚀 快速开始

在 `/frontend` 文件夹中运行以下命令：

1. **安装依赖**：
   ```bash
   bun install
   # 或 npm install
   ```

2. **配置代理（可选）**：
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，从 API 代理仓库设置你的代理服务器
   ```

3. **启动开发**：
   ```bash
   bun run dev
   # 或 npm run dev
   ```

## 🌐 在线演示

- [wikitok.littlejoy.live](https://wikitok.littlejoy.live)

## 📖 使用说明

- **多语言支持**：支持 14 种语言，带国旗图标
- **代理控制**：使用 `?useProxy=true/false` URL 参数控制代理行为
- **自动检测**：应用根据网络环境自动选择最佳访问方式

## 🤝 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 致谢

- **原项目**：[IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok)
- **API 代理服务器**：[shinexyt/wikipedia-proxy-server](https://github.com/shinexyt/wikipedia-proxy-server) (支持API和图片代理)
- **维基百科**：感谢维基百科提供的开放知识平台
