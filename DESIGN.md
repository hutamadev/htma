# DESIGN SYSTEM — Material 3 Expressive (htma.site)

> **Last Updated:** 2026-09-03
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

## 3. Perbedaan M3 Standard vs M3 Expressive

| Aspek | M3 Standard | M3 Expressive |
|-------|-------------|---------------|
| **Color** | Tonal palette, subtle | Vibrant, higher emphasis, bolder primary container usage |
| **Shape** | 5 skala rounded (XS→XL) | 35+ shapes, shape morphing saat interaksi |
| **Size** | Moderate contrast | Kontras ukuran ekstrem, CTA significantly lebih besar |
| **Motion** | Standard easing curves | Physics-based springs, shape morphing pada interaksi |
| **Containment** | Implicit grouping | Explicit visual grouping via background/shape/border |
| **Typography** | Static type scale | Flexible, variable font emphasis, optical sizing |
| **Components** | Static appearance | Adaptive — berubah bentuk saat hover/press/focus |
| **Elevation** | Shadow-based | Tonal surface tint + shadow hybrid |
| **Emotional impact** | Neutral, functional | Intentionally emotional, "delightful" |
| **Usability** | Good | Better — 4x faster element discovery (eye-tracking data) |

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

| Role | Token | Hex | Penggunaan di Portfolio |
|------|-------|-----|------------------------|
| **Primary** | `primary` | `#526600` | CTA buttons, active nav links, accent utama |
| **On Primary** | `on-primary` | `#FFFFFF` | Teks/icon di atas primary |
| **Primary Container** | `primary-container` | `#D0EF67` | Hero badge, highlighted name, chip bg |
| **On Primary Container** | `on-primary-container` | `#171E00` | Teks di primary container |
| **Secondary** | `secondary` | `#5B6146` | Elemen pendukung, subtitle |
| **On Secondary** | `on-secondary` | `#FFFFFF` | Teks di atas secondary |
| **Secondary Container** | `secondary-container` | `#E0E6C4` | Social button bg, secondary cards |
| **On Secondary Container** | `on-secondary-container` | `#191E08` | Teks di secondary container |
| **Tertiary** | `tertiary` | `#3A665E` | Decorative accent (brain icon, etc) |
| **Tertiary Container** | `tertiary-container` | `#BCECE1` | Tertiary bg elements |
| **On Tertiary Container** | `on-tertiary-container` | `#00201B` | Teks di tertiary container |
| **Surface** | `surface` | `#FDFCFA` | Page background utama |
| **Surface Dim** | `surface-dim` | `#DADBD1` | Surface yang lebih gelap (scroll area) |
| **Surface Bright** | `surface-bright` | `#FDFCFA` | Surface paling terang |
| **Surface Container Lowest** | `surface-container-lowest` | `#FFFFFF` | Card background paling terang |
| **Surface Container Low** | `surface-container-low` | `#F7F6F2` | Low elevation container |
| **Surface Container** | `surface-container` | `#F1F1EC` | Default card/container bg |
| **Surface Container High** | `surface-container-high` | `#EBEBE6` | Elevated card, modal bg |
| **Surface Container Highest** | `surface-container-highest` | `#E5E5E0` | Highest elevation (nav rail bg) |
| **On Surface** | `on-surface` | `#1B1C17` | Teks utama body |
| **On Surface Variant** | `on-surface-variant` | `#46483C` | Teks secondary, subtitle, caption |
| **Outline** | `outline` | `#76786B` | Border, divider |
| **Outline Variant** | `outline-variant` | `#C7C8B8` | Subtle border, section separator |
| **Error** | `error` | `#BA1A1A` | Error state form validation |
| **On Error** | `on-error` | `#FFFFFF` | Teks di error |
| **Error Container** | `error-container` | `#FFDAD6` | Error bg container |
| **Inverse Surface** | `inverse-surface` | `#30312B` | Tooltip bg, snackbar |
| **Inverse On Surface** | `inverse-on-surface` | `#F3F1E9` | Teks di inverse surface |
| **Inverse Primary** | `inverse-primary` | `#B4D34E` | Primary di inverse context |

