from rembg import remove
from PIL import Image
from pathlib import Path
import base64

src_dir = Path(r"E:\MK\manikandan-portfolio\temp-images")
out_dir = Path(r"E:\MK\manikandan-portfolio\public\portraits")
out_dir.mkdir(parents=True, exist_ok=True)

files = [
    ("photo1.jpg", "portrait-event"),
    ("photo2.jpg", "portrait-casual"),
]

for src_name, out_base in files:
    src = src_dir / src_name
    print(f"Processing {src_name}...")
    img = Image.open(src).convert("RGBA")
    max_h = 1400
    if img.height > max_h:
        ratio = max_h / img.height
        img = img.resize((int(img.width * ratio), max_h), Image.Resampling.LANCZOS)
    cut = remove(img)
    png_path = out_dir / f"{out_base}.png"
    cut.save(png_path, "PNG", optimize=True)
    print(f"  saved {png_path} size={cut.size}")

    with open(png_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    w, h = cut.size
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <image width="{w}" height="{h}" href="data:image/png;base64,{b64}"/>
</svg>
"""
    svg_path = out_dir / f"{out_base}.svg"
    svg_path.write_text(svg, encoding="utf-8")
    print(f"  saved {svg_path}")

profile = out_dir / "portrait-event.png"
profile_dest = Path(r"E:\MK\manikandan-portfolio\public\profile.png")
Image.open(profile).save(profile_dest, "PNG")
print(f"profile saved -> {profile_dest}")
print("DONE")
