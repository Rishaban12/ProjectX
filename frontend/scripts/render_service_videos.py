"""Four distinct ProjectX service videos in the yellow / white / ink palette."""

from __future__ import annotations

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1280, 720
FPS = 24
DURATION = 8.0
FRAMES = int(FPS * DURATION)

BG = (247, 247, 244)
INK = (20, 21, 28)
GRAY = (228, 228, 224)
GRAY_DARK = (210, 210, 206)
WHITE = (255, 255, 255)
YELLOW = (255, 212, 0)
SOFT = (236, 236, 232)
MUTED = (110, 112, 120)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "videos"
FONT_REG = Path(r"C:\Windows\Fonts\arial.ttf")
FONT_BD = Path(r"C:\Windows\Fonts\arialbd.ttf")


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def ease(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def clamp(t: float) -> float:
    return max(0.0, min(1.0, t))


def span(t: float, a: float, b: float) -> float:
    if b <= a:
        return 1.0
    return ease(clamp((t - a) / (b - a)))


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_BD if bold else FONT_REG), size)


def rounded(draw: ImageDraw.ImageDraw, box, radius: int, fill, outline=None, width: int = 2) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def text_c(draw: ImageDraw.ImageDraw, xy, text: str, fnt, fill=INK) -> None:
    x, y = xy
    bbox = draw.textbbox((0, 0), text, font=fnt)
    draw.text((x - (bbox[2] - bbox[0]) / 2, y - (bbox[3] - bbox[1]) / 2), text, font=fnt, fill=fill)


def text_l(draw: ImageDraw.ImageDraw, xy, text: str, fnt, fill=INK) -> None:
    draw.text(xy, text, font=fnt, fill=fill)


def mix(base: Image.Image, overlay: Image.Image, alpha: float) -> None:
    if alpha <= 0:
        return
    if alpha >= 1:
        base.alpha_composite(overlay)
        return
    faded = overlay.copy()
    faded.putalpha(faded.getchannel("A").point(lambda p: int(p * alpha)))
    base.alpha_composite(faded)


def phone_shell(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int) -> None:
    rounded(draw, (x, y, x + w, y + h), 36, INK)
    rounded(draw, (x + 8, y + 8, x + w - 8, y + h - 8), 28, WHITE)
    draw.rounded_rectangle((x + w / 2 - 26, y + 16, x + w / 2 + 26, y + 24), radius=4, fill=GRAY)


def cursor(draw: ImageDraw.ImageDraw, cx: float, cy: float) -> None:
    draw.polygon(
        [(cx, cy), (cx + 14, cy + 18), (cx + 6, cy + 16), (cx + 10, cy + 28), (cx + 4, cy + 16), (cx, cy + 20)],
        fill=INK,
    )


# --- Websites: CMS blocks assemble, then a live site board ---
def render_websites(t: float) -> Image.Image:
    img = Image.new("RGBA", (W, H), BG + (255,))
    draw = ImageDraw.Draw(img)
    blocks = [
        ("HERO", WHITE, 70, 120),
        ("MEDIA", GRAY, 258, 120),
        ("COPY", WHITE, 446, 120),
        ("SEO", YELLOW, 634, 120),
        ("SHOP", WHITE, 70, 278),
        ("BOOKING", SOFT, 258, 278),
        ("CTA", YELLOW, 446, 278),
        ("FORM", GRAY, 634, 278),
        ("MAP", GRAY, 70, 436),
        ("GALLERY", WHITE, 258, 436),
        ("PRICING", SOFT, 446, 436),
        ("API", GRAY, 634, 436),
    ]
    appear = span(t, 0.0, 1.2)
    board = span(t, 2.4, 3.2)
    populate = span(t, 3.2, 5.6)

    if board < 0.95:
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        fnt = font(12, True)
        for i, (label, fill, x, y) in enumerate(blocks):
            a = span(t, i * 0.06, i * 0.06 + 0.35)
            if a <= 0:
                continue
            bw, bh = 168, 132
            rounded(d, (x, y, x + bw, y + bh), 16, fill)
            text_c(d, (x + bw / 2, y + bh / 2), label, fnt, INK if fill == YELLOW else MUTED)
            if x == 634:
                d.line((x + bw, y + bh / 2, 980, 360), fill=INK, width=2)
        phone_shell(d, 1008, 128, 210, 430)
        text_c(d, (1113, 280), "PUBLISH", font(16, True), MUTED)
        if t > 0.8:
            cursor(d, 1188, 292)
        rounded(d, (1036, 470, 1190, 530), 8, SOFT)
        text_c(d, (1113, 500), "LIVE SITE", font(11, True), MUTED)
        mix(img, layer, 1 - board)
    if board > 0.05:
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        rounded(d, (80, 90, 840, 630), 28, WHITE, INK, 4)
        rounded(d, (98, 108, 822, 612), 18, SOFT)
        pages = [("Home", True), ("Shop", False), ("Book", True), ("About", False), ("Gallery", True), ("Contact", False)]
        for i, (label, accent) in enumerate(pages):
            c, r = i % 2, i // 2
            x = 128 + c * 350
            y = 132 + r * 150
            rounded(d, (x, y, x + 326, y + 132), 12, WHITE, GRAY_DARK, 1)
            media = YELLOW if accent and populate > 0.3 else GRAY
            rounded(d, (x + 12, y + 12, x + 314, y + 62), 8, media)
            if populate > 0.5:
                d.rectangle((x + 12, y + 76, x + 180, y + 84), fill=INK)
                d.rectangle((x + 12, y + 94, x + 120, y + 102), fill=INK)
            text_l(d, (x + 12, y + 110), label.upper(), font(10, True), MUTED)
        d.line((840, 360, 1008, 360), fill=INK, width=2)
        phone_shell(d, 1008, 145, 200, 410)
        rounded(d, (1030, 190, 1190, 270), 8, YELLOW)
        d.rectangle((1030, 286, 1140, 294), fill=INK)
        rounded(d, (1030, 320, 1190, 400), 8, GRAY)
        d.rectangle((1030, 416, 1120, 424), fill=INK)
        mix(img, layer, board)
    return img.convert("RGB")


