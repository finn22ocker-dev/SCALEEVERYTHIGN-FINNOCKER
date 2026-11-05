# MEDIA BRIEFS – optionale Bordeaux-Videoloops

Die Website ist **ohne Video vollständig**: Der Hero nutzt eine prozedurale WebGL-Skulptur mit CSS-Fallback.
Die folgenden drei Briefings dienen dazu, bei Bedarf eigene, lizenzierte Abstrakt-Loops zu erzeugen
(z. B. mit einem KI-Videotool oder in Blender/Cinema 4D). **Nur selbst erstellte oder eindeutig lizenzierte
Dateien verwenden. Kein Ton.**

Allgemeine Vorgaben für alle Loops:

- Farbwelt: Obsidian `#101012`, Bordeaux `#641529` (Highlights bis `#C0405F`), Off-White-Spiegelungen `#F4F1EB`. Lime `#C8FF33` höchstens als winziger Lichtpunkt.
- Keine Personen, Logos, Schrift, Produkte oder erkennbare Marken.
- Nahtloser Loop (letzter Frame = erster Frame), kein Kamerawackeln, keine Schnitte.
- Export: `MP4 (H.264, CRF ~23)` **und** `WebM (VP9)`, jeweils < 4 MB; zusätzlich ein Poster-Frame als `.jpg` (≤ 150 KB).
- Ablage unter `public/media/…`; Einbindung mit `muted autoPlay loop playsInline preload="none"` und `poster`. Bei `prefers-reduced-motion` oder `navigator.connection.saveData` nur Poster zeigen.

---

## 1. Hero-Loop „Liquid Bordeaux Core“

| Parameter | Wert |
| --- | --- |
| Seitenverhältnis | 16:9 (Desktop, 1920×1080) + 4:5 (Mobil, 1080×1350) |
| Dauer | 8 s, nahtlos |
| Platzierung | `Hero` hinter der Headline, als Alternative/Ergänzung zur WebGL-Szene (rechte Bildhälfte, Desktop) |
| Dateien | `public/media/hero-loop.mp4`, `hero-loop.webm`, `hero-poster.jpg` |

**Art Direction:** Eine einzelne, glänzende, flüssig-metallische Skulptur in tiefem Bordeaux schwebt in einem schwarzen Studio. Ihre Oberfläche morpht langsam und organisch wie zähflüssiges Metall – keine Tropfen, keine Explosion. Ein warmes Key-Light von rechts oben erzeugt weiche, lange Spiegelungen; ein Bordeaux-Rim-Light von hinten links trennt die Form vom Hintergrund. Sehr geringe Tiefenschärfe, feines Filmkorn, keine Partikel. Kamera statisch oder minimaler Dolly (≤ 3 %). Objekt rechts der Bildmitte positionieren (Mobil: obere Bildhälfte), damit links Platz für Typografie bleibt.

**Prompt-Vorschlag:** *“Cinematic macro shot of a single glossy liquid-metal sculpture in deep burgundy (#641529) slowly morphing like molten chrome, floating in a pitch-black studio, warm soft key light from top right, burgundy rim light from behind, long smooth specular reflections, shallow depth of field, subtle film grain, seamless loop, no text, no particles, no people.”*

---

## 2. Projekt-Übergang „Velvet Wipe“

| Parameter | Wert |
| --- | --- |
| Seitenverhältnis | 16:9 (1920×1080) |
| Dauer | 2,5 s (einmalig, kein Loop nötig) oder 6 s Loop |
| Platzierung | Optionaler Hintergrund im Projekt-Dialog (`ProjectShowcase`) oder als Übergang zwischen Leistungen und Projekten |
| Dateien | `public/media/project-transition.mp4/.webm`, Poster |

**Art Direction:** Schwere, samtige Stoff- oder Flüssigkeitsbahn in Bordeaux gleitet diagonal von unten links nach oben rechts durchs Bild und gibt dabei schwarzen Raum frei. Weiche Faltenwürfe, seidige Glanzlichter, sehr langsam (High-Speed-Look, 120 fps auf 24 fps verlangsamt). Endframe überwiegend schwarz, damit Inhalte darüber lesbar bleiben.

**Prompt-Vorschlag:** *“Slow-motion burgundy velvet liquid ribbon sweeping diagonally across a black frame, silky highlights, soft folds, elegant and minimal, ends on near-black, cinematic studio lighting, no text.”*

---

## 3. Hintergrund-Akzent „Ember Field“

| Parameter | Wert |
| --- | --- |
| Seitenverhältnis | 21:9 (2560×1080), alternativ 9:16 für Mobil |
| Dauer | 12 s, nahtlos |
| Platzierung | Sehr dezent (Opacity 20–35 %) hinter der Kontakt-Sektion (`Contact`) oder dem Statement „THINK BIGGER.“ |
| Dateien | `public/media/ambient-loop.mp4/.webm`, Poster |

**Art Direction:** Abstrakte, langsam atmende Farbwolken aus Bordeaux und Schwarz, wie Licht hinter Milchglas. Kaum erkennbare Formen, sehr weiche Übergänge, niedriger Kontrast, damit Text darüber jederzeit lesbar bleibt. Gelegentlich ein winziger, unscharfer Lime-Lichtpunkt (≤ 1 % der Fläche), der langsam driftet.

**Prompt-Vorschlag:** *“Abstract slow-breathing gradient clouds of deep burgundy and black, like light behind frosted glass, very soft, low contrast, minimal, seamless loop, a tiny out-of-focus lime green light drifting slowly, no text, no shapes.”*