#### Dark Mode

| Role | Token | Hex | Penggunaan |
|------|-------|-----|------------|
| **Primary** | `primary` | `#B4D34E` | CTA, accent |
| **On Primary** | `on-primary` | `#293500` | Teks di atas primary |
| **Primary Container** | `primary-container` | `#3D4D00` | Container primary |
| **On Primary Container** | `on-primary-container` | `#D0EF67` | Teks di container |
| **Secondary** | `secondary` | `#C4CAA9` | Elemen pendukung |
| **On Secondary** | `on-secondary` | `#2D331B` | Teks di atas secondary |
| **Secondary Container** | `secondary-container` | `#444930` | Container secondary |
| **On Secondary Container** | `on-secondary-container` | `#E0E6C4` | Teks di secondary container |
| **Tertiary** | `tertiary` | `#A1D0C5` | Decorative |
| **Tertiary Container** | `tertiary-container` | `#214E46` | Tertiary container |
| **On Tertiary Container** | `on-tertiary-container` | `#BCECE1` | Teks di tertiary container |
| **Surface** | `surface` | `#1B1C17` | Page background |
| **Surface Dim** | `surface-dim` | `#131410` | Surface yang lebih gelap |
| **Surface Bright** | `surface-bright` | `#3A3A35` | Surface terang di dark |
| **Surface Container Lowest** | `surface-container-lowest` | `#0E0F0B` | Deepest bg |
| **Surface Container Low** | `surface-container-low` | `#1B1C17` | Low container |
| **Surface Container** | `surface-container` | `#1F201B` | Default container |
| **Surface Container High** | `surface-container-high` | `#2A2A25` | Elevated container |
| **Surface Container Highest** | `surface-container-highest` | `#353530` | Highest container |
| **On Surface** | `on-surface` | `#E4E3DA` | Teks utama |
| **On Surface Variant** | `on-surface-variant` | `#C7C8B8` | Teks secondary |
| **Outline** | `outline` | `#909283` | Border |
| **Outline Variant** | `outline-variant` | `#46483C` | Subtle border |
| **Error** | `error` | `#FFB4AB` | Error state |
| **On Error** | `on-error` | `#690005` | Teks error |
| **Error Container** | `error-container` | `#93000A` | Container error |
| **Inverse Surface** | `inverse-surface` | `#E4E3DA` | Snackbar bg |
| **Inverse On Surface** | `inverse-on-surface` | `#30312B` | Teks inverse |
| **Inverse Primary** | `inverse-primary` | `#526600` | Primary di inverse |

### 4.3 Mapping Warna Lama → Baru

| Lama | Baru (Light) | Baru (Dark) |
|------|-------------|-------------|
| `custom-black (#24282C)` | `on-surface (#1B1C17)` | `surface (#1B1C17)` |
| `custom-white-2 (#EAE9E2)` | `surface (#FDFCFA)` | — |
| `custom-white (#fbfbf8)` | `surface-container-lowest (#FFFFFF)` | — |
| `custom-green (#D3F36A)` | `primary-container (#D0EF67)` / `primary (#526600)` | `primary (#B4D34E)` |

### 4.4 M3 Expressive Color Emphasis

M3 Expressive mendorong penggunaan warna yang **lebih berani** dibanding M3 standard:
- **Primary Container** digunakan lebih sering dan prominent (bukan hanya chip/badge)
- **Kontras warna lebih tinggi** antara surface dan container
- **Vibrant accent** pada elemen interaktif (button, link, icon aktif)
- **Tonal variety** — jangan hanya pakai primary, gunakan secondary dan tertiary untuk depth

**Implementasi di portfolio:**
- Section header hover → `bg-primary-container` (bukan `bg-primary/8`)
- Portfolio card overlay → `bg-primary-container/90 backdrop-blur-sm`
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