# --- Student projects: IDE typing, then kit cards, then viva slide ---
def render_students(t: float) -> Image.Image:
    img = Image.new("RGBA", (W, H), BG + (255,))
    ide = 1 - span(t, 2.6, 3.3)
    kit = span(t, 2.6, 3.3) * (1 - span(t, 5.1, 5.8))
    viva = span(t, 5.1, 5.8)

    if ide > 0.04:
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        rounded(d, (90, 70, 1190, 650), 18, WHITE, INK, 4)
        rounded(d, (90, 70, 1190, 128), 18, SOFT)
        d.rectangle((90, 110, 1190, 128), fill=SOFT)
        for i, col in enumerate([(255, 90, 90), YELLOW, (90, 200, 130)]):
            d.ellipse((118 + i * 22, 88, 132 + i * 22, 102), fill=col)
        tabs = [("main.py", True), ("model.py", False), ("report.md", False)]
        x = 210
        for label, on in tabs:
            w = 118
            rounded(d, (x, 82, x + w, 118), 8, YELLOW if on else WHITE)
            text_c(d, (x + w / 2, 100), label, font(12, True), INK)
            x += w + 8
        lines = [
            ("1", "from flask import Flask"),
            ("2", "app = Flask(__name__)"),
            ("3", ""),
            ("4", "@app.route('/')"),
            ("5", "def home():"),
            ("6", "    return predict(sensor)"),
            ("7", ""),
            ("8", "# viva demo ready"),
        ]
        shown = int(lerp(1, len(lines) + 0.4, span(t, 0.15, 2.4)))
        for i, (num, code) in enumerate(lines[:shown]):
            y = 168 + i * 48
            text_l(d, (130, y), num, font(14), MUTED)
            color = YELLOW if i == 5 else INK
            text_l(d, (180, y), code, font(18, i == 7), color if i != 7 else MUTED)
        if shown >= 6:
            caret_y = 168 + 5 * 48
            if int(t * 4) % 2 == 0:
                d.rectangle((188 + 210, caret_y, 192 + 210, caret_y + 22), fill=YELLOW)
        rounded(d, (90, 600, 1190, 650), 0, INK)
        text_l(d, (120, 614), "mini  ·  major  ·  final-year   |   tests passing", font(13), YELLOW)
        mix(img, layer, ide)

    if kit > 0.04:
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        cards = [
            ("SOURCE CODE", "Walkthrough included", YELLOW, 110),
            ("REPORT", "Thesis-ready write-up", WHITE, 460),
            ("VIVA PPT", "Defense slides", GRAY, 810),
        ]
        for i, (title, sub, fill, x) in enumerate(cards):
            a = span(t, 2.7 + i * 0.18, 3.1 + i * 0.18)
            y = int(lerp(760, 150, a))
            rounded(d, (x, y, x + 320, y + 400), 20, fill, INK, 3)
            text_c(d, (x + 160, y + 70), f"0{i + 1}", font(28, True), INK)
            text_c(d, (x + 160, y + 160), title, font(18, True), INK)
            text_c(d, (x + 160, y + 200), sub, font(13), MUTED)
            if span(t, 3.4 + i * 0.2, 3.8 + i * 0.2) > 0.8:
                d.ellipse((x + 128, y + 270, x + 192, y + 334), fill=INK if fill != YELLOW else WHITE)
                text_c(d, (x + 160, y + 302), "✓", font(28, True), YELLOW if fill != YELLOW else INK)
        mix(img, layer, kit)

    if viva > 0.04:
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        rounded(d, (80, 80, 1200, 640), 16, INK)
        rounded(d, (96, 96, 1184, 624), 12, WHITE)
        rounded(d, (96, 96, 1184, 180), 12, YELLOW)
        d.rectangle((96, 160, 1184, 180), fill=YELLOW)
        text_c(d, (640, 138), "FINAL YEAR PROJECT  ·  DEMO", font(20, True), INK)
        text_c(d, (640, 240), "Smart Attendance with Face AI", font(28, True), INK)
        boxes = [("Capture", 200), ("Model", 520), ("Report", 840)]
        for label, x in boxes:
            rounded(d, (x, 310, x + 240, 470), 14, SOFT, INK, 2)
            text_c(d, (x + 120, 390), label.upper(), font(16, True), INK)
        d.line((440, 390, 520, 390), fill=INK, width=2)
        d.line((760, 390, 840, 390), fill=INK, width=2)
        rounded(d, (500, 520, 780, 590), 10, YELLOW)
        text_c(d, (640, 555), "VIVA READY", font(18, True), INK)
        mix(img, layer, viva)

    return img.convert("RGB")


