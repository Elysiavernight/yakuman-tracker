import { useState } from "react";
import type { Post, Stats } from "../../types";
import { useCatalog } from "../../providers/catalog";
import { Avatar, Empty, Icon } from "../../components/index";
import { Loading, ErrorState } from "../../components/Feedback/Feedback";

export function LeaderboardPage({
  posts,
  stats,
  loading,
  error,
  retry,
  onProfile,
}: {
  posts: Post[];
  stats: Stats;
  loading: boolean;
  error: string;
  retry: () => void;
  onProfile: (id: string) => void;
}) {
  const { yakumans, getYakuman } = useCatalog();
  const [mode, setMode] = useState("players");
  const [specific, setSpecific] = useState<string>(yakumans[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const leaders = stats.leaders
    .map((l) => ({
      ...l,
      count:
        mode === "specific"
          ? posts.filter(
              (p) => p.userId === l.user.id && p.types.includes(specific),
            ).length
          : l.count,
    }))
    .filter(
      (l) =>
        l.user.name.toLowerCase().includes(query.toLowerCase()) ||
        l.user.username.includes(query.toLowerCase()),
    )
    .sort(
      (a, b) => b.count - a.count || a.user.name.localeCompare(b.user.name),
    );
  return (
    <section className="min-w-0">
      <div className="relative mb-[30px] overflow-hidden border-b border-line pt-[58px] pb-[42px] [&_h1]:relative [&_h1]:z-1 [&_h1]:mt-[18px] [&_h1]:mb-[14px] [&_h1]:text-[43px] [&_h1]:leading-[1.3] [&_h1]:font-bold [&_h1]:tracking-[-1.7px] [&_h1>span]:text-accent [&>p]:relative [&>p]:z-1 [&>p]:text-[13px] [&>p]:text-muted max-[700px]:pt-10 max-[700px]:pb-[30px] max-[700px]:[&_h1]:text-[34px] max-[700px]:[&>p]:text-xs max-[700px]:[&>p]:leading-[1.8] max-[430px]:[&_h1]:text-[29px] max-[430px]:[&>div]:text-[8px]">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[1.8px] text-accent max-[700px]:tracking-[1px]">
          <Icon name="trophy" size={16} /> A LITTLE FRIENDLY COMPETITION
        </div>
        <h1>
          The hall of <span>rare hands.</span>
        </h1>
        <p>Some call it luck. We call it a collection worth celebrating.</p>
        <span
          className="pointer-events-none absolute right-5 -bottom-[30px] font-serif text-[170px] tracking-[20px] text-accent/5 max-[700px]:right-0 max-[700px]:text-[130px]"
          aria-hidden="true"
        >
          殿堂
        </span>
      </div>
      <div className="mb-[30px] flex flex-wrap items-center gap-[15px] [&>select]:max-w-[230px] [&>select]:text-xs [&>div:last-child:not(:first-child)]:ml-auto max-[700px]:gap-3 max-[700px]:[&>div:first-child]:flex-1 max-[700px]:[&>div:first-child>button]:flex-1 max-[700px]:[&>div:last-child:not(:first-child)]:m-0 max-[700px]:[&>div:last-child:not(:first-child)]:flex-1 max-[700px]:[&>select]:max-w-[50%]">
        <div className="flex gap-1 rounded-[9px] border border-line bg-inset p-1 [&>button]:flex [&>button]:min-h-9 [&>button]:items-center [&>button]:justify-center [&>button]:gap-2 [&>button]:rounded-md [&>button]:border [&>button]:border-transparent [&>button]:bg-transparent [&>button]:px-[14px] [&>button]:py-[9px] [&>button]:text-[11px] [&>button]:whitespace-nowrap [&>button]:text-muted [&>button[data-active=true]]:border-[#55465d] [&>button[data-active=true]]:bg-raised [&>button[data-active=true]]:text-content light:[&>button[data-active=true]]:border-[#c2accb] [&>button:hover]:text-content max-[700px]:[&>button]:min-h-11 max-[430px]:[&>button]:gap-[5px] max-[430px]:[&>button]:px-[7px] max-[430px]:[&>button]:text-[10px]">
          <button
            onClick={() => setMode("players")}
            data-active={mode === "players"}
          >
            <Icon name="users" size={16} />
            Top players
          </button>
          <button
            onClick={() => setMode("types")}
            data-active={mode === "types"}
          >
            <Icon name="tiles" size={16} />
            Most collected
          </button>
          <button
            onClick={() => setMode("specific")}
            data-active={mode === "specific"}
          >
            <Icon name="sparkle" size={16} />
            By yakuman
          </button>
        </div>
        {mode === "specific" && (
          <select
            aria-label="Choose specific yakuman"
            value={specific}
            onChange={(e) => setSpecific(e.target.value)}
          >
            {yakumans.map((y) => (
              <option key={y.id} value={y.id}>
                {y.name}
              </option>
            ))}
          </select>
        )}
        {mode !== "types" && (
          <div className="flex min-w-0 items-center gap-2 rounded-lg border border-line bg-inset px-3 text-muted [&_input]:m-0 [&_input]:min-h-10 [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:px-0 [&_input]:py-2.5 [&_input]:text-xs [&_input]:outline-offset-0">
            <Icon name="search" size={17} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a player…"
              aria-label="Search players"
            />
          </div>
        )}
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorState error={error} retry={retry} />
      ) : mode === "types" ? (
        <div className="[&>div:first-child]:mb-[25px] [&>div:first-child_h2]:text-[21px] max-[700px]:[&>div:first-child]:flex-col max-[700px]:[&>div:first-child]:items-start">
          <div className="mb-[22px] flex items-center justify-between gap-[15px] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-.9px] max-[430px]:[&_h2]:text-[22px]">
            <h2>Every kind of extraordinary</h2>
            <span className="text-xs text-muted">
              {stats.total} recorded hands
            </span>
          </div>
          {stats.types.map((t, i) => {
            const y = getYakuman(t.id);
            return (
              <div
                className="rounded-[14px] border border-line bg-surface mb-2.5 flex items-center gap-[22px] rounded-[10px] p-[21px] [&>div:first-of-type]:w-[220px] [&_h3]:text-sm [&_h3]:font-semibold [&_p]:mt-[3px] [&_p]:text-[11px] [&_p]:text-muted [&>strong]:min-w-[60px] [&>strong]:text-right [&>strong]:text-[21px] [&>strong]:font-semibold [&>strong>small]:block [&>strong>small]:text-[11px] [&>strong>small]:font-normal [&>strong>small]:text-muted max-[700px]:gap-[13px] max-[700px]:px-[14px] max-[700px]:py-4 max-[700px]:[&>div:first-of-type]:w-auto max-[700px]:[&>div:first-of-type]:flex-1 max-[700px]:[&>strong]:min-w-[45px]"
                key={t.id}
              >
                <span className="text-xs text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex w-[90px] shrink-0 items-center justify-center font-serif text-sm text-accent max-[700px]:w-[65px] max-[700px]:text-[11px] max-[430px]:hidden">
                  {y.japanese}
                </span>
                <div>
                  <h3>{y.name}</h3>
                  <p>{y.english}</p>
                </div>
                <div className="h-[5px] flex-1 overflow-hidden rounded-[3px] bg-inset [&>span]:block [&>span]:h-full [&>span]:rounded-[3px] [&>span]:bg-accent max-[700px]:hidden">
                  <span
                    style={{
                      width: `${(t.count / (stats.types[0]?.count || 1)) * 100}%`,
                    }}
                  />
                </div>
                <strong>
                  {t.count}
                  <small>collected</small>
                </strong>
              </div>
            );
          })}
        </div>
      ) : leaders.length ? (
        <>
          <div className="mt-[42px] mb-[35px] grid grid-cols-3 items-stretch gap-5 max-[700px]:mt-7 max-[700px]:gap-2.5 max-[430px]:gap-2">
            {leaders.slice(0, 3).map((l, i) => (
              <button
                className={`rounded-[14px] border border-line bg-surface relative flex min-w-0 flex-col items-center overflow-hidden p-[23px] text-center hover:border-[#96778f] max-[700px]:px-[11px] max-[700px]:py-[17px] max-[430px]:px-2 [&>[data-avatar]]:size-[65px] [&>[data-avatar]]:rounded-[21px] [&>[data-avatar]]:text-[19px] max-[700px]:[&>[data-avatar]]:size-[50px] max-[430px]:[&>[data-avatar]]:size-[43px] [&>h3]:mt-4 [&>h3]:w-full [&>h3]:text-lg [&>h3]:[overflow-wrap:anywhere] max-[700px]:[&>h3]:text-[13px] [&>p]:mt-[5px] [&>p]:text-xs [&>p]:text-muted max-[430px]:[&>p]:text-[10px] ${i === 0 ? "border-[#9a7b64] bg-[linear-gradient(140deg,#44363360,var(--color-surface)_70%)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-gold before:content-[''] light:border-[#cdb48e] light:bg-[linear-gradient(140deg,#e7d5b960,var(--color-surface)_70%)] [&>div:first-child>span]:text-gold [&>strong]:text-gold" : ""}`}
                key={l.user.id}
                onClick={() => onProfile(l.user.id)}
              >
                <div className="mb-[27px] flex w-full items-center justify-between gap-3 [&>span:last-child]:flex [&>span:last-child]:items-center [&>span:last-child]:gap-1.5 [&>span:last-child]:text-[10px] [&>span:last-child]:tracking-[.5px] [&>span:last-child]:text-muted max-[850px]:[&>span:last-child]:text-[8px] max-[700px]:mb-5 max-[700px]:justify-center max-[700px]:[&>span:last-child]:hidden">
                  <span className="font-display text-xl font-bold text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    {i === 0 ? (
                      <>
                        <Icon name="trophy" size={15} /> TOP OF THE TABLE
                      </>
                    ) : (
                      "A RARE KIND OF LUCK"
                    )}
                  </span>
                </div>
                <Avatar user={l.user} large />
                <h3>{l.user.name}</h3>
                <p>@{l.user.username}</p>
                <strong className="mt-5 font-display text-[41px] font-semibold tracking-[-2px] text-accent [&>span]:mt-0.5 [&>span]:block [&>span]:font-sans [&>span]:text-xs [&>span]:font-normal [&>span]:tracking-normal [&>span]:text-muted max-[700px]:mt-[15px] max-[700px]:text-[33px] max-[700px]:[&>span]:min-h-[34px] max-[700px]:[&>span]:text-[11px] max-[430px]:[&>span]:text-[10px]">
                  {l.count}
                  <span>
                    {mode === "specific"
                      ? getYakuman(specific).name
                      : "yakuman recorded"}
                  </span>
                </strong>
                <span className="mt-[25px] flex w-full items-center justify-center gap-[15px] border-t border-line pt-[17px] text-xs text-accent max-[700px]:mt-[15px] max-[700px]:min-h-11 max-[700px]:flex-wrap max-[700px]:gap-1.5 max-[700px]:pt-[13px] max-[700px]:text-[11px] max-[430px]:text-[10px]">
                  Explore collection
                  <Icon name="arrow" size={15} />
                </span>
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-[14px] border border-line">
            <div className="grid grid-cols-[70px_1fr_120px_120px] items-center gap-[15px] px-[25px] py-[18px] text-left max-[850px]:grid-cols-[50px_1fr_90px_95px] max-[700px]:grid-cols-[35px_1fr_70px_22px] max-[700px]:gap-2 max-[700px]:p-[15px] bg-inset text-[10px] tracking-[1.2px] text-muted max-[700px]:tracking-[.5px] max-[700px]:[&>span:last-child]:hidden max-[430px]:text-[9px]">
              <span>RANK</span>
              <span>PLAYER</span>
              <span>YAKUMAN</span>
              <span>COLLECTION</span>
            </div>
            {leaders.map((l, i) => (
              <button
                className="grid grid-cols-[70px_1fr_120px_120px] items-center gap-[15px] px-[25px] py-[18px] text-left max-[850px]:grid-cols-[50px_1fr_90px_95px] max-[700px]:grid-cols-[35px_1fr_70px_22px] max-[700px]:gap-2 max-[700px]:p-[15px] w-full border-0 border-t border-line bg-surface hover:bg-raised [&>strong]:text-[17px] [&>strong]:font-medium [&>strong]:text-accent [&>span:last-child]:flex [&>span:last-child]:items-center [&>span:last-child]:gap-2.5 [&>span:last-child]:text-[11px] [&>span:last-child]:text-muted max-[700px]:[&>span:last-child]:gap-0 max-[700px]:[&>span:last-child]:text-[0px]"
                key={l.user.id}
                onClick={() => onProfile(l.user.id)}
              >
                <span className="text-xs text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 items-center gap-[13px] [&_strong]:text-sm [&_strong]:font-medium [&_strong]:[overflow-wrap:anywhere] [&_small]:mt-[3px] [&_small]:block [&_small]:text-[11px] [&_small]:text-muted max-[700px]:gap-2.5 max-[430px]:[&_strong]:text-xs max-[430px]:[&_small]:text-[10px]">
                  <Avatar user={l.user} />
                  <span>
                    <strong>{l.user.name}</strong>
                    <small>@{l.user.username}</small>
                  </span>
                </span>
                <strong>{l.count}</strong>
                <span>
                  View profile
                  <Icon name="arrow" size={16} />
                </span>
              </button>
            ))}
          </div>
          <p className="mt-[25px] text-center text-[11px] leading-[1.9] text-muted">
            Each recorded hand counts once. Ties share the same score.
            <br />
            Double-yakuman rules vary by table; variants are tracked separately.
          </p>
        </>
      ) : (
        <Empty
          title={query ? "No players by that name." : "The table is open."}
          text={
            query
              ? "Try another name or username."
              : "The first player to join could be you."
          }
        />
      )}
    </section>
  );
}
