import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { cropAvatar } from "../../utils/image-crop";

export function AvatarCropper({
  source,
  onApply,
  onCancel,
}: {
  source: string;
  onApply: (image: string) => void;
  onCancel: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function apply() {
    if (!area || busy) return;
    setBusy(true);
    setError("");
    try {
      onApply(await cropAvatar(source, area, rotation));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      aria-label="Crop profile photo"
      className="grid gap-4 rounded-xl border border-line bg-inset p-4"
    >
      <div>
        <h3 className="text-base font-semibold">Frame your photo</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Drag to reposition, or focus the image and use the arrow keys. Adjust
          zoom and rotation below.
        </p>
      </div>
      <div className="relative h-[280px] overflow-hidden rounded-lg bg-black max-[430px]:h-[230px]">
        <Cropper
          image={source}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          minZoom={1}
          maxZoom={3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, pixels) => setArea(pixels)}
          zoomWithScroll={false}
          disableAutomaticStylesInjection
          cropperProps={{ "aria-label": "Reposition profile photo" }}
          mediaProps={{
            alt: "Photo being cropped",
            onError: () =>
              setError(
                "This image could not be opened. Please choose another photo.",
              ),
          }}
        />
      </div>
      <label className="text-sm">
        <span className="flex items-center justify-between">
          Zoom <span className="text-xs text-muted">{zoom.toFixed(1)}×</span>
        </span>
        <input
          aria-label="Photo zoom"
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          disabled={busy}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="min-h-11 border-0 bg-transparent p-0"
        />
      </label>
      <label className="text-sm">
        <span className="flex items-center justify-between">
          Rotation <span className="text-xs text-muted">{rotation}°</span>
        </span>
        <input
          aria-label="Photo rotation"
          type="range"
          min={0}
          max={360}
          step={1}
          value={rotation}
          disabled={busy}
          onChange={(e) => setRotation(Number(e.target.value))}
          className="min-h-11 border-0 bg-transparent p-0"
        />
      </label>
      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
      <p className="text-xs text-muted">
        Saved as a 512 × 512 image. Your profile updates when you save changes.
      </p>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRotation(0);
          }}
          className="mr-auto min-h-11 rounded-lg px-2 text-xs text-accent hover:bg-raised"
        >
          Reset crop
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onCancel}
          className="min-h-11 rounded-lg border border-line bg-raised px-3 text-xs hover:bg-line"
        >
          Cancel crop
        </button>
        <button
          type="button"
          disabled={busy || !area}
          onClick={() => void apply()}
          className="min-h-11 rounded-lg bg-accent px-3 text-xs font-semibold text-accent-ink hover:bg-accent-hover"
        >
          {busy ? "Cropping…" : "Use photo"}
        </button>
      </div>
    </section>
  );
}
