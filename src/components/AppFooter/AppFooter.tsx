export function AppFooter() {
  return (
    <footer className="mx-auto mt-[55px] flex max-w-[1112px] items-center gap-5 border-t border-line pt-[25px] pb-7 min-[1400px]:max-w-[1172px] max-[1200px]:mx-[26px] max-[700px]:mx-5 max-[700px]:mt-[35px] max-[700px]:mb-[calc(65px+env(safe-area-inset-bottom))] max-[700px]:flex-wrap max-[700px]:gap-3 max-[430px]:mx-4 [&>a]:gap-[9px] [&>a]:text-base [&>a>img]:size-7 [&>p]:text-[11px] [&>p]:text-muted [&>span]:ml-auto [&>span]:flex [&>span]:items-center [&>span]:gap-[13px] [&>span]:text-[11px] [&>span]:text-muted max-[700px]:[&>span]:m-0 max-[700px]:[&>span]:w-full max-[700px]:[&>span]:justify-center max-[700px]:[&>p]:ml-auto">
      <a
        className="flex items-center gap-[11px] font-display text-[21px] font-extrabold tracking-[-1px] whitespace-nowrap max-[430px]:gap-2 max-[430px]:text-[19px]"
        href="#/home"
      >
        <span>
          © 2026 <span className="font-[450]">Elysiavernight</span>
          <span className="text-accent">.</span>
        </span>
      </a>
      <p>Every rare hand, remembered.</p>
      <span>Powered by Elysiavernight</span>
    </footer>
  );
}