| Role | Size | Line Height | Weight | Tracking | Tailwind Class |
|------|------|-------------|--------|----------|---------------|
| Display Large | 57px | 64px | 400 | -0.25px | `text-display-lg` |
| Display Medium | 45px | 52px | 400 | 0 | `text-display-md` |
| Display Small | 36px | 44px | 400 | 0 | `text-display-sm` |
| Headline Large | 32px | 40px | 400 | 0 | `text-headline-lg` |
| Headline Medium | 28px | 36px | 400 | 0 | `text-headline-md` |
| Headline Small | 24px | 32px | 400 | 0 | `text-headline-sm` |
| Title Large | 22px | 28px | 400 | 0 | `text-title-lg` |
| Title Medium | 16px | 24px | 500 | 0.15px | `text-title-md` |
| Title Small | 14px | 20px | 500 | 0.1px | `text-title-sm` |
| Body Large | 16px | 24px | 400 | 0.5px | `text-body-lg` |
| Body Medium | 14px | 20px | 400 | 0.25px | `text-body-md` |
| Body Small | 12px | 16px | 400 | 0.4px | `text-body-sm` |
| Label Large | 14px | 20px | 500 | 0.1px | `text-label-lg` |
| Label Medium | 12px | 16px | 500 | 0.5px | `text-label-md` |
| Label Small | 11px | 16px | 500 | 0.5px | `text-label-sm` |

### 5.3 Type Usage di Portfolio

| Elemen | Current | M3 Expressive |
|--------|---------|---------------|
| Hero "hutama" | `text-4xl font-bold` (Neutral Face) | `text-display-sm` atau `text-display-md` (heading font) |
| Hero "hello, I'm" | `text-lg` | `text-title-lg` |
| Hero "--web developer" | `text-2xl font-thin` | `text-headline-sm font-normal` |
| Section header ("about", "skills", etc) | `text-xl` / `text-2xl` (Neutral Face) | `text-headline-sm` (heading font) |
| About body text | `text-sm` / `text-base` | `text-body-lg` |
| Skill subheading ("Main", "Library") | `text-base` | `text-title-md` |
| Portfolio card title | `text-sm font-semibold` | `text-title-sm` |
| Footer text | `text-xs` / `text-base` | `text-body-sm` |
| Contact form label | `text-sm font-medium` | `text-label-lg` |
| Navigation logo "HTMA" | `text-lg font-semibold` | `text-title-md font-semibold` |
| Sidebar nav links | `text-base` | `text-label-lg` |

---

## 6. Shape System

### 6.1 M3 Expressive Shape Scale

M3 Expressive memperkenalkan **35 shape baru** dan memperluas skala shape. Untuk web (CSS), kita fokus pada rounded corner scale:

| Shape Token | Radius | Tailwind Class | Penggunaan |
|-------------|--------|----------------|------------|
| None | 0px | `rounded-none` | Flat edges |
| Extra Small | 4px | `rounded-xs` (custom) | Small chips, badges |
| Small | 8px | `rounded-sm` atau `rounded-lg` | Input fields, small cards |
| Medium | 12px | `rounded-xl` | Buttons, medium cards |
| Large | 16px | `rounded-2xl` | Cards, containers |
| Extra Large | 28px | `rounded-3xl` (custom `rounded-[28px]`) | Modal, dialog, prominent cards |
| Full | 9999px | `rounded-full` | FAB, pills, avatar, chips |

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

