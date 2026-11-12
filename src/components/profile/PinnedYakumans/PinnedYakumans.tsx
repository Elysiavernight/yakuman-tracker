import type { ReactNode } from "react";
import type { Post } from "../../../types";
import { Icon } from "../../../components/index";

export function PinnedYakumans({
  posts,
  own,
  postCard,
}: {
  posts: Post[];
  own: boolean;
  postCard: (post: Post) => ReactNode;
}) {
  if (!posts.length) return null;

  return (
    <section aria-label="Pinned yakumans" className="mt-[42px] mb-10">
      <div className="mb-[22px] flex items-center gap-3">
        <Icon name="pin" size={20} className="shrink-0 text-accent" />
        <h2 className="font-display text-2xl font-semibold tracking-[-.9px] max-[430px]:text-[22px]">
          Pinned yakumans
        </h2>
        {own && <span className="text-xs text-muted">{posts.length}/3</span>}
      </div>
      <div className="grid grid-cols-2 items-start gap-5 max-[850px]:grid-cols-1 [&_article_h3]:text-xl">
        {posts.map(postCard)}
      </div>
    </section>
  );
}
