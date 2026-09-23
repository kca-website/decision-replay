const SCENARIOS = {
  "gaming-instagram": {
    title: "A gaming teammate asks for the user's Instagram after playing together for weeks.",
    situation: "The teammate says they are the same age and wants to move the conversation outside the game.",
    choices: {
      share: "Give them the Instagram account.",
      stay: "Keep chatting only inside the game.",
      ask: "Ask a trusted adult first."
    }
  },
  "viral-challenge": {
    title: "A viral challenge looks fun but may be unsafe.",
    situation: "Friends want to try a challenge with millions of views, but something in the instructions feels risky.",
    choices: {
      join: "Try it because many people are doing it.",
      check: "Check what it involves before joining.",
      skip: "Skip it if its safety cannot be verified."
    }
  },
  "ai-homework": {
    title: "AI produced a polished school assignment.",
    situation: "The text contains facts and dates the student does not remember from class and the deadline is close.",
    choices: {
      submit: "Submit the AI text as-is.",
      verify: "Verify key facts and correct the text.",
      restart: "Start from personal notes and use AI only for support."
    }
  },
  "deepfake-teacher": {
    title: "A shocking video of a teacher may be a deepfake.",
    situation: "A class group chat receives a video of a teacher apparently saying something offensive, and students want to forward it.",
    choices: {
      forward: "Forward it and let others decide.",
      pause: "Do not forward it and look for the original source.",
      report: "Show it to a responsible adult without reposting it."
    }
  },
  "group-photo": {
    title: "An awkward photo of a classmate appears in a group chat.",
    situation: "People are laughing and someone suggests posting it publicly without the classmate's permission.",
    choices: {
      laugh: "React to the photo.",
      silent: "Do not join in, but say nothing.",
      speak: "Ask that it not be reposted and that it be deleted."
    }
  },
  "exclude-classmate": {
    title: "A friend group wants to exclude a classmate from an outing.",
    situation: "The group says the classmate ruins the mood and asks everyone to keep the plan secret.",
    choices: {
      agree: "Go along with the group.",
      question: "Ask what happened and whether there is another way.",
      optout: "Refuse to take part in a secret exclusion."
    }
  },
  "fake-profile": {
    title: "A new account claims to belong to a friend.",
    situation: "The account asks for a verification code that will arrive on the user's phone.",
    choices: {
      send: "Send the verification code.",
      verify: "Contact the friend through another channel.",
      ignore: "Do not reply and report the account."
    }
  },
  "private-screenshot": {
    title: "A screenshot from someone else's private conversation is shared.",
    situation: "A friend sends the screenshot and says it contains comments about the group.",
    choices: {
      share: "Forward it to the group.",
      ask: "Ask how it was obtained and do not forward it.",
      delete: "Delete it and refuse to participate."
    }
  },
  "ai-advice": {
    title: "An AI chatbot gives confident advice about a friendship conflict.",
    situation: "The AI says the friend is manipulative and recommends cutting contact, despite knowing only part of the story.",
    choices: {
      follow: "Follow the AI advice because it sounds confident.",
      consider: "Treat it as one perspective, not a final decision.",
      human: "Also speak with a person who knows the context."
    }
  },
  "free-reward": {
    title: "A link promises free in-game coins for a limited time.",
    situation: "The page looks official but asks for a username and password.",
    choices: {
      login: "Log in through the linked page.",
      official: "Check the offer through the official game or app.",
      skip: "Ignore it if it asks for a password outside the official app."
    }
  }
};

const ALLOWED_ORIGINS = new Set([
  "https://your-decision-replay.vercel.app"
]);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin) && !origin.endsWith(".vercel.app")) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "AI service is not configured" });
  }

  const { scenarioId, choiceId, locale } = req.body || {};
  const scenario = SCENARIOS[scenarioId];
  const choice = scenario?.choices?.[choiceId];

  if (!scenario || !choice || !["el", "en"].includes(locale)) {
    return res.status(400).json({ error: "Invalid scenario request" });
  }

  const language = locale === "el" ? "Greek" : "English";

  const prompt = `You are a reflection coach inside a short life-skills simulator for young people ages 10-17.

The user cannot send you free text. You are given only a fixed fictional scenario and a fixed selected action.

Rules:
- Respond in ${language}.
- Ask exactly 3 short reflection questions.
- Do not say the choice was right, wrong, good, bad, smart, or foolish.
- Do not score, praise, shame, moralize, diagnose, or use therapy language.
- Do not ask for personal information or invite disclosure of private experiences.
- Keep the questions grounded only in this fictional scenario.
- Help the learner consider consequences, other people's perspectives, safety/privacy, evidence, or an alternative action.
- If physical danger is relevant, one question may point toward involving a trusted adult.
- Keep the full answer under 90 words.
- Output only the three questions, one per line.

SCENARIO:
${scenario.title}
${scenario.situation}

SELECTED ACTION:
${choice}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{ role: "user", content: prompt }],
        reasoning_effort: "low",
        reasoning_format: "hidden",
        temperature: 0.55,
        max_completion_tokens: 220
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Groq request failed", response.status, detail.slice(0, 300));
      return res.status(502).json({ error: "AI service unavailable" });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return res.status(502).json({ error: "Empty AI response" });
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error("AI reflection error", error instanceof Error ? error.message : "unknown error");
    return res.status(502).json({ error: "AI service unavailable" });
  } finally {
    clearTimeout(timeout);
  }
}
