import type { Post } from "../../../types";
import { useCatalog } from "../../../providers/catalog";
import { Icon } from "../../../components/index";

export function YakumanCollection({ posts }: { posts: Post[] }) {
  const { yakumans } = useCatalog();
  return (
    <>
      <div className="mb-[22px] flex items-center justify-between gap-[15px] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-.9px] max-[430px]:[&_h2]:text-[22px]">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[1.8px] text-accent max-[700px]:tracking-[1px] text-muted">
            ONE RARE HAND AT A TIME
          </div>
          <h2>
            The collection<span className="text-accent">.</span>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[14px] max-[1050px]:grid-cols-3 max-[700px]:grid-cols-2 max-[700px]:gap-3">
        {yakumans.map((y) => {
          const count = posts.filter((p) => p.types.includes(y.id)).length;
          return (
            <div
              className="rounded-[14px] border border-line bg-surface relative min-h-[145px] overflow-hidden rounded-[11px] border-[#715166] bg-[linear-gradient(130deg,#edb1c30b,var(--color-surface))] px-[17px] py-[19px] light:border-[#cfa8bf] light:bg-[linear-gradient(130deg,#9a3c6007,var(--color-surface))] data-[collected=false]:border-line data-[collected=false]:border-dashed data-[collected=false]:bg-none data-[collected=false]:bg-transparent [&>div]:mb-5 [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-[5px] [&_h3]:text-sm [&_h3]:font-medium [&_p]:mt-[5px] [&_p]:pr-[13px] [&_p]:text-[11px] [&_p]:text-muted [&>svg]:absolute [&>svg]:right-[14px] [&>svg]:bottom-[15px] [&>svg]:text-accent [&[data-collected=false]_h3]:text-muted [&[data-collected=false]_span:first-child]:text-muted max-[700px]:min-h-[176px] max-[700px]:[&>div]:mb-[14px] max-[700px]:[&>div]:flex-col max-[700px]:[&>div]:items-start max-[700px]:[&>div]:gap-[7px] max-[430px]:px-[13px] max-[430px]:py-[17px] max-[430px]:[&_h3]:text-[13px]"
              data-collected={count > 0}
              key={y.id}
            >
              <div>
                <span className="font-serif text-xs text-accent">
                  {y.japanese}
                </span>
                <span className="text-[11px] whitespace-nowrap text-muted">
                  {count ? `${count} collected` : "Yet to come"}
                </span>
              </div>
              <h3>{y.name}</h3>
              <p>{y.english}</p>
              {count ? (
                <Icon name="check" size={16} />
              ) : (
                <span className="absolute right-[13px] bottom-[11px] text-lg text-muted">
                  ✧
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
