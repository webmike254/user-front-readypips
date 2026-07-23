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

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data**: Financial Modeling Prep API, LSE Data API

## 📸 Screenshots

### Dashboard
![Dashboard](https://i.postimg.cc/sX5XGLk8/Ready-pips-black-ligo-removebg-preview-(2).png)

### My Courses
![Courses](public/funding_pips_picture_2.jpg)

### Live Classes
![Live Classes](public/funding_pips_picture_3.png)

### Subscriptions
![Subscriptions](public/funding_pips_picture_4.jpg)

## 🏗 Installation

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

## 🌐 Deployment

The app is deployed on Vercel at: [https://readypips-clients-dashboard.vercel.app](https://readypips-clients-dashboard.vercel.app)

## 📁 Project Structure

```
src/
├── api/           # API integrations (FMP, LSE)
├── components/    # React components
│   ├── ui/        # UI primitives
│   └── ...        # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utilities
└── services/      # External services
```

## 🔑 Environment Variables

- `VITE_FMP_API_KEY` - Financial Modeling Prep API key
- `VITE_LSE_API_KEY` - LSE Data API key

## 📄 License

MIT