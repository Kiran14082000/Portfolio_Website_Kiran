import { NextRequest, NextResponse } from 'next/server';
import { profile } from '@/lib/profile';

export const runtime = 'nodejs';

function answerFor(question: string) {
  const q = question.toLowerCase();
  const contact = `You can contact Kiran at ${profile.email} or connect on LinkedIn: ${profile.linkedin}.`;

  if (/hello|hi\b|hey|good morning|good afternoon/.test(q)) {
    return `Hello! I'm Kiran's portfolio assistant. I can answer questions about Kiran's skills, experience, education, projects, and contact details. What would you like to know?`;
  }
  if (/skill|technolog|programming|tools|stack/.test(q)) {
    return `Kiran's skills include ${profile.skills.map((group) => `${group.group}: ${group.items.join(', ')}`).join('; ')}.`;
  }
  if (/experience|work|career|employer|cognizant|aml shop|ethosight/.test(q)) {
    return `Kiran's professional experience includes: ${profile.experience.map((job) => `${job.role} at ${job.company} (${job.period}) — ${job.bullets.join(' ')}`).join(' ')}`;
  }
  if (/education|college|degree|study|studied/.test(q)) {
    return `Kiran's education: ${profile.education.map((item) => `${item.degree} from ${item.school} (${item.period})`).join('; ')}.`;
  }
  if (/project|portfolio|built|classifier|object detection|resume suitability/.test(q)) {
    return `Kiran's documented projects: ${profile.projects.map((project) => `${project.title}: ${project.details} Technologies: ${project.tags.join(', ')}.`).join(' ')}`;
  }
  if (/achievement|impact|accuracy|f1|manual effort|result|metric/.test(q)) {
    return `Highlights from Kiran's resume: ${profile.highlights.map((item) => `${item.value} ${item.label} — ${item.detail}`).join('; ')}.`;
  }
  if (/contact|email|linkedin|github|phone|reach/.test(q)) {
    return `Email: ${profile.email}. LinkedIn: ${profile.linkedin}. GitHub: ${profile.github}. ${contact}`;
  }
  if (/location|where|based/.test(q)) return `Kiran is based in ${profile.location}.`;
  if (/resume|cv/.test(q)) return `You can download Kiran's resume using the Download Resume link on this website. ${contact}`;

  return `I can answer questions about Kiran's skills, professional experience, education, projects, achievements, and contact details. I only use information published in this portfolio, so I don't want to guess. For a question not covered here, ${contact}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    if (!messages.length || messages.some((m: any) => !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || m.content.length > 2000)) {
      return NextResponse.json({ error: 'Please send a valid message.' }, { status: 400 });
    }
    const latestUserMessage = [...messages].reverse().find((message: any) => message.role === 'user');
    if (!latestUserMessage) return NextResponse.json({ error: 'Please ask a question.' }, { status: 400 });
    return NextResponse.json({ answer: answerFor(latestUserMessage.content) });
  } catch {
    return NextResponse.json({ error: 'Unable to process the message.' }, { status: 500 });
  }
}
