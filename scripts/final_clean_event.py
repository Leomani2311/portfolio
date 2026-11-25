from pathlib import Path
import cv2
import numpy as np
from PIL import Image

src = Path(r"E:\MK\manikandan-portfolio\dist\portraits\portrait-event.png")
outp = Path(r"E:\MK\manikandan-portfolio\public\portraits\portrait-event.png")
prof = Path(r"E:\MK\manikandan-portfolio\public\profile.png")

rgba = np.array(Image.open(src).convert("RGBA"))
h, w = rgba.shape[:2]
rgba = rgba[: int(h * 0.72), :, :]  # crop music player
hh, ww = rgba.shape[:2]
rgb = rgba[:, :, :3]
alpha = rgba[:, :, 3]

luma = (
    0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]
).astype(np.float32)
chroma = rgb.max(axis=2).astype(np.int16) - rgb.min(axis=2).astype(np.int16)

# Mask: white/light doodles + lower-right annotation cluster
mask = ((luma > 160) & (chroma < 70) & (alpha > 10)).astype(np.uint8) * 255

# Force-include lower-right doodle area bright marks
y0, y1 = int(hh * 0.36), int(hh * 0.75)
x0, x1 = int(ww * 0.55), ww
sub = ((luma[y0:y1, x0:x1] > 120) & (alpha[y0:y1, x0:x1] > 10)).astype(np.uint8) * 255
mask[y0:y1, x0:x1] = np.maximum(mask[y0:y1, x0:x1], sub)

# Protect face from inpaint damage
cv2.ellipse(
    mask,
    (int(ww * 0.5), int(hh * 0.18)),
    (int(ww * 0.16), int(hh * 0.14)),
    0,
    0,
    360,
    0,
    -1,
)

mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=1)

bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
inpainted = cv2.inpaint(bgr, mask, 4, cv2.INPAINT_TELEA)
fixed_rgb = cv2.cvtColor(inpainted, cv2.COLOR_BGR2RGB)

out = np.dstack([fixed_rgb, alpha])
# where we inpainted overlay on empty bg, keep transparent
out[alpha < 10, 3] = 0

img = Image.fromarray(out, "RGBA")
bb = img.getbbox()
img = img.crop(bb)
pad = 12
canvas = Image.new("RGBA", (img.width + 2 * pad, img.height + 2 * pad), (0, 0, 0, 0))
canvas.paste(img, (pad, pad), img)
canvas.save(outp, "PNG", optimize=True)
canvas.save(prof, "PNG", optimize=True)
print("clean", canvas.size)