| Elemen | Current | M3 Expressive |
|--------|---------|---------------|
| Navigation logo | `rounded` (4px) | `rounded-xl` (12px) |
| Portfolio card | `rounded` (4px) | `rounded-2xl` (16px), hover: `rounded-3xl` (28px) |
| Modal dialog | Unknown | `rounded-[28px]` (Extra Large) |
| Social button | `rounded-3xl` | `rounded-full` (pill) |
| Skill icon container | `rounded-sm` (2px) | `rounded-xl` (12px) |
| Input fields | Border-bottom only | `rounded-t-xs` (4px top) filled style |
| Send button | `rounded` (4px) | `rounded-full` (pill) |
| Scroll-to-top | `rounded` (4px) | `rounded-xl` (12px) |
| Active sidebar link | `rounded` (4px) | `rounded-full` (pill) |
| Sidebar rail (desktop) | `rounded-t-full` | `rounded-t-[28px]` (Extra Large top) |
| Highlighted name "Hutama" | `rounded` (4px) | `rounded-lg` (8px) |

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

| Elemen | M3 Standard Size | M3 Expressive Size | Alasan |
|--------|-----------------|-------------------|--------|
| Hero name "hutama" | `text-headline-lg` | `text-display-sm` (36px) | Elemen paling penting di halaman |
| Section header | `text-title-lg` | `text-headline-sm` (24px) | Navigasi hierarchy yang jelas |
| Body text | `text-body-md` | `text-body-lg` (16px) | Readability, bukan minimum |
| Send button | `px-4 py-2` | `px-8 py-3 rounded-full` (lebih besar, pill shape) | CTA harus prominent |
| Skill icon container | `w-10 h-10` | `w-12 h-12 md:w-16 md:w-16` | Grid visual yang lebih expressive |
| Arrow icon (section header) | `text-base` | `text-2xl` | Icon sebagai visual anchor |
| Footer text | `text-sm` | `text-body-sm` (12px) | Eksplisit de-emphasize |
| Nav logo "HTMA" | `text-sm` | `text-title-md` (16px) | Brand presence yang lebih kuat |

### 7.3 Responsive Size Scaling

M3 Expressive mendorong size yang adaptive per breakpoint, bukan hanya linear scaling:

```
Mobile:  hero name → text-display-sm (36px)
Tablet:  hero name → text-display-md (45px)  [bukan default]
Desktop: hero name → text-display-md/lg (45px-57px)
```

**Implementasi Tailwind:**
```html
<h1 class="text-[36px] md:text-[45px] lg:text-[57px] leading-tight">
  hutama
</h1>
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

| Elemen | Containment Method | CSS Implementation |
|--------|-------------------|-------------------|
| Portfolio card | Background + shape | `bg-surface-container rounded-2xl overflow-hidden` |
| Skills icon grid | Background container | `bg-surface-container rounded-xl p-2.5` per icon |
| Hero badge "--web developer" | Background + shape | `bg-primary-container rounded-lg px-3 py-1` |
| Modal dialog | Elevation + shape + backdrop | `bg-surface-container-high rounded-[28px] shadow-xl` + scrim |
| Contact form fields | Filled container | `bg-surface-container-highest rounded-t-xs border-b-2 border-outline` |
| Active sidebar link | Background + pill shape | `bg-primary-container rounded-full px-4` |
| Navigation bar | Surface + blur | `bg-surface/80 backdrop-blur-md` |
| Highlighted name "Hutama" | Inline containment | `bg-primary-container rounded-lg px-2 py-0.5 inline` |
| Section separator | Border containment | `border-t border-outline-variant` |

### 8.3 Spacing sebagai Containment Signal

Jarak (whitespace) adalah tool containment yang kuat:

```
Dalam satu group:    gap-2 / gap-3  (tight — "ini berhubungan")
Antar group berbeda: gap-8 / gap-12 (loose — "ini terpisah")
Section separator:   py-8 / py-12   (breathing room antar section)
```

**Penting:** Jangan gunakan jarak yang seragam di seluruh halaman — variasi jarak adalah sinyal hierarchy dan grouping.

---

## 9. Motion & Animation

### 9.1 M3 Expressive Motion Principles

M3 Expressive memperkenalkan **physics-based motion** sebagai pengganti time-based easing tradisional:

- **Spring physics** untuk transisi natural (sudah ada via Framer Motion)
- **Shape morphing** pada interaksi (border-radius transition)
- **Emphasized easing** untuk enter/exit animations
- **Staggered animations** untuk list/grid items

### 9.2 Easing Curves

| Type | CSS Cubic Bezier | Penggunaan |
|------|-----------------|------------|
| Emphasized | `cubic-bezier(0.2, 0, 0, 1)` | Primary transitions (page enter, modal open) |
| Emphasized Decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Enter animations |
| Emphasized Accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` | Exit animations |
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | Most transitions |
| Standard Decelerate | `cubic-bezier(0, 0, 0, 1)` | Fade in |
| Standard Accelerate | `cubic-bezier(0.3, 0, 1, 1)` | Fade out |

