# BRAINSTORMING — Portfolio Website Update (htma.site)

> **Branch:** `feat/portfolio-update`
> **Tanggal:** 2026-08-30
> **Runtime & Package Manager:** Bun (full)
> **Constraint Utama:** Layout vertical tetap dipertahankan. Tidak ada perubahan data portfolio (foto, list project, detail project tetap sama). Desain di-upgrade ke **Material You 3 (M3)** design system dari Google. Menerapkan standar kode dari **Global Rules (AGENTS.md)** dan menggunakan **Better T Stack** sebagai fondasi project.

---

## Daftar Isi

1. [Gambaran Arsitektur Saat Ini](#1-gambaran-arsitektur-saat-ini)
2. [Bun — Runtime & Package Manager](#2-bun--runtime--package-manager)
3. [Better T Stack — Fondasi Project](#3-better-t-stack--fondasi-project)
4. [Global Rules (AGENTS.md) — Standar Kode](#4-global-rules-agentsmd--standar-kode)
5. [Material You 3 — Strategi Penerapan](#5-material-you-3--strategi-penerapan)
6. [Color System — Seed Color & Dynamic Palette](#6-color-system--seed-color--dynamic-palette)
7. [Typography — Font Migration](#7-typography--font-migration)
8. [Komponen per Komponen — Rencana Perubahan](#8-komponen-per-komponen--rencana-perubahan)
9. [Package Update & Penghapusan](#9-package-update--penghapusan)
10. [Performance Improvements](#10-performance-improvements)
11. [Halaman Contact — Rencana Update](#11-halaman-contact--rencana-update)
12. [SEO & Metadata](#12-seo--metadata)
13. [Urutan Eksekusi (Roadmap)](#13-urutan-eksekusi-roadmap)
14. [Pertanyaan Terbuka](#14-pertanyaan-terbuka)

---

## 1. Gambaran Arsitektur Saat Ini

### Tech Stack

| Layer           | Teknologi            | Versi         |
| --------------- | -------------------- | ------------- |
| Framework       | Next.js (App Router) | 14.2.30       |
| React           | React                | 18.3.1        |
| Styling         | Tailwind CSS         | 3.4.13        |
| Animation       | Framer Motion        | 10.18.0       |
| Smooth Scroll   | Locomotive Scroll    | 5.0.0-beta.21 |
| Text Scramble   | Baffle.js            | 0.3.6         |
| State           | Zustand              | 4.5.7         |
| Form            | React Hook Form      | 7.59.0        |
| Email           | EmailJS              | 4.4.1         |
| Icons           | React Icons          | 5.5.0         |
| Theme           | next-themes          | 0.3.0         |
| Analytics       | @vercel/analytics    | 1.5.0         |
| Image           | sharp                | 0.33.5        |
| Utility         | clsx                 | 2.1.1         |
| Package Manager | pnpm                 | (current)     |
| Runtime         | Node.js              | >= 18         |

### Struktur Layout (Vertical — TIDAK BERUBAH)

```
┌─────────────────────────────────────────────┐
│ Navigation (fixed top, grid-12)             │
│ ┌──────┐                        ┌──────────┐│
│ │ HTMA │                        │ Theme Btn││
│ └──────┘                        └──────────┘│
├─────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────────┐ ┌──────────┐│
│  │          │ │              │ │          ││
│  │   Hero   │ │  Content     │ │ Sidebar  ││
│  │ (sticky) │ │  (scrolling) │ │ (sticky) ││
│  │          │ │              │ │          ││
│  │ - Title  │ │ - About      │ │ - home   ││
│  │ - Images │ │ - Skills     │ │ - contact││
│  │ - Social │ │ - Portfolio  │ │ - scroll ││
│  │          │ │ - Footer     │ │   top    ││
│  └──────────┘ └──────────────┘ └──────────┘│
├─────────────────────────────────────────────┤
│ Gradient Masks (fixed top & bottom)         │
│ Custom Cursor (fixed, pointer-events-none)  │
│ Modal Portal (portfolio detail)             │
└─────────────────────────────────────────────┘
```

**Layout ini tetap 100% dipertahankan.** Hero sticky di kiri, konten scroll di tengah, sidebar sticky di kanan. Gradient mask atas-bawah tetap ada.

### Halaman

- `/` — Home (About, Skills, Portfolio, Footer)
- `/contact` — Contact Form (Name, Email, Subject, Message)

### Font Saat Ini

- **Body:** Kata Grotesk (local font, woff2) — weights: 100, 400, 600, 700
- **Heading:** Neutral Face (local font, woff2) — weights: 400, 700

### Warna Saat Ini

| Token            | Hex       | Penggunaan                        |
| ---------------- | --------- | --------------------------------- |
| `custom-black`   | `#24282C` | Background dark, text light mode  |
| `custom-white`   | `#fbfbf8` | Card background                   |
| `custom-white-2` | `#EAE9E2` | Page background light mode        |
| `custom-green`   | `#D3F36A` | Accent/primary color              |
| `custom-blue`    | `#CDDFE3` | Belum dipakai di komponen manapun |
| `lime`           | `#F2EC7E` | Belum dipakai di komponen manapun |

---

## 2. Bun — Runtime & Package Manager

Migrasi penuh dari **pnpm + Node.js** ke **Bun** sebagai satu-satunya runtime dan package manager.

### Kenapa Bun?

- **Kecepatan:** Install dependencies 10-25x lebih cepat dari npm/pnpm
- **Runtime built-in:** Bun native runtime menggantikan Node.js — startup time lebih cepat
- **Bundler built-in:** Bun bundler bisa digunakan sebagai alternatif (opsional, Next.js tetap handle bundling sendiri)
- **Test runner built-in:** `bun test` sebagai alternatif Jest/Vitest (opsional, bisa dipakai nanti)
- **TypeScript native:** Bun menjalankan `.ts` langsung tanpa transpile step
- **Kompatibel Next.js 15:** Next.js officially support Bun runtime

### Perubahan yang Diperlukan

#### 2.1 Hapus pnpm artifacts

- Hapus `pnpm-lock.yaml`
- Hapus referensi pnpm di `package.json` scripts (misal `pnpm format`)

#### 2.2 Generate bun lockfile

```bash
bun install
```

Ini menghasilkan `bun.lockb` (binary lockfile) yang menggantikan `pnpm-lock.yaml`.

#### 2.3 Update `package.json`

```json
{
  "packageManager": "bun",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "lint:strict": "oxlint -D correctness -D suspicious -D perf -D react -D nextjs",
    "typechecks": "tsc --noEmit --incremental false",
    "format": "prettier --write .",
    "format:check": "prettier -c .",
    "prepare": "husky",
    "commitlint": "commitlint --edit"
  }
}
```

**Perubahan:**

- `next lint` & `eslint` → diganti menggunakan perintah `oxlint` (Linter berbasis Rust yang 50-100x lebih cepat)
- `pnpm format` → `bun run format`
- `next dev` → `next dev --turbopack` (Turbopack stable di Next 15, Bun-compatible)
- Tambah `"packageManager": "bun"`

#### 2.4 Update `engines` field

```json
{
  "engines": {
    "bun": ">= 1.1"
  }
}
```

Hapus `"node": ">= 18"` karena Bun jadi primary runtime.

#### 2.5 Update `.gitignore`

Tambahkan:

```
bun.lockb
```

Atau justru commit `bun.lockb` (recommended untuk reproducible builds). Pilih salah satu:

- **Commit `bun.lockb`** → reproducible, CI/CD konsisten (RECOMMENDED)
- **Gitignore `bun.lockb`** → lockfile di-generate per machine

#### 2.6 Husky hooks compatibility

Bun kompatibel penuh dengan Husky. `prepare` script (`husky`) berjalan normal via `bun install`.

#### 2.7 lint-staged compatibility

`lint-staged` berjalan normal dengan Bun. Tidak ada perubahan config.

#### 2.8 Environment variables

Bun membaca `.env` secara otomatis (built-in dotenv). Tidak perlu install `dotenv` package. `process.env.NEXT_PUBLIC_*` tetap bekerja normal di Next.js.

#### 2.9 CI/CD

Jika menggunakan Vercel deployment:

- Vercel sudah support Bun sebagai package manager
- Set `ENABLE_EXPERIMENTAL_COREPACK=1` atau pilih Bun di Vercel dashboard → Settings → General → Node.js Version

#### 2.10 next.config migration

`next.config.js` → `next.config.ts` (TypeScript native, Bun menjalankannya langsung):

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
```

---

## 3. Better T Stack — Fondasi Project

Menerapkan Better T Stack untuk memberikan fondasi project yang solid dan scalable.

### Apa yang Diambil dari Better T Stack?

Better T Stack adalah full-stack TypeScript project generator. Untuk portfolio ini (frontend-only, no backend/DB), kita mengambil **prinsip dan konfigurasi**-nya, bukan full stack setup.

### 3.1 Monorepo Structure (Opsional)

Project ini saat ini **single-app** (bukan monorepo). Better T Stack mendukung monorepo via Turborepo.

**Opsi A — Tetap Single App (RECOMMENDED untuk portfolio):**
Portfolio website tidak butuh monorepo. Tetap single Next.js app.

**Opsi B — Monorepo (Jika mau scale ke project lain):**
Jika ke depan ingin menambahkan:

- Blog terpisah (Astro/MDX)
- API server (Hono)
- Shared UI library

Maka bisa di-convert ke monorepo nanti via `bts add turborepo`.

**Keputusan: Tetap single app untuk sekarang.** Bisa di-upgrade ke monorepo nanti.

### 3.2 TypeScript Config (Better T Stack Standard)

Update `tsconfig.json` mengikuti standar Better T Stack:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "incremental": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@modules/*": ["./src/modules/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@store/*": ["./src/store/*"],
      "@styles/*": ["./src/styles/*"],
      "@utils/*": ["./src/utils/*"],
      "@public/*": ["./public/*"]
    }
  }
}
```

**Penambahan penting:**

- `"noUncheckedIndexedAccess": true` → mencegah runtime error saat akses array/object by index
- `"target": "es2022"` → modern target, Bun support penuh
- `"moduleResolution": "bundler"` → optimal untuk Next.js bundler

### 3.3 Linting & Formatting (Better T Stack + Oxlint + Prettier)

Mengikuti best practice modern dari ecosystem Next.js & Better T Stack, linting akan di-upgrade penuh ke **Oxlint** (menggantikan ESLint).

**Kenapa Oxlint?**

- Dibangun menggunakan Rust (Oxc compiler stack), 50-100x lebih cepat dari ESLint.
- Punya dukungan plugin bawaan untuk React, TypeScript, dan Next.js (termasuk App Router rules).
- Linter dapat langsung berjalan tanpa konfigurasi yang kompleks, efektif mendeteksi masalah 'correctness' dan 'suspicious'.
- Untuk Formatter, kita akan tetap menggunakan **Prettier** (karena Oxlint berfokus murni pada Linting; _oxfmt_ masih WIP).

**Yang dihapus:**

- `eslint` + semua eslint plugins/configs (termasuk `eslint-config-next`)
- `.eslintrc.js`, `.eslintignore`

**Yang ditambahkan (oxlint.json):**
Oxlint bisa dijalankan tanpa config (zero-config), tapi demi strictness, kita butuh file _oxlint.json_:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["typescript", "react", "nextjs"],
  "categories": {
    "correctness": "error",
    "suspicious": "warn",
    "perf": "warn",
    "style": "off"
  },
  "rules": {
    "nextjs/no-head-element": "error",
    "nextjs/no-async-client-component": "error",
    "react/no-children-prop": "error",
    "typescript/no-floating-promises": "error"
  }
}
```

### 3.4 Git Hooks (Better T Stack Standard)

Saat ini pakai Husky + lint-staged + commitlint.

~~Better T Stack mendukung **Lefthook** sebagai alternatif Husky (lebih cepat, Go-based, zero dependency).~~

**Keputusan: Migrasi ke Lefthook.**

- Lebih cepat dari Husky (Go-based, zero dependency)
- Single config `lefthook.yml` (menggantikan `.husky/` dir + `lint-staged` config)
- Tidak butuh `prepare` script di `package.json`
- Akan menjalankan `oxlint` + `prettier --check` di pre-commit hook
- Akan menjalankan `commitlint` di commit-msg hook

**Yang dihapus saat migrasi:**

- `husky` package
- `.husky/` directory
- `lint-staged` package + config
- `"prepare": "husky"` dari `package.json` scripts

**Yang ditambahkan:**

- `lefthook` package (devDependency)
- `lefthook.yml` config file

### 3.5 Deployment (Better T Stack Standard)

Saat ini: Deploy ke Vercel (implisit, ada `@vercel/analytics`).

Better T Stack mendukung:

- **Vercel** (recommended untuk Next.js)
- **Cloudflare Pages**
- **Docker**

**Keputusan: Tetap Vercel.** Paling optimal untuk Next.js.

### 3.6 Better T Stack Addons yang Relevan

| Addon                | Relevansi                     | Keputusan                     |
| -------------------- | ----------------------------- | ----------------------------- |
| `biome`              | Linter + formatter all-in-one | Digantikan Oxlint             |
| `oxlint`             | Ultra-fast Rust linter        | **Wajib di-install**          |
| `turborepo`          | Monorepo                      | Tidak untuk sekarang          |
| `pwa`                | Progressive Web App           | Opsional, bisa ditambah nanti |
| `husky` / `lefthook` | Git hooks                     | Migrasi ke Lefthook           |
| `ultracite`          | Agent-friendly linter rules   | Opsional                      |

### 3.7 Quality Constraints Contract (constraint-driven-development)

Kontrak kualitas tertulis yang mengikat setiap AI Agent yang mengeksekusi proyek ini (tidak boleh diturunkan secara diam-diam):

| Dimensi              | Batasan / Target (Non-Negotiable)                                                                                 | Cara Verifikasi                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **Layout Invariant** | Layout vertical 100% terkunci (Hero kiri sticky, Content scroll, Sidebar kanan sticky, Gradient mask atas-bawah). | Visual check & inspection                  |
| **Data Invariant**   | 0 perubahan data portfolio (foto, list project, URL, repo tetap).                                                 | `git diff src/utils/portfolio-data.ts` = 0 |
| **Type-Safety**      | 0 `any`, 0 `@ts-ignore`, 0 `@ts-expect-error`, strict mode aktif.                                                 | `bun run typechecks` (0 errors)            |
| **Lint Quality**     | 0 error, 0 warnings pada linter Oxlint.                                                                           | `bun run lint` (0 warnings/errors)         |
| **Scroll Parity**    | Perilaku & feel scroll Lenis wajib sama persis dengan Locomotive lama.                                            | Runtime browser check                      |
| **Text Scramble**    | Native `useTextScramble` wajib identik visualnya dengan Baffle.js lama.                                           | Runtime browser check                      |
| **Performance Bar**  | Lighthouse Core Web Vitals target: 90+ (Performance, Accessibility, Best Practices, SEO).                         | Lighthouse CLI / DevTools audit            |
| **Form Security**    | Validasi input sisi klien via Zod schema (nama, email valid, pesan).                                              | Zod schema validation tests                |

---

## 4. Global Rules (AGENTS.md) — Standar Kode

Setiap kode yang ditulis dalam project ini WAJIB mengikuti standar dari Global Rules (AGENTS.md). Berikut penerapan spesifiknya:

### 4.1 Arsitektur & Struktur

| Rule                       | Penerapan di Project Ini                                                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Separation of Concerns** | UI Components (`src/components/`), Business Logic (`src/hooks/`, `src/store/`), Data (`src/utils/`) — sudah diterapkan, tetap pertahankan |
| **Absolute Imports**       | Sudah pakai path aliases (`@components/`, `@modules/`, `@hooks/`, `@store/`, `@utils/`, `@styles/`, `@public/`) — tetap pertahankan       |
| **Modularitas**            | Komponen yang melebihi 150 baris dipecah (contoh: Hero sudah dipecah ke `hero-title.tsx`, `hero-images.tsx`, `hero-socials.tsx`)          |
| **Kolokasi**               | File terkait berdekatan (contoh: `contact.tsx` + `contact-form.tsx` dalam `contact-page/`)                                                |

### 4.2 TypeScript Strict

| Rule                        | Status Saat Ini                                              | Aksi                          |
| --------------------------- | ------------------------------------------------------------ | ----------------------------- |
| **Dilarang `any`**          | Ada 1 pelanggaran: `useCursorPosition.ts` line 11 (`e: any`) | FIX → ganti ke `PointerEvent` |
| **Functional programming**  | Sudah diterapkan, semua komponen function-based              | Pertahankan                   |
| **Immutability**            | Zustand store sudah immutable via `set()`                    | Pertahankan                   |
| **Early returns**           | Belum konsisten                                              | Terapkan di semua fungsi baru |
| **`interface` over `type`** | Sudah diterapkan (`IPortfolio`, `IClientSlice`, dll)         | Pertahankan                   |

### 4.3 Keamanan (OWASP)

| Rule                       | Penerapan                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Zero hardcoded secrets** | EmailJS credentials sudah di `process.env.NEXT_PUBLIC_*` — ✅                                                                          |
| **Input validation**       | Contact form menggunakan `react-hook-form` required validation. Bisa ditingkatkan dengan Zod schema validation                         |
| **Error handling**         | Contact form sudah ada try/catch + toast. Tapi `console.error` masih lolos di dev — sudah di-handle oleh `removeConsole` di production |

### 4.4 Perbaikan Konkret Berdasarkan Rules

#### Fix 1: Hapus `any` di `useCursorPosition.ts`

```typescript
// SEBELUM
const updateMousePosition = (e: any) => {

// SESUDAH
const updateMousePosition = (e: PointerEvent) => {
```

#### Fix 2: Tambah Zod validation di Contact Form

```typescript
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  from_name: z.string().min(1, 'Name is required').max(100),
  from_email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<ContactFormInputs>({
  resolver: zodResolver(contactSchema),
});
```

**Package baru yang ditambahkan:**

- `zod` — schema validation
- `@hookform/resolvers` — bridge antara Zod dan React Hook Form

#### Fix 3: Hapus `declare module 'baffle'` dari `types.d.ts`

Setelah migrasi ke native `useTextScramble`, deklarasi modul `baffle` tidak lagi diperlukan.

#### Fix 4: Perbaiki `InputForm` component naming

`InputForm` saat ini menggunakan `forwardRef` tanpa `displayName`. Tambahkan:

```typescript
InputForm.displayName = 'InputForm';
```

#### Fix 5: Server vs Client Component audit

Berdasarkan rules: "Jadikan Server Components sebagai default. Hanya tambahkan `'use client'` jika benar-benar membutuhkan interaktivitas."

| File                | `'use client'` | Diperlukan? | Alasan                                  |
| ------------------- | -------------- | ----------- | --------------------------------------- |
| `hero.tsx`          | Ya             | ✅ Ya       | `useEffect`, `useStore`                 |
| `page-wrapper.tsx`  | Ya             | ✅ Ya       | `useEffect` (Lenis), `motion`           |
| `custom-cursor.tsx` | Ya             | ✅ Ya       | `motion`, `useSpring`                   |
| `navigation.tsx`    | Ya             | ✅ Ya       | `useTheme`, `useEffect`, `useStore`     |
| `sidebar-link.tsx`  | Ya             | ✅ Ya       | `usePathname`                           |
| `scroll-top.tsx`    | Ya             | ✅ Ya       | `useState`, `useEffect`, event listener |
| `portfolio.tsx`     | Ya             | ✅ Ya       | `useStore`, onClick handler             |
| `contact-form.tsx`  | Ya             | ✅ Ya       | `useState`, `useForm`, event handler    |
| `modal.tsx`         | Ya             | ✅ Ya       | `useEffect`, `createPortal`, `useStore` |
| `about.tsx`         | Tidak          | ✅ Benar    | Murni static render                     |
| `skills.tsx`        | Tidak          | ✅ Benar    | Murni static render (NextImage + Link)  |
| `contact.tsx`       | Tidak          | ✅ Benar    | Murni static render                     |
| `footer.tsx`        | Tidak          | ✅ Benar    | Murni static render                     |

Semua penggunaan `'use client'` sudah tepat. Tidak ada yang perlu diubah.

---

## 5. Material You 3 — Strategi Penerapan

Material You 3 (M3) bukan berarti harus pakai Material Design Components library (MUI/Material Web). Yang kita ambil adalah **design language & principles**-nya, lalu diterapkan di atas Tailwind CSS yang sudah ada.

### Prinsip M3 yang Akan Diterapkan

#### 2.1 Dynamic Color (Tonal Palette)

- Satu **seed color** di-generate menjadi palet tonal (Primary, Secondary, Tertiary, Neutral, Error).
- Light mode dan dark mode punya mapping warna berbeda dari palet tonal yang sama.
- Ini menggantikan sistem warna hardcoded saat ini.

#### 2.2 Shape System

- M3 menggunakan rounded corners dengan skala konsisten: `0px` (none), `8px` (extra-small), `12px` (small), `16px` (medium), `28px` (large), `full` (extra-large).
- Saat ini komponen memakai `rounded` (4px) dan `rounded-sm` (2px) — terlalu kecil untuk M3. Akan di-upgrade ke skala M3.

#### 2.3 Elevation & Surface

- M3 menghilangkan box-shadow tradisional dan menggantinya dengan **tonal elevation** (surface color berubah opacity berdasarkan level elevasi).
- Portfolio cards saat ini pakai `shadow-[0.25rem_0.25rem_#24282C]` (brutalist offset shadow). Ini akan diganti ke **M3 surface tint elevation**.

#### 2.4 State Layers

- Hover, focus, pressed, dragged memiliki opacity overlay yang konsisten.
- Hover: 8% opacity overlay, Focused: 10%, Pressed: 10%, Dragged: 16%.

#### 2.5 Motion

- M3 menggunakan **emphasized easing** (`cubic-bezier(0.2, 0, 0, 1)`) untuk masuk dan `cubic-bezier(0.2, 0, 0, 1)` untuk keluar.
- Duration: small (150ms), medium (300ms), large (500ms).
- Framer Motion transition configs akan disesuaikan ke easing M3.

#### 2.6 Typography Scale

- M3 punya 5 roles: Display, Headline, Title, Body, Label — masing-masing 3 sizes (Large, Medium, Small).
- Kita map ini ke Tailwind utility classes.

---

## 6. Color System — Seed Color & Dynamic Palette

### Seed Color

Menggunakan warna dasar yang sudah ada sebagai fondasi, lalu di-generate ke palet M3.

**Seed color yang diusulkan:** `#D3F36A` (custom-green saat ini)

Dari seed ini, kita generate palet tonal M3:

### Light Mode Palette

| Token M3                  | Tailwind Token              | Hex (Perkiraan) | Penggunaan                                      |
| ------------------------- | --------------------------- | --------------- | ----------------------------------------------- |
| Primary                   | `primary`                   | `#3E6A00`       | Tombol utama, link aktif, accent                |
| On Primary                | `on-primary`                | `#FFFFFF`       | Teks di atas primary                            |
| Primary Container         | `primary-container`         | `#B8F54E`       | Background chip, badge, highlight               |
| On Primary Container      | `on-primary-container`      | `#102000`       | Teks di atas primary container                  |
| Secondary                 | `secondary`                 | `#57624A`       | Elemen pendukung                                |
| On Secondary              | `on-secondary`              | `#FFFFFF`       | Teks di atas secondary                          |
| Secondary Container       | `secondary-container`       | `#DBE7C8`       | Card background secondary                       |
| On Secondary Container    | `on-secondary-container`    | `#151E0B`       | Teks di card secondary                          |
| Tertiary                  | `tertiary`                  | `#386664`       | Aksen ketiga                                    |
| Tertiary Container        | `tertiary-container`        | `#BBECE9`       | Background aksen ketiga                         |
| Surface                   | `surface`                   | `#F9FAF0`       | Background halaman (pengganti `custom-white-2`) |
| On Surface                | `on-surface`                | `#1A1C17`       | Teks utama (pengganti `custom-black`)           |
| Surface Container         | `surface-container`         | `#EDEEE4`       | Card/container background                       |
| Surface Container High    | `surface-container-high`    | `#E7E8DF`       | Elevated card                                   |
| Surface Container Highest | `surface-container-highest` | `#E1E3D9`       | Highest elevation surface                       |
| Outline                   | `outline`                   | `#74796D`       | Border, divider                                 |
| Outline Variant           | `outline-variant`           | `#C4C8BA`       | Subtle border                                   |
| Error                     | `error`                     | `#BA1A1A`       | Error state                                     |
| On Error                  | `on-error`                  | `#FFFFFF`       | Teks di error                                   |

### Dark Mode Palette

| Token M3               | Tailwind Token           | Hex (Perkiraan) | Penggunaan                                    |
| ---------------------- | ------------------------ | --------------- | --------------------------------------------- |
| Primary                | `primary`                | `#9DD835`       | Tombol utama, link aktif                      |
| On Primary             | `on-primary`             | `#1D3700`       | Teks di atas primary                          |
| Primary Container      | `primary-container`      | `#2D5000`       | Background container primary                  |
| On Primary Container   | `on-primary-container`   | `#B8F54E`       | Teks di container primary                     |
| Secondary              | `secondary`              | `#BFCBAD`       | Elemen pendukung                              |
| Secondary Container    | `secondary-container`    | `#404A34`       | Container secondary                           |
| Surface                | `surface`                | `#12140E`       | Background halaman (pengganti `custom-black`) |
| On Surface             | `on-surface`             | `#E1E3D9`       | Teks utama                                    |
| Surface Container      | `surface-container`      | `#1E201A`       | Card background                               |
| Surface Container High | `surface-container-high` | `#282B24`       | Elevated card                                 |
| Outline                | `outline`                | `#8E9386`       | Border                                        |
| Outline Variant        | `outline-variant`        | `#44483E`       | Subtle border                                 |

> **Catatan:** Warna hex di atas adalah perkiraan. Saat implementasi, kita akan pakai **@material/material-color-utilities** (library resmi Google, zero runtime, hanya dipakai saat build/generate) untuk generate palet yang akurat dari seed `#D3F36A`. Hasilnya di-hardcode ke Tailwind config, BUKAN runtime dynamic.

### Mapping Warna Lama → Baru

| Lama                       | Baru                                           | Keterangan                      |
| -------------------------- | ---------------------------------------------- | ------------------------------- |
| `custom-black (#24282C)`   | `on-surface` (light) / `surface` (dark)        | Tone tetap gelap, tapi lebih M3 |
| `custom-white-2 (#EAE9E2)` | `surface`                                      | Background utama                |
| `custom-white (#fbfbf8)`   | `surface-container-lowest`                     | Card background paling terang   |
| `custom-green (#D3F36A)`   | `primary-container` (light) / `primary` (dark) | Accent tetap hijau-lime         |
| `custom-blue (#CDDFE3)`    | `tertiary-container`                           | Jika dipakai nanti              |

---

## 7. Typography — Font Migration

### Dari

- **Body:** Kata Grotesk (local woff2)
- **Heading:** Neutral Face (local woff2)

### Ke

- **Body:** **Google Sans Flex** (fallback: Google Sans Text)
- **Heading:** **Google Sans Flex** (fallback: Google Sans Text)

### Opsi yang Direkomendasikan

**Keputusan Final: Full M3 Expressive — Google Sans Flex**

- Body: `Google Sans Flex` (fallback ke `Google Sans Text` jika font tidak termuat)
- Heading: `Google Sans Flex` (fallback ke `Google Sans Text`)
- Keduanya variable font, support optical sizing, weight, width, slant, grade, dan roundness axes.

### M3 Type Scale Mapping ke Tailwind

```
Display Large   → text-[57px] leading-[64px] tracking-[-0.25px]
Display Medium  → text-[45px] leading-[52px]
Display Small   → text-[36px] leading-[44px]
Headline Large  → text-[32px] leading-[40px]
Headline Medium → text-[28px] leading-[36px]
Headline Small  → text-[24px] leading-[32px]
Title Large     → text-[22px] leading-[28px]
Title Medium    → text-[16px] leading-[24px] tracking-[0.15px] font-medium
Title Small     → text-[14px] leading-[20px] tracking-[0.1px] font-medium
Body Large      → text-[16px] leading-[24px] tracking-[0.5px]
Body Medium     → text-[14px] leading-[20px] tracking-[0.25px]
Body Small      → text-[12px] leading-[16px] tracking-[0.4px]
Label Large     → text-[14px] leading-[20px] tracking-[0.1px] font-medium
Label Medium    → text-[12px] leading-[16px] tracking-[0.5px] font-medium
Label Small     → text-[11px] leading-[16px] tracking-[0.5px] font-medium
```

---

## 8. Komponen per Komponen — Rencana Perubahan

### 8.1 Navigation (`src/components/navigation/navigation.tsx`)

**Saat ini:**

- Logo "HTMA" dalam kotak `bg-custom-black` dengan teks `text-custom-green`
- Theme toggle pakai ikon `MdGraphicEq` (equalizer) yang dirotasi
- Grid-12 layout

**Perubahan M3:**

- Logo background → `primary-container` dengan teks `on-primary-container`
- Border radius logo → `rounded-xl` (12px, M3 small shape)
- Theme toggle → Ganti ke ikon **Sun/Moon** (`MdLightMode` / `MdDarkMode` dari `react-icons/md`)
- Navigation bar background: **solid `bg-surface`** (tanpa backdrop-blur)
- Gradient mask atas (`mask-top`) tetap dipertahankan, tapi background-nya ikut warna `surface` baru

**Yang TIDAK berubah:**

- Posisi fixed top
- Grid-12 layout
- Posisi logo (col-start-1) dan theme toggle (col-start-12)

---

### 8.2 Hero Section (`src/components/hero/`)

**Saat ini:**

- Sticky, full height, grid column kiri
- Title: "hello, I'm" → "hutama" (dengan baffle scramble) → "--web developer"
- Images: 2 SVG illustrations (Chubbs1, Chubbs2) — desktop only
- Socials: GitHub link dengan icon

**Perubahan M3:**

- Title text color → `on-surface` (light) / `primary` (dark)
- Badge "--web developer" → M3 **Assist Chip** style: `rounded-lg bg-primary-container text-on-primary-container px-3 py-1`
- Social buttons → M3 **Tonal Button** style: `rounded-full bg-secondary-container text-on-secondary-container` dengan hover state layer 8%
- SVG illustrations warna ikut `on-surface` / `primary`

**Yang TIDAK berubah:**

- Sticky behavior
- Grid position
- Baffle scramble effect (tetap ada, akan di-rewrite native — lihat bagian 6)
- Rotate -90° pada mobile
- Animasi Framer Motion (fade + slide)

---

### 8.3 About Section (`src/modules/home-page/about.tsx`)

**Saat ini:**

- Section header: arrow icon + "about" text, hover effect mengubah background
- 2 paragraf deskripsi
- Border top & bottom sebagai separator

**Perubahan M3:**

- Section header → M3 style: icon warna `primary`, teks warna `on-surface`
- Hover effect → M3 state layer: `hover:bg-primary/8` (8% opacity overlay)
- Border separator → `border-outline-variant` (lebih subtle, M3 guideline)
- Highlighted name "Hutama" → `bg-primary-container text-on-primary-container rounded-md px-1.5 py-0.5`
- Paragraf teks → `text-on-surface` dengan `Body Large` type scale

**Yang TIDAK berubah:**

- Konten teks (2 paragraf)
- Posisi dan flow dalam layout

---

### 8.4 Skills Section (`src/modules/home-page/skills.tsx`)

**Saat ini:**

- Section header sama seperti About (arrow + "skills")
- 2 grup: "Main" (6 icons) dan "Library & Framework" (11 icons)
- Grid 4 cols (mobile) / 8 cols (desktop)
- Skill icons sebagai `<img>` via NextImage

**Perubahan M3:**

- Section header → sama seperti About (M3 state layer)
- Skill icon containers → M3 **Surface Container** style:
  - `bg-surface-container rounded-xl p-2` (M3 medium shape)
  - Hover: `hover:bg-surface-container-high` + subtle scale `hover:scale-105`
  - Transisi smooth 200ms
- Subheading "Main" / "Library & Framework" → M3 `Title Medium` type scale, warna `on-surface-variant`
- Border separator → `border-outline-variant`

**Yang TIDAK berubah:**

- Daftar skill icons dan link-nya
- Grid layout (4 cols mobile, 8 cols desktop)
- Urutan tampilan

---

### 8.5 Portfolio Section (`src/modules/home-page/portfolio.tsx`)

**Saat ini:**

- Section header sama (arrow + "my portfolio")
- Grid layout bento-style dengan posisi hardcoded per index (md:col-start/end, md:row-start/end)
- Card style: brutalist offset shadow (`shadow-[0.25rem_0.25rem_#24282C]`)
- Card bottom bar: title + arrow icon, `bg-custom-white` / `bg-custom-green`
- Click → modal via Zustand + Portal

**Perubahan M3:**

- Card style → M3 **Filled Card** / **Elevated Card**:
  - Hapus brutalist offset shadow
  - Ganti ke: `bg-surface-container rounded-2xl overflow-hidden` (M3 large shape: 28px)
  - Elevation via `shadow-md` atau M3 tonal surface tint
  - Hover: `hover:shadow-lg hover:scale-[1.02]` + state layer 8%
  - Active/pressed: `active:scale-[0.98]` (bukan translate shadow trick)
- Card bottom overlay → `bg-surface/90 backdrop-blur-sm` dengan `rounded-xl m-2 p-3`
- Arrow icon → M3 **Icon Button** style: `bg-primary text-on-primary rounded-full p-1`
- GitHub link di bawah → teks `on-surface-variant`, link `primary`
- Border separator → `border-outline-variant`

**Yang TIDAK berubah:**

- 7 portfolio items (data, foto, judul, URL, repo — semua TETAP)
- Grid bento layout positions
- Click → modal behavior
- Modal portal system

---

### 8.6 Modal (`src/components/ui/modal/`)

**Saat ini:**

- Portal ke 3 target div: `modal-card`, `modal-backdrop`, `modal-close`
- Modal card, backdrop, close button (perlu baca detail implementasi)

**Perubahan M3:**

- Modal → M3 **Dialog** / **Bottom Sheet** style:
  - `bg-surface-container-high rounded-[28px]` (M3 extra large shape)
  - Padding: `p-6`
  - Backdrop: `bg-on-surface/32` (M3 scrim: 32% opacity)
  - Close button: M3 icon button `rounded-full`
- Animasi: scale dari 0.9 → 1 dengan M3 emphasized easing

**Yang TIDAK berubah:**

- Portal system (3 div targets)
- Zustand state management (`isModalShow`, `portfolioData`)
- Konten modal (gambar portfolio, judul, link)

---

### 8.7 Sidebar (`src/components/sidebar/`)

**Saat ini:**

- Sticky, col-12 (kanan), full height
- Navigation links (home, contact) — rotated 90°
- Active link: `bg-custom-black text-custom-green` / sebaliknya
- Scroll-to-top button di bawah
- Desktop sidebar punya `bg-custom-black` rounded-t-full

**Perubahan M3:**

- Sidebar background → M3 **Navigation Rail** style:
  - `bg-surface` dengan `border-l border-outline-variant` (atau tanpa border, cukup elevation)
  - `rounded-t-full` → `rounded-t-[28px]` (M3 large shape) pada desktop
- Active link → M3 **Active Indicator**: `bg-primary-container text-on-primary-container rounded-full px-4`
- Inactive link → `text-on-surface-variant`
- Scroll-to-top button → M3 **FAB (Small)**: `bg-primary-container text-on-primary-container rounded-xl`

**Yang TIDAK berubah:**

- Sticky behavior
- Link items (home, contact)
- Rotated 90° text
- Scroll-to-top functionality

---

### 8.8 Footer (`src/components/footer/footer.tsx`)

**Saat ini:**

- Simple text: "© Created with 🧠 by htma, {year}"
- Teks `text-custom-black` / `text-custom-green`

**Perubahan M3:**

- Teks → `text-on-surface-variant` (subtle, secondary importance)
- Icon brain → warna `tertiary` (M3 tertiary role untuk decorative elements)
- Mungkin tambah subtle `border-t border-outline-variant` di atas footer

**Yang TIDAK berubah:**

- Konten dan posisi

---

### 8.9 Custom Cursor (`src/components/ui/custom-cursor.tsx`)

**Saat ini:**

- `motion.div` dengan `useSpring` (damping: 30, stiffness: 700)
- CSS class `.cursor`: fixed, 24x24px, rounded-full, `bg-custom-white-2 mix-blend-difference` / `bg-custom-green`
- Hidden pada mobile (w-0, h-0 pada max-width 768px)
- Hook `useCursorPosition`: `mousemove` event listener → `useMotionValue`

**Rencana Improve Performance:**

1. **Ganti `mousemove` ke `pointermove`:** Lebih modern, support touch + mouse.
2. **Tambah `{ passive: true }` pada event listener:** Menghindari blocking main thread.
3. **Gunakan `requestAnimationFrame` throttle:** Saat ini setiap pixel movement trigger state update. Batasi ke 60fps max.
4. **Tipe TypeScript perbaikan:** Ganti `any` di `updateMousePosition` ke `PointerEvent`.
5. **Warna cursor:** `bg-surface` / `bg-primary` dengan `mix-blend-difference` tetap dipertahankan.

**Yang TIDAK berubah:**

- Visual appearance (circle, mix-blend-difference)
- Spring physics (damping: 30, stiffness: 700)
- Hidden pada mobile
- Framer Motion sebagai engine

---

### 8.10 Gradient Masks (Layout)

**Saat ini:**

- Top mask: fixed, z-1030, 8% height, `bg-custom-white-2` / `bg-custom-black`
- Bottom mask: fixed, z-1050, 8% height
- CSS: `mask-image: linear-gradient(to bottom/top, #000 0%, transparent 100%)`

**Perubahan M3:**

- Background → `bg-surface` (light) / `bg-surface` (dark)
- Mask gradient tetap sama (efek fade in/out)

**Yang TIDAK berubah:**

- Seluruh behavior dan posisi

---

## 9. Package Update & Penghapusan

### 9.1 Package yang Dihapus

#### `locomotive-scroll` (5.0.0-beta.21) → HAPUS

**Alasan:**

- Masih beta, bundle size ~45KB gzipped
- Hanya dipakai di `page-wrapper.tsx` untuk smooth scroll (Lenis wrapper)
- Locomotive Scroll 5 pada dasarnya hanyalah wrapper di atas Lenis

**Pengganti:** Install **`lenis`** langsung (library yang dipakai di balik Locomotive Scroll)

- Bundle size: ~12KB gzipped (3.7x lebih kecil)
- API sama persis: `new Lenis({ lerp: 0.06, smoothWheel: true })`
- Hasil scroll behavior **100% identik** karena Locomotive Scroll v5 beta hanyalah wrapper Lenis

**Perubahan kode `page-wrapper.tsx`:**

```typescript
// SEBELUM
const LocomotiveScroll = (await import('locomotive-scroll')).default;
const _locomotiveScroll = new LocomotiveScroll({
  lenisOptions: { lerp: 0.06, smoothWheel: true },
});

// SESUDAH
const Lenis = (await import('lenis')).default;
const lenis = new Lenis({ lerp: 0.06, smoothWheel: true });
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

#### `baffle` (0.3.6) → HAPUS

**Alasan:**

- Tidak di-maintain (last update 2017)
- Tidak ada TypeScript types (butuh `declare module 'baffle'` di `types.d.ts`)
- Bundle size kecil tapi unnecessary dependency untuk efek sederhana

**Pengganti:** Custom hook `useTextScramble` (native implementation)

- Hasil visual **100% identik**: karakter scramble → reveal per karakter
- Konfigurasi sama: characters set, speed, reveal duration
- Zero dependency, fully typed

**Implementasi native `useTextScramble`:**

```typescript
// src/hooks/useTextScramble.ts
import { useCallback, useRef } from 'react';

interface TextScrambleOptions {
  characters?: string;
  speed?: number; // interval ms per frame
  revealDuration?: number; // total reveal time ms
  revealDelay?: number; // delay per character reveal ms
}

export default function useTextScramble(selector: string) {
  const frameRef = useRef<ReturnType<typeof setInterval>>();

  const scramble = useCallback(
    (options: TextScrambleOptions = {}) => {
      const {
        characters = 'xxxxxxxxxxxx',
        speed = 100,
        revealDuration = 1000,
        revealDelay = 100,
      } = options;

      const elements = document.querySelectorAll(selector);

      elements.forEach((el) => {
        const originalText = el.textContent ?? '';
        const chars = characters.split('');
        let revealedCount = 0;

        // Scramble phase
        frameRef.current = setInterval(() => {
          const scrambled = originalText
            .split('')
            .map((char, i) => {
              if (i < revealedCount) return originalText[i];
              if (char === ' ') return ' ';
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
          el.textContent = scrambled;
        }, speed);

        // Reveal phase — progressively reveal characters
        const revealInterval = setInterval(() => {
          revealedCount++;
          if (revealedCount >= originalText.length) {
            clearInterval(revealInterval);
            clearInterval(frameRef.current);
            el.textContent = originalText;
          }
        }, revealDelay);

        // Safety cleanup after total duration
        setTimeout(
          () => {
            clearInterval(frameRef.current);
            clearInterval(revealInterval);
            el.textContent = originalText;
          },
          revealDuration + revealDelay * originalText.length
        );
      });
    },
    [selector]
  );

  return { scramble };
}
```

**Perubahan di `hero.tsx`:**

```typescript
// SEBELUM
import useBaffle from '@hooks/useBaffle';
const { newBaffle } = useBaffle('.nameBaffle');
newBaffle();

// SESUDAH
import useTextScramble from '@hooks/useTextScramble';
const { scramble } = useTextScramble('.nameBaffle');
scramble({
  characters: 'xxxxxxxxxxxx',
  speed: 100,
  revealDuration: 1000,
  revealDelay: 100,
});
```

### 9.2 Package yang Di-update

| Package              | Dari    | Ke                                | Alasan                                                             |
| -------------------- | ------- | --------------------------------- | ------------------------------------------------------------------ |
| `next`               | 14.2.30 | 15.x (latest)                     | Turbopack stable, React 19, improved caching                       |
| `react`              | 18.3.1  | 19.x                              | Concurrent features, `use()` hook, form actions                    |
| `react-dom`          | 18.3.1  | 19.x                              | Pair with React 19                                                 |
| `framer-motion`      | 10.18.0 | 12.x (latest, rebranded `motion`) | Performance improvements, smaller bundle, breaking changes minimal |
| `tailwindcss`        | 3.4.13  | 4.x                               | CSS-first config, lebih cepat, native CSS cascade layers           |
| `typescript`         | 5.2.2   | 5.8.x (latest)                    | Better type inference, performance                                 |
| `eslint`             | 8.57.1  | 9.x                               | Flat config, better rules                                          |
| `eslint-config-next` | 14.2.13 | 15.x                              | Pair with Next.js 15                                               |
| `zustand`            | 4.5.7   | 5.x (jika stable) atau tetap 4.x  | Cek kompatibilitas                                                 |
| `@types/react`       | 18.3.9  | 19.x                              | Pair with React 19                                                 |
| `@types/react-dom`   | 18.3.0  | 19.x                              | Pair with React 19                                                 |

**Package manager migration:**

| Dari                    | Ke                | Aksi                                      |
| ----------------------- | ----------------- | ----------------------------------------- |
| `pnpm` (pnpm-lock.yaml) | `bun` (bun.lockb) | Hapus `pnpm-lock.yaml`, run `bun install` |

### 9.3 Package Baru yang Ditambahkan

| Package                              | Alasan                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| `lenis`                              | Pengganti `locomotive-scroll`, smooth scroll, 3.7x lebih kecil                  |
| `@material/material-color-utilities` | Generate M3 tonal palette dari seed color (devDependency, hasilnya di-hardcode) |
| `zod`                                | Schema validation untuk contact form (rules: validasi input end-to-end)         |
| `@hookform/resolvers`                | Bridge Zod ↔ React Hook Form                                                    |
| `oxlint`                             | Linter Rust-based super cepat, config recommended untuk T Stack                 |

### 9.4 Package yang Dihapus (Migrasi ke Oxlint)

| Package                            | Alasan Hapus                                 |
| ---------------------------------- | -------------------------------------------- |
| `eslint`                           | Diganti Oxlint                               |
| `eslint-config-next`               | Diganti Oxlint nextjs plugin                 |
| `eslint-plugin-simple-import-sort` | Diselesaikan via Prettier plugins jika perlu |
| `eslint-plugin-unused-imports`     | Oxlint punya rule untuk block unused imports |
| `@typescript-eslint/eslint-plugin` | Oxlint native support TS semantic rules      |
| `@typescript-eslint/parser`        | Oxlint native parse TypeScript               |

### 9.5 Package yang Tetap

| Package             | Alasan Tetap                    |
| ------------------- | ------------------------------- |
| `clsx`              | Ringan, utility, banyak dipakai |
| `react-hook-form`   | Form handling, no issue         |
| `@emailjs/browser`  | Email service, no issue         |
| `react-hot-toast`   | Toast notification, no issue    |
| `react-icons`       | Icon library, no issue          |
| `next-themes`       | Theme switching, no issue       |
| `@vercel/analytics` | Analytics, no issue             |
| `sharp`             | Image optimization, no issue    |

---

## 10. Performance Improvements

### 10.1 Custom Cursor Optimization

(Sudah dijabarkan di bagian 5.9)

- `pointermove` + `{ passive: true }`
- `requestAnimationFrame` throttle
- Fix TypeScript `any` → `PointerEvent`

### 10.2 Locomotive Scroll → Lenis

(Sudah dijabarkan di bagian 6.1)

- Bundle size reduction: ~45KB → ~12KB (gzipped)
- Smooth scroll behavior 100% identik

### 10.3 Baffle → Native useTextScramble

(Sudah dijabarkan di bagian 6.1)

- Hapus dependency, zero bundle cost

### 10.4 Oxlint Runtime Performance

- **Execution Speed:** Oxlint bisa me-lint project berukuran sedang dalam satuan millisecond ketimbang detik pada ESLint. 50-100x speedup.
- **Immediate Feedback:** Memberikan DX yang superior tanpa harus blocking terminal.

### 10.5 Bun Runtime Performance

- **Cold start:** Bun cold start ~2x lebih cepat dari Node.js
- **Dev server:** `next dev --turbopack` + Bun runtime = dev startup yang sangat cepat
- **Install time:** `bun install` vs `pnpm install` = 10-25x lebih cepat
- **Script execution:** `bun run <script>` startup overhead ~0ms vs Node.js ~150ms

### 10.5 Next.js 15 Performance Gains

- **Turbopack** (stable di Next 15): Dev server startup 10x lebih cepat
- **Partial Prerendering** (experimental): Hybrid static + dynamic rendering
- **Improved Image Optimization**: Better caching, smaller payloads

### 10.6 Tailwind CSS v4 Performance

- **Oxide engine**: Build time 2-5x lebih cepat
- **Native CSS cascade layers**: Lebih predictable specificity
- **Lightning CSS** built-in: Lebih cepat dari PostCSS

### 10.7 Framer Motion → Motion (v12)

- Rebranded ke `motion` (dari `framer-motion`)
- Tree-shaking yang lebih baik
- Bundle size ~30% lebih kecil

### 10.8 React 19 Performance

- **Automatic batching** improvements
- **`use()` hook**: Suspend pada promise, bisa mengganti beberapa `useEffect` patterns
- **Server Components by default**: Mengurangi client-side JS

### 10.9 Scroll-to-Top Button (`scroll-top.tsx`)

- Saat ini pakai `window.addEventListener('scroll', handleScroll)` tanpa throttle
- Fix: Tambah `passive: true` dan `requestAnimationFrame` throttle (atau gunakan `IntersectionObserver` sebagai trigger visibility)

---

## 11. Halaman Contact — Rencana Update

### Saat Ini

- Section header (arrow + "contact")
- Subtitle text
- Form: Name, Email (2 cols), Subject, Message (textarea)
- Send button
- Toast notifications via `react-hot-toast`

### Perubahan M3

#### 11.1 Form Fields → M3 Text Fields

- Saat ini: `border-b-2` underlined input (mirip M2 actually)
- M3: **Outlined Text Field** → `border border-outline rounded-xs` dengan floating label
- Atau **Filled Text Field** → `bg-surface-container-highest rounded-t-xs border-b-2 border-primary`
- **Recommended: Filled Text Field** (lebih cocok dengan estetika M3, lebih mudah diimplementasi tanpa library)

#### 11.2 Send Button → M3 Filled Button

- `bg-primary text-on-primary rounded-full px-6 py-3`
- Disabled: `bg-on-surface/12 text-on-surface/38`
- Hover state layer: `hover:bg-primary/92` (shadow + tint)
- Loading: Spinner di dalam button (bukan text "Sending...")

#### 11.3 Input Labels

- `text-on-surface-variant` (M3 label color)
- `Label Large` type scale

#### 11.4 Error States

- Input border → `border-error` saat invalid
- Error message di bawah input → `text-error` `Body Small`

#### 11.5 Zod Validation Integration

Sesuai Global Rules (validasi input end-to-end), contact form akan diperkuat dengan Zod schema validation (lihat bagian 4.4 Fix 2). Ini menambahkan:

- Validasi format email yang lebih ketat
- Max length per field (mencegah abuse)
- Error messages yang informatif per field
- Type-safe form data (inferred dari Zod schema)

#### 11.6 Section Header & Subtitle

- Sama seperti section lain (M3 state layer hover)
- Subtitle → `text-on-surface-variant` `Body Large`

---

## 12. SEO & Metadata

### Saat Ini

- Minimal: `title: 'htma'`, `description: 'hutama portfolio website'`
- Tidak ada Open Graph, Twitter Card, structured data

### Rencana Upgrade

1. **Root Layout metadata:**
   - `metadataBase` URL
   - `title.template`: `'%s | Hutama — Web Developer'`
   - `title.default`: `'Hutama — Web Developer'`
   - `description` yang lebih deskriptif
   - `openGraph` configuration (title, description, images, type)
   - `twitter` card configuration
   - `robots` configuration

2. **Per-page metadata:**
   - Home: Focus on portfolio showcase keywords
   - Contact: "Get in touch with Hutama"

3. **Structured Data (JSON-LD):**
   - `Person` schema untuk personal branding
   - `WebSite` schema

4. **`sitemap.ts`:** Auto-generate sitemap
5. **`robots.ts`:** Proper robots configuration
6. **Favicon update:** Jika diperlukan, ganti ke SVG favicon yang support dark mode

---

## 13. Urutan Eksekusi (Roadmap & Slices)

Setiap fase dipandu oleh **Lead Skill** dari _Agent Skills Suite_ dan dieksekusi dalam _thin vertical slices_ yang terverifikasi sebelum commit.

### Phase 0 — Runtime Migration (Paling Pertama) — ✅ SELESAI

- **Status**: Selesai (Commit `71eceea`, snapshot branch `feat/migrate-bun`).
- **Hasil**: Hapus pnpm artifacts, `bun.lock` ter-generate, script package.json & husky hooks dimigrasi ke Bun. Typecheck & build lulus 100%.

---

### Phase 1 — Foundation (Dependencies, Tooling & Design Tokens)

- **Lead Skill**: `source-driven-development` + `incremental-implementation`
- **Objective**: Membangun fondasi runtime, linter, css tokens, dan font tanpa merusak compile.

- **Slice 1.1 — Package Upgrade & Peer Resolution (Mitigasi)**:
  - Action:
    - Upgrade core: Next.js 15, React 19, `motion@^12`, `lenis`, `zod`, `@hookform/resolvers`, `@material/material-color-utilities`.
    - Upgrade pendukung (hasil double-check): `next-themes@^0.4.4` (peer React 19 support) & `zustand@^5.0.0` (concurrent safe).
    - Hapus `baffle` dari dependencies.
    - **PENTING (Mitigasi)**: JANGAN hapus `locomotive-scroll` di Phase 1 ini agar `src/components/ui/page-wrapper.tsx` tidak langsung crash saat dev/build. `locomotive-scroll` baru dicabut di Slice 2.1 setelah Lenis aktif.
  - Verifikasi: `bun install` berhasil 0 peer conflicts, dry-run compile pass.
- **Slice 1.2 — Tooling Overhaul (Oxlint & Lefthook)**:
  - Action: Setup `oxlint.json`, hapus artifacts ESLint (`.eslintrc.js`, `.eslintignore`, paket eslint). Setup `next.config.ts` dengan `eslint: { ignoreDuringBuilds: true }`. Setup `lefthook.yml` (ganti Husky).
  - Verifikasi: `bun run lint` (Oxlint) berjalan 0 warnings/errors, `bun run typechecks` lulus.
- **Slice 1.3 — M3 Expressive Palette & Backward-Compatible Aliases**:
  - Action:
    - Tulis CSS variables M3 resmi dari seed `#D3F36A` ke `src/styles/globals.css`.
    - **PENTING (Mitigasi Tailwind v4)**: Sediakan alias token lama di `@theme` (`--color-custom-black`, `--color-custom-green`, `--color-custom-white`) yang memetakan ke token M3 baru agar 51 file komponen tidak langsung _broken styling_ sebelum giliran refactor di Phase 3.
  - Verifikasi: Token CSS terdaftar dan style lama tetap render dengan palet M3 baru.
- **Slice 1.4 — Typography Setup**:
  - Action: Setup Google Sans Flex variable font (6 variable axes). Hapus file font lama (Kata Grotesk & Neutral Face).
  - Verifikasi: `bun run build` sukses, font ter-load.

---

### Phase 2 — Core Components & Mechanics

- **Lead Skill**: `doubt-driven-development` + `frontend-ui-engineering`
- **Objective**: Mengganti engine scroll, text scramble, dan cursor dengan performa tinggi & hasil visual identik.

- **Slice 2.1 — Lenis Smooth Scroll & Locomotive Cleanup**:
  - Action: Implementasi Lenis di `src/components/page-wrapper.tsx`. Setelah Lenis terbukti bekerja identik, hapus `locomotive-scroll` dari `package.json` dan jalankan `bun install`.
  - Verifikasi: Parity check visual & feel scroll identik 100% dengan sebelumnya. Tidak ada crash runtime.
- **Slice 2.2 — Native Text Scramble Hook**:
  - Action: Buat `src/hooks/useTextScramble.ts` (native rAF) menggantikan Baffle.js.
  - Verifikasi: Efek decoding scramble identik visualnya dengan Baffle.js.
- **Slice 2.3 — Cursor Optimization**:
  - Action: Refactor `src/hooks/useCursorPosition.ts` (pointermove, passive listener, rAF throttle, hapus `any`).
  - Verifikasi: Performa 60fps tanpa frame drop, type-safe.
- **Slice 2.4 — Layout & Navigation**:
  - Action: Update `src/components/layout-wrapper.tsx` & `src/components/navigation.tsx` (solid `bg-surface`, Sun/Moon icon toggle).
  - Verifikasi: Toggle theme smooth, layout vertical tetap terkunci.

---

### Phase 3 — Sections (Home Page)

- **Lead Skill**: `frontend-ui-engineering`
- **Objective**: Transformasi visual ke Material 3 Expressive (Shape, Size contrast, Containment, Elevation).

- **Slice 3.1 — Hero Section**: M3 typography hierarchy & layout alignment.
- **Slice 3.2 — About Section**: M3 section header & surface card containment.
- **Slice 3.3 — Skills Section**: M3 expressive chips/cards dengan state layers (hover/focus).
- **Slice 3.4 — Portfolio Section & Modal**: Elevated cards (hapus brutalist offset shadow), dialog modal M3.
- **Slice 3.5 — Sidebar & Footer**: Navigation rail M3 & footer alignment.
- Verifikasi: `bun run build` sukses, visual responsive di desktop & mobile.

---

### Phase 4 — Contact Page

- **Lead Skill**: `frontend-ui-engineering` + `security-and-hardening`
- **Objective**: Redesain form kontak dengan text field M3 Expressive & validasi Zod schema yang aman.

- **Slice 4.1 — Zod Schema & Validation**: Skema Zod untuk nama, email, subjek, pesan.
- **Slice 4.2 — M3 Text Fields & UI**: Input form dengan floating label/indicator, state error tersanitasi, animasi submit.
- Verifikasi: Pengujian input invalid, email salah format, submit loading state.

---

### Phase 5 — Polish, SEO & Launch

- **Lead Skill**: `performance-optimization` + `shipping-and-launch`
- **Objective**: Validasi akhir, SEO, aksesibilitas, dan audit Lighthouse.

- **Slice 5.1 — Metadata & SEO**: OpenGraph, Twitter card, JSON-LD (`Person`, `WebSite`), `sitemap.ts`, `robots.ts`.
- **Slice 5.2 — Audit Kualitas**: Audit Lighthouse (target 90+ semua metrik: Performance, Accessibility, Best Practices, SEO).
- **Slice 5.3 — Cross-Browser & Final Build**: Uji di browser Chromium (Helium on CachyOS), final `bun run build` & `bun run lint` zero errors/warnings.

---

## 14. Pertanyaan Terbuka — ✅ SEMUA TERJAWAB

Semua pertanyaan sudah dijawab dan dikonfirmasi (2026-09-03):

| #   | Pertanyaan                | Jawaban Final                                                                                                                         |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Font choice**           | Full M3 Expressive — **Google Sans Flex** (variable font) untuk body & heading. Hapus Kata Grotesk & Neutral Face                     |
| 2   | **Portfolio card style**  | Full M3 Expressive elevated card — hapus brutalist offset shadow                                                                      |
| 3   | **Theme toggle icon**     | Ganti ke **Sun/Moon** (`MdLightMode` / `MdDarkMode`). Hapus `MdGraphicEq`                                                             |
| 4   | **Navbar backdrop blur**  | **Tetap solid background** (`bg-surface`), tanpa `backdrop-blur`                                                                      |
| 5   | **M3 color palette**      | Generate ulang pakai `@material/material-color-utilities` untuk nilai akurat. Estimasi di DESIGN.md akan di-replace saat implementasi |
| 6   | **Tailwind v4**           | ✅ Konfirmasi lanjut — migrasi config JS → CSS-based `@theme`                                                                         |
| 7   | **Motion v12**            | ✅ Konfirmasi lanjut — `framer-motion` → `motion`                                                                                     |
| 8   | **React 19 + Next.js 15** | ✅ Siap — terima potensi breaking changes                                                                                             |
| 9   | **Bun lockfile**          | **Commit `bun.lockb`** ke git (reproducible builds)                                                                                   |
| 10  | **Monorepo**              | **Tetap single app** — tidak convert ke Turborepo                                                                                     |
| 11  | **Git hooks**             | **Migrasi ke Lefthook** (ganti Husky) — menjalankan `oxlint` + `prettier --check` di pre-commit                                       |

---

> **Catatan Akhir:** Dokumen ini adalah living document. Setiap fase akan di-review bersama sebelum eksekusi. Tidak ada perubahan yang dilakukan tanpa konfirmasi. Semua kode mengikuti standar Global Rules (AGENTS.md): strict TypeScript, no `any`, functional programming, immutability, early returns, validasi input end-to-end, zero hardcoded secrets. Linter sepenuhnya dimigrasi menggunakan Oxlint. Git hooks menggunakan Lefthook.
