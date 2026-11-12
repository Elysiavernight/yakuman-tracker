import { useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Post } from "../../types";
import { api, send } from "../../utils/lib";

export function usePostPin(
  setPosts: Dispatch<SetStateAction<Post[]>>,
  notify: (message: string) => void,
) {
  const [pinningId, setPinningId] = useState<string | null>(null);
  const pending = useRef(false);

  async function togglePin(post: Post) {
    if (pending.current) return;
    pending.current = true;
    setPinningId(post.id);
    try {
      const { post: updated } = await api<{ post: Post }>(
        `/posts/${encodeURIComponent(post.id)}/pin`,
        send("PATCH", { pinned: !post.pinned }),
      );
      setPosts((posts) =>
        posts.map((item) => (item.id === updated.id ? updated : item)),
      );
      notify(
        updated.pinned ? "Post pinned to your profile." : "Post unpinned.",
      );
    } catch (error) {
      notify((error as Error).message);
    } finally {
      pending.current = false;
      setPinningId(null);
    }
  }

  return { pinningId, togglePin };
}
