# WikiTok

*Read this in other languages: [中文](README_CN.md)*

A TikTok-style interface for exploring random Wikipedia articles with multi-language support and intelligent proxy features.

> **Project Origin**: This project is forked from [IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok), with added proxy functionality and localization improvements. Thanks to the original author [@IsaacGemal](https://github.com/IsaacGemal) for the excellent work!

## 🚀 Features

### Core Features (Inherited from Original)
- **TikTok-style Interface**: Vertical scrolling through random Wikipedia articles
- **Multi-language Support**: Supports 14 languages including Chinese, English, Spanish, French, German, Japanese, and more
- **Article Previews**: Display article images, titles, and excerpts
- **Social Sharing**: Share articles directly or copy links
- **Language Selector**: Language switching with country flag icons
- **Content Preloading**: Preload images and content for smooth scrolling
- **Responsive Design**: Works on both mobile and desktop
- **PWA Support**: Can be installed as a standalone app

### Enhanced Features (New in this Fork)
- **Intelligent Proxy**: Automatically detects network environment and uses proxy servers when needed to access Wikipedia
- **Image Proxy**: Proxy Wikimedia images through third-party services to ensure proper display
- **Environment Configuration**: Flexible configuration management
- **Localization Optimization**: Experience improvements for Chinese users

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling Framework**: Tailwind CSS
- **State Management**: React Context
- **Proxy Service**: Custom proxy configuration
- **Image Proxy**: images.weserv.nl
- **PWA**: Progressive Web App support

## 🔧 Proxy Features Deep Dive

This project integrates a complete proxy solution to solve Wikipedia access issues in certain regions:

### API Proxy
- **Auto-switching**: Automatically choose direct or proxy access based on network environment
- **Environment Configuration**: Configure different proxy servers through environment variables
- **Local Development**: Use independent proxy server addresses during local development

### Image Proxy
- **Third-party Service**: Use `images.weserv.nl` to proxy Wikimedia images
- **Auto-detection**: Automatically identify Wikimedia images and apply proxy

### Page Link Handling
- **Smart Processing**: Intelligently handle Wikipedia page links
- **Multiple Strategies**: Support various proxy strategies, adjustable as needed

### User Control
- **URL Parameters**: Users can manually control proxy through `?useProxy=true/false` parameters
- **Flexible Configuration**: Developers can adjust proxy strategies as needed

## Environment Configuration

You can set environment variables to enable proxy functionality before development:

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and set your configuration:
   ```bash
   # Production proxy server address
   VITE_PROXY_BASE_URL=https://your-proxy-server.com
   
   # Local development proxy server address
   VITE_LOCAL_BASE_URL=http://localhost:3001
   ```

3. Adjust other environment variables as needed

**Note**:
- The `.env` file contains sensitive information and will not be committed to the git repository
- Proxy functionality is optional; the app works normally even without configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_PROXY_BASE_URL` | Production proxy server address | - | No |
| `VITE_LOCAL_BASE_URL` | Local development proxy server address | - | No |
| `VITE_API_TIMEOUT` | API request timeout (milliseconds) | 5000 | No |
| `VITE_DEBUG_MODE` | Debug mode switch | false | No |

## Development

## Development

Run the commands below in the `/frontend` folder.

> **No backend required!** This is a pure frontend application that can run directly.

1. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

2. **Configure environment variables** (optional, for proxy functionality):
   ```bash
   cp .env.example .env
   # Edit .env file to set your proxy server
   ```

3. **Start development server**:
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Build for production**:
   ```bash
   bun build
   # or
   npm run build
   ```

## 🌐 Demo

- Original project demo: [wikitok.vercel.app](https://wikitok.vercel.app) or [wikitok.io](https://www.wikitok.io)
- This fork version: [Your deployment URL]

**Note**: This is a fork version based on the original WikiTok web project, not affiliated with wikitok.net or the independently developed WikiTok mobile apps.

## 📖 Usage

### Proxy Control

Users can control proxy behavior through the following methods:

- **URL Parameter Control**:
  - `?useProxy=true` - Force use proxy
  - `?useProxy=false` - Force disable proxy

- **Auto-detection**: The app automatically selects the best access method based on network environment

### Multi-language Support

The app supports 14 languages:
- **Asian Languages**: Chinese (Simplified/Traditional/Cantonese), Japanese, Korean
- **European Languages**: English, Spanish, French, German, Italian, Portuguese, Russian
- **Other Languages**: Arabic, Dutch, etc.

Each language has a corresponding flag icon for easy identification and switching.

## 🔄 Project Structure

```
frontend/
├── public/           # Static asset files
├── src/
│   ├── components/   # React components
│   ├── contexts/     # React Context
│   ├── hooks/        # Custom Hooks
│   ├── styles/       # Style files
│   ├── types/        # TypeScript type definitions
│   ├── config.ts     # Configuration file (includes proxy config)
│   └── languages.ts  # Language configuration
├── .env.example      # Environment variable example
└── package.json      # Project dependencies
```

No backend required!

## Demo

Check it out here at [wikitok.vercel.app](https://wikitok.vercel.app) or [wikitok.io](https://www.wikitok.io)

**Note:** This is the original WikiTok web project, not affiliated with wikitok.net or the independently developed WikiTok mobile apps for iPhone and Android.

## Contributing

### About This Fork

This project is a fork version based on [IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok), mainly adding the following features:

#### 🆕 New Features
- **Intelligent Proxy System**: Solve network issues for accessing Wikipedia in certain regions
- **Image Proxy Support**: Ensure Wikimedia images display properly
- **Environment Variable Configuration**: Flexible deployment configuration management
- **Localization Optimization**: Experience improvements for Chinese users

#### 🔧 Technical Improvements
- Enhanced error handling
- Better performance optimization
- Improved type safety

### How to Contribute

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Upstream Sync

If you want to sync updates from the original repository:
```bash
git remote add upstream https://github.com/IsaacGemal/wikitok.git
git fetch upstream
git merge upstream/main
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- **Original Project**: [IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok)
- **Original Author**: [@IsaacGemal](https://github.com/IsaacGemal)
- **Image Proxy Service**: [images.weserv.nl](https://images.weserv.nl/)
- **Wikipedia**: Thanks to Wikipedia for providing an open knowledge platform

## Star History

Want to see the development history of the original project? Check out the original project's Star History:

![Star History Chart](https://api.star-history.com/svg?repos=IsaacGemal/wikitok&type=Date)