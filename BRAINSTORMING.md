# BRAINSTORMING — Portfolio Website Update (htma.site)

> **Branch:** `feat/portfolio-update`
> **Tanggal:** 2026-08-30
> **Runtime & Package Manager:** Bun (full)
> **Constraint Utama:** Layout vertical tetap dipertahankan. Tidak ada perubahan data portfolio (foto, list project, detail project tetap sama). Desain di-upgrade ke **Material 3 Expressive (M3 Expressive)** design system dari Google (`m3.material.io`). Menerapkan standar kode dari **Global Rules (AGENTS.md)** dan menggunakan **Better T Stack** sebagai fondasi project.

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

| Layer           | Teknologi Awal       | Status Aktual (Phase 0–3 Selesai)     | Catatan Migrasi                            |
| --------------- | -------------------- | ------------------------------------- | ------------------------------------------ |
| Framework       | Next.js 14.2.30      | **Next.js 15.5.25** (App Router)      | Turbopack stable, React 19 native support  |
| React           | React 18.3.1         | **React 19.3.0**                      | Concurrent features, React 19 types        |
| Styling         | Tailwind CSS 3.4.13  | **Tailwind CSS v4.3.3**               | CSS-first `@theme`, Lightning CSS          |
| Animation       | Framer Motion 10     | **Motion / Framer Motion 13.3.0**     | M3 Expressive Spring Motion Physics specs  |
| Smooth Scroll   | Locomotive Scroll 5  | **Lenis 1.3.26**                      | Native rAF loop, 3.7x lebih ringan         |
| Text Scramble   | Baffle.js 0.3.6      | **Native useTextScramble Hook**       | Zero-dependency, TypeScript native         |
| State           | Zustand 4.5.7        | **Zustand 5.0.15**                    | Concurrent-safe                            |
| Form            | React Hook Form 7.59 | **React Hook Form 7.88.0**            | Integrasi Zod schema validation            |
| Form Validation | —                    | **Zod 4.6.5** + `@hookform/resolvers` | Strict client validation & types inference |
| Linter          | ESLint + plugins     | **Oxlint 1.83.0**                     | Rust-based, 50-100x lebih cepat            |
| Git Hooks       | Husky + lint-staged  | **Lefthook 2.1.14**                   | Single yaml, zero dependency               |
| Typography      | Local woff2 fonts    | **Google Sans Flex** (Variable Font)  | Full axes (`wght 100-1000`, `opsz 6-144`)  |
| Design System   | Custom ad-hoc tokens | **Material 3 Expressive**             | Dynamic HCT palette, Tone-based surfaces   |
| Package Manager | pnpm                 | **Bun 1.4.2** (`bun.lock`)            | Fast native package manager                |
| Runtime         | Node.js >= 18        | **Bun >= 1.1.0**                      | Single unified runtime                     |

### Struktur Layout (Vertical — TIDAK BERUBAH)

```
┌─────────────────────────────────────────────┐
│ Navigation (fixed top, grid-12, transparan) │
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
│ Gradient Mask (fixed bottom only)           │
│ Custom Cursor (fixed, pointer-events-none)  │
│ Modal Portal (portfolio detail)             │
└─────────────────────────────────────────────┘
```

**Layout ini tetap 100% dipertahankan.** Hero sticky di kiri, konten scroll di tengah, sidebar sticky di kanan.

**Catatan (Session 6):** Gradient mask atas **dihapus** dan header dijadikan **transparan** (`bg-transparent` + `pointer-events-none`) supaya konten scroll terlihat dari ujung atas viewport. Logo & tombol toggle tetap solid dan interaktif (`pointer-events-auto`). Gradient mask bawah tetap dipertahankan.

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

| Dimensi              | Batasan / Target (Non-Negotiable)                                                                                                                                  | Cara Verifikasi                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **Layout Invariant** | Layout vertical 100% terkunci (Hero kiri sticky, Content scroll, Sidebar kanan sticky, Gradient mask bawah). Header transparan agar konten scroll dari ujung atas. | Visual check & inspection                                                                       |
| **Data Invariant**   | Data portfolio existing TIDAK berubah (foto, list project, URL, repo tetap). Field `description` **ditambahkan** di Session 6 untuk kebutuhan copywriting card.    | `git diff src/utils/portfolio-data.ts` — hanya penambahan `description`, 0 perubahan nilai lama |
| **Type-Safety**      | 0 `any`, 0 `@ts-ignore`, 0 `@ts-expect-error`, strict mode aktif.                                                                                                  | `bun run typechecks` (0 errors)                                                                 |
| **Lint Quality**     | 0 error, 0 warnings pada linter Oxlint.                                                                                                                            | `bun run lint` (0 warnings/errors)                                                              |
| **Scroll Parity**    | Perilaku & feel scroll Lenis wajib sama persis dengan Locomotive lama.                                                                                             | Runtime browser check                                                                           |
| **Text Scramble**    | Native `useTextScramble` wajib identik visualnya dengan Baffle.js lama.                                                                                            | Runtime browser check                                                                           |
| **Performance Bar**  | Lighthouse Core Web Vitals target: 90+ (Performance, Accessibility, Best Practices, SEO).                                                                          | Lighthouse CLI / DevTools audit                                                                 |
| **Form Security**    | Validasi input sisi klien via Zod schema (nama, email valid, pesan).                                                                                               | Zod schema validation tests                                                                     |

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

