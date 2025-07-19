# WikiTok

*Read this in other languages: [中文](README_CN.md)*

A TikTok-style interface for exploring random Wikipedia articles with multi-language support and intelligent proxy features.

> **Project Origin**: This project is forked from [IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok), with added proxy functionality and localization improvements. Thanks to the original author [@IsaacGemal](https://github.com/IsaacGemal) for the excellent work!

## 🚀 Features

- **TikTok-style Interface**: Vertical scrolling through random Wikipedia articles
- **Multi-language Support**: 14 languages with flag icons
- **Intelligent Proxy**: Auto-detects network environment and uses proxy when needed
- **Image Proxy**: Ensures Wikimedia images display properly via `images.weserv.nl`
- **Responsive Design**: Works on mobile and desktop
- **PWA Support**: Can be installed as a standalone app

## 🛠️ Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Custom proxy configuration
- [API Proxy Server](https://github.com/shinexyt/wikipedia-proxy-server)

## 🔧 Proxy Configuration

### API Proxy
The project uses a custom proxy server to solve Wikipedia access issues in certain regions.
- **Proxy Server Repository**: [shinexyt/wikipedia-proxy-server](https://github.com/shinexyt/wikipedia-proxy-server)
- **Auto-switching**: Automatically chooses direct or proxy access
- **URL Control**: Users can force proxy with `?useProxy=true/false`

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_PROXY_BASE_URL` | Production proxy server address | - |
| `VITE_LOCAL_BASE_URL` | Local development proxy server address | - |

## 🚀 Quick Start

Run the commands below in the `/frontend` folder:

1. **Install dependencies**:
   ```bash
   bun install
   # or npm install
   ```

2. **Configure proxy (optional)**:
   ```bash
   cp .env.example .env
   # Edit .env to set your proxy server from the API proxy repository
   ```

3. **Start development**:
   ```bash
   bun run dev
   # or npm run dev
   ```

## 🌐 Demo


- [wikitok.littlejoy.live](https://wikitok.littlejoy.live)

## 📖 Usage

- **Multi-language Support**: 14 languages with flag icons
- **Proxy Control**: Use `?useProxy=true/false` URL parameters to control proxy behavior
- **Auto-detection**: App automatically selects the best access method

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Original Project**: [IsaacGemal/wikitok](https://github.com/IsaacGemal/wikitok)
- **API Proxy Server**: [shinexyt/wikipedia-proxy-server](https://github.com/shinexyt/wikipedia-proxy-server)
- **Image Proxy Service**: [images.weserv.nl](https://images.weserv.nl/)
- **Wikipedia**: Thanks to Wikipedia for providing an open knowledge platform