from pathlib import Path
from PIL import Image
import numpy as np

ROOT = Path(r"E:\MK\manikandan-portfolio")
SRC = ROOT / "public" / "portraits" / "portrait-event.png"
OUT = SRC
PROFILE = ROOT / "public" / "profile.png"


def main() -> None:
    img = Image.open(SRC).convert("RGBA")
    arr = np.array(img)
    h, w = arr.shape[:2]

    # Wipe music player band (bottom-left translucent widget)
    y0 = int(h * 0.70)
    x1 = int(w * 0.62)
    arr[y0:h, 0:x1, 3] = 0

    # Wipe bottom-right handwritten caption area
    arr[int(h * 0.62) : h, int(w * 0.48) : w, 3] = 0

    # Wipe bright white/near-white annotation strokes outside body core
    rgb = arr[:, :, :3].astype(np.int16)
    alpha = arr[:, :, 3]
    bright = (rgb.min(axis=2) > 175) & (rgb.max(axis=2) - rgb.min(axis=2) < 55)
    # greenish UI accents
    green = (arr[:, :, 1] > arr[:, :, 0] + 25) & (arr[:, :, 1] > 120) & (arr[:, :, 2] < 180)

    yy, xx = np.ogrid[:h, :w]
    cx, cy = w * 0.50, h * 0.40
    rx, ry = w * 0.28, h * 0.42
    core = ((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2 <= 1.0

    kill = (bright | green) & (~core) & (alpha > 0)
    arr[kill, 3] = 0

    # Also clear top annotation strip corners
    arr[0 : int(h * 0.12), 0 : int(w * 0.35), 3] = 0
    arr[0 : int(h * 0.14), int(w * 0.65) : w, 3] = 0

    cleaned = Image.fromarray(arr, "RGBA")
    bbox = cleaned.getbbox()
    if bbox:
        cleaned = cleaned.crop(bbox)
        pad = 12
        canvas = Image.new(
            "RGBA",
            (cleaned.width + pad * 2, cleaned.height + pad * 2),
            (0, 0, 0, 0),
        )
        canvas.paste(cleaned, (pad, pad), cleaned)
        cleaned = canvas

    cleaned.save(OUT, "PNG", optimize=True)
    cleaned.save(PROFILE, "PNG", optimize=True)
    print(f"cleaned -> {OUT} size={cleaned.size}")


if __name__ == "__main__":
    main()
