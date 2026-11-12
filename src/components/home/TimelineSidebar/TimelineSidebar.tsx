import type { Stats } from "../../../types";
import { useCatalog } from "../../../providers/catalog";
import { Icon } from "../../../components/index";

export function TimelineSidebar({
  stats,
  addRecord,
  setType,
}: {
  stats: Stats;
  addRecord: () => void;
  setType: (value: string) => void;
}) {
  const { getYakuman } = useCatalog();
  return (
    <aside className="grid gap-5 max-[700px]:mt-[18px]">
      <section className="relative overflow-hidden rounded-[14px] border border-[#6b485e] bg-[linear-gradient(125deg,#3c2b3b,var(--color-surface)_85%)] p-6 light:border-[#d3b1c5] light:bg-[linear-gradient(125deg,#f0dce7,var(--color-surface)_90%)] max-[700px]:hidden [&_h3]:text-[23px] [&_h3]:leading-[1.4] [&_h3]:font-semibold [&_p]:mt-3 [&_p]:mb-5 [&_p]:text-[13px] [&_p]:leading-[1.85] [&_p]:text-muted [&>small]:mt-[11px] [&>small]:block [&>small]:text-center [&>small]:text-[10px] [&>small]:text-muted">
        <span className="mb-[18px] inline-flex size-10 items-center justify-center rounded-[10px] border border-accent/10 bg-accent/5 text-accent">
          <Icon name="sparkle" size={23} />
        </span>
        <span
          className="absolute top-[23px] right-5 font-serif text-sm tracking-[4px] text-accent/30 [writing-mode:vertical-rl]"
          aria-hidden="true"
        >
          一期一会
        </span>
        <h3>
          A rare hand.
          <br />A story worth keeping.
        </h3>
        <p>
          A screenshot, a lucky draw, a memory with friends. Make it part of
          your collection.
        </p>
        <button
          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-accent text-accent-ink shadow-sm hover:bg-accent-hover w-full"
          onClick={addRecord}
        >
          <Icon name="plus" size={17} />
          Record your yakuman
        </button>
        <small>Just the yakuman type is enough.</small>
      </section>

      <section className="rounded-[14px] border border-line bg-surface p-5 max-[850px]:p-[15px] max-[700px]:p-[22px]">
        <div className="mb-[17px] flex items-center justify-between gap-[7px] [&_h3]:flex [&_h3]:items-center [&_h3]:gap-[7px] [&_h3]:font-sans [&_h3]:text-xs [&_h3]:font-medium [&_h3]:leading-normal [&_h3]:tracking-[-.2px] [&_h3_svg]:text-gold max-[700px]:[&_h3]:text-sm">
          <h3>
            <Icon name="tiles" size={17} />
            The usual miracles
          </h3>
        </div>
        <p className="-mt-[7px] mb-4 text-[11px] text-muted">
          Most collected by our community
        </p>
        {stats.types
          .filter((t) => t.count)
          .slice(0, 4)
          .map((t, i) => (
            <button
              className="mb-[15px] min-h-11 w-full border-0 bg-transparent p-0 text-left last:mb-0 [&>span:first-child]:mb-[7px] [&>span:first-child]:flex [&>span:first-child]:items-center [&>span:first-child]:justify-between [&>span:first-child]:gap-2.5 [&>span:first-child]:text-[11px] [&>span:first-child]:text-muted [&_strong]:text-[11px] [&_strong]:font-medium [&_strong]:text-content [&:hover>span:first-child]:text-content"
              key={t.id}
              onClick={() => setType(t.id)}
            >
              <span>
                {getYakuman(t.id).name}
                <strong>{t.count}</strong>
              </span>
              <span className="block h-1 overflow-hidden rounded-sm bg-inset [&>span]:block [&>span]:h-full [&>span]:rounded-sm [&>span]:bg-accent">
                <span
                  style={{
                    width: `${(t.count / (stats.types[0]?.count || 1)) * 100}%`,
                    opacity: 1 - i * 0.16,
                  }}
                />
              </span>
            </button>
          ))}
        {!stats.total && (
          <p className="text-xs text-muted">
            Your recorded hands will shape this list.
          </p>
        )}
      </section>
      <div className="flex items-start gap-[9px] px-[18px] py-[3px] text-muted [&>svg]:mt-[3px] [&>svg]:shrink-0 [&>svg]:text-accent/80 [&_p]:text-[11px] [&_p]:leading-[1.8] max-[700px]:justify-center max-[700px]:text-center">
        <Icon name="heart" size={16} />
        <p>
          Not every hand is legendary.
          <br />
          Every journey is worth sharing.
        </p>
      </div>
    </aside>
  );
}
