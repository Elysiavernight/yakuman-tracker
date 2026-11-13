import type { Post } from "../../types";
import { useCatalog } from "../../providers/catalog";
import { Avatar, Hand, Icon } from "../../components/index";
import { timeAgo } from "../../utils/lib";

export function PostCard({
  post,
  own,
  onProfile,
  onDelete,
  onProof,
  onEdit,
  onPin,
  showPinned = false,
  pinBusy = false,
  pinDisabled = false,
}: {
  post: Post;
  own: boolean;
  onProfile: () => void;
  onDelete: () => void;
  onProof: () => void;
  onEdit?: () => void;
  onPin?: () => void;
  showPinned?: boolean;
  pinBusy?: boolean;
  pinDisabled?: boolean;
}) {
  const { getYakuman } = useCatalog();
  const y = getYakuman(post.types[0]!);
  const multiplier = post.types.reduce(
    (n, id) => n + getYakuman(id).multiplier,
    0,
  );
  return (
    <article className="rounded-[14px] border border-line bg-surface overflow-hidden px-6 pt-[23px] min-[1400px]:px-[27px] min-[1400px]:pt-[25px] max-[1050px]:px-5 max-[430px]:px-[17px] max-[430px]:pt-[19px]">
      {showPinned && post.pinned && (
        <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-accent">
          <Icon name="pin" size={14} /> Pinned
        </div>
      )}
      <header className="flex items-start justify-between gap-[14px] max-[430px]:gap-2">
        <button
          className="flex min-w-0 items-center gap-2.5 border-0 bg-transparent p-0 text-left [&_strong]:block [&_strong]:text-sm [&_strong]:font-semibold [&_strong]:[overflow-wrap:anywhere] [&:hover_strong]:text-accent [&_small]:mt-[3px] [&_small]:flex [&_small]:flex-wrap [&_small]:items-center [&_small]:gap-1.5 [&_small]:text-[11px] [&_small]:text-muted max-[430px]:[&_strong]:text-[13px] max-[430px]:[&_small]:gap-1 max-[430px]:[&_small]:text-[10px]"
          onClick={onProfile}
        >
          <Avatar user={post.user} />
          <span>
            <strong>{post.user.name}</strong>
            <small>
              {post.platform}
              <span className="opacity-60">·</span>
              <time
                dateTime={post.createdAt}
                title={new Date(post.createdAt).toLocaleString()}
              >
                {timeAgo(post.createdAt)}
              </time>
              {post.user.demo && (
                <span className="ml-[3px] rounded-[3px] border border-line bg-raised px-1 py-px text-[10px] font-normal text-muted">
                  Sample
                </span>
              )}
            </small>
          </span>
        </button>
        <span
          className="inline-flex shrink-0 items-center gap-[5px] rounded-[5px] border border-gold/20 bg-gold/5 px-[7px] py-[5px] text-[10px] font-semibold tracking-[.4px] whitespace-nowrap text-gold data-[double=true]:border-accent/25 data-[double=true]:bg-accent/5 data-[double=true]:text-accent max-[700px]:text-[9px] max-[430px]:text-[8px]"
          data-double={multiplier >= 2}
        >
          <Icon name="sparkle" size={13} />
          {multiplier >= 2 ? `${multiplier}× YAKUMAN` : "YAKUMAN"}
        </span>
      </header>
      <div className="mt-[22px] flex flex-wrap items-baseline gap-3 [&_h3]:text-2xl [&_h3]:leading-[1.3] [&_h3]:font-semibold [&_h3]:tracking-[-.8px] [&>span]:font-serif [&>span]:text-lg [&>span]:text-accent/85 min-[1400px]:[&_h3]:text-[27px] max-[850px]:gap-[7px] max-[850px]:[&_h3]:text-[22px] max-[700px]:[&_h3]:text-2xl max-[430px]:[&_h3]:text-[23px] max-[430px]:[&>span]:text-base">
        <h3>{post.types.map((id) => getYakuman(id).name).join(" + ")}</h3>
        <span lang="ja">{y.japanese}</span>
      </div>
      <p className="mt-[5px] text-xs text-muted">
        {post.types.map((id) => getYakuman(id).english).join(" + ")}
      </p>
      {post.hand.length > 0 && (
        <div className="mt-[21px] rounded-lg border border-accent/5 bg-inset px-4 pt-[15px] pb-[18px] max-[1050px]:px-2.5 max-[430px]:pt-[13px] max-[430px]:pb-4">
          <div className="mb-[13px] flex justify-between gap-2 text-[10px] font-medium tracking-[.7px] text-muted [&>span:last-child]:flex [&>span:last-child]:items-center [&>span:last-child]:gap-[5px] [&_i]:size-1 [&_i]:rounded-full [&_i]:bg-success max-[430px]:text-[9px]">
            <span>THE WINNING HAND</span>
            <span>
              <i />
              {post.hand.length} tiles
            </span>
          </div>
          <Hand tiles={post.hand} />
        </div>
      )}
      {post.description && (
        <p className="mt-[18px] text-sm leading-[1.85] whitespace-pre-wrap text-[#d3cad9] [overflow-wrap:anywhere] light:text-[#65536f] max-[700px]:text-[15px] max-[430px]:text-sm">
          {post.description}
        </p>
      )}
      {post.image && (
        <button
          className="relative mt-[17px] w-full overflow-hidden rounded-[7px] border border-line bg-inset p-0 hover:border-accent [&>img]:max-h-[260px] [&>img]:w-full [&>img]:object-cover [&>span]:flex [&>span]:items-center [&>span]:gap-[7px] [&>span]:px-[13px] [&>span]:py-2.5 [&>span]:text-[11px] [&>span]:text-muted [&>span>svg:last-child]:ml-auto"
          onClick={onProof}
        >
          <img
            src={post.imageThumbnail || post.image}
            alt="Winning screenshot"
            loading="lazy"
            decoding="async"
          />
          <span>
            <Icon name="image" size={16} />
            View screenshot
            <Icon name="external" size={14} />
          </span>
        </button>
      )}
      <footer className="mt-[22px] flex min-h-[49px] flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-line py-1 text-[11px] text-muted [&>div>span]:flex [&>div>span]:items-center [&>div>span]:gap-[7px] [&_a]:flex [&_a]:min-h-11 [&_a]:items-center [&_a]:gap-[7px] [&_a:hover]:text-accent max-[700px]:min-h-[52px] max-[700px]:text-xs">
        <div>
          {post.gameLink ? (
            <a href={post.gameLink} target="_blank" rel="noopener noreferrer">
              <Icon name="link" size={15} />
              View game replay
              <Icon name="external" size={12} />
            </a>
          ) : (
            <span>
              <Icon name="book" size={15} />A page in the journey
            </span>
          )}
        </div>
        {own ? (
          <div className="ml-auto flex items-center gap-1">
            {onPin && (
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-accent hover:bg-raised disabled:cursor-not-allowed disabled:opacity-50"
                onClick={onPin}
                disabled={pinDisabled}
                aria-label={
                  post.pinned ? "Unpin yakuman record" : "Pin yakuman record"
                }
                aria-pressed={Boolean(post.pinned)}
                title={
                  pinDisabled && !pinBusy && !post.pinned
                    ? "You can pin up to 3 posts. Unpin one first."
                    : undefined
                }
              >
                <Icon name="pin" size={16} />
                {pinBusy ? "Saving…" : post.pinned ? "Unpin" : "Pin"}
              </button>
            )}
            {onEdit && (
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-accent hover:bg-raised"
                onClick={onEdit}
                aria-label="Edit yakuman record"
              >
                <Icon name="edit" size={16} />
                Edit
              </button>
            )}
            <button
              className="inline-flex size-9 items-center justify-center rounded-lg border-0 bg-transparent text-muted hover:bg-raised hover:text-danger max-[700px]:size-11"
              onClick={onDelete}
              aria-label="Delete yakuman record"
            >
              <Icon name="trash" size={16} />
            </button>
          </div>
        ) : (
          <span
            className="font-serif text-[15px] tracking-[2px] text-accent/40"
            lang="ja"
          >
            役満
          </span>
        )}
      </footer>
    </article>
  );
}