# --- Learning: timeline track lighting up, then certificate ---
def render_learning(t: float) -> Image.Image:
    img = Image.new("RGBA", (W, H), BG + (255,))
    draw = ImageDraw.Draw(img)
    steps = [
        ("PROMPT\nLAB", 140),
        ("AI\nPRODUCT", 360),
        ("WORKFLOW", 580),
        ("ETHICS", 800),
    ]
    progress = span(t, 0.2, 5.0)
    cert = span(t, 5.4, 6.4)

    draw.line((140, 250, 800, 250), fill=GRAY_DARK, width=6)
    draw.line((140, 250, 140 + 660 * progress, 250), fill=YELLOW, width=6)
    play_x = 140 + 660 * progress
    draw.ellipse((play_x - 12, 238, play_x + 12, 262), fill=INK)
    draw.polygon([(play_x - 3, 244), (play_x - 3, 256), (play_x + 7, 250)], fill=YELLOW)

    for i, (label, x) in enumerate(steps):
        on = progress > i / 3.2
        r = 34
        draw.ellipse((x - r, 250 - r, x + r, 250 + r), fill=YELLOW if on else WHITE, outline=INK, width=3)
        text_c(draw, (x, 250), str(i + 1), font(18, True), INK)
        for j, line in enumerate(label.split("\n")):
            text_c(draw, (x, 318 + j * 20), line, font(13, True), INK if on else MUTED)

    # live session card
    rounded(draw, (140, 420, 620, 620), 18, WHITE, INK, 3)
    draw.ellipse((170, 455, 210, 495), fill=YELLOW)
    text_l(draw, (230, 460), "LIVE COHORT", font(16, True), INK)
    text_l(draw, (230, 488), "Hands-on lab in progress", font(13), MUTED)
    bar_w = int(360 * span(t, 1.2, 4.8))
    rounded(draw, (170, 540, 530, 556), 8, GRAY)
    if bar_w > 8:
        rounded(draw, (170, 540, 170 + bar_w, 556), 8, YELLOW)
    text_l(draw, (170, 572), "Certificate unlocks at 100%", font(12), MUTED)

    phone_shell(draw, 980, 140, 220, 450)
    text_c(draw, (1090, 230), "SESSION", font(13, True), MUTED)
    for i, lab in enumerate(["WATCH", "BUILD", "SHIP"]):
        y = 270 + i * 78
        on = progress > (i + 1) / 4
        rounded(draw, (1010, y, 1180, y + 62), 10, YELLOW if on else SOFT)
        text_c(draw, (1095, y + 31), lab, font(13, True), INK)

    if cert > 0:
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(layer)
        y = int(lerp(80, 150, cert))
        rounded(d, (240, y, 1040, y + 420), 20, WHITE, INK, 4)
        rounded(d, (260, y + 20, 1020, y + 90), 10, YELLOW)
        text_c(d, (640, y + 55), "CERTIFICATE OF COMPLETION", font(22, True), INK)
        text_c(d, (640, y + 170), "AI Invasion & Adaptiveness", font(28, True), INK)
        text_c(d, (640, y + 230), "ProjectX Learning Hub", font(16), MUTED)
        d.line((430, y + 310, 850, y + 310), fill=INK, width=2)
        text_c(d, (640, y + 340), "MENTOR  ·  PROJECTX", font(12, True), MUTED)
        mix(img, layer, cert)

    return img.convert("RGB")


