export type Role = 'user' | 'assistant'

export interface Message {
  id: string
  role: Role
  content: string
  timestamp: Date
}

export interface QuickPrompt {
  label: string
  prompt: string
  icon: string
}

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    label: 'My Role',
    prompt: 'How do roles work in Concrete? What are the different tiers and how do I level up?',
    icon: '⬡',
  },
  {
    label: 'XP System',
    prompt: 'Explain the XP system. How do I earn XP and what are the thresholds?',
    icon: '◈',
  },
  {
    label: 'My Bag',
    prompt: 'How do bags and token holdings work? What perks do different amounts unlock?',
    icon: '◆',
  },
  {
    label: 'Nominations',
    prompt: 'How do I nominate someone for a role upgrade? What is the process?',
    icon: '▲',
  },
  {
    label: 'Get Started',
    prompt: 'I am new to Concrete. How do I get started and verify my wallet?',
    icon: '→',
  },
  {
    label: 'Airdrops',
    prompt: 'Am I eligible for airdrops? What are the requirements?',
    icon: '◎',
  },
]
