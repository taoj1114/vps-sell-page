const DEFAULT_REF = '10000';
const DEFAULT_FALLBACK = 'https://app.cloudcone.com/?ref=10000';

export const buildAffiliateUrl = (
  url?: string,
  options: {
    ref?: string;
    fallback?: string;
  } = {}
) => {
  const ref = options.ref ?? DEFAULT_REF;
  const fallback = options.fallback ?? DEFAULT_FALLBACK;
  const target = url ?? fallback;

  try {
    const parsed = new URL(target);
    parsed.searchParams.set('ref', ref);
    return parsed.toString();
  } catch {
    return `${fallback}${fallback.includes('?') ? '&' : '?'}ref=${ref}`;
  }
};
