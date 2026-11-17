"""Unwrap flat product photos (front / side / back, transparent PNG) into a
360-degree cylindrical texture plus a lathe profile taken from the silhouette.

Usage: python3 scripts/product-360/unwrap.py <out_dir>
Writes <name>-texture.png and <name>-profile.json for each product.
"""
import json, math, sys
import numpy as np
from PIL import Image

PUB = "public/products/"
PRODUCTS = {
    # views: (file, angle in degrees where the camera sees that photo head-on)
    "oil": [("gouthealth-oil.png", 0), ("gouthealth-oil-back.png", 180)],
    "capsules": [
        ("gouthealth-capsules.png", 0),
        ("gouthealth-capsules-composition.png", 120),
        ("gouthealth-capsules-back.png", 240),
    ],
}
TEX_W, TEX_H = 2048, 1024
BLEND = 14  # degrees of cross-fade between neighbouring views


def silhouette(img):
    a = img[:, :, 3] > 128
    rows = np.where(a.any(1))[0]
    top, bot = rows[0], rows[-1]
    left = np.full(img.shape[0], np.nan)
    right = np.full(img.shape[0], np.nan)
    for y in range(top, bot + 1):
        xs = np.where(a[y])[0]
        if len(xs):
            left[y], right[y] = xs[0], xs[-1]
    return top, bot, left, right


def bilinear(img, x, y):
    h, w = img.shape[:2]
    x = np.clip(x, 0, w - 1.001); y = np.clip(y, 0, h - 1.001)
    x0 = np.floor(x).astype(int); y0 = np.floor(y).astype(int)
    fx = (x - x0)[..., None]; fy = (y - y0)[..., None]
    p = img[y0, x0] * (1 - fx) * (1 - fy) + img[y0, x0 + 1] * fx * (1 - fy) \
        + img[y0 + 1, x0] * (1 - fx) * fy + img[y0 + 1, x0 + 1] * fx * fy
    return p


def build(name, views, out):
    imgs = [np.asarray(Image.open(PUB + f).convert("RGBA")).astype(np.float32) for f, _ in views]
    sils = [silhouette(i) for i in imgs]
    # profile from the first (front) view
    top, bot, L, R = sils[0]
    v = np.linspace(0, 1, TEX_H)  # 0 = top of product
    theta = np.linspace(0, 360, TEX_W, endpoint=False)
    acc = np.zeros((TEX_H, TEX_W, 4), np.float32)
    wsum = np.zeros((TEX_H, TEX_W, 1), np.float32)
    n = len(views)
    half = 180 / n
    for (f, phi), img, (t, b, l, r) in zip(views, imgs, sils):
        ys = t + v * (b - t)
        yi = np.round(ys).astype(int)
        cx = ((l[yi] + r[yi]) / 2)[:, None]
        hw = ((r[yi] - l[yi]) / 2)[:, None] * 0.985  # stay inside the anti-aliased edge
        d = ((theta - phi + 180) % 360) - 180  # local angle in [-180, 180)
        blend = BLEND if n > 2 else 34
        weight = np.clip((half + blend / 2 - np.abs(d)) / blend, 0, 1)
        # never sample the dark glass rim at the very edge of the silhouette:
        # beyond LIM degrees the last clean column is stretched and cross-faded
        lim = 80 if n == 2 else 86
        a = np.radians(np.clip(d, -lim, lim))
        X = cx + hw * np.sin(a)[None, :]
        Y = np.repeat(ys[:, None], TEX_W, 1)
        px = bilinear(img, X, Y)
        w = weight[None, :, None]
        acc += px * w
        wsum += w
    tex = acc / np.maximum(wsum, 1e-6)
    tex[..., 3] = 255
    if n == 2:
        # With only front + back photos the sides (90 and 270 degrees) are seen
        # edge-on in both. Paint them with each row's dominant colour (cream
        # label, amber glass, white cap) so they read as a plain side panel.
        row_col = np.median(tex[:, :, :3], axis=1, keepdims=True)
        side = np.minimum(np.abs(theta - 90), np.abs(theta - 270))
        k = np.clip((22 - side) / 10, 0, 1)[None, :, None]
        tex[..., :3] = tex[..., :3] * (1 - k) + row_col * k
    Image.fromarray(np.clip(tex, 0, 255).astype(np.uint8)).save(f"{out}/{name}-texture.png")
    # lathe profile: radius per row, normalised so height = 1
    H = bot - top
    rows = np.linspace(top, bot, 160).astype(int)
    radius = np.nan_to_num((R[rows] - L[rows]) / 2 / H)
    pts = [[0.0, 0.0]] + [[float(rr), float(i / 159)] for i, rr in enumerate(radius)] + [[0.0, 1.0]]
    json.dump({"points": pts, "aspect": float((np.nanmax(R - L)) / H)}, open(f"{out}/{name}-profile.json", "w"))
    print(name, "texture + profile written")


if __name__ == "__main__":
    out = sys.argv[1]
    for k, vs in PRODUCTS.items():
        build(k, vs, out)