| Rule                        | Status Saat Ini                                                                                               | Aksi                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Dilarang `any`**          | ✅ 0 pelanggaran — tipe `any` di `useCursorPosition.ts` sudah dihapus pada Slice 2.3 (diganti `PointerEvent`) | Terpenuhi                     |
| **Functional programming**  | Sudah diterapkan, semua komponen function-based                                                               | Pertahankan                   |
| **Immutability**            | Zustand store sudah immutable via `set()`                                                                     | Pertahankan                   |
| **Early returns**           | Belum konsisten                                                                                               | Terapkan di semua fungsi baru |
| **`interface` over `type`** | Sudah diterapkan (`IPortfolio`, `IClientSlice`, dll)                                                          | Pertahankan                   |

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

## 5. Material 3 Expressive — Strategi Penerapan

Material 3 Expressive (M3 Expressive) bukan berarti harus mengimpor library komponen eksternal yang berat (seperti MUI atau Material Web Components). Yang kita ambil adalah **desain sistem, token matematika resmi, dan prinsip interaksinya** dari `m3.material.io`, lalu diterapkan 100% menggunakan Tailwind CSS utility classes dan CSS variables.

### Prinsip M3 Expressive yang Diterapkan

#### 5.1 Dynamic Color & Tone-Based Surfaces

- **Seed Color:** Satu seed `#D3F36A` di-generate via `@material/material-color-utilities` ke dalam color space HCT resmi Google.
- **Tone-based Surfaces:** Menggantikan sistem elevasi lama. Kontainer menggunakan 5 tingkatan kontras: `surface-container-lowest`, `surface-container-low`, `surface-container` (default), `surface-container-high`, dan `surface-container-highest`.
- Light mode dan Dark mode memiliki pemetaan matematis yang mempertahankan rasio kontras WCAG AA (min 4.5:1).

#### 5.2 Shape System & Shape Morphing

- M3 Expressive memperluas skala bentuk: `0px` (none), `4px` (xs), `8px` (sm), `12px` (md), `16px` (lg), `28px` (xl), dan `full` (pill).
- **Shape morphing:** Komponen utama (seperti portfolio cards) bertransisi ke kurva yang lebih membulat saat hover (`rounded-2xl` 16px → `rounded-[28px]` 28px) untuk memberikan sensasi responsif yang hidup.

#### 5.3 Intentional Containment (Menggantikan Bayangan Brutalist)

- Mengelompokkan elemen secara visual (_containment_) menggunakan warna permukaan yang kontras alih-alih bayangan hitam brutalist (`shadow-[0.25rem_0.25rem_#24282C]`).
- Riset Google membuktikan containment yang tegas mempercepat penemuan elemen penting hingga 4x lebih cepat.

#### 5.4 State Layers & Interaction Feedback

- Lapisan state layer semi-transparan yang konsisten di atas komponen: Hover (8%), Focused (10%), Pressed (10%), Dragged (16%).

#### 5.5 Motion Physics System (Spring Physics)

- Mengikuti pedoman resmi `m3.material.io/styles/motion/overview/specs`:
  - **Spatial Specs:** Animasi perubahan posisi, skala, dan bentuk menggunakan spring physics dengan overshoot lembut (`dampingRatio: 0.6`, `stiffness: 700` default).
  - **Effects Specs:** Animasi perubahan warna dan opasitas menggunakan spring tanpa pantulan (`dampingRatio: 1.0`, `stiffness: 1600` default).

#### 5.6 Expressive Typography Scale & Optical Sizing

- Menggunakan **Google Sans Flex** dengan dukungan penuh sumbu variabel (`wght 100-1000`, `opsz 6-144`).
- Skala hierarki M3 resmi: Display (Large/Medium/Small), Headline, Title, Body, dan Label.

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

