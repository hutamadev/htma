# DESIGN SYSTEM — Material 3 Expressive (htma.site)

> **Last Updated:** 2026-09-23
> **Referensi Utama:** [Material 3 Expressive — Google Research](https://design.google/library/expressive-material-design-google-research)
> **Docs Resmi:** [m3.material.io](https://m3.material.io/)
> **Constraint:** Layout vertical TETAP dipertahankan. Data portfolio TIDAK berubah. Implementasi via Tailwind CSS utility classes, BUKAN library MUI/Material Web.

---

## Daftar Isi

1. [Apa Itu M3 Expressive?](#1-apa-itu-m3-expressive)
2. [5 Pilar Resmi M3 Expressive](#2-5-pilar-resmi-m3-expressive)
3. [Perbedaan M3 Standard vs M3 Expressive](#3-perbedaan-m3-standard-vs-m3-expressive)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Shape System](#6-shape-system)
7. [Size & Visual Hierarchy](#7-size--visual-hierarchy)
8. [Containment](#8-containment)
9. [Motion & Animation](#9-motion--animation)
10. [Elevation & Surface](#10-elevation--surface)
11. [State Layers & Interaction](#11-state-layers--interaction)
12. [Component Mapping — Tailwind Implementation](#12-component-mapping--tailwind-implementation)
13. [Dark Mode Strategy](#13-dark-mode-strategy)
14. [Accessibility](#14-accessibility)
15. [Tailwind Config Reference](#15-tailwind-config-reference)

---

## 1. Apa Itu M3 Expressive?

M3 Expressive adalah evolusi terbaru dari Material Design 3 oleh Google (2025). Fokus utamanya: **membuat UI yang membangkitkan emosi** tanpa mengorbankan usability.

Prinsip inti:

- **Vibrant colors** — Penggunaan warna yang lebih berani dan expressive
- **Contrasting shapes** — Bentuk-bentuk yang kontras dan beragam (35 shape baru)
- **Intuitive motion** — Physics-based motion system, spring animations
- **Adaptive components** — Komponen yang berubah bentuk saat interaksi (shape morphing)
- **Flexible typography** — Tipografi yang lebih expressive, mendukung variable fonts

Riset di balik M3 Expressive:

- 46 studi riset terpisah
- 18.000+ partisipan dari seluruh dunia
- Metode: eye tracking, heuristic evaluation, unmoderated usability testing, longitudinal diary studies

**Kesimpulan riset:** User secara konsisten lebih menyukai desain yang expressive (vibrant, playful) dibanding desain yang "clean tapi membosankan", selama fungsionalitas tetap terjaga.

---

## 2. 5 Pilar Resmi M3 Expressive

Berdasarkan dokumentasi dan riset resmi Google Material Design 3 (`m3.material.io`), M3 Expressive dibangun di atas 5 pilar utama:

1. **Vibrant Color (Dynamic Tonal Palettes):**
   - Palet HCT (Hue, Chroma, Tone) dengan kontras yang lebih tajam dan hidup.
   - _Primary Container_ dan _Secondary Container_ dipakai lebih ekspresif dan prominent untuk menarik atensi visual seketika.

2. **Contrasting Shapes & Shape Morphing:**
   - Skala shape yang luas (dari `rounded-none` hingga `rounded-full`) dengan sudut kurva lebih besar (16px hingga 28px).
   - Transisi bentuk adaptif (_shape morphing_) saat elemen menerima interaksi (hover, focus, pressed).

3. **Intuitive Motion Physics:**
   - Menggantikan durasi waktu dan kurva bezier statis dengan **Spring Physics System**.
   - Memisahkan animasi menjadi dua spesifikasi: **Spatial Specs** (dengan overshoot/bounce terkalibrasi) dan **Effects Specs** (tanpa bounce untuk opasitas dan warna).

4. **Tone-Based Containment:**
   - Mengelompokkan konten secara visual (_visual grouping_) menggunakan **Tone-based Surface Containers** (`surface-container-lowest` hingga `surface-container-highest`) alih-alih bayangan box-shadow tebal.
   - Data eye-tracking Google membuktikan pengguna menemukan elemen kunci 4x lebih cepat pada containment yang jelas.

5. **Flexible & Expressive Typography:**
   - Dukungan penuh font variabel dengan kontras ukuran ekstrem antara teks judul (_Display/Headline_) dan teks isi (_Body/Label_).

---

## 3. Perbedaan M3 Standard vs M3 Expressive

| Aspek                | M3 Standard             | M3 Expressive                                            |
| -------------------- | ----------------------- | -------------------------------------------------------- |
| **Color**            | Tonal palette, subtle   | Vibrant, higher emphasis, bolder primary container usage |
| **Shape**            | 5 skala rounded (XS→XL) | 35+ shapes, shape morphing saat interaksi                |
| **Size**             | Moderate contrast       | Kontras ukuran ekstrem, CTA significantly lebih besar    |
| **Motion**           | Standard easing curves  | Physics-based springs, shape morphing pada interaksi     |
| **Containment**      | Implicit grouping       | Explicit visual grouping via background/shape/border     |
| **Typography**       | Static type scale       | Flexible, variable font emphasis, optical sizing         |
| **Components**       | Static appearance       | Adaptive — berubah bentuk saat hover/press/focus         |
| **Elevation**        | Shadow-based            | Tonal surface tint + shadow hybrid                       |
| **Emotional impact** | Neutral, functional     | Intentionally emotional, "delightful"                    |
| **Usability**        | Good                    | Better — 4x faster element discovery (eye-tracking data) |

### Yang Kita Ambil untuk Portfolio Ini

Karena ini adalah portfolio web (bukan Android app), kita mengambil **prinsip dan visual language** M3 Expressive, bukan implementasi native component library. Spesifik:

- ✅ **Color:** Vibrant tonal palette dari seed color, primary container lebih prominent
- ✅ **Shape:** Rounded corners lebih besar, shape morphing via CSS border-radius transition
- ✅ **Size:** Kontras ukuran eksplisit — CTA lebih besar, heading lebih menonjol
- ✅ **Motion:** Spring physics via Motion/Framer Motion (sudah ada di project)
- ✅ **Containment:** Visual grouping via background color, surface containers
- ✅ **Typography:** Variable font, expressive sizing dengan M3 type scale
- ✅ **State layers:** Hover/focus/pressed overlay opacity
- ✅ **Surface tint elevation:** Tonal color shift, bukan box-shadow murni
- ⚠️ **Shape morphing:** Partial — CSS `border-radius` transition (bukan native shape morph)
- ❌ **35 new shapes (concave, cut, convex):** Skip — tidak praktis di CSS murni

---

## 4. Color System

### 4.1 Seed Color

**Seed:** `#D3F36A` (custom-green saat ini — lime green, energetic)

Tonal palette resmi di bawah di-generate langsung menggunakan `@material/material-color-utilities` (Mathematical M3 HCT Model).

### 4.2 M3 Expressive Color Roles (Nilai Akurat)

#### Light Mode

| Role                          | Token                       | Hex       | Penggunaan di Portfolio                     |
| ----------------------------- | --------------------------- | --------- | ------------------------------------------- |
| **Primary**                   | `primary`                   | `#526600` | CTA buttons, active nav links, accent utama |
| **On Primary**                | `on-primary`                | `#FFFFFF` | Teks/icon di atas primary                   |
| **Primary Container**         | `primary-container`         | `#D0EF67` | Hero badge, highlighted name, chip bg       |
| **On Primary Container**      | `on-primary-container`      | `#171E00` | Teks di primary container                   |
| **Secondary**                 | `secondary`                 | `#5B6146` | Elemen pendukung, subtitle                  |
| **On Secondary**              | `on-secondary`              | `#FFFFFF` | Teks di atas secondary                      |
| **Secondary Container**       | `secondary-container`       | `#E0E6C4` | Social button bg, secondary cards           |
| **On Secondary Container**    | `on-secondary-container`    | `#191E08` | Teks di secondary container                 |
| **Tertiary**                  | `tertiary`                  | `#3A665E` | Decorative accent (brain icon, etc)         |
| **Tertiary Container**        | `tertiary-container`        | `#BCECE1` | Tertiary bg elements                        |
| **On Tertiary Container**     | `on-tertiary-container`     | `#00201B` | Teks di tertiary container                  |
| **Surface**                   | `surface`                   | `#FDFCFA` | Page background utama                       |
| **Surface Dim**               | `surface-dim`               | `#DADBD1` | Surface yang lebih gelap (scroll area)      |
| **Surface Bright**            | `surface-bright`            | `#FDFCFA` | Surface paling terang                       |
| **Surface Container Lowest**  | `surface-container-lowest`  | `#FFFFFF` | Card background paling terang               |
| **Surface Container Low**     | `surface-container-low`     | `#F7F6F2` | Low elevation container                     |
| **Surface Container**         | `surface-container`         | `#F1F1EC` | Default card/container bg                   |
| **Surface Container High**    | `surface-container-high`    | `#EBEBE6` | Elevated card, modal bg                     |
| **Surface Container Highest** | `surface-container-highest` | `#E5E5E0` | Highest elevation (nav rail bg)             |
| **On Surface**                | `on-surface`                | `#1B1C17` | Teks utama body                             |
| **On Surface Variant**        | `on-surface-variant`        | `#46483C` | Teks secondary, subtitle, caption           |
| **Outline**                   | `outline`                   | `#76786B` | Border, divider                             |
| **Outline Variant**           | `outline-variant`           | `#C7C8B8` | Subtle border, section separator            |
| **Error**                     | `error`                     | `#BA1A1A` | Error state form validation                 |
| **On Error**                  | `on-error`                  | `#FFFFFF` | Teks di error                               |
| **Error Container**           | `error-container`           | `#FFDAD6` | Error bg container                          |
| **Inverse Surface**           | `inverse-surface`           | `#30312B` | Tooltip bg, snackbar                        |
| **Inverse On Surface**        | `inverse-on-surface`        | `#F3F1E9` | Teks di inverse surface                     |
| **Inverse Primary**           | `inverse-primary`           | `#B4D34E` | Primary di inverse context                  |

#### Dark Mode

| Role                          | Token                       | Hex       | Penggunaan                  |
| ----------------------------- | --------------------------- | --------- | --------------------------- |
| **Primary**                   | `primary`                   | `#B4D34E` | CTA, accent                 |
| **On Primary**                | `on-primary`                | `#293500` | Teks di atas primary        |
| **Primary Container**         | `primary-container`         | `#3D4D00` | Container primary           |
| **On Primary Container**      | `on-primary-container`      | `#D0EF67` | Teks di container           |
| **Secondary**                 | `secondary`                 | `#C4CAA9` | Elemen pendukung            |
| **On Secondary**              | `on-secondary`              | `#2D331B` | Teks di atas secondary      |
| **Secondary Container**       | `secondary-container`       | `#444930` | Container secondary         |
| **On Secondary Container**    | `on-secondary-container`    | `#E0E6C4` | Teks di secondary container |
| **Tertiary**                  | `tertiary`                  | `#A1D0C5` | Decorative                  |
| **Tertiary Container**        | `tertiary-container`        | `#214E46` | Tertiary container          |
| **On Tertiary Container**     | `on-tertiary-container`     | `#BCECE1` | Teks di tertiary container  |
| **Surface**                   | `surface`                   | `#1B1C17` | Page background             |
| **Surface Dim**               | `surface-dim`               | `#131410` | Surface yang lebih gelap    |
| **Surface Bright**            | `surface-bright`            | `#3A3A35` | Surface terang di dark      |
| **Surface Container Lowest**  | `surface-container-lowest`  | `#0E0F0B` | Deepest bg                  |
| **Surface Container Low**     | `surface-container-low`     | `#1B1C17` | Low container               |
| **Surface Container**         | `surface-container`         | `#1F201B` | Default container           |
| **Surface Container High**    | `surface-container-high`    | `#2A2A25` | Elevated container          |
| **Surface Container Highest** | `surface-container-highest` | `#353530` | Highest container           |
| **On Surface**                | `on-surface`                | `#E4E3DA` | Teks utama                  |
| **On Surface Variant**        | `on-surface-variant`        | `#C7C8B8` | Teks secondary              |
| **Outline**                   | `outline`                   | `#909283` | Border                      |
| **Outline Variant**           | `outline-variant`           | `#46483C` | Subtle border               |
| **Error**                     | `error`                     | `#FFB4AB` | Error state                 |
| **On Error**                  | `on-error`                  | `#690005` | Teks error                  |
| **Error Container**           | `error-container`           | `#93000A` | Container error             |
| **Inverse Surface**           | `inverse-surface`           | `#E4E3DA` | Snackbar bg                 |
| **Inverse On Surface**        | `inverse-on-surface`        | `#30312B` | Teks inverse                |
| **Inverse Primary**           | `inverse-primary`           | `#526600` | Primary di inverse          |

### 4.3 Mapping Warna Lama → Baru

| Lama                       | Baru (Light)                                        | Baru (Dark)         |
| -------------------------- | --------------------------------------------------- | ------------------- |
| `custom-black (#24282C)`   | `on-surface (#1B1C17)`                              | `surface (#1B1C17)` |
| `custom-white-2 (#EAE9E2)` | `surface (#FDFCFA)`                                 | —                   |
| `custom-white (#fbfbf8)`   | `surface-container-lowest (#FFFFFF)`                | —                   |
| `custom-green (#D3F36A)`   | `primary-container (#D0EF67)` / `primary (#526600)` | `primary (#B4D34E)` |

### 4.4 M3 Expressive Color Emphasis

M3 Expressive mendorong penggunaan warna yang **lebih berani** dibanding M3 standard:

- **Primary Container** digunakan lebih sering dan prominent (bukan hanya chip/badge)
- **Kontras warna lebih tinggi** antara surface dan container
- **Vibrant accent** pada elemen interaktif (button, link, icon aktif)
- **Tonal variety** — jangan hanya pakai primary, gunakan secondary dan tertiary untuk depth

**Implementasi di portfolio:**

- Section header hover → `bg-primary-container` (bukan `bg-primary/8`)
- Portfolio card → `bg-surface-container` (resting) / `bg-surface-container-high` (hover), thumbnail full-bleed di atas, teks di bawah. Bottom-bar overlay lama sudah dihapus.
- Active sidebar link → `bg-primary-container text-on-primary-container rounded-full`
- Hero badge "--web developer" → `bg-primary-container text-on-primary-container`

---

## 5. Typography

### 5.1 Font Selection

M3 Expressive mendukung variable fonts dan optical sizing.

**Keputusan: Full M3 Expressive — Google Sans Flex**

- Body: **Google Sans Flex** (fallback: **Google Sans Text**, desain resmi untuk M3 Expressive)
- Heading: **Google Sans Flex** (fallback: **Google Sans Text**, dengan weight/size/opsz variation untuk hierarchy)
- Satu font family = konsistensi visual, smaller bundle, optimal loading
- Memiliki 6 variable axes penuh (`wght`, `wdth`, `opsz`, `slnt`, `GRAD`, `ROND`) yang tidak dimiliki font generik.
- Menggantikan: Kata Grotesk (body) dan Neutral Face (heading) — keduanya dihapus

### 5.2 M3 Expressive Type Scale

M3 Expressive memperluas type scale dengan emphasis pada **kontras ukuran** yang lebih besar antar hierarchy.

| Role            | Size | Line Height | Weight | Tracking | Tailwind Class     |
| --------------- | ---- | ----------- | ------ | -------- | ------------------ |
| Display Large   | 57px | 64px        | 400    | -0.25px  | `text-display-lg`  |
| Display Medium  | 45px | 52px        | 400    | 0        | `text-display-md`  |
| Display Small   | 36px | 44px        | 400    | 0        | `text-display-sm`  |
| Headline Large  | 32px | 40px        | 400    | 0        | `text-headline-lg` |
| Headline Medium | 28px | 36px        | 400    | 0        | `text-headline-md` |
| Headline Small  | 24px | 32px        | 400    | 0        | `text-headline-sm` |
| Title Large     | 22px | 28px        | 400    | 0        | `text-title-lg`    |
| Title Medium    | 16px | 24px        | 500    | 0.15px   | `text-title-md`    |
| Title Small     | 14px | 20px        | 500    | 0.1px    | `text-title-sm`    |
| Body Large      | 16px | 24px        | 400    | 0.5px    | `text-body-lg`     |
| Body Medium     | 14px | 20px        | 400    | 0.25px   | `text-body-md`     |
| Body Small      | 12px | 16px        | 400    | 0.4px    | `text-body-sm`     |
| Label Large     | 14px | 20px        | 500    | 0.1px    | `text-label-lg`    |
| Label Medium    | 12px | 16px        | 500    | 0.5px    | `text-label-md`    |
| Label Small     | 11px | 16px        | 500    | 0.5px    | `text-label-sm`    |

### 5.3 Type Usage di Portfolio

| Elemen                                  | Current                               | M3 Expressive                                                              |
| --------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------- |
| Hero "hutama"                           | `text-4xl font-bold` (Neutral Face)   | `text-display-sm` atau `text-display-md` (heading font)                    |
| Hero "hello, I'm"                       | `text-lg`                             | `text-title-lg`                                                            |
| Hero "--web developer"                  | `text-2xl font-thin`                  | `text-headline-sm font-normal`                                             |
| Section header ("about", "skills", etc) | `text-xl` / `text-2xl` (Neutral Face) | `text-headline-sm` (heading font)                                          |
| About body text                         | `text-sm` / `text-base`               | `text-body-lg`                                                             |
| Skill subheading ("Main", "Library")    | `text-base`                           | `text-title-md`                                                            |
| Portfolio card title                    | `text-sm font-semibold`               | `text-title-md` (16px) → `sm:text-title-lg` (22px)                         |
| Portfolio card description              | —                                     | `text-body-sm` (12px) → `sm:text-body-md` (14px) `text-on-surface-variant` |
| Footer text                             | `text-xs` / `text-base`               | `text-body-sm`                                                             |
| Contact form label                      | `text-sm font-medium`                 | `text-label-lg`                                                            |
| Navigation logo "HTMA"                  | `text-lg font-semibold`               | `text-title-md font-semibold`                                              |
| Sidebar nav links                       | `text-base`                           | `text-label-lg`                                                            |

---

## 6. Shape System

### 6.1 M3 Expressive Shape Scale

M3 Expressive memperkenalkan **35 shape baru** dan memperluas skala shape. Untuk web (CSS), kita fokus pada rounded corner scale:

| Shape Token | Radius | Tailwind Class                          | Penggunaan                     |
| ----------- | ------ | --------------------------------------- | ------------------------------ |
| None        | 0px    | `rounded-none`                          | Flat edges                     |
| Extra Small | 4px    | `rounded-xs` (custom)                   | Small chips, badges            |
| Small       | 8px    | `rounded-sm` atau `rounded-lg`          | Input fields, small cards      |
| Medium      | 12px   | `rounded-xl`                            | Buttons, medium cards          |
| Large       | 16px   | `rounded-2xl`                           | Cards, containers              |
| Extra Large | 28px   | `rounded-3xl` (custom `rounded-[28px]`) | Modal, dialog, prominent cards |
| Full        | 9999px | `rounded-full`                          | FAB, pills, avatar, chips      |

### 6.2 M3 Expressive Shape Morphing (CSS Implementation)

Shape morphing = border-radius berubah saat interaksi. Implementasi CSS:

```css
/* Resting state */
.card {
  border-radius: 16px; /* Large */
  transition: border-radius 300ms cubic-bezier(0.2, 0, 0, 1);
}

/* Hovered state — lebih rounded */
.card:hover {
  border-radius: 28px; /* Extra Large */
}

/* Pressed state — kembali ke medium */
.card:active {
  border-radius: 12px; /* Medium */
}
```

### 6.3 Shape Usage di Portfolio

| Elemen                    | Current            | M3 Expressive                                                       |
| ------------------------- | ------------------ | ------------------------------------------------------------------- |
| Navigation logo           | `rounded` (4px)    | `rounded-xl` (12px)                                                 |
| Portfolio card            | `rounded` (4px)    | `rounded-[24px]`, hover: `rounded-[28px]`, active: `rounded-[16px]` |
| Modal dialog              | Unknown            | `rounded-[28px]` (Extra Large)                                      |
| Social button             | `rounded-3xl`      | `rounded-full` (pill)                                               |
| Skill icon container      | `rounded-sm` (2px) | `rounded-xl` (12px)                                                 |
| Input fields              | Border-bottom only | `rounded-t-xs` (4px top) filled style                               |
| Send button               | `rounded` (4px)    | `rounded-full` (pill)                                               |
| Scroll-to-top             | `rounded` (4px)    | `rounded-xl` (12px)                                                 |
| Active sidebar link       | `rounded` (4px)    | `rounded-full` (pill)                                               |
| Sidebar rail (desktop)    | `rounded-t-full`   | `rounded-t-[28px]` (Extra Large top)                                |
| Highlighted name "Hutama" | `rounded` (4px)    | `rounded-lg` (8px)                                                  |

---

---

## 7. Size & Visual Hierarchy

### 7.1 Prinsip Size Contrast (M3 Expressive)

M3 Expressive menggunakan **kontras ukuran yang lebih ekstrem** antar elemen untuk memperjelas hierarchy. Ini berbeda dari M3 Standard yang lebih moderate.

**Aturan utama:**

- **CTA (Call-to-Action) harus significantly lebih besar** dari elemen di sekitarnya — bukan hanya slightly lebih besar
- **Heading utama vs body text** — gap lebih besar (bukan proporsi linier)
- **Icon dalam konteks penting** → `text-2xl` atau lebih besar
- **Elemen tidak penting (footer, caption)** → eksplisit lebih kecil (`text-body-sm`, `text-label-sm`)

**Data riset Google:** User menemukan CTA button 4x lebih cepat saat button secara signifikan lebih besar dan menggunakan secondary color yang kontras vs ditempatkan kecil di toolbar.

### 7.2 Size Hierarchy di Portfolio

| Elemen                      | M3 Standard Size   | M3 Expressive Size                                 | Alasan                            |
| --------------------------- | ------------------ | -------------------------------------------------- | --------------------------------- |
| Hero name "hutama"          | `text-headline-lg` | `text-display-sm` (36px)                           | Elemen paling penting di halaman  |
| Section header              | `text-title-lg`    | `text-headline-sm` (24px)                          | Navigasi hierarchy yang jelas     |
| Body text                   | `text-body-md`     | `text-body-lg` (16px)                              | Readability, bukan minimum        |
| Send button                 | `px-4 py-2`        | `px-8 py-3 rounded-full` (lebih besar, pill shape) | CTA harus prominent               |
| Skill icon container        | `w-10 h-10`        | `w-12 h-12 md:w-16 md:w-16`                        | Grid visual yang lebih expressive |
| Arrow icon (section header) | `text-base`        | `text-2xl`                                         | Icon sebagai visual anchor        |
| Footer text                 | `text-sm`          | `text-body-sm` (12px)                              | Eksplisit de-emphasize            |
| Nav logo "HTMA"             | `text-sm`          | `text-title-md` (16px)                             | Brand presence yang lebih kuat    |

### 7.3 Responsive Size Scaling

M3 Expressive mendorong size yang adaptive per breakpoint, bukan hanya linear scaling:

```
Mobile:  hero name → text-display-sm (36px)
Tablet:  hero name → text-display-md (45px)  [bukan default]
Desktop: hero name → text-display-md/lg (45px-57px)
```

**Implementasi Tailwind:**

```html
<h1 class="text-[36px] leading-tight md:text-[45px] lg:text-[57px]">hutama</h1>
```

---

## 8. Containment

### 8.1 Prinsip Containment (M3 Expressive)

**Containment** = visual grouping — mengelompokkan elemen yang berhubungan ke dalam "wadah" yang jelas secara visual. Ini adalah salah satu pilar paling penting dari M3 Expressive yang sering diabaikan.

**Kenapa penting (data Google):**

- User spot key UI elements **4x lebih cepat** pada desain dengan containment yang jelas
- Reduces cognitive load — otak langsung tahu elemen mana yang satu kelompok
- Membantu navigasi tanpa harus membaca semua teks

**Cara implementasi containment:**

1. **Background color berbeda** — Container dengan `bg-surface-container` vs page `bg-surface`
2. **Border/outline** — `border border-outline-variant` untuk membatasi area
3. **Shape** — Rounded corners yang konsisten dalam satu grup
4. **Elevation** — Surface level berbeda menandakan grouping berbeda
5. **Spacing** — Jarak dalam grup lebih kecil dari jarak antar grup

### 8.2 Containment Usage di Portfolio

| Elemen                       | Containment Method           | CSS Implementation                                                       |
| ---------------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| Portfolio card               | Background + shape           | `bg-surface-container rounded-[24px] overflow-hidden`                    |
| Skills icon grid             | Background container         | `bg-surface-container rounded-xl p-2.5` per icon                         |
| Hero badge "--web developer" | Background + shape           | `bg-primary-container rounded-lg px-3 py-1`                              |
| Modal dialog                 | Elevation + shape + backdrop | `bg-surface-container-high rounded-xl (28px) shadow-2xl` + scrim         |
| Contact form fields          | Filled container             | `bg-surface-container-highest rounded-t-xs border-b-2 border-outline`    |
| Active sidebar link          | Background + pill shape      | `bg-primary-container rounded-full px-4`                                 |
| Navigation bar               | Transparent (Session 6)      | `bg-transparent pointer-events-none` + logo/toggle `pointer-events-auto` |
| Highlighted name "Hutama"    | Inline containment           | `bg-primary-container rounded-lg px-2 py-0.5 inline`                     |
| Section separator            | Border containment           | `border-t border-outline-variant`                                        |

### 8.3 Spacing sebagai Containment Signal

Jarak (whitespace) adalah tool containment yang kuat:

```
Dalam satu group:    gap-2 / gap-3  (tight — "ini berhubungan")
Antar group berbeda: gap-8 / gap-12 (loose — "ini terpisah")
Section separator:   py-8 / py-12   (breathing room antar section)
```

**Penting:** Jangan gunakan jarak yang seragam di seluruh halaman — variasi jarak adalah sinyal hierarchy dan grouping.

---

## 9. Motion & Animation (Motion Physics System)

### 9.1 M3 Expressive Motion Physics Principles

Berdasarkan dokumentasi resmi `m3.material.io/styles/motion/overview/specs` dan `m3.material.io/blog/m3-expressive-motion-theming`, M3 Expressive resmi beralih dari kurva durasi/easing statis warisan lama ke **Motion Physics System (Spring Tokens)**.

Sistem ini membagi animasi menjadi dua spesifikasi utama:

1. **Spatial Animation Specs:**
   - Digunakan untuk menganimasikan perubahan fisik: posisi (_position_), ukuran (_scale_), dan bentuk (_shape morphing / border-radius_).
   - Karakteristik: Menggunakan pegas (_spring_) dengan **overshoot/bounce terkalibrasi** yang memantul lembut ke posisi akhir.

2. **Effects Animation Specs:**
   - Digunakan untuk menganimasikan atribut visual murni: warna (_color_) dan opasitas (_opacity / alpha_).
   - Karakteristik: Menggunakan pegas **tanpa pantulan (No Bouncy)** agar tidak terjadi kedipan atau artefak warna.

### 9.2 Motion Velocity Tokens & Specs

| Kecepatan (_Speed_) | Target Komponen                                                    | Karakter Spatial (Bounce)              | Karakter Effect (No Bounce)            |
| :------------------ | :----------------------------------------------------------------- | :------------------------------------- | :------------------------------------- |
| **Fast**            | Elemen kecil & interaksi mikro (button press, switch, icon toggle) | `dampingRatio: 0.6`, `stiffness: 1400` | `dampingRatio: 1.0`, `stiffness: 3800` |
| **Default**         | Komponen konten, kartu (_cards_), dialog modal, sheet              | `dampingRatio: 0.6`, `stiffness: 700`  | `dampingRatio: 1.0`, `stiffness: 1600` |
| **Slow**            | Transisi halaman penuh, full screen enter, hero entrance           | `dampingRatio: 0.6`, `stiffness: 300`  | `dampingRatio: 1.0`, `stiffness: 800`  |

### 9.3 Motion / Framer Motion Implementation Mapping

Implementasi langsung ke engine `motion` (v12/v13) di Next.js:

```typescript
// M3 Expressive Official Spring Motion Specs
export const m3Motion = {
  // Spatial: position, scale, layout, border-radius (with natural overshoot)
  spatial: {
    fast: { type: 'spring', stiffness: 1400, damping: 22 },
    default: { type: 'spring', stiffness: 700, damping: 16 },
    slow: { type: 'spring', stiffness: 300, damping: 10 },
  },
  // Effects: opacity, background color (no bounce, clean settling)
  effect: {
    fast: { type: 'spring', stiffness: 3800, damping: 120 },
    default: { type: 'spring', stiffness: 1600, damping: 80 },
    slow: { type: 'spring', stiffness: 800, damping: 55 },
  },
} as const;

// CSS Transition Fallbacks (untuk transisi non-JS / utility CSS murni)
export const m3Easing = {
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecel: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccel: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
} as const;
```

### 9.4 Animation Usage di Portfolio

| Elemen                   | Target Properti      | M3 Expressive Motion Token       | Implementasi                                  |
| :----------------------- | :------------------- | :------------------------------- | :-------------------------------------------- |
| **Hero Title Reveal**    | y, opacity           | Spatial Default + Effect Default | `m3Motion.spatial.default` + stagger          |
| **Hero Images Reveal**   | scale, opacity       | Spatial Slow + Effect Slow       | `m3Motion.spatial.slow`                       |
| **Page Wrapper Enter**   | y, opacity           | Spatial Default + Effect Default | `m3Motion.spatial.default`                    |
| **Portfolio Card Hover** | scale, border-radius | Spatial Fast                     | `m3Motion.spatial.fast` (hover scale & morph) |
| **Modal Open/Close**     | scale, opacity       | Spatial Default + Effect Default | `m3Motion.spatial.default` + backdrop fade    |
| **Theme Toggle**         | rotate, scale        | Spatial Fast                     | `m3Motion.spatial.fast`                       |
| **Custom Cursor**        | x, y                 | Spring (High Stiffness)          | `damping: 30, stiffness: 700` (rAF throttle)  |

---

## 10. Elevation & Surface (Tone-Based Surfaces Model)

### 10.1 Pergeseran Resmi: Tone-Based Surfaces vs Elevasi Legacy

Berdasarkan dokumentasi resmi `m3.material.io/blog/tone-based-surface-color-m3`:

> _"Tone-based surface color roles have replaced the previous 'surfaces at +1 to +5 elevation' approach. The new color roles are not tied to elevation, and offer more flexibility and support for containment."_

M3 Expressive meniadakan ketergantungan pada layer opasitas elevasi numerik (+1 s/d +5) maupun bayangan box-shadow tebal. Kontainer dan grouping visual sepenuhnya dikendalikan oleh **5 Peran Warna Surface Container**:

| Peran Token M3                | Tailwind Token                 | Karakteristik & Peran                           | Penggunaan di Portfolio                              |
| :---------------------------- | :----------------------------- | :---------------------------------------------- | :--------------------------------------------------- |
| **Surface**                   | `bg-surface`                   | Kanvas dasar halaman (background utama)         | Body background, header container                    |
| **Surface Container Lowest**  | `bg-surface-container-lowest`  | Kontras paling rendah / permukaan paling murni  | Area kontras tinggi di light mode (misal inner card) |
| **Surface Container Low**     | `bg-surface-container-low`     | Grouping subtle tanpa distraksi                 | Skill icon resting container                         |
| **Surface Container**         | `bg-surface-container`         | **Default container** untuk komponen terisolasi | Portfolio card resting state, about card             |
| **Surface Container High**    | `bg-surface-container-high`    | Container dengan hierarki lebih tinggi          | Portfolio card hover state, Modal Dialog             |
| **Surface Container Highest** | `bg-surface-container-highest` | Hierarki permukaan tertinggi                    | Sidebar Navigation Rail, Filled Input background     |

### 10.2 Peran Bayangan (Shadow) di M3 Expressive

- **Surface shift sebagai fondasi utama:** Perbedaan kedalaman dan grouping dicapai 90% melalui pergeseran token `surface-container`.
- **Shadow murni sebagai aksen floating:** Box-shadow (`shadow-md`, `shadow-xl`) HANYA digunakan saat elemen benar-benar melayang di atas konten lain (_overlapping scrim_), seperti pada **Modal Dialog**, **Floating Action Button (FAB)**, atau saat kartu di-hover secara aktif.

### 10.3 Mapping Surface di Portfolio

| Elemen               | State Resting                  | State Hover / Active        | Shadow Accent                                       |
| :------------------- | :----------------------------- | :-------------------------- | :-------------------------------------------------- |
| **Page Background**  | `bg-surface`                   | —                           | None                                                |
| **Navigation Bar**   | `bg-transparent` (Session 6)   | —                           | None (logo & toggle punya background solid sendiri) |
| **Portfolio Cards**  | `bg-surface-container`         | `bg-surface-container-high` | Resting: `none`, Hover: `shadow-lg`                 |
| **Modal Dialog**     | `bg-surface-container-high`    | —                           | `shadow-2xl` + Scrim `bg-on-surface/32`             |
| **Sidebar Rail**     | `bg-surface-container-highest` | —                           | None (Slice 3.5)                                    |
| **Skill Containers** | `bg-surface-container-low`     | `bg-surface-container`      | Resting: `none`, Hover: subtle scale                |
| **Gradient Masks**   | `bg-surface`                   | —                           | None (fade gradient)                                |

---

## 11. State Layers & Interaction

### 11.1 M3 Expressive State Layer Opacity

State layers = semi-transparent overlay di atas elemen saat interaksi:

| State             | Overlay Opacity | CSS Implementation                                |
| ----------------- | --------------- | ------------------------------------------------- |
| Enabled (default) | 0%              | —                                                 |
| Hovered           | 8%              | `hover:bg-primary/8` atau `hover:bg-on-surface/8` |
| Focused           | 10%             | `focus-visible:bg-primary/10`                     |
| Pressed           | 10%             | `active:bg-primary/10`                            |
| Dragged           | 16%             | `bg-primary/16`                                   |
| Disabled          | —               | `opacity-38` (38% total opacity, M3 standard)     |

### 11.2 State Layer Implementation Strategy

Untuk Tailwind, state layers diimplementasikan via pseudo-element atau bg opacity:

```html
<!-- Approach 1: Background opacity (simpel, recommended) -->
<button
  class="bg-primary text-on-primary hover:bg-primary/92 focus-visible:bg-primary/90 active:bg-primary/90"
>
  Send
</button>

<!-- Approach 2: Relative pseudo for complex shapes -->
<div class="relative overflow-hidden">
  <div
    class="absolute inset-0 bg-on-surface/0 transition-colors hover:bg-on-surface/8 active:bg-on-surface/10"
  />
  <!-- content -->
</div>
```

### 11.3 Disabled State (M3 Expressive)

```
Disabled container: bg-on-surface/12
Disabled content: text-on-surface/38
```

Tailwind:

```html
<button
  disabled
  class="cursor-not-allowed bg-on-surface/[0.12] text-on-surface/[0.38]"
>
  Send
</button>
```

---

## 12. Component Mapping — Tailwind Implementation

Detail implementasi setiap komponen portfolio menggunakan M3 Expressive + Tailwind CSS.

### 12.1 Navigation Bar

```
Container: bg-transparent + pointer-events-none (Session 6)
  Konten scroll tembus dari ujung atas; logo & toggle dibungkus pointer-events-auto
Logo box: bg-custom-black text-custom-green (light) / dark:bg-custom-green dark:text-custom-black
  rounded-xl px-3 py-1.5 text-title-md font-semibold
Theme toggle: MdLightMode / MdDarkMode
  h-10 w-10 rounded-full bg-surface-container-high text-on-surface shadow-sm
  hover: bg-surface-container-highest
  focus-visible: outline-2 outline-primary
  aria-label: "Switch to light/dark mode"
```

### 12.2 Hero Section

```
Title "hello, I'm": text-title-lg text-on-surface / dark:text-primary
Name "hutama": text-display-sm font-bold text-on-surface / dark:text-primary (heading font)
Badge "--web developer" (M3 Assist Chip):
  Container: bg-primary-container text-on-primary-container rounded-lg px-3 py-1 text-label-md
Social button (M3 Filled Tonal Button):
  Container: bg-secondary-container text-on-secondary-container rounded-full px-6 py-3
  State layer: hover:bg-secondary-container/92 active:scale-95 transition-all
SVG illustrations: text-on-surface / dark:text-primary
Grid: lg:col-start-1 lg:col-end-5 (4 kolom, Session 6 — sebelumnya mulai kolom 2)
```

### 12.3 Section Headers (About, Skills, Portfolio, Contact)

Menggunakan sistem interaksi dua tahap (_Two-Stage Section Interaction_):

1. **Tahap 1 — Kursor Masuk ke Area Section (_Section Context Activation_):**
   - Begitu kursor mouse masuk ke dalam area section (About, Skills, atau Portfolio), kontainer judul section otomatis aktif:
     - Background menyala menjadi `bg-primary-container text-on-primary-container`.
     - Ikon panah berotasi `-rotate-45`.
   - **Kursor kustom dot TETAP ADA dan melayang bebas** di atas konten section (`opacity: 1, scale: 1`).

2. **Tahap 2 — Kursor Masuk Langsung ke Pill Judul (_Header Direct Hover & Absorption_):**
   - Saat kursor diarahkan tepat di atas pill judul section (`.section-header`):
     - Kursor dot **menyusut secara halus & fluid (_smooth fluid shrink_)** ke dalam pill (`scale: 1 → 0` bersamaan dengan `opacity: 1 → 0`).
     - Judul section merespons dengan pergeseran magnetik elastis (_Magnetic Parallax_ `translate(var(--parallax-x), var(--parallax-y))` maks 3.5px) dan _subtle spring lift_ (`scale-[1.03]`).

```
Container (Interactive Magnetic Pill):
  flex items-center gap-x-2 px-3 py-1.5 rounded-xl cursor-pointer w-fit origin-left ml-1 sm:ml-1.5
  transition: all 300ms cubic-bezier(0.2, 0, 0, 1)
  section-hover: bg-primary-container text-on-primary-container
  direct-hover: scale-[1.03] + magnetic translate + cursor smooth shrink
Arrow icon:
  text-primary text-2xl transition-transform duration-300
  section-hover / direct-hover: -rotate-45 text-on-primary-container
Title text:
  text-headline-sm font-medium text-on-surface transition-colors duration-300
  section-hover / direct-hover: text-on-primary-container
  dark default: text-primary
```

### 12.4 About Section

```
Separator: border-outline-variant
Body text: text-body-lg text-on-surface leading-relaxed
  dark: text-on-surface (auto via dark mode palette)
Name "Hutama": font-semibold text-on-surface (natural inline, tanpa background color)
```

### 12.5 Skills Section

```
Separator: border-outline-variant
Subheading: text-title-md text-on-surface-variant
Icon container (M3 Surface Container Low):
  bg-surface-container-low rounded-xl p-2.5
  hover: bg-surface-container scale-105 transition-all duration-200
  Tailwind: flex items-center justify-center w-12 md:w-16 2xl:w-[4.5rem]
```

### 12.6 Portfolio Cards (M3 Filled Card — mengikuti referensi desain)

Nilai di bawah diukur dari referensi card (light & dark) dan divalidasi di runtime:

```
Card container (M3 Filled Card):
  bg-surface-container rounded-[24px] overflow-hidden h-full
  motion: m3Motion.spatial.fast (scale & shape morphing)
  hover: rounded-[28px] bg-surface-container-high shadow-lg
  active: rounded-[16px] scale-[0.98]

Anatomi (thumbnail atas → teks bawah):
  Thumbnail: rounded-[inherit] (24px), aspect-[16/9], object-cover
  Content block: p-6 (padding 24px) + text-left
    (button UA default text-align:center WAJIB di-override text-left)
    Title:  text-title-md font-medium text-on-surface sm:text-title-lg
    Desc:   mt-2 text-body-sm text-on-surface-variant sm:text-body-md
    (Di bawah 640px kartu hanya selebar ~197px dengan content inner ~149px
     — title 22px memaksa wrapping berat, jadi turun ke Title Medium 16px
     dan desc ke Body Small 12px. Dari `sm:` (640px) ke atas kartu >= 366px,
     keduanya kembali ke ukuran DESIGN 22px / 14px.)

Grid:
  ul: grid-cols-1 md:grid-cols-2, gap-4
  li: auto rows (tinggi ikut konten — tidak ada card terhimpit)
  card index 0: md:col-span-2 (featured, lebih lebar)
  Semua card: rasio gambar konsisten 16:9

Interaksi kursor:
  Kursor dot menyusut fluid ke dalam card (scale 1→0, opacity 1→0)
  Magnetic parallax via .magnetic-item + button (maks 3.5px)
  Card menyala bg-surface-container-high sebagai penanda kursor masuk

Dark mode: bg-surface-container (#1F201B), desc text-on-surface-variant (#C7C8B8)
GitHub link: text-primary underline / text-on-surface-variant
```

### 12.7 Modal / Dialog (M3 Basic Dialog)

```
Backdrop: bg-on-surface/32 (M3 official scrim)
  transition: m3Motion.effect.default (opacity fade)
Dialog container (native <dialog>):
  bg-surface-container-high rounded-xl (28px) p-6 shadow-2xl max-w-5xl w-full
  max-h-[90vh] overflow-y-auto
  enter: scale(0.92) → scale(1), opacity 0→1
  exit: scale(1) → scale(0.92), opacity 1→0
  motion: m3Motion.spatial.default (spring overshoot)
  a11y: elemen <dialog open inert> + aria-label (bukan role="dialog")
Inner content panel:
  bg-surface-container rounded-lg p-4
Buttons (M3 Filled Button / Filled Tonal Button):
  Demo: bg-primary text-on-primary rounded-full px-4 py-3
  Repository: bg-secondary-container text-on-secondary-container rounded-full
Close button (M3 Icon Button):
  bg-surface-container-highest text-on-surface rounded-full h-11 w-11
  hover: bg-on-surface/8
```

### 12.8 Sidebar / Navigation Rail (M3 Navigation Rail)

Nilai di bawah sudah diterapkan di Slice 3.5:

```
Rail container (desktop, lg:):
  bg-surface-container-highest (light #E5E5E0, dark #353530)
  rounded-t-[28px] (M3 Extra Large top shape)
Active link (M3 Active Indicator):
  bg-primary-container text-on-primary-container rounded-full px-4 py-1.5
Inactive link:
  text-on-surface-variant hover:bg-on-surface/8 rounded-full
Link typography: text-label-lg, rotate-90, transition-colors duration-200
Scroll-to-top FAB (M3 Small FAB):
  bg-primary-container text-on-primary-container rounded-xl p-2
  hover: -translate-y-1 shadow-md
  focus-visible: outline-2 outline-primary
  aria-label: "Scroll back to top"
  data-no-magnetic (opt-out magnetic parallax — lihat catatan di bawah)
```

**Catatan cascade (penting):** rule magnetic parallax di `globals.css` adalah CSS
unlayered, sehingga selalu menang atas utility `translate-*` Tailwind di
`@layer utilities`. Elemen yang butuh `translate` sendiri harus memakai atribut
opt-out `data-no-magnetic`, dan selector magnetic memakai `:not([data-no-magnetic])`.
FAB scroll-top memakai mekanisme ini untuk slide-out `translate-y-[999px]`.

### 12.9 Footer

```
Text: text-body-sm text-on-surface-variant (light #46483C, dark #C7C8B8)
Brain icon: text-tertiary (light #3A665E, dark #A1D0C5)
Separator: TIDAK ditambahkan — Portfolio sudah pakai border-b border-outline-variant
```

### 12.10 Contact Form (M3 Filled Text Fields & Filled Button)

```
Filled Text Field:
  Container: bg-surface-container-highest rounded-t-xs border-b-2 border-outline p-3
    focus-within: border-b-primary
  Label: text-label-lg text-on-surface-variant
    focus-within: text-primary text-label-sm (float up)
  Input text: text-body-lg text-on-surface bg-transparent outline-none

Send Button (M3 Filled Button):
  bg-primary text-on-primary rounded-full px-8 py-3 font-medium text-label-lg
  hover: shadow-md bg-primary/92 active:scale-95 transition-all
  disabled: bg-on-surface/[0.12] text-on-surface/[0.38] cursor-not-allowed
  loading: spinner inside button

Error State:
  Container border: border-b-error
  Label: text-error
  Helper text: text-body-sm text-error
```

### 12.11 Custom Cursor (Robbie Tilton Model + M3 Expressive Adaptation)

Mengadopsi model interaksi kursor dari `robbietilton.com/more-info` yang dipadukan dengan palet warna dan sistem token Material 3 Expressive:

1. **Peniadaan Kursor Sistem Bawaan (Native Cursor Suppression):**
   - Pada perangkat dengan pointer presisi/mouse (`@media (pointer: fine)`), kursor bawaan OS/laptop dihilangkan secara global:
     ```css
     @media (pointer: fine) {
       *,
       html,
       body {
         cursor: none !important;
       }
     }
     ```
   - Hanya kursor kustom web yang tampil di layar.
   - Pada layar sentuh / mobile (`pointer: coarse`), kursor kustom dinonaktifkan (`display: none`), menjaga interaksi sentuh alami.

2. **Visual & Styling (Palet Warna Tetap):**
   - Lingkaran dot: `bg-surface` / `bg-primary` dengan efek `mix-blend-difference` (mempertahankan palet dan kontras tema saat ini).
   - Dimensi resting: `40x40px` via token `--cursor-size: 2.5rem` (disamakan dengan tombol toggle tema), `rounded-full fixed z-[1350] pointer-events-none`. Offset centering dibaca dari `offsetWidth` elemen kursor sehingga ukuran cukup diubah di satu tempat.
   - Umpan balik tekanan (_pressing_): Mengecil lembut ke `scale(0.85)` / 34px saat pointer ditekan (`mousedown`).

3. **Interaksi Elemen Interaktif (Smooth Fluid Shrink & Respons Komponen):**
   - Ketika kursor diarahkan ke elemen yang bisa di-hover (pill judul section, tombol, tautan, kartu portofolio, kartu skill, chip):
     - **Kursor dot menyusut secara fluid (_Smooth Fluid Shrink_):** Kursor dot tidak sekadar menjadi transparan, melainkan menyusut lembut dari skala penuh ke nol (`scale: 1 → 0` berpadu dengan `opacity: 1 → 0`) menggunakan spring physics M3 (`stiffness: 350, damping: 26`). Efek visualnya: kursor dot mengembun dan terserap mulus ke dalam fisik komponen.
     - **Komponen menyala sebagai penanda kursor sedang bergabung di dalamnya:** Elemen yang di-hover menampilkan indikator visual nyata:
       - _Kontainer aktif:_ Menyala dengan `bg-primary-container` (pada judul section, chip, dan tautan) atau elevated surface (`bg-surface-container-high` pada kartu).
       - _Pergeseran magnetik elastis (*Magnetic Parallax*):_ Komponen bergeser anggun mengikuti pergerakan pointer (`translate(var(--parallax-x), var(--parallax-y))` maks 3–4px).
       - _Subtle spring lift:_ Mengembang sedikit (`scale: 1.03 - 1.04`) memberikan umpan balik taktil bahwa kursor berada di dalam.
   - Saat pointer keluar dari elemen (`mouseleave`), kursor dot mengembang kembali secara mulus dari titik keluar (`scale: 0 → 1, opacity: 0 → 1`), dan komponen kembali rileks ke posisi netral via spring physics M3.
   - Tracking kursor: `useCursorPosition` berbasis `pointermove` + `mousemove` + `requestAnimationFrame` zero-lag.
   - Transisi magnetik elemen: CSS independen `translate` 350ms M3 Emphasized (`cubic-bezier(0.2, 0, 0, 1)`).

### 12.12 Gradient Masks

```
Bottom mask (satu-satunya yang tersisa — Session 6):
  bg-surface fixed z-[1050] h-[8%]
  mask-image: linear-gradient(to top, #000 0%, transparent 100%)
  dark: bg-surface (auto via dark mode palette)

Top mask: DIHAPUS di Session 6 — header dibuat transparan supaya konten
  terlihat scroll dari ujung atas viewport tanpa tertutup layer solid.
```

---

## 13. Dark Mode Strategy

### 13.1 M3 Expressive Dark Mode

M3 Expressive dark mode berbeda dari standard dark mode:

- **Surface** menjadi sangat gelap (`#12140E`) tapi BUKAN pure black
- **Primary** menjadi lighter shade (`#9DD835`) — lebih vibrant dari light mode
- **Kontras tetap tinggi** — WCAG AA minimum (4.5:1 untuk teks normal)
- **Surface containers** memiliki subtle gradasi (Level 0→4)

### 13.2 Implementation via Tailwind `dark:` Prefix

Karena project sudah pakai `next-themes` dengan `attribute="class"` dan `darkMode: 'class'` di Tailwind, tinggal mapping warna:

```html
<!-- Contoh button -->
<button class="bg-primary text-on-primary dark:bg-primary dark:text-on-primary">
  <!-- Warna primary BERBEDA antara light (#3E6A00) dan dark (#9DD835) -->
  <!-- Ini di-handle via CSS variables di Tailwind config -->
</button>
```

### 13.3 CSS Variable Approach (Recommended)

Untuk menghindari duplikasi `dark:` prefix di setiap elemen, gunakan CSS variables:

```css
:root {
  --color-primary: #3e6a00;
  --color-on-primary: #ffffff;
  --color-surface: #f9faf0;
  --color-on-surface: #1a1c17;
  /* ... semua roles ... */
}

.dark {
  --color-primary: #9dd835;
  --color-on-primary: #1d3700;
  --color-surface: #12140e;
  --color-on-surface: #e1e3d9;
  /* ... semua roles ... */
}
```

Tailwind config:

```javascript
colors: {
  primary: 'var(--color-primary)',
  'on-primary': 'var(--color-on-primary)',
  surface: 'var(--color-surface)',
  'on-surface': 'var(--color-on-surface)',
  // ... semua roles ...
}
```

Maka di komponen cukup tulis:

```html
<button class="bg-primary text-on-primary">
  <!-- Otomatis berubah saat dark mode karena CSS variable switch -->
</button>
```

**TIDAK PERLU** `dark:bg-xxx dark:text-xxx` di setiap elemen.

---

## 14. Accessibility

### 14.1 M3 Expressive Accessibility Requirements

M3 Expressive tetap mengikuti WCAG guidelines:

| Requirement                 | Standard                 | M3 Expressive Approach                                                                 |
| --------------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| Color contrast (text)       | WCAG AA 4.5:1            | Tonal palette auto-ensures contrast                                                    |
| Color contrast (large text) | WCAG AA 3:1              | Display/Headline sizes qualify                                                         |
| Focus indicator             | Visible                  | `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2` |
| Touch target                | Min 44x44px              | M3: min 48x48px untuk interactive elements                                             |
| Motion                      | `prefers-reduced-motion` | Disable spring animations, use instant transitions                                     |
| Screen reader               | ARIA labels              | Semua interactive elements harus punya label                                           |

### 14.2 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Framer Motion:

```typescript
const shouldReduceMotion = useReducedMotion();
const animationConfig = shouldReduceMotion
  ? { duration: 0 }
  : m3Tween.emphasized;
```

---

## 15. Tailwind Config Reference

### 15.1 Tailwind v4 CSS-Based Config (Jika Migrasi)

```css
/* globals.css — Tailwind v4 */
@import 'tailwindcss';

@theme {
  /* === Colors (M3 Expressive via CSS Variables) === */
  --color-primary: var(--color-primary);
  --color-on-primary: var(--color-on-primary);
  --color-primary-container: var(--color-primary-container);
  --color-on-primary-container: var(--color-on-primary-container);
  --color-secondary: var(--color-secondary);
  --color-on-secondary: var(--color-on-secondary);
  --color-secondary-container: var(--color-secondary-container);
  --color-on-secondary-container: var(--color-on-secondary-container);
  --color-tertiary: var(--color-tertiary);
  --color-tertiary-container: var(--color-tertiary-container);
  --color-surface: var(--color-surface);
  --color-surface-dim: var(--color-surface-dim);
  --color-surface-bright: var(--color-surface-bright);
  --color-surface-container-lowest: var(--color-surface-container-lowest);
  --color-surface-container-low: var(--color-surface-container-low);
  --color-surface-container: var(--color-surface-container);
  --color-surface-container-high: var(--color-surface-container-high);
  --color-surface-container-highest: var(--color-surface-container-highest);
  --color-on-surface: var(--color-on-surface);
  --color-on-surface-variant: var(--color-on-surface-variant);
  --color-outline: var(--color-outline);
  --color-outline-variant: var(--color-outline-variant);
  --color-error: var(--color-error);
  --color-on-error: var(--color-on-error);
  --color-error-container: var(--color-error-container);
  --color-inverse-surface: var(--color-inverse-surface);
  --color-inverse-on-surface: var(--color-inverse-on-surface);
  --color-inverse-primary: var(--color-inverse-primary);

  /* === Shape Scale === */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 28px;

  /* === Typography Scale === */
  --font-display: 'Google Sans Flex', 'Google Sans Text', system-ui, sans-serif;
  --font-body: 'Google Sans Flex', 'Google Sans Text', system-ui, sans-serif;

  --text-display-lg: 57px;
  --text-display-md: 45px;
  --text-display-sm: 36px;
  --text-headline-lg: 32px;
  --text-headline-md: 28px;
  --text-headline-sm: 24px;
  --text-title-lg: 22px;
  --text-title-md: 16px;
  --text-title-sm: 14px;
  --text-body-lg: 16px;
  --text-body-md: 14px;
  --text-body-sm: 12px;
  --text-label-lg: 14px;
  --text-label-md: 12px;
  --text-label-sm: 11px;
}
```

### 15.2 CSS Variables for Light/Dark (globals.css)

```css
:root {
  --color-primary: #526600;
  --color-on-primary: #ffffff;
  --color-primary-container: #d0ef67;
  --color-on-primary-container: #171e00;
  --color-secondary: #5b6146;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #e0e6c4;
  --color-on-secondary-container: #191e08;
  --color-tertiary: #3a665e;
  --color-tertiary-container: #bcece1;
  --color-on-tertiary-container: #00201b;
  --color-surface: #fdfcfa;
  --color-surface-dim: #dadbd1;
  --color-surface-bright: #fdfcfa;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f7f6f2;
  --color-surface-container: #f1f1ec;
  --color-surface-container-high: #ebebe6;
  --color-surface-container-highest: #e5e5e0;
  --color-on-surface: #1b1c17;
  --color-on-surface-variant: #46483c;
  --color-outline: #76786b;
  --color-outline-variant: #c7c8b8;
  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-inverse-surface: #30312b;
  --color-inverse-on-surface: #f3f1e9;
  --color-inverse-primary: #b4d34e;
}

.dark {
  --color-primary: #b4d34e;
  --color-on-primary: #293500;
  --color-primary-container: #3d4d00;
  --color-on-primary-container: #d0ef67;
  --color-secondary: #c4caa9;
  --color-on-secondary: #2d331b;
  --color-secondary-container: #444930;
  --color-on-secondary-container: #e0e6c4;
  --color-tertiary: #a1d0c5;
  --color-tertiary-container: #214e46;
  --color-on-tertiary-container: #bcece1;
  --color-surface: #1b1c17;
  --color-surface-dim: #131410;
  --color-surface-bright: #3a3a35;
  --color-surface-container-lowest: #0e0f0b;
  --color-surface-container-low: #1b1c17;
  --color-surface-container: #1f201b;
  --color-surface-container-high: #2a2a25;
  --color-surface-container-highest: #353530;
  --color-on-surface: #e4e3da;
  --color-on-surface-variant: #c7c8b8;
  --color-outline: #909283;
  --color-outline-variant: #46483c;
  --color-error: #ffb4ab;
  --color-on-error: #690005;
  --color-error-container: #93000a;
  --color-inverse-surface: #e4e3da;
  --color-inverse-on-surface: #30312b;
  --color-inverse-primary: #526600;
}
```

---

> **Status Token:** Nilai hex di atas sudah 100% final dan akurat, di-generate langsung dari seed `#D3F36A` menggunakan `@material/material-color-utilities` resmi Google. Siap dipindahkan langsung ke `src/styles/globals.css` pada Phase 1.
