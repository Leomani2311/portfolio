from pathlib import Path
import base64

out_dir = Path(r"E:\MK\manikandan-portfolio\public\portraits")

for name in ("portrait-event", "portrait-casual"):
    png_path = out_dir / f"{name}.png"
    data = png_path.read_bytes()
    # quick size via PIL
    from PIL import Image

    w, h = Image.open(png_path).size
    b64 = base64.b64encode(data).decode("ascii")
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <image width="{w}" height="{h}" href="data:image/png;base64,{b64}"/>
</svg>
"""
    svg_path = out_dir / f"{name}.svg"
    svg_path.write_text(svg, encoding="utf-8")
    print("updated", svg_path.name, w, h)