- Logo background → tetap `bg-custom-black text-custom-green` (light) / `dark:bg-custom-green dark:text-custom-black`, shape `rounded-xl`.
- Border radius logo → `rounded-xl` (12px, M3 small shape)
- Theme toggle → Ganti ke ikon **Sun/Moon** (`MdLightMode` / `MdDarkMode` dari `react-icons/md`)
- Navigation bar background → **`bg-transparent` + `pointer-events-none`** (diubah di Session 6; sebelumnya solid `bg-surface`). Konten scroll terlihat tembus dari ujung atas sampai bawah.
- Logo & tombol toggle dibungkus `pointer-events-auto` supaya tetap bisa diklik meski header transparan.
- Tombol toggle diberi background solid `bg-surface-container-high` + `shadow-sm` (hover `bg-surface-container-highest`) agar ikon tetap terlihat kontras di atas header transparan.
- Gradient mask atas (`mask-top`) **dihapus** di Session 6.

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
- Baffle scramble effect (tetap ada, akan di-rewrite native — lihat bagian 6)
- Rotate -90° pada mobile
- Animasi Framer Motion (fade + slide)

**Perubahan tambahan (Session 6):**

- Grid position **diperlebar**: `lg:col-start-2 lg:col-end-5` → `lg:col-start-1 lg:col-end-5` (4 kolom, dimulai dari kolom 1) agar proporsi sisi kiri lebih seimbang dan tidak terlalu menempel ke konten utama.

---

### 8.3 About Section (`src/modules/home-page/about.tsx`)

**Saat ini:**

- Section header: arrow icon + "about" text, hover effect mengubah background
- 2 paragraf deskripsi
- Border top & bottom sebagai separator

**Perubahan M3:**

- Section header → M3 **Interactive Magnetic Pill (Two-Stage Interaction)**:
  - _Kursor masuk section:_ Judul section otomatis aktif (`bg-primary-container text-on-primary-container`, panah `-rotate-45`), sementara kursor dot **tetap ada** dan melayang bebas di atas konten.
  - _Kursor ke judul section:_ Kursor dot **menyusut secara halus & fluid (_smooth fluid shrink_)** ke dalam pill (`scale: 1 → 0, opacity: 1 → 0`), dan pill merespons dengan pergeseran magnetik elastis (`origin-left ml-1 sm:ml-1.5`).
- Border separator → `border-outline-variant` (lebih subtle, M3 guideline)
- Paragraf teks → `text-on-surface` dengan `text-body-md md:text-body-lg leading-relaxed`

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

- Section header → sama seperti About (M3 Two-Stage Interactive Magnetic Pill: aktif saat kursor di section, kursor menyusut fluid saat hover langsung ke judul).
- Skill icon containers → M3 **Surface Container** style:
  - Kontainer minimalis seragam `rounded-2xl` (`h-14 w-14` s/d `2xl:h-[4.5rem] 2xl:w-[4.5rem]`).
  - Tonal M3: `bg-surface-container-low/70 dark:bg-surface-container/50 border border-outline-variant/25 dark:border-outline-variant/35`.
  - Optical weight balancing per logo, padding ringkas `p-1.5 sm:p-2`.
  - Kursor melebur langsung saat hover, memicu kartu bergerak magnetik halus dan elevate ke `hover:bg-surface-container`.
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
- Card bottom bar: title + arrow icon, `bg-custom-white` / `bg-custom-green`
- Click → modal via Zustand + Portal

**Perubahan M3:**

- Section header → sama seperti About & Skills (M3 Two-Stage Interactive Magnetic Pill).
- Card style → **M3 Filled Card**, mengikuti referensi desain card (light & dark):
  - Card: `bg-surface-container rounded-[24px] overflow-hidden` (M3 Large shape: 24px).
  - **Anatomi:** thumbnail di atas (`rounded-[inherit]`, aspect `16/9`, `object-cover`) → content block di bawah dengan `p-6` (padding 24px) + `text-left`.
  - **Penting:** elemen `<button>` punya `text-align: center` bawaan UA stylesheet — wajib di-override `text-left` agar judul & deskripsi rata kiri seperti referensi.
  - Judul: `text-title-lg font-medium text-on-surface`. Deskripsi: `mt-2 text-body-md text-on-surface-variant`.
  - **Shape morphing:** `hover:rounded-[28px]` (Extra Large) → `active:rounded-[16px]` (Medium) via `m3Motion.spatial.fast`.
  - Hover: `hover:bg-surface-container-high hover:shadow-lg`.
  - Active/pressed: `active:scale-[0.98]`.
  - Kursor menyusut fluid & magnetic parallax via `.magnetic-item` (sudah aktif dari Slice 2.3).
