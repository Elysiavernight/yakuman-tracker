import type { ReactNode } from "react";
import type { Post, User } from "../../types";
import { Empty, Icon } from "../../components/index";
import { Loading } from "../../components/Feedback/Feedback";
import { ProfileHeader } from "../../components/profile/ProfileHeader/ProfileHeader";
import { ProfileStats } from "../../components/profile/ProfileStats/ProfileStats";
import { YakumanCollection } from "../../components/profile/YakumanCollection/YakumanCollection";

export function ProfilePage({
  profile,
  user,
  posts,
  profileLoading,
  profileError,
  onEdit,
  onLogout,
  onLogin,
  addRecord,
  postCard,
}: {
  profile: User | null;
  user: User | null;
  posts: Post[];
  profileLoading: boolean;
  profileError: string;
  onEdit: () => void;
  onLogout: () => void;
  onLogin: () => void;
  addRecord: () => void;
  postCard: (post: Post) => ReactNode;
}) {
  const own = Boolean(profile && user?.id === profile.id);
  const profilePosts = posts.filter((post) => post.userId === profile?.id);
  return (
    <section className="pt-[45px] max-[700px]:pt-7">
      {profileLoading ? (
        <Loading />
      ) : profileError ? (
        <Empty title="Player not found" text={profileError} />
      ) : profile ? (
        <>
          <ProfileHeader
            profile={profile}
            own={own}
            onEdit={onEdit}
            onLogout={onLogout}
          />
          <ProfileStats profile={profile} posts={profilePosts} />
          <YakumanCollection posts={profilePosts} />
          <div className="mb-[22px] flex items-center justify-between gap-[15px] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-.9px] max-[430px]:[&_h2]:text-[22px] mt-[42px]">
            <h2>The memories</h2>
            {own && (
              <button
                className="inline-flex min-h-9 items-center justify-center gap-[7px] border-0 bg-transparent py-2 text-xs text-accent hover:underline max-[700px]:min-h-11"
                onClick={addRecord}
              >
                <Icon name="plus" size={16} />
                Add a hand
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 items-start gap-5 max-[850px]:grid-cols-1 [&_article_h3]:text-xl">
            {profilePosts.length ? (
              profilePosts.map(postCard)
            ) : (
              <Empty
                title="The best hands are still ahead."
                text="Your recorded yakuman will appear here."
                action={
                  own ? (
                    <button
                      className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-accent text-accent-ink shadow-sm hover:bg-accent-hover"
                      onClick={addRecord}
                    >
                      Record your first yakuman
                    </button>
                  ) : undefined
                }
              />
            )}
          </div>
        </>
      ) : (
        <Empty
          title="Your own little hall of fame."
          text="Log in to see your collection, or create an account to start your journey."
          action={
            <button
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-accent text-accent-ink shadow-sm hover:bg-accent-hover"
              onClick={() => onLogin()}
            >
              Log in
            </button>
          }
        />
      )}
    </section>
  );
}
