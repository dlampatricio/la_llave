import { PRODUCTS } from "@/data/catalog";
import { SERVICES } from "@/data/services";
import { normalizeText } from "@/lib/utils";

function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }

  return prev[b.length];
}

function thresholdFor(length: number) {
  if (length <= 4) return 1;
  if (length <= 8) return 2;
  return 3;
}

function buildSearchTerms() {
  const terms = new Set<string>();

  for (const p of PRODUCTS) {
    if (!p.active) continue;
    terms.add(p.name);
    if (p.sku) terms.add(p.sku);
    terms.add(p.category.name);
  }
  for (const s of SERVICES) {
    if (!s.active) continue;
    terms.add(s.name);
    terms.add(s.category.name);
  }

  for (const term of [...terms]) {
    for (const word of term.split(/\s+/)) {
      if (word.length >= 3) terms.add(word);
    }
  }

  return [...terms];
}

export function suggestTerm(q: string): string | null {
  const query = normalizeText(q).trim();
  if (!query) return null;

  let best: { term: string; distance: number; length: number } | null = null;

  for (const term of buildSearchTerms()) {
    const normalized = normalizeText(term);
    const pairs: [string, string][] = [[query, normalized]];
    const queryWords = query.split(/\s+/);
    const termWords = normalized.split(/\s+/);
    if (queryWords.length > 1 || termWords.length > 1) {
      for (const qw of queryWords) {
        for (const tw of termWords) pairs.push([qw, tw]);
      }
    }

    for (const [a, b] of pairs) {
      if (!a || !b || a === b) continue;
      const distance = levenshtein(a, b);
      if (distance === 0 || distance > Math.max(thresholdFor(a.length), thresholdFor(b.length))) {
        continue;
      }
      if (
        !best ||
        distance < best.distance ||
        (distance === best.distance && normalized.length < best.length)
      ) {
        best = { term, distance, length: normalized.length };
      }
    }
  }

  return best?.term ?? null;
}