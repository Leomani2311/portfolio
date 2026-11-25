"""Remove music-player widget and handwritten overlays from event portrait."""
from pathlib import Path
import cv2
import numpy as np
from PIL import Image
from rembg import remove

ROOT = Path(r"E:\MK\manikandan-portfolio")
SRC = ROOT / "temp-images" / "photo1.jpg"
OUT_PNG = ROOT / "public" / "portraits" / "portrait-event.png"
OUT_PROFILE = ROOT / "public" / "profile.png"


def build_mask(bgr: np.ndarray) -> np.ndarray:
    h, w = bgr.shape[:2]
    mask = np.zeros((h, w), dtype=np.uint8)

    # Music player widget — bottom-left frosted panel
    mask[int(h * 0.72) : h, 0 : int(w * 0.58)] = 255

    # Soft white handwritten strokes / sparkles / icons
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    # bright near-white ink
    white = cv2.inRange(hsv, (0, 0, 185), (179, 70, 255))
    # teal/green accent marks from icons/hearts
    green = cv2.inRange(hsv, (35, 40, 80), (95, 255, 255))

    # Keep mask away from face/torso center so we don't erase clothing highlights
    person = np.zeros((h, w), dtype=np.uint8)
    cv2.ellipse(
        person,
        (w // 2, int(h * 0.42)),
        (int(w * 0.22), int(h * 0.38)),
        0,
        0,
        360,
        255,
        -1,
    )
    overlays = cv2.bitwise_or(white, green)
    overlays = cv2.bitwise_and(overlays, cv2.bitwise_not(person))

    # Right-side caption area (handwritten quotes)
    overlays[int(h * 0.55) : int(h * 0.92), int(w * 0.55) : w] = np.maximum(
        overlays[int(h * 0.55) : int(h * 0.92), int(w * 0.55) : w],
        255,
    )
    # Top annotation bands
    overlays[0 : int(h * 0.18), :] = np.maximum(overlays[0 : int(h * 0.18), :], white[0 : int(h * 0.18), :])

    mask = cv2.bitwise_or(mask, overlays)
    mask = cv2.dilate(mask, np.ones((5, 5), np.uint8), iterations=2)
    mask = cv2.GaussianBlur(mask, (9, 9), 0)
    _, mask = cv2.threshold(mask, 24, 255, cv2.THRESH_BINARY)
    return mask


def main() -> None:
    print("Loading", SRC)
    bgr = cv2.imread(str(SRC))
    if bgr is None:
        raise SystemExit(f"Missing source: {SRC}")

    mask = build_mask(bgr)
    cleaned = cv2.inpaint(bgr, mask, 7, cv2.INPAINT_TELEA)

    # Shrink a bit for web
    max_h = 1400
    h, w = cleaned.shape[:2]
    if h > max_h:
        scale = max_h / h
        cleaned = cv2.resize(
            cleaned,
            (int(w * scale), max_h),
            interpolation=cv2.INTER_AREA,
        )

    rgb = cv2.cvtColor(cleaned, cv2.COLOR_BGR2RGB)
    pil = Image.fromarray(rgb).convert("RGBA")
    print("Removing background…")
    cut = remove(pil)

    # Trim transparent padding
    bbox = cut.getbbox()
    if bbox:
        cut = cut.crop(bbox)
        pad = 16
        canvas = Image.new("RGBA", (cut.width + pad * 2, cut.height + pad * 2), (0, 0, 0, 0))
        canvas.paste(cut, (pad, pad), cut)
        cut = canvas

    OUT_PNG.parent.mkdir(parents=True, exist_ok=True)
    cut.save(OUT_PNG, "PNG", optimize=True)
    cut.save(OUT_PROFILE, "PNG", optimize=True)
    print("Saved", OUT_PNG, cut.size)
    print("Saved", OUT_PROFILE)


if __name__ == "__main__":
    main()
