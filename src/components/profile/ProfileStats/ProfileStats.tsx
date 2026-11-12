import type { Post, User } from "../../../types";
import { useCatalog } from "../../../providers/catalog";

export function ProfileStats({
  profile,
  posts,
}: {
  profile: User;
  posts: Post[];
}) {
  const { yakumans } = useCatalog();
  return (
    <div className="my-6 grid grid-cols-3 gap-5 [&>div]:min-w-0 [&>div]:rounded-xl [&>div]:border [&>div]:border-line [&>div]:bg-surface [&>div]:px-6 [&>div]:py-5 [&_strong]:block [&_strong]:font-display [&_strong]:text-[27px] [&_strong]:font-semibold [&_strong]:tracking-[-.8px] [&_small]:text-base [&_small]:font-normal [&_small]:text-muted [&_span]:mt-1 [&_span]:block [&_span]:text-xs [&_span]:text-muted max-[700px]:gap-3 max-[700px]:[&>div]:px-3 max-[700px]:[&_strong]:text-[23px] max-[430px]:gap-2 max-[430px]:[&>div]:px-2.5 max-[430px]:[&>div]:py-4 max-[430px]:[&_strong]:text-[21px] max-[430px]:[&_span]:text-[10px]">
      <div>
        <strong>{posts.length}</strong>
        <span>Yakuman recorded</span>
      </div>
      <div>
        <strong>
          {new Set(posts.flatMap((p) => p.types)).size}
          <small> / {yakumans.length}</small>
        </strong>
        <span>Types collected</span>
      </div>
      <div>
        <strong>
          {new Date(profile.createdAt).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </strong>
        <span>The journey began</span>
      </div>
    </div>
  );
}
