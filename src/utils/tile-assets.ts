const images = import.meta.glob<string>("../assets/tiles/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});

const honors = ["Ton", "Nan", "Shaa", "Pei", "Haku", "Hatsu", "Chun"];
const suits: Record<string, string> = { m: "Man", p: "Pin", s: "Sou" };

export function tileImage(id: string): string {
  const number = Number(id[0]);
  const suit = id[1] ?? "";
  const name = suit === "z" ? honors[number - 1] : `${suits[suit]}${number}`;
  return (
    images[`../assets/tiles/${name}.svg`] ?? images["../assets/tiles/Blank.svg"]!
  );
}