- **Grid diperbaiki:** `md:grid-cols-2` + auto rows (tinggi ikut konten) menggantikan bento span hardcoded yang membuat card terhimpit/tidak proporsional. Card index 0 memakai `md:col-span-2` sebagai featured. Semua thumbnail konsisten rasio `16/9`.
- **Copywriting deskripsi:** field `description` ditambahkan ke `IPortfolio` + `portfolio-data.ts`, berisi 1 kalimat per project sesuai konten card-nya (Garuda Universe, Ibrahim Law, Urban Fashion Shop, Taskify, Crypto Price Watcher, Url Shortfly, Todolist App).
- GitHub link di bawah → teks `on-surface-variant`, link `primary`.
- Border separator → `border-outline-variant`.
- Click → modal behavior
- Modal portal system

---

### 8.6 Modal (`src/components/ui/modal/`)

**Saat ini:**

- Portal ke 3 target div: `modal-card`, `modal-backdrop`, `modal-close`
- Modal card, backdrop, close button (perlu baca detail implementasi)

**Perubahan M3:**

- Modal → M3 **Basic Dialog** style:
  - Container: `bg-surface-container-high rounded-xl` (28px) `p-6 shadow-2xl max-w-5xl max-h-[90vh] overflow-y-auto` (M3 Extra Large shape).
  - Backdrop/Scrim: `bg-on-surface/32` (M3 official scrim opacity).
  - Close button: M3 icon button `h-11 w-11 rounded-full bg-surface-container-highest` dengan hover state layer `bg-on-surface/8`.
  - Elemen native `<dialog open inert>` (bukan `role="dialog"`) + `aria-label` — lolos rule `jsx-a11y(prefer-tag-over-role)`.
  - Panel konten dalam: `bg-surface-container rounded-lg p-4`.
  - Tombol Demo → M3 Filled Button (`bg-primary text-on-primary rounded-full`); Repository → Filled Tonal Button (`bg-secondary-container`). Shadow brutalist dihapus.
- Animasi:
  - Scale dialog: 0.92 → 1 via `m3Motion.spatial.default` (spring overshoot natural).
  - Fade backdrop: opacity 0 → 1 via `m3Motion.effect.default`.
- Modal menampilkan judul, deskripsi project, tombol Demo/Repository, dan gambar portfolio.

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

**Model Desain (Robbie Tilton Model + M3 Expressive Integration):**
Mengadopsi model interaksi kursor presisi dari `robbietilton.com/more-info` yang dipadukan dengan palet warna dan sistem token Material 3 Expressive saat ini:

1. **Peniadaan Kursor Sistem Bawaan (Native Cursor Suppression):**
   - Pada perangkat dengan pointer mouse/trackpad (`@media (pointer: fine)`), kursor bawaan OS/laptop dihilangkan secara global (`*, html, body { cursor: none !important; }`), hanya menyisakan kursor kustom web di layar.
   - Pada layar sentuh / mobile (`pointer: coarse`), kursor kustom otomatis dinonaktifkan (`display: none`), menjaga interaksi sentuh alami.

2. **Warna & Tampilan Tetap:**
   - Lingkaran dot: `bg-surface` / `bg-primary` dengan efek `mix-blend-difference` tetap dipertahankan sesuai tema warna saat ini.
   - Dimensi resting: 40x40px (`--cursor-size: 2.5rem`, disamakan dengan tombol toggle tema `h-10 w-10`), fixed, pointer-events-none, z-index 1350. Offset centering dihitung dari `offsetWidth` elemen kursor agar tidak drift saat ukuran diubah.
   - Umpan balik tekanan (_pressing_): mengecil halus ke `scale(0.85)` / 34px saat mouse ditekan (`mousedown`).

3. **Interaksi Elemen Interaktif (Smooth Fluid Shrink & Respons Komponen):**
   - Ketika kursor diarahkan ke elemen yang bisa di-hover (pill judul section, tombol, link, kartu portofolio, kartu skill, assist chip):
     - **Kursor dot menyusut fluid (_Smooth Fluid Shrink_):** Kursor dot tidak sekadar menjadi transparan, melainkan menyusut lembut dari skala penuh ke nol (`scale: 1 → 0` berpadu dengan `opacity: 1 → 0`) menggunakan spring M3 (`stiffness: 350, damping: 26`). Efek visualnya: kursor dot mengembun dan terserap mulus ke dalam fisik komponen.
     - **Komponen menyala sebagai penanda kursor sedang bergabung di dalamnya:** Elemen yang di-hover menampilkan indikator visual nyata:
       - _Kontainer aktif:_ Menyala dengan `bg-primary-container` (pada judul section, chip, dan tautan) atau elevated surface (`bg-surface-container-high` pada kartu).
       - _Pergeseran magnetik elastis (*Magnetic Parallax*):_ Komponen bergeser anggun mengikuti pergerakan pointer (`translate(var(--parallax-x), var(--parallax-y))` maks 3.5px).
       - _Subtle spring lift:_ Mengembang sedikit (`scale: 1.03 - 1.04`) memberikan umpan balik taktil bahwa kursor berada di dalam.
   - Saat pointer keluar dari elemen (`mouseleave`), kursor dot mengembang kembali secara mulus dari titik keluar (`scale: 0 → 1, opacity: 0 → 1`), dan komponen kembali rileks ke posisi netral via spring physics M3.