# --- Career: resume page filling, then profile on phone ---
def render_career(t: float) -> Image.Image:
    img = Image.new("RGBA", (W, H), BG + (255,))
    draw = ImageDraw.Draw(img)
    page = span(t, 0.0, 1.0)
    bars = span(t, 1.2, 3.6)
    linked = span(t, 4.2, 5.4)

    # resume sheet
    rounded(draw, (90, 70, 620, 650), 8, WHITE, INK, 3)
    rounded(draw, (90, 70, 620, 160), 8, YELLOW)
    draw.rectangle((90, 140, 620, 160), fill=YELLOW)
    text_l(draw, (120, 95), "CANDIDATE NAME", font(22, True), INK)
    text_l(draw, (120, 128), "Full-stack  ·  AI-ready", font(13), MUTED)

    sections = [("EXPERIENCE", 190), ("PROJECTS", 320), ("SKILLS", 450)]
    for label, y in sections:
        text_l(draw, (120, y), label, font(12, True), INK)
        draw.line((120, y + 22, 580, y + 22), fill=GRAY_DARK, width=1)

    for i in range(3):
        y = 226 + i * 26
        draw.rectangle((120, y, 120 + 280 - i * 40, y + 8), fill=INK if page > 0.4 else GRAY)
    for i in range(2):
        y = 356 + i * 28
        draw.rectangle((120, y, 420 - i * 50, y + 8), fill=INK if page > 0.6 else GRAY)

    skills = [("React", 0.92), ("Python", 0.8), ("ATS keywords", 0.75), ("Communication", 0.88)]
    for i, (name, val) in enumerate(skills):
        y = 486 + i * 34
        text_l(draw, (120, y), name, font(12), MUTED)
        rounded(draw, (280, y + 4, 560, y + 16), 6, GRAY)
        w = int(280 * val * bars)
        if w > 6:
            rounded(draw, (280, y + 4, 280 + w, y + 16), 6, YELLOW)

    draw.line((620, 360, 860, 360), fill=INK, width=2)

    phone_shell(draw, 900, 120, 250, 500)
    rounded(draw, (990, 165, 1060, 235), 35, YELLOW)
    text_c(draw, (1025, 200), "PX", font(16, True), INK)
    text_c(draw, (1025, 258), "PROFILE", font(12, True), MUTED)
    rows = [("Resume", bars > 0.3), ("LinkedIn", bars > 0.6), ("Interview", linked > 0.2), ("Offer", linked > 0.7)]
    for i, (lab, on) in enumerate(rows):
        y = 290 + i * 70
        rounded(draw, (930, y, 1120, y + 54), 10, YELLOW if on else SOFT)
        text_c(draw, (1025, y + 27), lab.upper(), font(12, True), INK)

    if linked > 0.4:
        rounded(draw, (160, 560, 550, 630), 10, INK)
        text_c(draw, (355, 595), "ATS SCORE  92", font(18, True), YELLOW)

    return img.convert("RGB")


RENDERERS = {
    "websites": render_websites,
    "student-projects": render_students,
    "learning": render_learning,
    "career": render_career,
}


def encode(name: str, renderer) -> Path:
    dest = OUT / f"{name}.mp4"
    cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS),
        "-i", "-",
        "-an",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "fast",
        "-movflags", "+faststart",
        str(dest),
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    assert proc.stdin is not None
    for i in range(FRAMES):
        frame = renderer(i / FPS)
        proc.stdin.write(frame.tobytes())
    proc.stdin.close()
    err = proc.stderr.read().decode("utf-8", errors="ignore") if proc.stderr else ""
    if proc.wait() != 0:
        raise RuntimeError(err[-2000:])
    return dest


def main(only: str | None = None) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    items = RENDERERS.items() if not only else [(only, RENDERERS[only])]
    for name, renderer in items:
        path = encode(name, renderer)
        print(f"wrote {path} ({path.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    import sys

    main(sys.argv[1] if len(sys.argv) > 1 else None)
