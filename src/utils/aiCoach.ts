import type { LifeLocale, LifeScenario, ScenarioChoice } from '../data/lifeScenarios';

const fallback = (scenario: LifeScenario, locale: LifeLocale) =>
  scenario.reflection.map((item) => `• ${item[locale]}`).join('\n');

export const getAiCoachReflection = async (
  scenario: LifeScenario,
  choice: ScenarioChoice,
  locale: LifeLocale,
): Promise<{ text: string; source: 'ai' | 'curated' }> => {
  try {
    const response = await fetch('/api/reflect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: scenario.id,
        choiceId: choice.id,
        locale,
      }),
    });

    if (!response.ok) {
      return { text: fallback(scenario, locale), source: 'curated' };
    }

    const data = (await response.json()) as { text?: string };
    if (typeof data.text === 'string' && data.text.trim()) {
      return { text: data.text.trim(), source: 'ai' };
    }
  } catch {
    // Keep the simulator usable even if the optional AI service is unavailable.
  }

  return { text: fallback(scenario, locale), source: 'curated' };
};