### 9.3 Duration Scale

| Token | Duration | Penggunaan |
|-------|----------|------------|
| Short 1 | 50ms | Micro-interactions (ripple start) |
| Short 2 | 100ms | State changes (hover start) |
| Short 3 | 150ms | Small transitions (icon rotation) |
| Short 4 | 200ms | Standard hover/focus |
| Medium 1 | 250ms | Component transitions |
| Medium 2 | 300ms | Card expansion, modal scale |
| Medium 3 | 350ms | Navigation transitions |
| Medium 4 | 400ms | Large element transitions |
| Long 1 | 450ms | Page transitions |
| Long 2 | 500ms | Complex animations |
| Long 3 | 550ms | Full page enter |
| Long 4 | 600ms | Hero animations |
| Extra Long 1 | 700ms | Sequence animations |
| Extra Long 4 | 1000ms | Dramatic reveals (text scramble) |

### 9.4 Motion/Framer Motion Config Mapping

```typescript
// M3 Expressive spring config (untuk Framer Motion)
const m3Spring = {
  emphasized: { type: 'spring', stiffness: 400, damping: 30 },
  standard: { type: 'spring', stiffness: 300, damping: 25 },
  gentle: { type: 'spring', stiffness: 200, damping: 20 },
};

// M3 Expressive tween config
const m3Tween = {
  emphasized: { duration: 0.5, ease: [0.2, 0, 0, 1] },
  emphasizedDecel: { duration: 0.4, ease: [0.05, 0.7, 0.1, 1] },
  emphasizedAccel: { duration: 0.3, ease: [0.3, 0, 0.8, 0.15] },
  standard: { duration: 0.3, ease: [0.2, 0, 0, 1] },
};
```

### 9.5 Animation Usage di Portfolio

| Elemen | Current Config | M3 Expressive Config |
|--------|---------------|---------------------|
| Hero title fade-in | `delay: 0.3-0.9, duration: 0.6-0.7` | `m3Tween.emphasizedDecel` + stagger delay |
| Hero images fade-in | `delay: 1.2-2.0, duration: 0.7` | `m3Tween.emphasized` |
| Page wrapper enter | `duration: 0.7, y: 24→0` | `m3Spring.emphasized` dengan `y: 24→0` |
| Card hover | `duration: 300ms` (CSS) | `200ms ease: [0.2, 0, 0, 1]` + shape morph |
| Section header hover | `duration: 300ms` (CSS) | `200ms ease: [0.2, 0, 0, 1]` |
| Custom cursor spring | `damping: 30, stiffness: 700` | Tetap (sudah cocok M3 feel) |
| Theme toggle | rotation 45°↔180° | Tetap + spring physics |
| Modal open/close | (perlu cek) | `m3Spring.emphasized` + backdrop fade |

---

## 10. Elevation & Surface

### 10.1 M3 Expressive Elevation Model

M3 Expressive menggunakan **tonal surface elevation** bukan box-shadow tradisional:

| Level | Shadow | Surface Color Token | Penggunaan |
|-------|--------|-------------------|------------|
| Level 0 | None | `surface` | Page background |
| Level 1 | `shadow-sm` | `surface-container-low` | Low cards, resting state |
| Level 2 | `shadow-md` | `surface-container` | Default cards |
| Level 3 | `shadow-lg` | `surface-container-high` | Elevated cards, modal |
| Level 4 | `shadow-xl` | `surface-container-highest` | Top-level navigation |
| Level 5 | `shadow-2xl` | — | Rare, dragged elements |

