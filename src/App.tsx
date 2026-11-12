import { useCallback, useEffect, useState } from "react";
import type { Post, Stats, User } from "./types";
import { AuthForm, EditProfile, RecordForm } from "./forms/forms";
import { api, send } from "./utils/lib";
import { route, type Page } from "./utils/routing";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { AppFooter } from "./components/AppFooter/AppFooter";
import { Notification } from "./components/Notification/Notification";
import { PostCard } from "./components/PostCard/PostCard";
import { RecordDialogs } from "./components/RecordDialogs/RecordDialogs";
import { HomePage } from "./pages/HomePage/HomePage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { LeaderboardPage } from "./pages/LeaderboardPage/LeaderboardPage";

const emptyStats: Stats = {
  total: 0,
  players: 0,
  unique: 0,
  doubles: 0,
  types: [],
  leaders: [],
};

export function App() {
  const [location, setLocation] = useState(route);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [auth, setAuth] = useState<"login" | "signup" | null>(null);
  const [recordAfterAuth, setRecordAfterAuth] = useState(false);
  const [record, setRecord] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [edit, setEdit] = useState(false);
  const [notice, setNotice] = useState("");
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("recent");
  const [profile, setProfile] = useState<User | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [deleting, setDeleting] = useState<Post | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [proof, setProof] = useState<Post | null>(null);
  const refresh = useCallback(async () => {
    setError("");
    try {
      const [feed, summary, session] = await Promise.all([
        api<{ posts: Post[] }>("/posts"),
        api<Stats>("/stats"),
        api<{ user: User | null }>("/auth/me"),
      ]);
      setPosts(feed.posts);
      setStats(summary);
      setUser(session.user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
    const changed = () => {
      setLocation(route());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", changed);
    return () => window.removeEventListener("hashchange", changed);
  }, [refresh]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (location.page !== "profile") return;
    const id = location.id || user?.id;
    if (!id) {
      setProfile(null);
      return;
    }
    let live = true;
    setProfileLoading(true);
    setProfileError("");
    setProfile(null);
    api<{ user: User }>(`/users/${encodeURIComponent(id)}`)
      .then((data) => {
        if (live) setProfile(data.user);
      })
      .catch((err) => {
        if (live) setProfileError(err.message);
      })
      .finally(() => {
        if (live) setProfileLoading(false);
      });
    return () => {
      live = false;
    };
  }, [location, user]);
  const go = (page: Page, id = "") => {
    window.location.hash = `/${page}${id ? `/${id}` : ""}`;
  };
  const addRecord = () => {
    if (user) setRecord(true);
    else {
      setRecordAfterAuth(true);
      setAuth("signup");
    }
  };
  async function logout() {
    try {
      await api("/auth/logout", send("POST"));
      setUser(null);
      go("home");
      setNotice("You’re logged out. See you at the table.");
    } catch (err) {
      setNotice((err as Error).message);
    }
  }
  async function deletePost() {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await api(`/posts/${deleting.id}`, send("DELETE"));
      setDeleting(null);
      await refresh();
      setNotice("Yakuman record deleted.");
    } catch (err) {
      setNotice((err as Error).message);
    } finally {
      setDeleteBusy(false);
    }
  }
  const postCard = (post: Post) => (
    <PostCard
      key={post.id}
      post={post}
      own={user?.id === post.userId}
      onProfile={() => go("profile", post.userId)}
      onDelete={() => setDeleting(post)}
      onProof={() => setProof(post)}
      onEdit={
        location.page === "profile" ? () => setEditingPost(post) : undefined
      }
    />
  );
  return (
    <>
      <a
        className="fixed top-2 left-2 z-100 -translate-y-[200%] bg-accent p-3 text-accent-ink focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <AppHeader
        page={location.page}
        user={user}
        addRecord={addRecord}
        onProfile={(id) => go("profile", id)}
        onLogin={() => setAuth("login")}
      />
      <main
        id="main"
        className="mx-auto min-h-[calc(100vh-230px)] max-w-[1180px] px-[34px] min-[1400px]:max-w-[1240px] max-[1050px]:px-[26px] max-[700px]:px-5 max-[430px]:px-4"
      >
        {location.page === "home" && (
          <HomePage
            posts={posts}
            stats={stats}
            loading={loading}
            error={error}
            refresh={refresh}
            platform={platform}
            setPlatform={setPlatform}
            type={type}
            setType={setType}
            sort={sort}
            setSort={setSort}
            addRecord={addRecord}
            postCard={postCard}
          />
        )}
        {location.page === "leaderboard" && (
          <LeaderboardPage
            posts={posts}
            stats={stats}
            loading={loading}
            error={error}
            retry={refresh}
            onProfile={(id) => go("profile", id)}
          />
        )}
        {location.page === "profile" && (
          <ProfilePage
            profile={profile}
            user={user}
            posts={posts}
            profileLoading={profileLoading}
            profileError={profileError}
            onEdit={() => setEdit(true)}
            onLogout={logout}
            onLogin={() => setAuth("login")}
            addRecord={addRecord}
            postCard={postCard}
          />
        )}
      </main>
      <AppFooter />
      {notice && (
        <Notification notice={notice} onDismiss={() => setNotice("")} />
      )}
      {auth && (
        <AuthForm
          initial={auth}
          onClose={() => {
            setAuth(null);
            setRecordAfterAuth(false);
          }}
          onSuccess={(u) => {
            setUser(u);
            setAuth(null);
            if (recordAfterAuth) {
              setRecord(true);
              setRecordAfterAuth(false);
            }
            setNotice(`Welcome to the table, ${u.name}.`);
            void refresh();
          }}
        />
      )}
      {record && (
        <RecordForm
          onClose={() => setRecord(false)}
          onSuccess={() => {
            setRecord(false);
            setPlatform("");
            setType("");
            setSort("recent");
            go("home");
            void refresh();
            setNotice("A legendary hand, now part of the journey.");
          }}
        />
      )}
      {editingPost && (
        <RecordForm
          key={editingPost.id}
          initialRecord={editingPost}
          onClose={() => setEditingPost(null)}
          onSuccess={() => {
            setEditingPost(null);
            void refresh();
            setNotice("Your yakuman record has been updated.");
          }}
        />
      )}
      {edit && user && (
        <EditProfile
          user={user}
          onClose={() => setEdit(false)}
          onSuccess={(u) => {
            setUser(u);
            setEdit(false);
            void refresh();
            setNotice("Your profile has been updated.");
          }}
        />
      )}
      <RecordDialogs
        deleting={deleting}
        deleteBusy={deleteBusy}
        proof={proof}
        onCloseDelete={() => setDeleting(null)}
        onCloseProof={() => setProof(null)}
        onDelete={deletePost}
      />
    </>
  );
}

export default App;
