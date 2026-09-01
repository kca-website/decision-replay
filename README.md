# Decision Replay — AI Advice Passport

**AI answers age. Know when yours needs to be checked again.**

Decision Replay has been repositioned from a generic decision journal into a privacy-first **AI Advice Passport**. The product helps a user keep an important AI answer together with the claims, recommendations and predictions it contains, an estimated freshness window, a recheck date and — when relevant — the real-world outcome of following the advice.

## Why this pivot

The previous Decision Replay was a well-implemented decision journal, but the category is crowded and the product's main value arrived too late. AI Advice Passport moves the value event to the moment the answer is saved:

1. Paste an important answer from ChatGPT, Claude, Gemini, Copilot, Grok, Perplexity or another AI.
2. The browser separates the text into **claims**, **recommendations** and **predictions**.
3. Each item receives a user-editable freshness class:
   - **Stable** — default recheck window: 180 days.
   - **Time-sensitive** — default recheck window: 30 days.
   - **Highly volatile** — default recheck window: 7 days.
4. The shortest freshness window becomes the Passport's next recheck date.
5. If the user follows the advice, they can later record whether it worked fully, partly, not at all, or made things worse.
6. The Reliability view summarizes the user's own outcomes by AI source.

## Important product rule

The MVP does **not** claim to verify factual truth and does not produce an artificial “AI accuracy score”. Freshness is an ageing-risk signal, not proof that a claim is correct or incorrect.

The current analysis is deterministic and local. It identifies time-sensitive wording, prices, availability, plan/features, regulation/travel terms and recommendation/prediction language. The user can edit the resulting classification before saving.

## Privacy

- No account.
- No backend.
- No pasted AI answer is sent to a server.
- Passports are stored in browser `localStorage` for the MVP.
- No external AI API is required.

## MVP screens

- Landing / concept explanation
- Create Advice Passport
- Passport review and user-editable freshness classification
- Passport library
- Passport detail + recheck action
- Real-world outcome replay
- Personal reliability summary
- Greek / English interface toggle

## Future validation before adding infrastructure

The next product test should answer three questions before adding paid APIs or backend services:

1. Do users save AI answers they expect to reuse?
2. Do freshness/recheck signals change their behaviour?
3. Do enough users return to record real-world outcomes to make personal reliability useful?

Only after those are validated should the project add live source revalidation / automatic Advice Recall.

## Technology

- React 18 + TypeScript + Vite
- Lucide React
- Browser local storage

The repository still contains legacy Decision Replay modules from the previous product direction, but the new entry point no longer imports them. They can be removed after the pivot is validated.