**Catatan M3 Expressive:** Shadow dan tonal surface saling melengkapi. Gunakan tonal shift sebagai default, shadow hanya untuk elemen yang benar-benar "mengambang" (modal, dropdown, FAB).

### 10.2 Elevation Usage di Portfolio

| Elemen | Current | M3 Expressive |
|--------|---------|---------------|
| Page background | `bg-custom-white-2` | `bg-surface` (Level 0) |
| Portfolio card resting | Brutalist shadow | `bg-surface-container` (Level 2), minimal shadow |
| Portfolio card hover | Shadow shift | `bg-surface-container-high` (Level 3) + `shadow-lg` |
| Modal | (perlu cek) | `bg-surface-container-high` (Level 3) + `shadow-xl` |
| Navigation bar | Solid bg | `bg-surface` (Level 0, solid) |
| Sidebar rail | `bg-custom-black` | `bg-surface-container-highest` (Level 4) |
| Skill icon container | No elevation | `bg-surface-container` (Level 2) |
| Gradient masks | `bg-custom-white-2` | `bg-surface` |

---

## 11. State Layers & Interaction

### 11.1 M3 Expressive State Layer Opacity

State layers = semi-transparent overlay di atas elemen saat interaksi:

| State | Overlay Opacity | CSS Implementation |
|-------|----------------|-------------------|
| Enabled (default) | 0% | — |
| Hovered | 8% | `hover:bg-primary/8` atau `hover:bg-on-surface/8` |
| Focused | 10% | `focus-visible:bg-primary/10` |
| Pressed | 10% | `active:bg-primary/10` |
| Dragged | 16% | `bg-primary/16` |
| Disabled | — | `opacity-38` (38% total opacity, M3 standard) |

### 11.2 State Layer Implementation Strategy

Untuk Tailwind, state layers diimplementasikan via pseudo-element atau bg opacity:

```html
<!-- Approach 1: Background opacity (simpel, recommended) -->
<button class="bg-primary text-on-primary hover:bg-primary/92 active:bg-primary/90 focus-visible:bg-primary/90">
  Send
</button>

<!-- Approach 2: Relative pseudo for complex shapes -->
<div class="relative overflow-hidden">
  <div class="absolute inset-0 bg-on-surface/0 hover:bg-on-surface/8 active:bg-on-surface/10 transition-colors" />
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
<button disabled class="bg-on-surface/[0.12] text-on-surface/[0.38] cursor-not-allowed">
  Send
</button>
```

---

## 12. Component Mapping — Tailwind Implementation

Detail implementasi setiap komponen portfolio menggunakan M3 Expressive + Tailwind CSS.

### 12.1 Navigation Bar

```
Container: bg-surface (solid, tanpa backdrop-blur)
Logo box: bg-primary-container text-on-primary-container rounded-xl px-3 py-1.5
Theme toggle: MdLightMode / MdDarkMode, text-on-surface hover:bg-on-surface/8 rounded-full p-2
```

### 12.2 Hero Section

```
Title "hello, I'm": text-title-lg text-on-surface / dark:text-primary
Name "hutama": text-display-sm font-bold text-on-surface / dark:text-primary (heading font)
Badge "--web developer": bg-primary-container text-on-primary-container rounded-lg px-3 py-1
Social button: bg-secondary-container text-on-secondary-container rounded-full px-6 py-3
  hover: bg-secondary-container/92
SVG illustrations: text-on-surface / dark:text-primary
```

### 12.3 Section Headers (About, Skills, Portfolio, Contact)

