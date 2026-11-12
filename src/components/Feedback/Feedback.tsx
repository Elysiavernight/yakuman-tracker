export function Loading() {
  return (
    <div
      className="grid gap-[18px] pb-[35px] text-center text-xs text-muted"
      role="status"
    >
      <div className="h-[230px] animate-shimmer rounded-[14px] border border-line bg-[linear-gradient(100deg,var(--color-surface),var(--color-raised),var(--color-surface))] bg-size-[200%_100%] motion-reduce:animate-none" />
      <div className="h-[230px] animate-shimmer rounded-[14px] border border-line bg-[linear-gradient(100deg,var(--color-surface),var(--color-raised),var(--color-surface))] bg-size-[200%_100%] motion-reduce:animate-none" />
      <span>Gathering the memories…</span>
    </div>
  );
}
export function ErrorState({
  error,
  retry,
}: {
  error: string;
  retry: () => void;
}) {
  return (
    <div
      className="rounded-[14px] border border-line bg-surface p-[35px] [&_h3]:mb-2.5 [&_p]:mb-5 [&_p]:text-xs [&_p]:text-muted"
      role="alert"
    >
      <h3>Couldn’t reach the table.</h3>
      <p>{error}</p>
      <button
        className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-line bg-raised text-content hover:bg-line"
        onClick={retry}
      >
        Try again
      </button>
    </div>
  );
}
