import type { User } from "../../types";
import type { Page } from "../../utils/routing";
import { Avatar, Icon } from "../../components/index";
import headerLogo from "../../assets/header_logo.webp";

export function AppHeader({
  page,
  user,
  addRecord,
  onProfile,
  onLogin,
}: {
  page: Page;
  user: User | null;
  addRecord: () => void;
  onProfile: (id: string) => void;
  onLogin: () => void;
}) {
  return (
    <header className="h-[88px] border-b border-white/3 light:border-line max-[700px]:h-[78px]">
      <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between gap-6 px-[34px] min-[1400px]:max-w-[1240px] max-[1050px]:px-[26px] max-[700px]:gap-[15px] max-[700px]:px-5 max-[430px]:px-4 max-[360px]:gap-2">
        <a
          className="flex items-center gap-[11px] font-display text-[21px] font-extrabold tracking-[-1px] whitespace-nowrap max-[430px]:gap-2 max-[430px]:text-[19px]"
          href="#/home"
          aria-label="Yakuman Soul home"
        >
          <img
            className="block size-10 shrink-0 object-contain max-[430px]:size-[30px]"
            src={headerLogo}
            alt=""
            width={40}
            height={40}
          />
          <span>
            Yakuman<span className="font-[450]"> Soul</span>
            <span className="text-accent">.</span>
          </span>
        </a>
        <nav
          className="mr-8 ml-auto flex self-stretch items-stretch gap-[34px] max-[1050px]:mr-3 max-[1050px]:gap-[23px] max-[850px]:mx-auto max-[700px]:fixed max-[700px]:inset-x-0 max-[700px]:bottom-0 max-[700px]:z-25 max-[700px]:m-0 max-[700px]:h-[calc(65px+env(safe-area-inset-bottom))] max-[700px]:justify-center max-[700px]:gap-0 max-[700px]:border-t max-[700px]:border-line max-[700px]:bg-inset max-[700px]:pb-[env(safe-area-inset-bottom)] [&>a]:relative [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:text-xs [&>a]:font-medium [&>a]:text-muted [&>a:hover]:text-content [&>a[aria-current]]:text-accent [&>a[aria-current]]:after:absolute [&>a[aria-current]]:after:inset-x-0 [&>a[aria-current]]:after:bottom-0 [&>a[aria-current]]:after:h-0.5 [&>a[aria-current]]:after:bg-accent [&>a[aria-current]]:after:content-[''] max-[700px]:[&>a]:min-h-[55px] max-[700px]:[&>a]:flex-1 max-[700px]:[&>a]:justify-center max-[700px]:[&>a[aria-current]]:after:inset-x-[20%] max-[700px]:[&>a[aria-current]]:after:top-0 max-[700px]:[&>a[aria-current]]:after:bottom-auto"
          aria-label="Main navigation"
        >
          <a href="#/home" aria-current={page === "home" ? "page" : undefined}>
            <Icon name="home" size={17} />
            Home
          </a>
          <a
            href="#/leaderboard"
            aria-current={page === "leaderboard" ? "page" : undefined}
          >
            <Icon name="trophy" size={17} />
            Leaderboard
          </a>
        </nav>
        <div className="flex items-center gap-[22px] max-[1050px]:gap-[15px] max-[700px]:ml-auto max-[430px]:gap-2.5 max-[360px]:gap-3">
          <button
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-accent text-accent-ink shadow-sm hover:bg-accent-hover max-[850px]:px-2.5 max-[850px]:text-[10px] max-[360px]:size-[38px] max-[360px]:min-h-[38px] max-[360px]:min-w-[38px] max-[360px]:p-[9px] max-[360px]:[&>span]:sr-only"
            onClick={addRecord}
          >
            <Icon name="plus" size={17} />
            <span>Record yakuman</span>
          </button>
          {user ? (
            <button
              className="rounded-[13px] border-0 bg-transparent p-0"
              data-active={page === "profile"}
              aria-label="My profile"
              onClick={() => onProfile(user.id)}
            >
              <Avatar user={user} />
            </button>
          ) : (
            <button
              className="flex min-h-11 items-center gap-2.5 border-0 bg-transparent text-xs text-muted hover:text-content max-[700px]:text-[11px] max-[700px]:[&>svg]:hidden"
              onClick={() => onLogin()}
            >
              Log in
              <Icon name="arrow" size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
