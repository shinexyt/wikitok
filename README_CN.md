# WikiTok

*其他语言版本: [English](README.md)*

基于 React + TypeScript + Vite 的 TikTok 风格维基百科浏览应用，支持多语言和智能代理功能。

> **项目来源**：本项目 Fork 自 [IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok)，在原项目基础上增加了代理功能和本地化改进。感谢原作者 [@IsaacGemal](https://github.com/IsaacGemal) 的优秀工作！

## 🚀 项目特性

### 核心功能（继承自原项目）
- **TikTok 风格界面**：垂直滚动浏览随机维基百科文章
- **多语言支持**：支持 14 种语言，包括中文、英文、西班牙文、法文、德文、日文等
- **文章预览**：显示文章图片、标题和摘要
- **社交分享**：直接分享文章或复制链接
- **语言选择器**：带国旗图标的语言切换
- **内容预加载**：预加载图片和内容，确保流畅滚动
- **响应式设计**：适配移动端和桌面端
- **PWA 支持**：可安装为独立应用

### 增强功能（本 Fork 新增）
- **智能代理**：自动检测网络环境，在需要时使用代理服务器访问维基百科
- **图片代理**：通过第三方服务代理维基媒体图片，确保图片正常显示
- **环境变量配置**：灵活的配置管理
- **本地化优化**：针对中文用户的体验优化

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **状态管理**：React Context
- **代理服务**：自定义代理配置
- **图片代理**：images.weserv.nl
- **PWA**：Progressive Web App 支持

## 🔧 代理功能详解

本项目集成了完整的代理解决方案，解决维基百科在某些地区的访问问题：

### API 代理
- **自动切换**：根据网络环境自动选择直连或代理访问
- **环境配置**：支持通过环境变量配置不同的代理服务器
- **本地开发**：本地开发时可使用独立的代理服务器地址

### 图片代理
- **第三方服务**：使用 `images.weserv.nl` 代理维基媒体图片
- **自动检测**：自动识别维基媒体图片并应用代理

### 页面链接处理
- **智能处理**：对维基百科页面链接进行智能处理
- **多种策略**：支持多种代理策略，可根据需求调整

### 用户控制
- **URL 参数**：用户可通过 `?useProxy=true/false` 参数手动控制代理
- **灵活配置**：开发者可根据需求调整代理策略

## 环境变量配置

在开始开发之前，你可以设置环境变量来启用代理功能：

1. 复制 `.env.example` 文件为 `.env`：
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件，设置你的配置：
   ```bash
   # 生产环境代理服务器地址
   VITE_PROXY_BASE_URL=https://your-proxy-server.com
   
   # 本地开发代理服务器地址
   VITE_LOCAL_BASE_URL=http://localhost:3001
   ```

3. 根据你的需求调整其他环境变量

**注意**：
- `.env` 文件包含敏感信息，不会被提交到 git 仓库
- 代理功能是可选的，即使不配置也可以正常使用应用

### 环境变量说明

| 变量名 | 说明 | 默认值 | 必需 |
|--------|------|--------|------|
| `VITE_PROXY_BASE_URL` | 生产环境代理服务器地址 | - | 否 |
| `VITE_LOCAL_BASE_URL` | 本地开发代理服务器地址 | - | 否 |
| `VITE_API_TIMEOUT` | API 请求超时时间（毫秒） | 5000 | 否 |
| `VITE_DEBUG_MODE` | 调试模式开关 | false | 否 |

## 开发

在 `/frontend` 文件夹中运行以下命令：

> **无需后端！** 这是一个纯前端应用，可以直接运行。

1. **安装依赖**：
   ```bash
   bun install
   # 或
   npm install
   ```

2. **配置环境变量**（可选，用于代理功能）：
   ```bash
   cp .env.example .env
   # 编辑 .env 文件设置你的代理服务器
   ```

3. **启动开发服务器**：
   ```bash
   bun run dev
   # 或
   npm run dev
   ```

4. **构建生产版本**：
   ```bash
   bun build
   # 或
   npm run build
   ```

## 🌐 在线演示

- 原项目演示：[wikitok.vercel.app](https://wikitok.vercel.app) 或 [wikitok.io](https://www.wikitok.io)
- 本 Fork 版本：[你的部署地址]

**注意**：这是基于原始 WikiTok 网页项目的 Fork 版本，与 wikitok.net 或独立开发的 WikiTok 移动应用无关。

## 📖 使用说明

### 代理控制

用户可以通过以下方式控制代理行为：

- **URL 参数控制**：
  - `?useProxy=true` - 强制使用代理
  - `?useProxy=false` - 强制不使用代理

- **自动检测**：应用会根据网络环境自动选择最佳访问方式

### 多语言支持

应用支持 14 种语言：
- **亚洲语言**：中文（简体/繁体/粤语）、日文、韩文
- **欧洲语言**：英文、西班牙文、法文、德文、意大利文、葡萄牙文、俄文
- **其他语言**：阿拉伯文、荷兰文等

每种语言都有对应的国旗图标，方便用户识别和切换。

## 🔄 项目结构

```
frontend/
├── public/           # 静态资源文件
├── src/
│   ├── components/   # React 组件
│   ├── contexts/     # React Context
│   ├── hooks/        # 自定义 Hooks
│   ├── styles/       # 样式文件
│   ├── types/        # TypeScript 类型定义
│   ├── config.ts     # 配置文件（包含代理配置）
│   └── languages.ts  # 语言配置
├── .env.example      # 环境变量示例
└── package.json      # 项目依赖
```

## 🤝 贡献指南

### 关于这个 Fork

本项目是基于 [IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok) 的 Fork 版本，主要增加了以下功能：

#### 🆕 新增功能
- **智能代理系统**：解决部分地区访问维基百科的网络问题
- **图片代理支持**：确保维基媒体图片正常显示
- **环境变量配置**：灵活的部署配置管理
- **本地化优化**：针对中文用户的体验改进

#### 🔧 技术改进
- 增强的错误处理
- 更好的性能优化
- 改进的类型安全

### 如何贡献

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 上游同步

如果你想要同步原始仓库的更新：
```bash
git remote add upstream https://github.com/IsaacGemal/wikitok.git
git fetch upstream
git merge upstream/main
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

### 致谢

- **原项目**：[IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok)
- **原作者**：[@IsaacGemal](https://github.com/IsaacGemal)
- **图片代理服务**：[images.weserv.nl](https://images.weserv.nl/)
- **维基百科**：感谢维基百科提供的开放知识平台

### Star History

想了解原项目的发展历程？查看原项目的 Star History：

![Star History Chart](https://api.star-history.com/svg?repos=IsaacGemal/wikitok&type=Date)
