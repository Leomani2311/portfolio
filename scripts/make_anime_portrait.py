"""Cut the illustrated portrait out of its black background.

Removes only near-black pixels connected to the image border (so dark hair
and suit interiors are kept), then feathers the edge for a clean cutout.

Usage: python scripts/make_anime_portrait.py <input.png> [output.png]
"""
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

SRC = sys.argv[1]
OUT = sys.argv[2] if len(sys.argv) > 2 else 'public/portraits/portrait-anime.png'

# The source background is pure black (0-1). Suit shadows also dip to ~0 in
# spots, so keep the threshold tight and open the mask before labelling to
# break thin bridges between those shadows and the real background.
BG_THRESHOLD = 4
BRIDGE_ITERATIONS = 4

img = Image.open(SRC).convert('RGB')
rgb = np.asarray(img).astype(np.int16)

dark = rgb.max(axis=2) <= BG_THRESHOLD
core = ndimage.binary_erosion(dark, iterations=BRIDGE_ITERATIONS, border_value=1)
labels, _ = ndimage.label(core)
border_labels = np.unique(
    np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]])
)
background = np.isin(labels, border_labels[border_labels != 0])
# Grow back to the true edge, but never past non-dark pixels.
background = ndimage.binary_dilation(
    background, iterations=BRIDGE_ITERATIONS + 1, mask=dark
)

# Close small holes/specks, then feather: alpha ramps over ~2px at the edge.
foreground = ndimage.binary_opening(~background, iterations=1)
foreground = ndimage.binary_fill_holes(foreground)
# Smooth the noisy outline (majority vote), then pull the edge in past the
# dark fringe left by the black background.
foreground = ndimage.median_filter(foreground.astype(np.uint8), size=7).astype(bool)
foreground = ndimage.binary_erosion(foreground, iterations=3)
alpha = ndimage.gaussian_filter(foreground.astype(np.float32), sigma=1.4)
alpha = np.clip((alpha - 0.15) / 0.7, 0, 1)

rgba = np.dstack([rgb.astype(np.uint8), (alpha * 255).astype(np.uint8)])
out = Image.fromarray(rgba, 'RGBA')

# Trim empty margins so the figure sizes predictably in the layout.
out = out.crop(out.getbbox())
out.save(OUT, optimize=True)
print(f'saved {OUT} {out.size}')
