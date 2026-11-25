"""Remove a busy background from a portrait with rembg (AI segmentation).

Usage: python scripts/remove_bg.py <input> <output.webp|png> [model]
Default model: isnet-general-use (downloaded to ~/.u2net on first run).
"""
import sys

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

SRC = sys.argv[1]
OUT = sys.argv[2]
MODEL = sys.argv[3] if len(sys.argv) > 3 else 'isnet-general-use'

session = new_session(MODEL)
img = Image.open(SRC).convert('RGB')
cut = remove(img, session=session, post_process_mask=True)

# Clean the matte: drop isolated specks of leftover background, then pull the
# edge in 1px so coloured fringe from a busy background doesn't show.
alpha = np.asarray(cut.getchannel('A'))
labels, count = ndimage.label(alpha > 24)
if count > 1:
    sizes = ndimage.sum(np.ones_like(alpha), labels, range(1, count + 1))
    keep = np.isin(labels, np.flatnonzero(sizes >= sizes.max() * 0.01) + 1)
    alpha = np.where(keep, alpha, 0).astype(np.uint8)
alpha = ndimage.grey_erosion(alpha, size=3)
alpha = ndimage.gaussian_filter(alpha.astype(np.float32), sigma=0.6)
cut.putalpha(Image.fromarray(np.clip(alpha, 0, 255).astype(np.uint8)))

# Trim empty margins so the figure sizes predictably in the layout.
cut = cut.crop(cut.getbbox())
if OUT.lower().endswith('.webp'):
    cut.save(OUT, 'WEBP', quality=88, method=6)
else:
    cut.save(OUT, optimize=True)
print(f'saved {OUT} {cut.size}')
