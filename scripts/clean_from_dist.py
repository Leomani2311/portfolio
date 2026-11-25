from pathlib import Path
from PIL import Image
import numpy as np

DIST = Path(r"E:\MK\manikandan-portfolio\dist\portraits\portrait-event.png")
OUT = Path(r"E:\MK\manikandan-portfolio\public\portraits\portrait-event.png")
PROFILE = Path(r"E:\MK\manikandan-portfolio\public\profile.png")


def main() -> None:
    img = Image.open(DIST).convert("RGBA")
    w, h = img.size

    # Crop out music player + lower caption zone
    cropped = img.crop((0, 0, w, int(h * 0.72)))
    a = np.array(cropped)
    hh, ww = a.shape[:2]
    rgb = a[:, :, :3].astype(np.int16)

    # White handwriting / sparkles (high luminance, low chroma)
    white = (
        (rgb[:, :, 0] > 205)
        & (rgb[:, :, 1] > 205)
        & (rgb[:, :, 2] > 205)
        & ((rgb.max(axis=2) - rgb.min(axis=2)) < 28)
    )

    yy, xx = np.ogrid[:hh, :ww]
    # Protect the person silhouette area
    core = ((xx - ww * 0.5) / (ww * 0.36)) ** 2 + (
        (yy - hh * 0.48) / (hh * 0.55)
    ) ** 2 <= 1.0

    a[white & ~core, 3] = 0

    # Far-right doodle strip (arrow / heart / short text) — outside body
    a[int(hh * 0.32) : int(hh * 0.58), int(ww * 0.84) : ww, 3] = 0

    # Bottom-left residual frosted UI if any remained after crop
    a[int(hh * 0.88) : hh, 0 : int(ww * 0.4), 3] = 0

    out = Image.fromarray(a, "RGBA")
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
        pad = 12
        canvas = Image.new(
            "RGBA", (out.width + pad * 2, out.height + pad * 2), (0, 0, 0, 0)
        )
        canvas.paste(out, (pad, pad), out)
        out = canvas

    out.save(OUT, "PNG", optimize=True)
    out.save(PROFILE, "PNG", optimize=True)
    print("done", out.size, OUT)


if __name__ == "__main__":
    main()
