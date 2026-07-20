// Encode/decode challenge data in URL-safe base64
export interface ChallengeData {
  q: string;      // question/title
  s?: string;     // situation
  o: string[];    // options
  ci: number;     // choiceIndex
  p: string;      // prediction (expected)
  c: number;      // confidence
  n: string;      // challenger name
  t: number;      // timestamp
}

export const encodeChallenge = (data: ChallengeData): string => {
  const json = JSON.stringify(data);
  // btoa doesn't handle unicode — use encodeURIComponent first
  const encoded = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) =>
    String.fromCharCode(parseInt(p1, 16))
  ));
  // Make URL-safe
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodeChallenge = (str: string): ChallengeData | null => {
  try {
    // Restore base64
    let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const decoded = decodeURIComponent(
      atob(b64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const buildChallengeUrl = (data: ChallengeData): string => {
  const base = window.location.origin;
  return `${base}/challenge#d=${encodeChallenge(data)}`;
};
