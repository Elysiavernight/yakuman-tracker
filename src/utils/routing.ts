export type Page = "home" | "leaderboard" | "profile";
export function route() {
  const [p, id] = window.location.hash.slice(2).split("/");
  return {
    page: (["home", "leaderboard", "profile"].includes(p ?? "")
      ? p
      : "home") as Page,
    id: id ?? "",
  };
}
