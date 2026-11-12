import type { ReactNode } from "react";
import type { Post, Stats } from "../../types";
import { useCatalog } from "../../providers/catalog";
import { Empty, Icon } from "../../components/index";
import { Loading, ErrorState } from "../../components/Feedback/Feedback";
import { HomeHero } from "../../components/home/HomeHero/HomeHero";
import { CommunityStats } from "../../components/home/CommunityStats/CommunityStats";
import { TimelineSidebar } from "../../components/home/TimelineSidebar/TimelineSidebar";

export function HomePage({
  posts,
  stats,
  loading,
  error,
  refresh,
  platform,
  setPlatform,
  type,
  setType,
  sort,
  setSort,
  addRecord,
  postCard,
}: {
  posts: Post[];
  stats: Stats;
  loading: boolean;
  error: string;
  refresh: () => void;
  platform: string;
  setPlatform: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  addRecord: () => void;
  postCard: (post: Post) => ReactNode;
}) {
  const { yakumans } = useCatalog();
  let filtered = posts.filter(
    (p) =>
      (!platform || p.platform === platform) &&
      (!type || p.types.includes(type)),
  );
  if (sort === "oldest") filtered = [...filtered].reverse();
  return (
    <>
      <HomeHero addRecord={addRecord} />
      <CommunityStats stats={stats} loading={loading} />
      <div className="grid grid-cols-[minmax(0,1fr)_285px] items-start gap-[26px] min-[1400px]:grid-cols-[minmax(0,1fr)_302px] min-[1400px]:gap-[30px] max-[1050px]:grid-cols-[minmax(0,1fr)_260px] max-[1050px]:gap-5 max-[850px]:grid-cols-[minmax(0,1fr)_230px] max-[850px]:gap-[18px] max-[700px]:grid-cols-1">
        <section className="min-w-0">
          <div className="mb-[22px] flex items-center justify-between gap-[15px] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-.9px] max-[430px]:[&_h2]:text-[22px]">
            <div>
              <h2>Your Timeline</h2>
            </div>
            <label className="flex items-center gap-1.5 text-[11px] whitespace-nowrap text-muted [&_select]:m-0 [&_select]:min-h-[35px] [&_select]:appearance-none [&_select]:border-0 [&_select]:bg-transparent [&_select]:px-0 [&_select]:py-2 [&_select]:text-[11px] max-[430px]:[&>svg:first-child]:hidden">
              <Icon name="clock" size={15} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort records"
              >
                <option value="recent">Most recent</option>
                <option value="oldest">Oldest first</option>
              </select>
              <Icon name="down" size={14} />
            </label>
          </div>
          <div className="mb-5 flex items-center justify-between gap-2 border-b border-line pb-[14px] max-[360px]:flex-wrap">
            <div
              className="flex gap-1 [&>button]:min-h-[38px] [&>button]:rounded-md [&>button]:border [&>button]:border-transparent [&>button]:px-[11px] [&>button]:py-2 [&>button]:text-[11px] [&>button]:whitespace-nowrap [&>button]:text-muted [&>button:hover]:bg-raised [&>button[data-active=true]]:border-[#514456] [&>button[data-active=true]]:bg-raised [&>button[data-active=true]]:text-content light:[&>button[data-active=true]]:border-[#c2accb] max-[850px]:[&>button]:px-[7px] max-[850px]:[&>button]:text-[10px] max-[700px]:[&>button]:min-h-11"
              role="group"
              aria-label="Filter by platform"
            >
              {[
                ["", "All tables"],
                ["Mahjong Soul", "Mahjong Soul"],
                ["Tenhou", "Tenhou"],
                ["In person", "In person"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  data-active={platform === value}
                  aria-pressed={platform === value}
                  onClick={() => setPlatform(value!)}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="flex max-w-[140px] items-center gap-[5px] [&_select]:m-0 [&_select]:min-h-[38px] [&_select]:w-full [&_select]:appearance-none [&_select]:border-0 [&_select]:bg-transparent [&_select]:px-0 [&_select]:py-[7px] [&_select]:text-[11px] [&_select]:text-muted [&>svg]:shrink-0 [&>svg]:text-muted max-[850px]:max-w-[100px] max-[430px]:max-w-[88px] max-[430px]:[&_select]:text-[10px] max-[360px]:ml-auto">
              <select
                aria-label="Filter by yakuman"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All yakuman</option>
                {yakumans.map((y) => (
                  <option value={y.id} key={y.id}>
                    {y.name}
                  </option>
                ))}
              </select>
              <Icon name="down" size={14} />
            </label>
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorState error={error} retry={refresh} />
          ) : filtered.length ? (
            <div className="grid gap-5">
              {filtered.map(postCard)}
              <p className="my-[10px] flex items-center justify-center gap-2.5 text-center text-[11px] text-muted [&>span]:h-px [&>span]:flex-1 [&>span]:bg-line">
                <span />
                You’re all caught up. The next rare hand could be yours.
                <span />
              </p>
            </div>
          ) : (
            <Empty
              title={
                posts.length
                  ? "No hands at this table yet."
                  : "Every journey starts with a first."
              }
              text={
                posts.length
                  ? "Try another table or yakuman to find more memories."
                  : "Your first yakuman belongs here. Let’s give it a home."
              }
              action={
                posts.length ? (
                  <button
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-line bg-raised text-content hover:bg-line"
                    onClick={() => {
                      setPlatform("");
                      setType("");
                    }}
                  >
                    Clear filters
                  </button>
                ) : (
                  <button
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-accent text-accent-ink shadow-sm hover:bg-accent-hover"
                    onClick={addRecord}
                  >
                    <Icon name="plus" size={17} />
                    Record a yakuman
                  </button>
                )
              }
            />
          )}
        </section>
        <TimelineSidebar
          stats={stats}
          addRecord={addRecord}
          setType={setType}
        />
      </div>
    </>
  );
}
