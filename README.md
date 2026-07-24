# ReadyPips - Client Dashboard

A professional trading education platform with real-time market data, charts, and trading tools. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Dashboard** - Real-time market overview, portfolio stats, course progress tracking
- **My Courses** - Browse and manage trading courses with progress tracking
- **Live Classes** - Join live trading sessions and mentorship classes
- **TradingView** - Real-time charts and market analysis
- **Subscriptions** - Manage memberships and funding challenges
- **Community** - Connect with fellow traders
- **Certificates** - View and download earned certificates
- **Settings** - Account management and preferences
- **Market Screener** - Real-time market data with sector performance charts

## 🛠 Tech Stack
- **Frontend**: React 18, TypeScript, Vite, React Router v6
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Context API (Sidebar, Page)
- **Charts**: Recharts
- **Deployment**: Vercel

## 📸 Screenshots

### Dashboard
![Dashboard](https://i.postimg.cc/P5j0F2Rk/dashboard-ss.png)

### My Courses
![My Courses](https://i.postimg.cc/XJzYJ8gC/my-courses-ss.png)

### Live Classes
![Live Classes](https://i.postimg.cc/y6cWp6vj/live-classes-ss.png)

### Subscriptions
![Subscriptions](https://i.postimg.cc/kGYX1b7J/subscriptions-ss.png)

## 🏗 Project Setup

```bash
# Clone the repository
git clone https://github.com/webmike254/user-front-readypips.git

# Navigate to project directory
cd user-front-readypips

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Build

```bash
npm run build
```

## 🚀 Live Demo

**Public URL**: [https://readypipsfinall.vercel.app](https://readypipsfinall.vercel.app)

## 📁 Project Structure

```
src/
├── components/    # Reusable UI components and pages
│   ├── ui/        # Shadcn UI primitives
│   ├── Sidebar/
│   ├── pages/     # Page-specific components
│   └── Charts.tsx # Recharts components
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── ...
```

## 🔑 Environment Variables

- `VITE_API_URL` - Base URL for API requests

## 📜 License

MIT