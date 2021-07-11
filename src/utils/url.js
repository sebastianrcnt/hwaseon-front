export function parseCoupangItemId(itemUrl) {
  try {
    const url = new URL(itemUrl);
    const beforeInt = url.pathname.split("/")[3];
    var reg = /^\d+$/;
    if (!reg.test(beforeInt)) {
      throw new Error();
    }
    return parseInt(beforeInt);
  } catch {
    return -1;
  }
}
