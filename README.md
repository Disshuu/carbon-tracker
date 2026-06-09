# 🌿 EcoTrace — Carbon Footprint Tracker

AI-powered carbon footprint awareness platform built for PromptWars 2026.

## Features
- 3-step carbon footprint calculator (Transport · Food · Energy)
- Real-time CO₂ score as you fill in your data
- Visual dashboard with pie chart & benchmark comparison
- Claude AI-powered personalized reduction tips

## Tech Stack
React · Recharts · Anthropic Claude API · Vercel

## Setup

```bash
npm install
```

Create a `.env` file:
```
REACT_APP_ANTHROPIC_API_KEY=your_key_here
```

```bash
npm start
```

## Deploy to Vercel
1. Push to GitHub
2. Go to vercel.com → Import repo
3. Add `REACT_APP_ANTHROPIC_API_KEY` in Environment Variables
4. Deploy!
