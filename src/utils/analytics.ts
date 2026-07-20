export type ProductEventName =
  | 'demo_viewed'
  | 'decision_started'
  | 'decision_locked'
  | 'reminder_added'
  | 'replay_started'
  | 'replay_completed'
  | 'share_card_opened'
  | 'share_card_downloaded'
  | 'share_native_opened'
  | 'share_text_copied'
  | 'challenge_link_created'
  | 'challenge_completed';

type ProductEventProperties = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  plausible?: (eventName: string, options?: { props?: ProductEventProperties }) => void;
};

/**
 * Privacy-safe product event layer.
 *
 * Decision Replay does not install or enable analytics by itself. This function
 * only emits an in-browser CustomEvent and forwards the same anonymous event
 * name to an analytics adapter when the site owner has explicitly installed one.
 * Never pass decision titles, free text, ids or other user content here.
 */
export const trackEvent = (name: ProductEventName, properties: ProductEventProperties = {}): void => {
  if (typeof window === 'undefined') return;

  const safeProperties = Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  ) as ProductEventProperties;

  window.dispatchEvent(new CustomEvent('decision-replay:product-event', {
    detail: { name, properties: safeProperties },
  }));

  const analyticsWindow = window as AnalyticsWindow;

  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push({
      event: `decision_replay_${name}`,
      ...safeProperties,
    });
  }

  if (typeof analyticsWindow.plausible === 'function') {
    analyticsWindow.plausible(`decision_replay_${name}`, { props: safeProperties });
  }
};
