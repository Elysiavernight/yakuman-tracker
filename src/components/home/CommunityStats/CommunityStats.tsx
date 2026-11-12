import type { Stats } from "../../../types";
import { Icon } from "../../../components/index";

export function CommunityStats({
  stats,
  loading,
}: {
  stats: Stats;
  loading: boolean;
}) {
  return (
    <section
      className="mb-[42px] grid grid-cols-4 border-b border-line py-[27px] max-[700px]:mb-[30px] max-[700px]:py-[22px]"
      aria-label="Community statistics"
    >
      {[
        {
          icon: "tiles",
          value: stats.total,
          label: "Yakuman recorded",
        },
        {
          icon: "users",
          value: stats.players,
          label: "Players on the journey",
        },
        {
          icon: "sparkle",
          value: stats.unique,
          label: "Different yakuman",
        },
        {
          icon: "trophy",
          value: stats.doubles,
          label: "Double+ yakuman",
        },
      ].map((s, i) => (
        <div
          className="flex items-center gap-[14px] border-r border-line px-[27px] first:pl-[3px] last:border-0 [&_strong]:block [&_strong]:font-display [&_strong]:text-2xl [&_strong]:leading-[1.2] [&_strong]:font-[750] [&_strong]:tracking-[-.7px] [&>div>span]:mt-[5px] [&>div>span]:block [&>div>span]:text-[11px] [&>div>span]:text-muted max-[1050px]:gap-2.5 max-[1050px]:px-3 max-[700px]:justify-center max-[700px]:px-2 max-[700px]:[&_strong]:text-[23px] max-[700px]:[&>div>span]:max-w-[100px] max-[700px]:[&>div>span]:text-[10px] max-[430px]:[&>div>span]:max-w-[75px] max-[360px]:px-1.5 max-[360px]:[&>div>span]:text-[9px]"
          key={s.label}
        >
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-[11px] border max-[1050px]:hidden ${["border-accent/10 bg-accent/5 text-accent", "border-success/10 bg-success/5 text-success", "border-[#c4b0dd]/10 bg-[#c4b0dd]/5 text-[#c4b0dd] light:text-[#73558e]", "border-gold/10 bg-gold/5 text-gold"][i]}`}
          >
            <Icon name={s.icon} size={20} />
          </span>
          <div>
            <strong>{loading ? "—" : s.value.toLocaleString()}</strong>
            <span>{s.label}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