```
Container: flex items-center gap-x-2 pr-3 py-1
  hover: bg-primary-container rounded-xl transition-all duration-200
Arrow icon: text-primary text-2xl
  hover: -rotate-45 transition-transform duration-200
Title text: text-headline-sm text-on-surface (heading font)
  hover: text-on-primary-container
  dark default: text-primary
```

### 12.4 About Section

```
Separator: border-outline-variant
Body text: text-body-lg text-on-surface leading-relaxed
  dark: text-on-surface (auto via dark mode palette)
Highlighted "Hutama": bg-primary-container text-on-primary-container rounded-lg px-2 py-0.5
```

### 12.5 Skills Section

```
Separator: border-outline-variant
Subheading: text-title-md text-on-surface-variant
Icon container: bg-surface-container rounded-xl p-2.5
  hover: bg-surface-container-high scale-105 transition-all duration-200
  Tailwind: flex items-center justify-center w-12 md:w-16 2xl:w-[4.5rem]
```

### 12.6 Portfolio Cards

```
Card container: bg-surface-container rounded-2xl overflow-hidden
  transition: all 300ms cubic-bezier(0.2, 0, 0, 1)
  hover: rounded-[28px] shadow-lg scale-[1.02] bg-surface-container-high
  active: scale-[0.98] rounded-xl
Bottom overlay: bg-surface/90 backdrop-blur-sm rounded-xl m-2 p-3
  flex justify-between items-center
Title: text-title-sm font-semibold text-on-surface
Arrow icon: bg-primary text-on-primary rounded-full p-1.5 w-7 h-7
GitHub link: text-primary / dark:text-primary
```

### 12.7 Modal / Dialog

```
Backdrop: bg-on-surface/32 (M3 scrim)
  transition: opacity 300ms
Dialog container: bg-surface-container-high rounded-[28px] p-6
  shadow-xl max-w-2xl w-full
  enter: scale(0.92) → scale(1), opacity 0→1
  exit: scale(1) → scale(0.95), opacity 1→0
  transition: m3Spring.emphasized
Close button: bg-surface-container-highest text-on-surface rounded-full p-2
  hover: bg-on-surface/8
```

### 12.8 Sidebar / Navigation Rail

```
Rail container (desktop): bg-surface-container-highest rounded-t-[28px]
Active link: bg-primary-container text-on-primary-container rounded-full px-4
Inactive link: text-on-surface-variant
  hover: bg-on-surface/8 rounded-full
Scroll-to-top FAB: bg-primary-container text-on-primary-container rounded-xl p-2
  hover: shadow-md bg-primary-container/92
  dark: bg-primary text-on-primary
```

### 12.9 Footer

```
Text: text-body-sm text-on-surface-variant
Brain icon: text-tertiary
Separator: border-t border-outline-variant (opsional)
```

### 12.10 Contact Form (M3 Expressive Text Fields)

```
Filled Text Field:
  Container: bg-surface-container-highest rounded-t-xs border-b-2 border-outline p-3
    focus: border-b-primary
  Label: text-label-lg text-on-surface-variant
    focus: text-primary text-label-sm (float up)
  Input text: text-body-lg text-on-surface

Send Button (Filled):
  bg-primary text-on-primary rounded-full px-8 py-3
  hover: shadow-md bg-primary/92
  disabled: bg-on-surface/[0.12] text-on-surface/[0.38]
  loading: spinner inside button

Error State:
  Container border: border-b-error
  Label: text-error
  Helper text: text-body-sm text-error
```

### 12.11 Custom Cursor

```
Cursor dot: bg-surface / bg-primary mix-blend-difference
  w-6 h-6 rounded-full
  pointer-events-none fixed z-[1350]
  hidden on mobile (max-width: 768px → w-0 h-0)
  Spring: damping: 30, stiffness: 700 (unchanged)
```

### 12.12 Gradient Masks

