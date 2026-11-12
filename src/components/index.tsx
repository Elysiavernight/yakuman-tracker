import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type CSSProperties,
  type ClipboardEventHandler,
} from "react";
import type { User } from "../types";
import { tileImage } from "../utils/tile-assets";
import tileFront from "../assets/tiles/Front.svg";

const paths: Record<string, ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
      <path d="M9 21v-8h6v8" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 3h8v6a4 4 0 0 1-8 0Z" />
      <path d="M8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4M12 13v5m-4 3h8m-7-3h6v3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  down: <path d="m6 9 6 6 6-6" />,
  sparkle: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />
      <path d="M20 2v4m-2-2h4" />
    </>
  ),
  tiles: (
    <>
      <rect x="3" y="5" width="6" height="15" rx="1.5" />
      <rect x="10" y="3" width="6" height="17" rx="1.5" />
      <path d="M18 5h2a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-2M6 10v5m7-7v7" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 5a5 5 0 0 1 3 5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  link: (
    <>
      <path d="m10 13 4-4m-5 7-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 2 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" />
    </>
  ),
  external: (
    <>
      <path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="1.5" />
      <path d="m3 16 5-5 5 5 3-3 5 5" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  edit: <path d="m15 4 5 5M3 21l5-1L21 7a2 2 0 0 0-5-5L3 15Z" />,
  logout: <path d="M9 3H4v18h5m5-14 5 5-5 5M8 12h13" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  book: (
    <path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15" />
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="m15 15 6 6" />
    </>
  ),
  trash: <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" />,
  upload: <path d="M12 16V3m-5 5 5-5 5 5M3 15v6h18v-6" />,
};
export function Icon({
  name,
  size = 20,
  ...rest
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name] ?? paths.sparkle}
    </svg>
  );
}
export function Avatar({
  user,
  large = false,
}: {
  user: User;
  large?: boolean;
}) {
  return (
    <span
      data-avatar
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden ${user.avatar ? "bg-transparent" : "border border-[hsl(var(--avatar-hue)_20%_40%)] bg-[hsl(var(--avatar-hue)_21%_29%)]"} font-semibold text-[hsl(var(--avatar-hue)_45%_88%)] [&>img]:size-full [&>img]:object-cover ${large ? "size-[76px] rounded-[23px] text-[23px]" : "size-[37px] rounded-xl text-[11px]"}`}
      style={
        {
          "--avatar-hue": `${(user.name.charCodeAt(0) * 31) % 360}`,
        } as CSSProperties
      }
    >
      {user.avatar ? (
        <img src={user.avatar} alt="" />
      ) : (
        user.name.slice(0, 2).toUpperCase()
      )}
    </span>
  );
}
export function Tile({
  id,
  onClick,
  disabled,
  winning = false,
}: {
  id: string;
  onClick?: () => void;
  disabled?: boolean;
  winning?: boolean;
}) {
  const n = Number(id[0]);
  const suit = id[1];
  const label =
    suit === "z"
      ? [
          "East",
          "South",
          "West",
          "North",
          "White dragon",
          "Green dragon",
          "Red dragon",
        ][n - 1]
      : `${n} ${suit === "m" ? "characters" : suit === "p" ? "circles" : "bamboo"}`;
  const content = (
    <span className="pointer-events-none relative block size-full select-none">
      <img
        src={tileFront}
        alt=""
        draggable={false}
        width={300}
        height={400}
        className="absolute inset-0 block size-full object-contain"
      />
      <img
        data-tile-artwork
        src={tileImage(id)}
        alt=""
        draggable={false}
        width={300}
        height={400}
        className="absolute inset-0 block size-full object-contain"
      />
    </span>
  );
  const className = `relative inline-flex h-[45px] w-8 shrink-0 items-center justify-center rounded-[3px] border-0 bg-transparent p-0 align-middle max-[430px]:h-[38px] max-[430px]:w-[25px] ${winning ? "ml-[5px] ring-2 ring-accent/70 shadow-[0_0_16px_#e8a7bd20]" : ""}`;
  return onClick ? (
    <button
      type="button"
      data-tile
      className={className}
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  ) : (
    <span data-tile className={className} role="img" aria-label={label}>
      {content}
    </span>
  );
}
export function Hand({ tiles }: { tiles: string[] }) {
  return (
    <div
      className="flex flex-wrap items-center gap-1 max-[430px]:gap-[3px]"
      aria-label="Winning hand"
    >
      {tiles.map((t, i) => (
        <Tile id={t} key={i} winning={i === tiles.length - 1} />
      ))}
    </div>
  );
}
export function Modal({
  title,
  onClose,
  children,
  wide = false,
  onPaste,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  onPaste?: ClipboardEventHandler<HTMLDialogElement>;
}) {
  const titleId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const startedOnBackdrop = useRef(false);
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      onPaste={onPaste}
      aria-labelledby={titleId}
      className={
        wide
          ? "m-auto max-h-[calc(100dvh-48px)] overflow-auto overscroll-contain rounded-[18px] border border-[#62506a] bg-surface p-7 text-content shadow-[0_30px_90px_#0008] backdrop:bg-[#0b0812c7] light:border-[#c4accb] light:backdrop:bg-[#2b153255] max-[700px]:max-h-[calc(100dvh-30px)] max-[700px]:p-6 max-[430px]:p-5 w-[min(760px,calc(100%-30px))] max-[700px]:w-[calc(100%-24px)]"
          : "m-auto max-h-[calc(100dvh-48px)] overflow-auto overscroll-contain rounded-[18px] border border-[#62506a] bg-surface p-7 text-content shadow-[0_30px_90px_#0008] backdrop:bg-[#0b0812c7] light:border-[#c4accb] light:backdrop:bg-[#2b153255] max-[700px]:max-h-[calc(100dvh-30px)] max-[700px]:p-6 max-[430px]:p-5 w-[min(460px,calc(100%-30px))]"
      }
      onCancel={(e) => {
        if (e.target !== e.currentTarget) return;

        e.preventDefault();
        onClose();
      }}
      onPointerDown={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        startedOnBackdrop.current =
          e.target === e.currentTarget &&
          (e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom);
      }}
      onPointerCancel={() => {
        startedOnBackdrop.current = false;
      }}
      onClick={(e) => {
        const startedOutside = startedOnBackdrop.current;
        startedOnBackdrop.current = false;
        if (!startedOutside || e.target !== e.currentTarget) return;
        const r = e.currentTarget.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          onClose();
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-[15px] [&_h2]:text-[23px] [&_h2]:font-semibold [&_h2]:tracking-[-.8px] max-[430px]:[&_h2]:text-xl">
        <h2 id={titleId}>{title}</h2>
        <button
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border-0 bg-transparent text-muted hover:bg-raised hover:text-content max-[700px]:size-11"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Empty({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="col-span-full flex flex-col items-center rounded-[14px] border border-dashed border-line bg-surface px-5 py-[60px] text-center [&_h3]:mb-[9px] [&_h3]:text-xl [&_p]:max-w-[350px] [&_p]:text-xs [&_p]:leading-[1.8] [&_p]:text-muted [&>button]:mt-[23px]">
      <span className="mb-[19px] text-accent">
        <Icon name="tiles" size={30} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