**Yang TIDAK berubah:**

- Palet warna (`bg-surface` / `bg-primary`, `mix-blend-difference`)
- Engine Framer Motion / Motion
- Nonaktif pada layar sentuh / mobile

---

### 8.10 Gradient Masks (Layout)

**Saat ini:**

- Top mask: fixed, z-1030, 8% height, `bg-custom-white-2` / `bg-custom-black`
- Bottom mask: fixed, z-1050, 8% height
- CSS: `mask-image: linear-gradient(to bottom/top, #000 0%, transparent 100%)`

**Perubahan M3:**

- Background → `bg-surface` (light) / `bg-surface` (dark)
- Mask gradient tetap sama (efek fade in/out)
- **Top mask DIHAPUS (Session 6)** — `layout-wrapper.tsx` sekarang hanya menyisakan bottom mask. Header dibuat transparan, sehingga konten bisa terlihat scroll dari ujung atas viewport tanpa tertutup layer solid.

**Yang TIDAK berubah:**

- Bottom mask: fixed, z-1050, 8% height, `bg-surface`, `mask-bottom`
- CSS `mask-image: linear-gradient(to top, #000 0%, transparent 100%)`

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

### 10.1 Custom Cursor Optimization (Robbie Tilton Interaction Model)

(Sudah dijabarkan di bagian 8.9)

- `pointermove` + `{ passive: true }` untuk pelacakan kursor zero-lag tanpa menghambat rendering thread utama.
- `requestAnimationFrame` throttle membatasi frekuensi pembaruan koordinat kursor tepat 60fps.
- Peniadaan kursor bawaan OS/laptop via `@media (pointer: fine) { *, html, body { cursor: none !important; } }`.
- Delegasi interaksi hover: kursor dot bertransisi lembut menghilang saat melintasi elemen interaktif, memicu umpan balik magnetik M3 pada komponen yang dituju.
- Strict TypeScript: eliminasi tipe `any` pada event handler mouse menjadi `PointerEvent`.

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

#### 11.1 Form Fields → M3 Filled Text Fields

- Menggunakan spesifikasi resmi **M3 Filled Text Field**:
  - Background container: `bg-surface-container-highest`
  - Shape: `rounded-t-xs` (radius 4px di atas, flat di bawah)
  - Active indicator: border bawah `border-b-2 border-outline`, saat fokus bertransisi menjadi `border-b-primary`
  - Input text: `text-body-lg text-on-surface bg-transparent outline-none`
  - Label: `text-label-lg text-on-surface-variant`, saat fokus/terisi mengecil ke `text-label-sm text-primary`

#### 11.2 Send Button → M3 Filled Button

- Menggunakan spesifikasi resmi **M3 Filled Button**:
  - Pill shape: `rounded-full px-8 py-3 font-medium text-label-lg`
  - Color role: `bg-primary text-on-primary`
  - Motion & state: `hover:shadow-md active:scale-95 transition-all` dengan `m3Motion.spatial.fast`
  - Disabled state: `bg-on-surface/[0.12] text-on-surface/[0.38] cursor-not-allowed`
  - Loading state: spinner indikator progres di dalam button

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

### Phase 1 — Foundation (Dependencies, Tooling & Design Tokens) — ✅ SELESAI

- **Lead Skill**: `source-driven-development` + `incremental-implementation`
- **Objective**: Membangun fondasi runtime, linter, css tokens, dan font tanpa merusak compile.
- **Status**: ✅ **100% SELESAI** (Semua slice terverifikasi lulus gerbang kualitas)

- **Slice 1.1 — Package Upgrade & Peer Resolution (Mitigasi)**: ✅ SELESAI
  - Action:
    - Upgrade core: Next.js 15, React 19, `motion@^12`, `lenis`, `zod`, `@hookform/resolvers`, `@material/material-color-utilities`.
    - Upgrade pendukung (hasil double-check): `next-themes@^0.4.4` (peer React 19 support) & `zustand@^5.0.0` (concurrent safe).
    - Hapus `baffle` dari dependencies.
    - **PENTING (Mitigasi)**: JANGAN hapus `locomotive-scroll` di Phase 1 ini agar `src/components/ui/page-wrapper.tsx` tidak langsung crash saat dev/build. `locomotive-scroll` baru dicabut di Slice 2.1 setelah Lenis aktif.
  - Verifikasi: `bun install` berhasil 0 peer conflicts, dry-run compile pass. Commit `075609a`.