```
Top mask: bg-surface fixed z-[1030] h-[8%]
  mask-image: linear-gradient(to bottom, #000 0%, transparent 100%)
Bottom mask: bg-surface fixed z-[1050] h-[8%]
  mask-image: linear-gradient(to top, #000 0%, transparent 100%)
  dark: bg-surface (auto via dark mode palette)
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
  --color-primary: #3E6A00;
  --color-on-primary: #FFFFFF;
  --color-surface: #F9FAF0;
  --color-on-surface: #1A1C17;
  /* ... semua roles ... */
}

.dark {
  --color-primary: #9DD835;
  --color-on-primary: #1D3700;
  --color-surface: #12140E;
  --color-on-surface: #E1E3D9;
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

| Requirement | Standard | M3 Expressive Approach |
|-------------|----------|----------------------|
| Color contrast (text) | WCAG AA 4.5:1 | Tonal palette auto-ensures contrast |
| Color contrast (large text) | WCAG AA 3:1 | Display/Headline sizes qualify |
| Focus indicator | Visible | `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2` |
| Touch target | Min 44x44px | M3: min 48x48px untuk interactive elements |
| Motion | `prefers-reduced-motion` | Disable spring animations, use instant transitions |
| Screen reader | ARIA labels | Semua interactive elements harus punya label |

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
@import "tailwindcss";

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
  --color-on-primary: #FFFFFF;
  --color-primary-container: #D0EF67;
  --color-on-primary-container: #171E00;
  --color-secondary: #5B6146;
  --color-on-secondary: #FFFFFF;
  --color-secondary-container: #E0E6C4;
  --color-on-secondary-container: #191E08;
  --color-tertiary: #3A665E;
  --color-tertiary-container: #BCECE1;
  --color-on-tertiary-container: #00201B;
  --color-surface: #FDFCFA;
  --color-surface-dim: #DADBD1;
  --color-surface-bright: #FDFCFA;
  --color-surface-container-lowest: #FFFFFF;
  --color-surface-container-low: #F7F6F2;
  --color-surface-container: #F1F1EC;
  --color-surface-container-high: #EBEBE6;
  --color-surface-container-highest: #E5E5E0;
  --color-on-surface: #1B1C17;
  --color-on-surface-variant: #46483C;
  --color-outline: #76786B;
  --color-outline-variant: #C7C8B8;
  --color-error: #BA1A1A;
  --color-on-error: #FFFFFF;
  --color-error-container: #FFDAD6;
  --color-inverse-surface: #30312B;
  --color-inverse-on-surface: #F3F1E9;
  --color-inverse-primary: #B4D34E;
}

.dark {
  --color-primary: #B4D34E;
  --color-on-primary: #293500;
  --color-primary-container: #3D4D00;
  --color-on-primary-container: #D0EF67;
  --color-secondary: #C4CAA9;
  --color-on-secondary: #2D331B;
  --color-secondary-container: #444930;
  --color-on-secondary-container: #E0E6C4;
  --color-tertiary: #A1D0C5;
  --color-tertiary-container: #214E46;
  --color-on-tertiary-container: #BCECE1;
  --color-surface: #1B1C17;
  --color-surface-dim: #131410;
  --color-surface-bright: #3A3A35;
  --color-surface-container-lowest: #0E0F0B;
  --color-surface-container-low: #1B1C17;
  --color-surface-container: #1F201B;
  --color-surface-container-high: #2A2A25;
  --color-surface-container-highest: #353530;
  --color-on-surface: #E4E3DA;
  --color-on-surface-variant: #C7C8B8;
  --color-outline: #909283;
  --color-outline-variant: #46483C;
  --color-error: #FFB4AB;
  --color-on-error: #690005;
  --color-error-container: #93000A;
  --color-inverse-surface: #E4E3DA;
  --color-inverse-on-surface: #30312B;
  --color-inverse-primary: #526600;
}
```

---

> **Status Token:** Nilai hex di atas sudah 100% final dan akurat, di-generate langsung dari seed `#D3F36A` menggunakan `@material/material-color-utilities` resmi Google. Siap dipindahkan langsung ke `src/styles/globals.css` pada Phase 1.
