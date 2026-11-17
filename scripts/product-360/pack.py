"""Crop rendered PNG frames to their shared bounding box and save as WebP.
Usage: python3 scripts/product-360/pack.py <frames_dir> <out_dir>"""
import os, sys
from PIL import Image

src, out = sys.argv[1], sys.argv[2]
for p in sorted(os.listdir(src)):
    files = sorted(f for f in os.listdir(os.path.join(src, p)) if f.endswith(".png"))
    ims = [Image.open(os.path.join(src, p, f)) for f in files]
    box = None
    for im in ims:
        b = im.getbbox()
        box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]), max(box[2], b[2]), max(box[3], b[3]))
    pad = 8
    box = (max(box[0] - pad, 0), max(box[1] - pad, 0), box[2] + pad, box[3] + pad)
    os.makedirs(os.path.join(out, p), exist_ok=True)
    total = 0
    for f, im in zip(files, ims):
        dst = os.path.join(out, p, f.replace(".png", ".webp"))
        im.crop(box).save(dst, "WEBP", quality=80, method=6)
        total += os.path.getsize(dst)
    print(p, len(files), "frames", box[2] - box[0], "x", box[3] - box[1], f"{total/1e6:.1f} MB")