- **Slice 1.2 — Tooling Overhaul (Oxlint & Lefthook)**: ✅ SELESAI
  - Action: Setup `.oxlintrc.json`, hapus artifacts ESLint (`.eslintrc.js`, `.eslintignore`, paket eslint). Setup `next.config.ts` dengan `eslint: { ignoreDuringBuilds: true }`. Setup `lefthook.yml` (ganti Husky).
  - Verifikasi: `bun run lint` (Oxlint) berjalan 0 warnings/errors, `bun run typechecks` lulus. Commit `61e6c28`.
- **Slice 1.2.1 — Supporting Packages Maintenance (Update & Deprecations Pruning)**: ✅ SELESAI
  - Action:
    - Update paket utama & pendukung ke versi LATEST yang terbukti aman & stabil:
      - React: `react@^19.3.0`, `react-dom@^19.3.0`, `@types/react@^19.3.0`, `@types/react-dom@^19.3.0`.
      - Motion: `motion@^13.3.0`, `framer-motion@^13.3.0`.
      - Form & Validation: `zod@4.6.5`, `@hookform/resolvers@5.9.1`, `react-hook-form@^7.88.0`.
      - Tooling & Utilities: `@commitlint/*@^21.2.2`, `prettier@^3.9.6`, `prettier-plugin-tailwindcss@^0.8.1`, `postcss@8.5.28`, `cssnano@^9.0.4`, `@material/material-color-utilities@^0.4.0`, `@vercel/analytics@^2.0.1`, `sharp@^0.35.4`, `react-icons@^5.7.0`, `react-hot-toast@^2.6.0`, `lenis@^1.3.26`, `locomotive-scroll@5.0.1`, `next-themes@^0.4.6`, `zustand@^5.0.15`, `@types/node@^26.5.1`.
    - Modernisasi `tsconfig.json` (`target: es2022`, `moduleResolution: bundler`, path aliases `./src/*`) & deklarasi CSS module di `types.d.ts`.
    - Audit & eliminasi total paket usang/deprekasi: `eslint`, `eslint-config-next`, `@typescript-eslint/*`, `eslint-config-prettier`, `eslint-plugin-*`, `husky`, `lint-staged`.
    - Perampingan [`commitlint.config.js`](<file:///home/hutamatr/git-repo(hutamadev)/htma/commitlint.config.js>) (menghapus redundant defaults & tipe monorepo tak terpakai).
    - **PENTING (Mitigasi Doubt-Driven & Penahanan Terkalibrasi)**:
      - _TypeScript_: Di-upgrade ke `typescript@6.0.3` (TS 6 terbukti 100% kompatibel dengan Next.js 15 config loader dan compile build).
      - _Next.js_: Terkunci pada versi rilis penuh terbaru `next@15.5.25`.
      - _Baffle_: Tahan `baffle@^0.3.6` secara temporer (sampai Slice 2.2 native scramble hook) agar `src/components/hero/hero.tsx` tidak crash pada instalasi baru.
  - Verifikasi: `bun install` 0 peer conflicts, `bun run lint` (0 error), `bun run typechecks` (pass), `bun run build` (pass, 6/6 static pages). Commit `d09644e`.
- **Slice 1.3 — M3 Expressive Palette & Backward-Compatible Aliases (Tailwind v4 Full Migration)**: ✅ SELESAI
  - Action:
    - Upgrade penuh ke `tailwindcss@4.3.3` & `@tailwindcss/postcss@4.3.3`.
    - Hapus total `tailwind.config.js` dan `autoprefixer` (beralih ke 100% CSS-first `@theme` + Lightning CSS).
    - Sediakan alias token lama di `@theme` (`--color-custom-black`, `--color-custom-green`, `--color-custom-white`, dll) yang memetakan ke token M3 baru agar 51 file komponen tidak broken styling.
    - Sediakan CSS variables M3 resmi dari seed `#D3F36A` di `:root` dan `.dark`.
  - Verifikasi: `bun run format:check` (pass), `bun run lint` (0 error), `bun run typechecks` (pass), `bun run build` (pass, 6/6 static pages). Commit `987a207`.
- **Slice 1.4 — Typography Setup (Google Sans Flex)**: ✅ SELESAI
  - Action:
    - Setup Google Sans Flex variable font via Google Fonts CDN resmi (`@import` di `globals.css`), mencakup seluruh unicode-range dan variable axes (`wght 100-1000`, `opsz 6-144`).
    - Hapus total 6 file font legacy (`KataGrotesk-*.woff2` & `NeutralFace*.woff2`).
    - Refactor seluruh komponen ke export bersih `googleSansFlex` di `src/utils/localFont.ts` tanpa meninggalkan variabel lama.
    - Bind `--font-sans`, `--font-display`, `--font-body`, serta selector `html, body` langsung ke `'Google Sans Flex'`.
    - Implementasi best practices Next.js 15 App Router: fix prop `fill` di `next-image.tsx`, custom `not-found.tsx`, root `global-error.tsx`, dan metadata routes dinamis (`sitemap.ts`, `robots.ts`, `manifest.ts`).
  - Verifikasi: `bun run build` menghasilkan 9/9 static pages/routes, `bun run lint` (0 error), `bun run typechecks` (0 error). Commit `f6893a6` & `4694f6e`.

---

### Phase 2 — Core Components & Mechanics — ✅ SELESAI

- **Lead Skill**: `doubt-driven-development` + `frontend-ui-engineering` (aktif)
- **Objective**: Mengganti engine scroll, text scramble, dan cursor dengan performa tinggi & hasil visual identik.
- **Status**: ✅ **100% SELESAI** (Seluruh slice 2.1–2.4 terverifikasi lulus gerbang kualitas)

- **Slice 2.1 — Lenis Smooth Scroll & Locomotive Cleanup**: ✅ SELESAI
  - Action: Implementasi Lenis di `src/components/ui/page-wrapper.tsx` dengan rAF loop dan lifecycle cleanup. Hapus `locomotive-scroll` dari `package.json` dan `bun.lock`.
  - Verifikasi: Parity check visual & feel scroll identik 100%. Commit `ef733db`.
- **Slice 2.2 — Native Text Scramble Hook (Baffle.js Cleanup)**: ✅ SELESAI
  - Action: Buat `src/hooks/useTextScramble.ts` (native rAF & timer cleanup), refactor `src/components/hero/hero.tsx`, hapus `useBaffle.ts`, shim `baffle` di `types.d.ts`, dan uninstall paket `baffle`.
  - Verifikasi: Efek decoding scramble identik visualnya dengan Baffle.js. Commit `c4380aa`.
- **Slice 2.3 — Cursor Optimization (Robbie Tilton Model Foundation)**: ✅ SELESAI
  - Action: Refactor `src/hooks/useCursorPosition.ts` (`pointermove`, `passive: true`, `requestAnimationFrame` throttle, coarse pointer detection, hapus tipe `any`, tambahkan `aria-hidden="true"` pada `custom-cursor.tsx`, serta fondasi peniadaan kursor native `cursor: none !important`).
  - Verifikasi: Performa 60fps tanpa frame drop, strict types `PointerEvent`, 0 linter warning. Commit `2c56188`.
- **Slice 2.4 — Layout & Navigation (M3 Surface & Sun/Moon Toggle)**: ✅ SELESAI
  - Action: Update `src/components/layout/layout-wrapper.tsx` & `src/components/navigation/navigation.tsx` (solid `bg-surface`, Sun/Moon icon toggle `MdLightMode`/`MdDarkMode` menggantikan `MdGraphicEq`, eliminasi rotated text, logo M3 `rounded-xl`, WCAG AA `aria-label`).
  - Verifikasi: Toggle theme smooth, layout vertical tetap terkunci, build static 9/9 pages lulus penuh.

---

### Phase 3 — Sections (Home Page) — 🔄 IN-PROGRESS (SEDANG BERJALAN)

- **Lead Skill**: `frontend-ui-engineering` + `impeccable`
- **Objective**: Transformasi visual ke Material 3 Expressive (Shape, Size contrast, Tone-based containment, Spring motion) serta integrasi model interaksi kursor Robbie Tilton (peniadaan kursor native, hover dissolve & magnetic feedback pada elemen interaktif).

- **Slice 3.1 — Hero Section (SELESAI)**: M3 typography hierarchy (`text-display-sm`), Assist Chip badge, Filled Tonal Button socials dengan magnetic hover delegation, dan spring motion specs. Commit `7b2ba93`.
- **Slice 3.2 — About Section (SELESAI)**: M3 section header hover state layer, surface card containment, dan copywriting natural tanpa AI-isms. Commit `623127b`.
- **Slice 3.3 — Skills Section (SELESAI)**: M3 Surface Container Low cards dengan optical weight balancing, kontras dark mode bersih, dan magnetic hover feedback.
- **Slice 3.4 — Portfolio Section & Modal (SELESAI)**: M3 Filled Card (`bg-surface-container`, radius 24px) mengikuti referensi desain card (light & dark) — anatomi thumbnail `16/9` di atas + content `p-6` `text-left`, shape morphing hover (`24px → 28px → 16px`), Basic Dialog native `<dialog>` dengan Scrim `bg-on-surface/32`. Grid diperbaiki dari bento span hardcoded (invalid `md:grid-rows-[10]`) menjadi `md:grid-cols-2` + auto rows. Field `description` ditambahkan ke `IPortfolio` + `portfolio-data.ts`.
- **Slice 3.5 — Sidebar & Footer**: Navigation Rail dengan Active Indicator pill, Small FAB scroll-top dengan magnetic hover attraction, dan footer tertiary accent.
- Verifikasi: `bun run typechecks`, `bun run lint`, `bun run build` sukses, visual responsive di desktop & mobile.

**Pekerjaan tambahan di luar slice (Session 6) — sudah selesai:**

- **Custom cursor smooth fluid shrink + magnetic parallax**: kursor dot menyusut fluid (`scale 1 → 0`, `opacity 1 → 0`) ke dalam elemen interaktif, elemen bergeser magnetik maks 3.5px. Commit `f69acd5`.
- **Two-stage section header interaction**: kursor masuk section → pill judul aktif; kursor ke pill → dot menyusut masuk. Commit `b681783`.
- **Header transparan + hero diperlebar**: commit `5cc2e39`.
- **Ukuran kursor 24px → 40px** (disamakan tombol toggle tema), offset centering dibaca dari `offsetWidth` elemen.
- **Cleanup**: `src/components/ui/svg/ArrowSVG.tsx` dihapus (tidak lagi punya caller setelah card bottom-bar lama diganti).

---

### Phase 4 — Contact Page

- **Lead Skill**: `frontend-ui-engineering` + `security-and-hardening`
- **Objective**: Redesain form kontak dengan text field M3 Expressive, validasi Zod schema yang aman, serta integrasi kursor Robbie Tilton pada input dan tombol kirim (cursor dissolve & button magnetic feedback).

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

| #   | Pertanyaan                | Jawaban Final                                                                                                                                                                                                                      |
| --- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Font choice**           | Full M3 Expressive — **Google Sans Flex** (variable font) untuk body & heading. Hapus Kata Grotesk & Neutral Face                                                                                                                  |
| 2   | **Portfolio card style**  | Full M3 Expressive elevated card — hapus brutalist offset shadow                                                                                                                                                                   |
| 3   | **Theme toggle icon**     | Ganti ke **Sun/Moon** (`MdLightMode` / `MdDarkMode`). Hapus `MdGraphicEq`                                                                                                                                                          |
| 4   | **Navbar backdrop blur**  | Awalnya solid `bg-surface` tanpa `backdrop-blur`. **Di-supersede Session 6**: header jadi `bg-transparent` + `pointer-events-none` (logo & toggle tetap solid via `pointer-events-auto`) agar konten scroll tembus dari ujung atas |
| 5   | **M3 color palette**      | Generate ulang pakai `@material/material-color-utilities` untuk nilai akurat. Estimasi di DESIGN.md akan di-replace saat implementasi                                                                                              |
| 6   | **Tailwind v4**           | ✅ Konfirmasi lanjut — migrasi config JS → CSS-based `@theme`                                                                                                                                                                      |
| 7   | **Motion v12**            | ✅ Konfirmasi lanjut — `framer-motion` → `motion`                                                                                                                                                                                  |
| 8   | **React 19 + Next.js 15** | ✅ Siap — terima potensi breaking changes                                                                                                                                                                                          |
| 9   | **Bun lockfile**          | **Commit `bun.lockb`** ke git (reproducible builds)                                                                                                                                                                                |
| 10  | **Monorepo**              | **Tetap single app** — tidak convert ke Turborepo                                                                                                                                                                                  |
| 11  | **Git hooks**             | **Migrasi ke Lefthook** (ganti Husky) — menjalankan `oxlint` + `prettier --check` di pre-commit                                                                                                                                    |

---

> **Catatan Akhir:** Dokumen ini adalah living document. Setiap fase akan di-review bersama sebelum eksekusi. Tidak ada perubahan yang dilakukan tanpa konfirmasi. Semua kode mengikuti standar Global Rules (AGENTS.md): strict TypeScript, no `any`, functional programming, immutability, early returns, validasi input end-to-end, zero hardcoded secrets. Linter sepenuhnya dimigrasi menggunakan Oxlint. Git hooks menggunakan Lefthook.
