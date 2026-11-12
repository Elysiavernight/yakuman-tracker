import type { Post } from "../../types";
import { useCatalog } from "../../providers/catalog";
import { Modal } from "../../components/index";

export function RecordDialogs({
  deleting,
  deleteBusy,
  proof,
  onCloseDelete,
  onCloseProof,
  onDelete,
}: {
  deleting: Post | null;
  deleteBusy: boolean;
  proof: Post | null;
  onCloseDelete: () => void;
  onCloseProof: () => void;
  onDelete: () => void;
}) {
  const { getYakuman } = useCatalog();
  return (
    <>
      {deleting && (
        <Modal
          title="Delete this memory?"
          onClose={() => !deleteBusy && onCloseDelete()}
        >
          <p className="mt-[7px] mb-6 text-sm leading-[1.8] text-muted">
            This will permanently remove your{" "}
            {deleting.types.map((t) => getYakuman(t).name).join(" + ")} record
            and its proof.
          </p>
          <div className="flex items-center justify-end gap-2.5 border-t border-line pt-5">
            <button
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-line bg-raised text-content hover:bg-line"
              onClick={() => onCloseDelete()}
              disabled={deleteBusy}
            >
              Keep it
            </button>
            <button
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-[17px] py-2.5 text-xs font-semibold whitespace-nowrap max-[700px]:min-h-11 border-transparent bg-danger text-[#441b24]"
              onClick={onDelete}
              disabled={deleteBusy}
            >
              {deleteBusy ? "Deleting…" : "Delete record"}
            </button>
          </div>
        </Modal>
      )}
      {proof && (
        <Modal
          title="The proof. The moment."
          onClose={() => onCloseProof()}
          wide
        >
          <img
            className="w-full object-contain"
            src={proof.image}
            alt={`Winning screenshot for ${proof.types.map((t) => getYakuman(t).name).join(" and ")}`}
          />
        </Modal>
      )}
    </>
  );
}
