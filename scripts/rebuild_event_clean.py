from pathlib import Path
from PIL import Image
import numpy as np
from rembg import remove

ROOT = Path(r"E:\MK\manikandan-portfolio")
SRC = ROOT / "temp-images" / "photo1.jpg"
OUT = ROOT / "public" / "portraits" / "portrait-event.png"
PROFILE = ROOT / "public" / "profile.png"


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    w, h = img.size

    # Crop away music player + bottom caption before cutout
    left = int(w * 0.08)
    top = int(h * 0.02)
    right = int(w * 0.92)
    bottom = int(h * 0.74)
    cropped = img.crop((left, top, right, bottom))

    # Resize for speed/web
    max_h = 1400
    if cropped.height > max_h:
        ratio = max_h / cropped.height
        cropped = cropped.resize(
            (int(cropped.width * ratio), max_h),
            Image.Resampling.LANCZOS,
        )

    print("rembg…", cropped.size)
    cut = remove(cropped.convert("RGBA"))

    arr = np.array(cut)
    hh, ww = arr.shape[:2]
    rgb = arr[:, :, :3].astype(np.int16)
    alpha = arr[:, :, 3]

    # Remove leftover white handwriting / sparkles outside torso
    bright = (rgb.min(axis=2) > 190) & ((rgb.max(axis=2) - rgb.min(axis=2)) < 40)
    yy, xx = np.ogrid[:hh, :ww]
    core = ((xx - ww * 0.5) / (ww * 0.32)) ** 2 + ((yy - hh * 0.45) / (hh * 0.48)) ** 2 <= 1.0
    kill = bright & (~core) & (alpha > 10)
    arr[kill, 3] = 0

    # Clear any residual bottom-left frosted UI bits
    arr[int(hh * 0.82) : hh, 0 : int(ww * 0.45), 3] = 0

    cleaned = Image.fromarray(arr, "RGBA")
    bbox = cleaned.getbbox()
    if bbox:
        cleaned = cleaned.crop(bbox)
        pad = 14
        canvas = Image.new(
            "RGBA",
            (cleaned.width + pad * 2, cleaned.height + pad * 2),
            (0, 0, 0, 0),
        )
        canvas.paste(cleaned, (pad, pad), cleaned)
        cleaned = canvas

    OUT.parent.mkdir(parents=True, exist_ok=True)
    cleaned.save(OUT, "PNG", optimize=True)
    cleaned.save(PROFILE, "PNG", optimize=True)
    print("saved", OUT, cleaned.size)


if __name__ == "__main__":
    main()
