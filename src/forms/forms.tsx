import { useState, type FormEvent, type ClipboardEvent } from "react";
import type { User, Post } from "../types";
import { useCatalog } from "../providers/catalog";
import { Avatar, Icon, Modal, Tile } from "../components/index";
import { api, readImage, send } from "../utils/lib";
import { AvatarCropper } from "../components/AvatarCropper/AvatarCropper";

export function AuthForm({
  onClose,
  onSuccess,
  initial = "login",
}: {
  onClose: () => void;
  onSuccess: (user: User) => void;
  initial?: "login" | "signup";
}) {
  const [mode, setMode] = useState(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const result = await api<{ user: User }>(
        `/auth/${mode}`,
        send("POST", data),
      );
      onSuccess(result.user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      title={mode === "login" ? "Welcome back." : "Your journey starts here."}
      onClose={onClose}
    >
      <div className="mt-6 mb-5 flex justify-center [&>[data-tile]]:h-[65px] [&>[data-tile]]:w-12 [&>[data-tile]]:-rotate-7 [&+p]:text-center">
        <Tile id="7z" />
      </div>
      <p className="mt-[7px] mb-6 text-sm leading-[1.8] text-muted">
        {mode === "login"
          ? "A few rare hands. A lot of good memories. Log in to keep yours together."
          : "Save your rarest hands, build your collection, and celebrate with friends."}
      </p>
      <div className="flex gap-1 rounded-[9px] border border-line bg-inset p-1 [&>button]:flex [&>button]:min-h-9 [&>button]:items-center [&>button]:justify-center [&>button]:gap-2 [&>button]:rounded-md [&>button]:border [&>button]:border-transparent [&>button]:bg-transparent [&>button]:px-[14px] [&>button]:py-[9px] [&>button]:text-[11px] [&>button]:whitespace-nowrap [&>button]:text-muted [&>button[data-active=true]]:border-[#55465d] [&>button[data-active=true]]:bg-raised [&>button[data-active=true]]:text-content light:[&>button[data-active=true]]:border-[#c2accb] [&>button:hover]:text-content max-[700px]:[&>button]:min-h-11 max-[430px]:[&>button]:gap-[5px] max-[430px]:[&>button]:px-[7px] max-[430px]:[&>button]:text-[10px] mb-[23px] [&>button]:flex-1">
        <button
          data-active={mode === "login"}
          onClick={() => {
            setMode("login");
            setError("");
          }}
        >
          Log in
        </button>
        <button
          data-active={mode === "signup"}
          onClick={() => {
            setMode("signup");
            setError("");
          }}
        >
          Sign up
        </button>
      </div>
      <form
        onSubmit={submit}
        className="grid gap-[19px] [&_label]:text-sm [&_label>small]:mt-1.5 [&_label>small]:block [&_label>small]:text-[11px] [&_label>small]:text-muted [&_button[type=submit]]:min-h-11"
        key={mode}
      >
        {mode === "signup" && (
          <label>
            Display name
            <input
              name="name"
              required
              maxLength={40}
              placeholder="What should we call you?"
              autoComplete="nickname"
            />
          </label>
        )}
        <label>
          Username
          <input
            name="username"
            required
            minLength={3}
            maxLength={24}
            pattern="[a-zA-Z0-9_]+"
            placeholder="Your username"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
          />
          <small>3–24 letters, numbers, or underscores.</small>
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={128}
            placeholder="At least 8 characters"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
          />
        </label>
        {error && (
          <p
            className="rounded-lg border border-danger/20 bg-danger/5 px-[13px] py-[11px] text-xs text-danger"
            role="alert"
          >
            {error}
          </p>
        )}
        <button
          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-accent text-accent-ink shadow-sm hover:bg-accent-hover w-full"
          type="submit"
          disabled={busy}
        >
          {busy
            ? "One moment…"
            : mode === "login"
              ? "Log in"
              : "Create account"}
          <Icon name="arrow" size={18} />
        </button>
      </form>
      <p className="mt-6 text-center text-[11px] text-muted">
        Your next yakuman deserves to be remembered.
      </p>
    </Modal>
  );
}

export function RecordForm({
  onClose,
  onSuccess,
  initialRecord,
}: {
  onClose: () => void;
  onSuccess: () => void;
  initialRecord?: Post;
}) {
  const { yakumans, tileIds, getYakuman } = useCatalog();
  const [types, setTypes] = useState<string[]>(() => [
    ...(initialRecord?.types ?? []),
  ]);

  const [hand, setHand] = useState<string[]>(() => [
    ...(initialRecord?.hand ?? []),
  ]);

  const [image, setImage] = useState(initialRecord?.image ?? "");

  const [imageName, setImageName] = useState(
    initialRecord?.image ? "Current screenshot" : "",
  );

  const [builder, setBuilder] = useState(Boolean(initialRecord?.hand.length));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const toggle = (id: string) =>
    setTypes((old) =>
      old.includes(id) ? old.filter((t) => t !== id) : [...old, id],
    );
  async function handlePaste(e: ClipboardEvent<HTMLDialogElement>) {
    const item = Array.from(e.clipboardData.items).find(
      (item) => item.kind === "file" && item.type.startsWith("image/"),
    );
    const file = item?.getAsFile();
    if (!file) {
      return;
    }
    e.preventDefault();
    try {
      const result = await readImage(file);
      setImage(result);
      setImageName(file.name || "pasted screenshot");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!types.length) {
      setError("Choose the yakuman you obtained.");
      return;
    }
    if (hand.length && hand.length < 14) {
      setError(
        "Complete your hand with at least 14 tiles, or clear it to skip.",
      );
      return;
    }
    setBusy(true);
    try {
      await api(
        initialRecord
          ? `/posts/${encodeURIComponent(initialRecord.id)}`
          : "/posts",
        send(initialRecord ? "PATCH" : "POST", {
          ...Object.fromEntries(new FormData(e.currentTarget)),
          types,
          hand,
          image,
        }),
      );
      onSuccess();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      title={
        initialRecord ? "Edit your recorded hand." : "A hand worth remembering."
      }
      onClose={onClose}
      onPaste={handlePaste}
      wide
    >
      <p className="mt-[7px] mb-6 text-sm leading-[1.8] text-muted">
        Choose your yakuman. Add as much of the story as you like.
      </p>
      <form onSubmit={submit} className="grid gap-[23px] [&>label]:text-sm">
        <section>
          <div className="mb-[13px] flex items-center justify-between gap-3 [&_h3]:font-sans [&_h3]:text-[13px] [&_h3]:font-semibold [&_h3]:tracking-normal">
            <h3>
              Yakuman type{" "}
              <span className="ml-[7px] inline-block text-[11px] font-normal tracking-normal text-accent">
                Required
              </span>
            </h3>
            <span className="text-xs text-muted">Select all that apply</span>
          </div>
          <div className="flex min-w-0 items-center gap-2 rounded-lg border border-line bg-inset px-3 text-muted [&_input]:m-0 [&_input]:min-h-10 [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:px-0 [&_input]:py-2.5 [&_input]:text-xs [&_input]:outline-offset-0">
            <Icon name="search" size={17} />
            <input
              aria-label="Search yakuman types"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a yakuman…"
            />
          </div>
          <div className="mt-3 grid max-h-[282px] grid-cols-2 gap-2 overflow-auto overscroll-contain p-[3px] max-[430px]:max-h-[300px] max-[430px]:grid-cols-1">
            {yakumans
              .filter((y) =>
                `${y.name} ${y.english} ${y.japanese}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .map((y) => (
                <button
                  type="button"
                  key={y.id}
                  aria-pressed={types.includes(y.id)}
                  className="group flex min-w-0 items-center justify-between gap-2 rounded-lg border border-line bg-inset px-2.5 py-[11px] text-left hover:bg-raised aria-pressed:border-accent aria-pressed:bg-accent/5 [&>span:first-child]:min-w-0 [&_strong]:block [&_strong]:text-[13px] [&_strong]:leading-[1.4] [&_strong]:font-medium [&_small]:mt-1 [&_small]:block [&_small]:text-[11px] [&_small]:text-muted max-[700px]:[&_strong]:text-sm"
                  onClick={() => toggle(y.id)}
                >
                  <span>
                    <strong>{y.name}</strong>
                    <small>{y.english}</small>
                  </span>
                  <span className="flex items-center gap-2.5 [&>span:first-child:not(:last-child)]:max-w-[45px] [&>span:first-child:not(:last-child)]:text-[11px] [&>span:first-child:not(:last-child)]:text-muted">
                    {y.multiplier === 2 ? (
                      <span className="text-[11px] text-gold">2×</span>
                    ) : (
                      <span className="font-serif">{y.japanese}</span>
                    )}
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-sm border border-[#6e5a78] group-aria-pressed:border-accent group-aria-pressed:bg-accent group-aria-pressed:text-accent-ink">
                      {types.includes(y.id) && <Icon name="check" size={13} />}
                    </span>
                  </span>
                </button>
              ))}
          </div>
          {types.length > 0 && (
            <p className="mx-[3px] mt-3 flex items-start gap-[7px] text-xs text-accent [&>svg]:shrink-0">
              <Icon name="check" size={16} />
              {types.map((id) => getYakuman(id).name).join(" + ")}
            </p>
          )}
        </section>
        <section className="overflow-hidden rounded-[10px] border border-line">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-2.5 border-0 bg-raised px-[15px] py-[14px] text-xs [&>span]:flex [&>span]:items-center [&>span]:gap-[9px] [&_strong]:font-medium [&>svg]:text-muted"
            aria-expanded={builder}
            onClick={() => setBuilder(!builder)}
          >
            <span>
              <Icon name="tiles" />
              <strong>Build your hand</strong>
              <span className="ml-[7px] inline-block text-[11px] font-normal tracking-normal text-muted">
                Optional
              </span>
            </span>
            <Icon name={builder ? "close" : "plus"} />
          </button>
          {builder && (
            <div className="p-4 max-[700px]:p-[14px]">
              <p className="text-xs text-muted">
                Choose 14 tiles (up to 18 with quads). Click a selected tile to
                remove it. The final tile is the winning tile.
              </p>
              <div className="mt-[15px] flex min-h-[82px] flex-wrap items-center justify-center gap-1 rounded-lg border border-dashed border-[#69546d] bg-inset px-[9px] py-[14px] text-[11px]">
                {hand.length ? (
                  hand.map((id, i) => (
                    <Tile
                      id={id}
                      key={i}
                      onClick={() => setHand(hand.filter((_, j) => j !== i))}
                      winning={i === hand.length - 1}
                    />
                  ))
                ) : (
                  <span className="text-muted">
                    Your winning hand goes here
                  </span>
                )}
              </div>
              <div className="mt-[5px] mb-2.5 flex items-center justify-between text-[11px] text-muted">
                <span>
                  {hand.length} / 14{hand.length > 14 ? " + quads" : ""} tiles
                </span>
                <button
                  type="button"
                  className="inline-flex min-h-9 items-center justify-center gap-[7px] border-0 bg-transparent py-2 text-xs text-accent hover:underline max-[700px]:min-h-11"
                  onClick={() => setHand([])}
                >
                  Clear hand
                </button>
              </div>
              <div className="grid gap-[11px] [&_button:not(:disabled):hover]:-translate-y-[3px] [&_button:not(:disabled):hover]:outline-2 [&_button:not(:disabled):hover]:outline-accent">
                {["m", "p", "s", "z"].map((suit, i) => (
                  <div
                    className="flex items-center gap-[14px] [&>span]:w-[72px] [&>span]:text-[11px] [&>span]:text-muted [&>div]:flex [&>div]:flex-wrap [&>div]:gap-[5px] max-[430px]:flex-col max-[430px]:items-start max-[430px]:gap-[5px] max-[430px]:[&>span]:w-auto"
                    key={suit}
                  >
                    <span>
                      {["Characters", "Circles", "Bamboo", "Honors"][i]}
                    </span>
                    <div>
                      {tileIds
                        .filter((t) => t.endsWith(suit))
                        .map((id) => (
                          <Tile
                            key={id}
                            id={id}
                            disabled={
                              hand.length >= 18 ||
                              hand.filter((t) => t === id).length >= 4
                            }
                            onClick={() => setHand([...hand, id])}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        <div className="grid grid-cols-2 gap-[18px] [&>label]:text-sm max-[430px]:grid-cols-1">
          <label>
            Played on{" "}
            <span className="ml-[7px] inline-block text-[11px] font-normal tracking-normal text-muted">
              Optional
            </span>
            <select
              name="platform"
              defaultValue={initialRecord?.platform ?? "Other"}
            >
              <option>Other</option>
              <option>Mahjong Soul</option>
              <option>Tenhou</option>
              <option>Riichi City</option>
              <option>In person</option>
            </select>
          </label>
          <label>
            Game link{" "}
            <span className="ml-[7px] inline-block text-[11px] font-normal tracking-normal text-muted">
              Optional
            </span>
            <input
              name="gameLink"
              type="url"
              defaultValue={initialRecord?.gameLink ?? ""}
              placeholder="https://…"
              maxLength={2000}
            />
          </label>
        </div>
        <label className="text-sm">
          Screenshot{" "}
          <span className="ml-[7px] inline-block text-[11px] font-normal tracking-normal text-muted">
            Optional
          </span>
          <span className="relative mt-[9px] flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-[#69546d] bg-inset px-[15px] py-[22px] text-center focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-accent [&>strong]:max-w-full [&>strong]:text-xs [&>strong]:font-medium [&>strong]:[overflow-wrap:anywhere] [&>svg]:mb-[3px] [&>svg]:text-accent [&>input]:absolute [&>input]:inset-0 [&>input]:m-0 [&>input]:size-full [&>input]:cursor-pointer [&>input]:opacity-0 [&>img]:mb-[7px] [&>img]:max-h-[180px] [&>img]:rounded-sm [&>img]:object-contain">
            {image ? (
              <img src={image} alt="Proof preview" />
            ) : (
              <Icon name="upload" size={25} />
            )}
            <strong>
              {imageName || "Choose a screenshot or paste an image"}
            </strong>
            <span className="text-xs text-muted">
              Ctrl+V / ⌘V · PNG, JPG, WebP or GIF · up to 5 MB
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  setImage(await readImage(file));
                  setImageName(file.name);
                  setError("");
                } catch (err) {
                  setError((err as Error).message);
                }
              }}
            />
          </span>
        </label>
        {image && (
          <button
            type="button"
            className="inline-flex min-h-9 items-center justify-center gap-[7px] border-0 bg-transparent py-2 text-xs text-accent hover:underline max-[700px]:min-h-11"
            onClick={() => {
              setImage("");
              setImageName("");
            }}
          >
            Remove screenshot
          </button>
        )}
        <label>
          The story{" "}
          <span className="ml-[7px] inline-block text-[11px] font-normal tracking-normal text-muted">
            Optional
          </span>
          <textarea
            name="description"
            defaultValue={initialRecord?.description ?? ""}
            rows={3}
            maxLength={2000}
            placeholder="The lucky draw, the impossible wait, the friends who witnessed it…"
          />
        </label>
        {error && (
          <p
            className="rounded-lg border border-danger/20 bg-danger/5 px-[13px] py-[11px] text-xs text-danger"
            role="alert"
          >
            {error}
          </p>
        )}
        <div className="flex items-center justify-end gap-2.5 border-t border-line pt-5">
          <button
            type="button"
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-line bg-raised text-content hover:bg-line"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-accent text-accent-ink shadow-sm hover:bg-accent-hover"
            disabled={busy || !types.length}
          >
            <Icon name={initialRecord ? "edit" : "plus"} size={18} />
            {busy
              ? "Saving your hand…"
              : initialRecord
                ? "Save changes"
                : "Record yakuman"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function EditProfile({
  user,
  onClose,
  onSuccess,
}: {
  user: User;
  onClose: () => void;
  onSuccess: (u: User) => void;
}) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || photoLoading || cropSource) return;
    setBusy(true);
    setError("");
    try {
      const result = await api<{ user: User }>(
        "/profile",
        send("PATCH", {
          ...Object.fromEntries(new FormData(e.currentTarget)),
          avatar,
        }),
      );
      onSuccess(result.user);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title="Make yourself at home." onClose={onClose}>
      <form
        onSubmit={submit}
        className="grid gap-[19px] [&_label]:text-sm [&_label>small]:mt-1.5 [&_label>small]:block [&_label>small]:text-[11px] [&_label>small]:text-muted [&_button[type=submit]]:min-h-11"
      >
        <div className="my-2.5 flex flex-wrap items-center gap-[17px] [&>label]:relative [&>label]:overflow-hidden [&>label:focus-within]:outline-2 [&>label:focus-within]:outline-offset-4 [&>label:focus-within]:outline-accent">
          <Avatar user={{ ...user, avatar }} large />
          <label className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-line bg-raised text-content hover:bg-line">
            Change photo
            <input
              className="sr-only"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              disabled={busy || photoLoading || Boolean(cropSource)}
              onChange={async (e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                setPhotoLoading(true);
                try {
                  setCropSource(await readImage(f));
                  setError("");
                } catch (err) {
                  setError((err as Error).message);
                } finally {
                  setPhotoLoading(false);
                }
              }}
            />
          </label>
          {avatar && (
            <button
              type="button"
              className="inline-flex min-h-9 items-center justify-center gap-[7px] border-0 bg-transparent py-2 text-xs text-accent hover:underline max-[700px]:min-h-11"
              disabled={busy || photoLoading || Boolean(cropSource)}
              onClick={() => setAvatar("")}
            >
              Remove
            </button>
          )}
        </div>
        {photoLoading && (
          <p role="status" className="text-xs text-muted">
            Opening photo…
          </p>
        )}
        {cropSource && (
          <AvatarCropper
            source={cropSource}
            onApply={(image) => {
              setAvatar(image);
              setCropSource(null);
              setError("");
            }}
            onCancel={() => setCropSource(null)}
          />
        )}
        <label>
          Display name
          <input name="name" defaultValue={user.name} required maxLength={40} />
        </label>
        <label>
          Pronouns{" "}
          <span className="text-xs font-normal text-muted">(optional)</span>
          <input
            name="pronouns"
            defaultValue={user.pronouns ?? ""}
            maxLength={40}
            placeholder="e.g. she/her, he/him, they/them"
          />
        </label>
        <label>
          About you
          <textarea
            name="bio"
            defaultValue={user.bio}
            maxLength={300}
            rows={3}
            placeholder="A little about you and your mahjong journey."
          />
        </label>
        <p className="text-xs text-muted">Your username is @{user.username}.</p>
        {error && (
          <p
            className="rounded-lg border border-danger/20 bg-danger/5 px-[13px] py-[11px] text-xs text-danger"
            role="alert"
          >
            {error}
          </p>
        )}
        <button
          className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-accent text-accent-ink shadow-sm hover:bg-accent-hover w-full"
          type="submit"
          disabled={busy || photoLoading || Boolean(cropSource)}
        >
          {busy ? "Saving…" : "Save changes"}
          <Icon name="check" size={18} />
        </button>
      </form>
    </Modal>
  );
}
