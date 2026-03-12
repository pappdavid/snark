# 🐍 Snark — AI Code Review With Actual Opinions

> "We review your code. We judge your life choices."

Snark is a snarky, cynical AI-powered code review SaaS that integrates with your GitHub pull requests and delivers brutally honest feedback. Think CodeRabbit, but it actually has a personality disorder.

## Features

- 🔥 **Brutally Honest Reviews** — GPT-4o powered, zero sugarcoating
- 📊 **Cringe Score™** — Quantify your shame on a scale of 1-10
- 🔗 **GitHub PR Integration** — Automatic reviews on every PR
- 🛋️ **Therapy Recommendations** — Personalized recovery plans for your code crimes
- ⚙️ **Adjustable Snark Level** — "Mildly Rude" to "Absolutely Savage"
- 💳 **Subscription Tiers** — Free (3/mo), Pro ($12/mo), Team ($49/mo)

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Auth**: NextAuth.js + GitHub OAuth
- **Database**: Prisma + SQLite (dev) / PostgreSQL (prod)
- **AI**: OpenAI GPT-4o with a custom cynical system prompt
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### 1. Clone and Install

\`\`\`bash
git clone https://github.com/yourusername/snark.git
cd snark
npm install
\`\`\`

### 2. Set Up Environment Variables

\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in the values in \`.env.local\`.

### 3. Set Up the Database

\`\`\`bash
npm run db:push
\`\`\`

### 4. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) and prepare to be humbled.

## License

MIT.
