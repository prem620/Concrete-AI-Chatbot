# CONCRETE // Community Assistant

A futuristic AI chatbot for the Concrete community — built with Next.js 14, Tailwind CSS, and Google Gemini.

## Features

- 🤖 **AI-Powered** — Google Gemini 1.5 Flash with community-specific knowledge
- 🎨 **Crypto/Web3 Aesthetic** — Dark futuristic UI with Orbitron font, cyan accents, hex motifs
- 💬 **Full Chat Interface** — Message history, typing indicator, auto-scroll
- ⚡ **Quick Prompts** — One-tap prompts for Roles, XP, Bags, Nominations
- 📱 **Mobile Responsive** — Fully optimized for all screen sizes
- 🔢 **Live Stats** — Real-time UTC clock and simulated block counter
- ✨ **Rich Formatting** — Markdown-like rendering in AI responses

## Bot Knowledge Base

CORE assists with:
- **Roles** — Lurker → Builder → Architect → Validator → Core tiers
- **XP** — Earning, decay, thresholds, leaderboard
- **Bags** — CONCRETE token holdings, perks, airdrop eligibility
- **Nominations** — Process, requirements, voting
- **Community FAQs** — Wallet verification, events, governance

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure API key

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Gemini API key:
```
GEMINI_API_KEY=your_key_here
```

Get a free key at: https://aistudio.google.com/app/apikey

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
concrete-bot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # Gemini API handler
│   ├── globals.css            # Global styles + animations
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ChatInterface.tsx      # Main chat orchestrator
│   ├── ChatInput.tsx          # Message input box
│   ├── Header.tsx             # Top navigation bar
│   ├── MessageBubble.tsx      # Chat message bubbles
│   ├── QuickPrompts.tsx       # Welcome + quick action chips
│   └── TypingIndicator.tsx    # Loading animation
├── lib/
│   ├── formatMessage.ts       # Markdown → HTML formatter
│   └── types.ts               # TypeScript types + quick prompts
├── .env.local.example
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Customization

### Update the system prompt
Edit `app/api/chat/route.ts` → `SYSTEM_PROMPT` to customize CORE's knowledge.

### Add more quick prompts
Edit `lib/types.ts` → `QUICK_PROMPTS` array.

### Adjust the color scheme
Edit `tailwind.config.js` → `colors.concrete` object.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 1.5 Flash
- **Fonts**: Orbitron (display), Inter (body), IBM Plex Mono
- **Language**: TypeScript
