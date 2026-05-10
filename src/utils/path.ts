export function withBase(path: string) {
  if (/^(https?:|mailto:|#)/.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}${path.replace(/^\/+/, "")}`;
}

export function withoutBase(pathname: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || "/";
  }

  return pathname;
}
