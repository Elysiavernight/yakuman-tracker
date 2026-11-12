import { Icon } from "../../components/index";

export function Notification({
  notice,
  onDismiss,
}: {
  notice: string;
  onDismiss: () => void;
}) {
  return (
    <div
      className="fixed bottom-7 left-1/2 z-100 flex w-max max-w-[calc(100vw-30px)] -translate-x-1/2 items-center gap-2.5 rounded-[10px] border border-[#75617b] bg-raised px-[17px] py-[15px] text-xs text-content shadow-[0_10px_30px_#0005] light:border-[#c4accb] max-[700px]:bottom-[calc(85px+env(safe-area-inset-bottom))] [&>svg]:shrink-0 [&>svg]:text-success [&>button]:ml-2 [&>button]:flex [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-1 [&>button]:text-muted"
      role="status"
    >
      <Icon name="check" size={18} />
      {notice}
      <button aria-label="Dismiss notification" onClick={() => onDismiss()}>
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}
