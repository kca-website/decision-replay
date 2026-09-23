import type { LifeLocale, LifeScenario, ScenarioChoice } from '../data/lifeScenarios';

type PuterChatResponse = {
  message?: {
    content?: string | null;
  };
};

declare global {
  interface Window {
    puter?: {
      ai?: {
        chat: (
          messages: Array<{ role: 'system' | 'user'; content: string }>,
          options?: Record<string, unknown>,
        ) => Promise<PuterChatResponse | string>;
      };
    };
  }
}

const fallback = (scenario: LifeScenario, locale: LifeLocale) =>
  scenario.reflection.map((item) => `• ${item[locale]}`).join('\n');

export const getAiCoachReflection = async (
  scenario: LifeScenario,
  choice: ScenarioChoice,
  locale: LifeLocale,
): Promise<{ text: string; source: 'ai' | 'curated' }> => {
  const puter = window.puter;
  if (!puter?.ai?.chat) {
    return { text: fallback(scenario, locale), source: 'curated' };
  }

  const languageInstruction =
    locale === 'el'
      ? 'Απάντησε στα ελληνικά.'
      : 'Answer in English.';

  const system = `You are a reflection coach inside a life-skills simulator for ages 10-17.
Your job is NOT to tell the child whether they were right or wrong.
Ask exactly three short, neutral reflection questions that help them consider consequences, other people, privacy/safety, and alternative actions.
Do not request personal information.
Do not invite the child to disclose private experiences.
Do not diagnose, moralize, shame, praise, score, or use therapy language.
Do not continue beyond the provided fictional scenario.
If the scenario suggests immediate physical danger, tell the child to stop and involve a trusted adult.
Keep the whole answer under 90 words.
${languageInstruction}`;

  const user = `FICTIONAL SCENARIO
Title: ${scenario.title[locale]}
Situation: ${scenario.situation[locale]}
Question: ${scenario.question[locale]}
Chosen action: ${choice.label[locale]}
Curated consequence: ${choice.consequence[locale]}

Return only the three reflection questions.`;

  try {
    const response = await puter.ai.chat(
      [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      {
        model: 'gpt-5.6-luna',
        max_tokens: 180,
        temperature: 0.25,
        normalize: true,
      },
    );

    if (typeof response === 'string' && response.trim()) {
      return { text: response.trim(), source: 'ai' };
    }

    const content =
      typeof response === 'object' && response
        ? response.message?.content
        : null;

    if (typeof content === 'string' && content.trim()) {
      return { text: content.trim(), source: 'ai' };
    }
  } catch {
    // The simulator must still work if the optional AI provider is unavailable.
  }

  return { text: fallback(scenario, locale), source: 'curated' };
};
