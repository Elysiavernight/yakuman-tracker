const apiBase = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");
const prefetched = new Map<string, Promise<unknown>>();

export function prefetchApi(path: string) {
  if (prefetched.has(path)) return;
  const request = requestApi<unknown>(path);
  prefetched.set(path, request);
  // A failed catalog can prevent the app from mounting to consume these.
  void request.catch(() => {});
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  if (!options && prefetched.has(path)) {
    const request = prefetched.get(path)!;
    prefetched.delete(path);
    return request as Promise<T>;
  }
  return requestApi<T>(path, options);
}

async function requestApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options?.body !== undefined
        ? { "Content-Type": "application/json" }
        : {}),
      ...options?.headers,
    },
  });
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      "The API is unavailable or returned an unexpected response.",
    );
  }
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  return data as T;
}
export const send = (method: string, body?: unknown): RequestInit => ({
  method,
  ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
});
export function readImage(file: File): Promise<string> {
  if (
    !["image/png", "image/jpeg", "image/webp", "image/gif"].includes(
      file.type,
    ) ||
    file.size > 5 * 1024 * 1024
  )
    return Promise.reject(
      new Error("Choose a PNG, JPEG, WebP or GIF under 5 MB."),
    );
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("The image could not be read."));
    reader.readAsDataURL(file);
  });
}
export function timeAgo(date: string) {
  const hours = Math.max(
    0,
    Math.floor((Date.now() - new Date(date).getTime()) / 3600000),
  );
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  if (hours < 168) return `${Math.floor(hours / 24)}d ago`;
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}
