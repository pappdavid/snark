import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PricingCard } from '@/components/PricingCard'
import { SnarkReview } from '@/components/SnarkReview'

const features = [
  {
    icon: '🔥',
    title: 'Brutally Honest Reviews',
    description: 'No sugarcoating. No participation trophies. Just raw, unfiltered truth about your terrible code.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Snark',
    description: 'GPT-4o trained on decades of Stack Overflow shame and r/programminghorror nightmares.',
  },
  {
    icon: '📊',
    title: 'Cringe Score™',
    description: 'Quantify your shame on a scale of 1-10. See yourself improve over time (or not).',
  },
  {
    icon: '🔗',
    title: 'GitHub Integration',
    description: 'Automatically reviews every PR. Your teammates will think you hired a very mean consultant.',
  },
  {
    icon: '💊',
    title: 'Therapy Recommendations',
    description: 'Every review ends with a personalized therapy suggestion. Professional help, included free.',
  },
  {
    icon: '⚙️',
    title: 'Adjustable Snark Level',
    description: 'From "Mildly Rude" to "Absolutely Savage". Because some codebases deserve special treatment.',
  },
]

const demoReview = {
  prTitle: 'feat: add user authentication',
  cringeScore: 7,
  summary: `Oh... oh no. Where do I even begin?\n\nYou've implemented authentication by storing passwords in plain text in a JSON file. In 2024. I haven't seen this level of confidence in the face of catastrophic insecurity since a developer told me localStorage was "basically a database."\n\nThe good news: you clearly have enthusiasm. The bad news: enthusiasm without knowledge is how security breaches happen. Your "authentication system" has approximately 12 critical vulnerabilities, and I found them in 30 seconds. A malicious actor would need maybe 45.\n\nHere's what you need to do:`,
  comments: [
    {
      file: 'lib/auth.js',
      line: 42,
      severity: 'critical',
      comment: '`passwords[username] = password` — I\'m going to need a moment. A MOMENT. You\'re storing passwords in a plain object. In memory. That you\'re serializing to a JSON file. This isn\'t just wrong, it\'s artistically wrong. It takes a special kind of confidence to reinvent insecurity this thoroughly.\n\n**What to do instead**: Use bcrypt. Use argon2. Use literally any hashing library. Please.',
    },
    {
      file: 'middleware/auth.js',
      line: 15,
      severity: 'high',
      comment: '`if (req.headers.admin === \'true\')` — I genuinely laughed out loud. You\'re checking for admin privileges via a request header that the client controls. The client. Controls. This is the authentication equivalent of a "no girls allowed" sign — anyone who can read it can bypass it.',
    },
  ],
  therapy: 'Based on this code, I recommend "The Phoenix Project" (you need hope), followed by immediate enrollment in any web security course. Consider also: a long walk, some chamomile tea, and reflecting on the choices that led you here.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <span className="text-xl font-bold text-white">Snark</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Try It Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 text-indigo-300 px-4 py-1.5 rounded-full text-sm mb-8">
            <span>🔥</span>
            <span>Now roasting code in 47 repositories</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            AI Code Review
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              With Actual Opinions
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
            We review your code. We judge your life choices.
          </p>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Snark integrates with your GitHub PRs and delivers brutally honest, 
            snarky code reviews. Like CodeRabbit, but it actually has opinions about 
            your nested ternaries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                Start Getting Roasted — Free
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 px-8">
                See a Live Demo
              </Button>
            </Link>
          </div>
          <p className="text-gray-600 text-xs mt-6">
            No credit card required. First 3 reviews free. Emotional damage not guaranteed but likely.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800 px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '47K+', label: 'PRs Judged' },
            { value: '8.3', label: 'Avg Cringe Score' },
            { value: '1,200+', label: 'Devs Humbled' },
            { value: '0', label: 'Feelings Spared' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">
            Everything You Need to Feel Bad About Your Code
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Comprehensive code review tooling, now with 100% more existential dread.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-800 transition-colors"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section id="demo" className="px-6 py-24 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">
            A Live Taste of the Pain
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Real review. Real snark. Real tears (developer&apos;s own).
          </p>
          <SnarkReview review={demoReview} />
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">
            Pay for the Privilege of Being Insulted
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Choose your tier of humiliation. Cancel anytime (though your code quality won&apos;t improve).
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard
              name="Free"
              price="$0"
              period="forever"
              description="For developers who aren't sure they can handle the truth yet."
              features={[
                '3 reviews per month',
                'Basic snark level',
                'Cringe Score™',
                'GitHub integration',
                'Community shame (public reviews)',
              ]}
              cta="Start Free"
              href="/login"
            />
            <PricingCard
              name="Pro"
              price="$12"
              period="per month"
              description="For developers who know they have problems and want detailed feedback."
              features={[
                'Unlimited reviews',
                'Adjustable snark level',
                'Detailed inline comments',
                'Therapy recommendations',
                'PR history & analytics',
                'Priority roasting',
              ]}
              cta="Get Roasted Pro"
              href="/login"
              highlighted
            />
            <PricingCard
              name="Team"
              price="$49"
              period="per month"
              description="For entire teams of developers who want to judge each other's work."
              features={[
                'Up to 10 seats',
                'Everything in Pro',
                'Team leaderboard (most cringe)',
                'Slack notifications',
                'Custom snark personas',
                'Dedicated shame channel',
              ]}
              cta="Shame My Team"
              href="/login"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center border-t border-gray-800">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">
            Your Code Won&apos;t Review Itself
          </h2>
          <p className="text-gray-400 mb-8">
            (And frankly, it shouldn&apos;t. You&apos;ve done enough damage.)
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10">
              Start Getting Roasted — It&apos;s Free
            </Button>
          </Link>
          <p className="text-gray-600 text-xs mt-4">
            Snark LLC is not responsible for any emotional damage caused to developers whose code is reviewed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐍</span>
            <span className="font-bold text-gray-300">Snark</span>
            <span className="text-gray-600 text-sm ml-2">© 2024 Snark LLC</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-gray-300 transition-colors">Sign In</Link>
            <a href="https://github.com" className="hover:text-gray-300 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
