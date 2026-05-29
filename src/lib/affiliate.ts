export const appendReferralParam = (
  url?: string,
  paramName = 'ref',
  paramValue?: string,
  fallback?: string
) => {
  const target = url ?? fallback;

  if (!target) {
    return '';
  }

  if (!paramValue) {
    return target;
  }

  try {
    const parsed = new URL(target);
    parsed.searchParams.set(paramName, paramValue);
    return parsed.toString();
  } catch {
    // If URL is invalid (e.g. relative), just return it
    return target;
  }
};
