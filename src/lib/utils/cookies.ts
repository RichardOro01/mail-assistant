export const getCookies = (): Record<string, string> =>
  document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    return { ...acc, [key.trim()]: value };
  }, {});
