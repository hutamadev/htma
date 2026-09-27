# MEMORY — Portfolio Website Update (htma.site)

> **Last Updated:** 2026-09-23
> **Project:** `/home/hutamatr/git-repo(hutamadev)/htma`
> **Branch Aktif:** `feat/portfolio-update` (dibuat dari `main`)

---

## Status Saat Ini: PHASE 4 — CONTACT PAGE — ✅ SELESAI (berikutnya Phase 5)

- **Phase 0 — Runtime Migration**: ✅ Selesai (Bun runtime & package manager, `bun.lock` stabil).
- **Phase 1 — Foundation (Tooling, Next 15, Tailwind v4, M3 Palette, Google Sans Flex)**: ✅ **100% Selesai**.
- **Phase 2 — Core Components & Mechanics**: ✅ **100% Selesai** (Slices 2.1, 2.2, 2.3, 2.4).
- **Phase 3 — Sections (Home Page)**: ✅ **100% Selesai**
  - Slice 3.1 Hero — ✅ Selesai (commit `7b2ba93`)
  - Slice 3.2 About — ✅ Selesai (commit `623127b`)
  - Slice 3.3 Skills — ✅ Selesai
  - Slice 3.4 Portfolio Section & Modal — ✅ Selesai (commit `8e8b307`, `8ab9fde`)
  - Slice 3.5 Sidebar & Footer — ✅ Selesai
- **Phase 4 — Contact Page**: ✅ **100% Selesai** (commit `1b4546f`)
  - Slice 4.1 Zod Schema & Validation — ✅ Selesai (`src/utils/contact-schema.ts`)
  - Slice 4.2 M3 Text Fields & UI — ✅ Selesai
- **Phase 5 — Polish, SEO & Launch**: ⏳ Berjalan (Slice 5.0–5.2 selesai; Slice 5.3 **sebagian** — gerbang build + verifikasi SSR/header/metadata lulus, sisa uji browser yang terblokir lingkungan tanpa browser)

Dokumentasi arsitektur & panduan teknis:

- `BRAINSTORMING.md` — rencana detail update ✅ **Confirmed & final**
- `DESIGN.md` — panduan desain sistem Material 3 Expressive ✅ **Expanded & confirmed**
- `MEMORY.md` — file ini

---

## Timeline Aktivitas

### Session 1 — 2026-08-30

1. **Diskusi awal** tentang Zed environment (skills, rules, MCP)
2. **Update skill `permissioned-github`** — file di `~/.agents/skills/permissioned-github/SKILL.md` diedit agar Zed-compatible:
   - Hapus `ask_permission` tool (tidak ada di Zed)
   - Hapus format permission JSON Antigravity
   - Tambah instruksi sandbox Zed (`allow_hosts`, `unsandboxed`)
   - Tambah Zed terminal rules (`--no-pager`, `GIT_EDITOR=true`, `--no-optional-locks`)
   - Tambah Conventional Commits best practice
3. **Buat branch `feat/portfolio-update`** dari `main`
4. **Brainstorming session** — eksplorasi seluruh codebase, diskusi requirement:
   - Layout vertical TETAP dipertahankan
   - Upgrade design ke Material You 3 (M3)
   - Font boleh diganti (opsi M3 atau hybrid)
   - Seed color baru tapi basic color tetap sama → generate M3 palette dari `#D3F36A`
   - Halaman contact juga di-update
   - Data portfolio (foto, list, detail) TIDAK BERUBAH — hanya UI
   - `locomotive-scroll` → `lenis` (hasil HARUS sama persis)
   - Custom cursor tetap, improve performance
   - Baffle.js → native `useTextScramble` (hasil HARUS SAMA PERSIS)
   - Runtime & package manager → full Bun
   - Terapkan Global Rules (AGENTS.md)
   - Terapkan Better T Stack sebagai fondasi
   - Linter diganti full menggunakan Oxlint (menggantikan ESLint/Biome)
   - Desain spesifik diubah dari M3 ke Material 3 Expressive by Google
5. **Buat `BRAINSTORMING.md`** — dokumen detail rencana teknis project, roadmap migrasi
6. **Buat `DESIGN.md`** — dokumen spesifik untuk panduan dan token Material 3 Expressive
7. **Buat `MEMORY.md`** — file ini

### Session 2 — 2026-09-03

1. **Review ulang `BRAINSTORMING.md` & `DESIGN.md`** — baca menyeluruh, cross-check dengan referensi resmi
2. **Konfirmasi perubahan dari brainstorming:**
   - ESLint → **full Oxlint** (sudah tercatat di BRAINSTORMING.md section 3.3, tidak berubah)
   - Design system dari Material You 3 → **Material 3 Expressive by Google** (sudah benar di DESIGN.md)
3. **Fetch referensi resmi** [design.google/library/expressive-material-design-google-research](https://design.google/library/expressive-material-design-google-research) → cross-check dengan DESIGN.md
4. **Update `DESIGN.md`** — expand dengan konten yang missing:
   - Tambah section **"2. 5 Pilar Resmi M3 Expressive"** (Color, Shape, Size, Motion, Containment) — pilar resmi Google
   - Tambah section **"7. Size & Visual Hierarchy"** — size contrast principle, research data (4x faster)
   - Tambah section **"8. Containment"** — visual grouping principle, CSS implementation, spacing signal
   - Update TOC dari 12 → 15 sections
   - Update comparison table M3 Standard vs Expressive (tambah kolom Size, Containment, Usability)
   - Hapus Oxlint dari header DESIGN.md (tidak relevan, tooling bukan design concern)
5. **Konfirmasi DESIGN.md & BRAINSTORMING.md sudah sesuai** ✅
6. **Jawab 11 pertanyaan terbuka** di BRAINSTORMING.md bagian 14 — semua terjawab
7. **Update BRAINSTORMING.md** berdasarkan jawaban:
   - Section 3.4 Git Hooks → keputusan final: **Lefthook** (ganti Husky)
   - Section 8.1 Navigation → solid background (hapus backdrop-blur)
   - Section 14 → reformat jadi tabel jawaban final
8. **Update DESIGN.md** berdasarkan jawaban:
   - Section 5.1 Font → keputusan final: **Inter** (hapus Opsi B / Neutral Face)
   - Section 12.1 Nav Bar → solid `bg-surface` + icon Sun/Moon
   - Section 10.2 Elevation → nav bar solid (bukan transparent)
   - Hapus hybrid font comment dari Tailwind config
9. **Update MEMORY.md** — catat semua keputusan final

---

## Keputusan yang Sudah Final

| #   | Keputusan                     | Detail                                                                                                                                                                                  |
| --- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Layout vertical               | TETAP 100%, tidak berubah                                                                                                                                                               |
| 2   | Design system                 | Material 3 Expressive — ambil prinsipnya, panduan lengkap ada di DESIGN.md                                                                                                              |
| 3   | Seed color                    | `#D3F36A` → generate M3 tonal palette (via `@material/material-color-utilities`, replace estimasi)                                                                                      |
| 4   | Basic color tone              | Tetap sama (gelap/terang/hijau), hanya dihaluskan ke M3 Expressive                                                                                                                      |
| 5   | Data portfolio                | Data existing TIDAK BERUBAH (foto, list, judul, URL, repo semua tetap). Field `description` **ditambahkan** di Session 6 untuk copywriting card — tidak ada nilai lama yang diubah      |
| 6   | `locomotive-scroll` → `lenis` | Hapus locomotive, ganti lenis. Hasil scroll HARUS sama persis                                                                                                                           |
| 7   | `baffle` → native hook        | Hapus baffle.js, buat `useTextScramble` native. Hasil HARUS SAMA PERSIS                                                                                                                 |
| 8   | Custom cursor                 | Tetap dipertahankan, improve performance (pointermove, passive, rAF, fix `any`)                                                                                                         |
| 9   | Runtime                       | Bun (full) — ganti Node.js                                                                                                                                                              |
| 10  | Package manager               | Bun — ganti pnpm                                                                                                                                                                        |
| 11  | Halaman contact               | Ikut di-update (M3 Expressive text fields, Zod validation)                                                                                                                              |
| 12  | Global Rules                  | Diterapkan (strict TS, no `any`, immutability, input validation, zero hardcoded secrets)                                                                                                |
| 13  | Better T Stack                | Diterapkan sebagai fondasi (tsconfig strict, full Oxlint untuk linter, tetap single app)                                                                                                |
| 14  | Deployment                    | Tetap Vercel                                                                                                                                                                            |
| 15  | Linter                        | Full menggunakan Oxlint (50-100x lebih cepat, native support Next.js/React/TS)                                                                                                          |
| 16  | Font                          | Full M3 Expressive — **Google Sans Flex** (fallback: **Google Sans Text**). Hapus Kata Grotesk & Neutral Face                                                                           |
| 17  | Portfolio card                | Full M3 Expressive elevated card — hapus brutalist offset shadow                                                                                                                        |
| 18  | Theme toggle icon             | Ganti ke **Sun/Moon** (`MdLightMode` / `MdDarkMode`). Hapus `MdGraphicEq`                                                                                                               |
| 19  | Navbar background             | Awalnya solid `bg-surface` tanpa `backdrop-blur`. **Di-supersede Session 6**: header jadi `bg-transparent` + `pointer-events-none`, logo & toggle tetap solid via `pointer-events-auto` |
| 20  | Tailwind v4                   | Migrasi config JS → CSS-based `@theme`                                                                                                                                                  |
| 21  | Framer Motion                 | `framer-motion` & `motion` di-upgrade ke v13 (`^13.3.0`)                                                                                                                                |
| 22  | React 19 + Next.js 15         | `react@^19.3.0` + `next@^15.5.25` (LTS stabil, Next 16 ditahan)                                                                                                                         |
| 23  | Bun lockfile                  | **Commit `bun.lock`** ke git (reproducible builds)                                                                                                                                      |
| 24  | Monorepo                      | **Tetap single app** — tidak convert ke Turborepo                                                                                                                                       |
| 25  | Git hooks                     | **Migrasi ke Lefthook** (ganti Husky + lint-staged)                                                                                                                                     |

---

## Keputusan yang Belum Final (Pertanyaan Terbuka) — ✅ SEMUA TERJAWAB

Semua 11 pertanyaan terbuka sudah dijawab di Session 2 (2026-09-03). Lihat `BRAINSTORMING.md` bagian 14 untuk detail. Ringkasan jawaban sudah dimasukkan ke tabel keputusan final di atas (#16–#25).

---

## File yang Sudah Dimodifikasi (Di Luar Project)

| File                                            | Aksi    | Detail                                      |
| ----------------------------------------------- | ------- | ------------------------------------------- |
| `~/.agents/skills/permissioned-github/SKILL.md` | Rewrite | Zed-compatible, tambah Conventional Commits |

---

## File Project yang Sudah Dibuat/Dimodifikasi

| File                    | Aksi                                       | Detail                                                            |
| ----------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| `htma/BRAINSTORMING.md` | Created (S1), Confirmed (S2), Updated (S6) | Rencana detail update portfolio — final                           |
| `htma/DESIGN.md`        | Created (S1), Expanded (S2), Updated (S6)  | Panduan M3 Expressive — tambah 3 section baru (15 sections total) |
| `htma/MEMORY.md`        | Created (S1), Updated (S2), Updated (S6)   | File ini                                                          |

---

### Session 3 — 2026-09-15

1. **Eksekusi Phase 0 — Runtime Migration (pnpm → Bun)**:
   - Hapus `pnpm-lock.yaml` dan `pnpm-workspace.yaml`
   - Update `package.json` (`packageManager`: `bun@1.4.2`, `engines`: `bun >= 1.1.0`, script `lint:fix` pnpm → bun)
   - Update `.husky/commit-msg` & `.husky/pre-push` ke `bun run`
   - Generate `bun.lock` (text-based Bun 1.2+ lockfile) via `bun install`
   - Verifikasi sukses: `bun run typechecks` (0 error), `bun run lint` (0 error), `bun run build` (sukses)
2. **Commit Phase 0 & Cabang Backup**:
   - Commit: `71eceea feat: migrate runtime and package manager to bun`
   - Buat branch baru: `feat/migrate-bun` (mengunci snapshot hasil migrasi Bun murni)
   - Tetap di branch aktif: `feat/portfolio-update` untuk melanjutkan Phase 1

### Session 4 — 2026-09-15

1. **Integrasi Agent Skills Suite ke Perencanaan**:
   - Evaluasi menyeluruh via `using-agent-skills`.
   - Mengadopsi 5 skills kunci: `source-driven-development`, `constraint-driven-development`, `planning-and-task-breakdown` + `incremental-implementation`, `frontend-ui-engineering`, `doubt-driven-development`.
   - Update `BRAINSTORMING.md`:
     - Tambah Section 3.7 _Quality Constraints Contract_ (non-negotiables).
     - Refactor Section 13 Roadmap menjadi _vertical slices_ terverifikasi.
   - Update `DESIGN.md`:
     - Menghasilkan dan mengunci nilai hex M3 Expressive akurat dari seed `#D3F36A` via `@material/material-color-utilities`.
2. **Double-Check Mitigations (Doubt-Driven Development)**:
   - _Zustand & next-themes_: Wajib upgrade `next-themes@^0.4.4` & `zustand@^5.0.0` untuk peer compatibility React 19.
   - _Tailwind v4 Token Aliasing_: Tambahkan alias backward-compatible (`--color-custom-black`, dll) di `@theme` agar 51 file UI lama tidak rusak.
   - _Phased Locomotive Removal_: Tahan `locomotive-scroll` di Phase 1, baru di-uninstall di Slice 2.1 setelah Lenis terpasang.
3. **Pemetaan Lead Skills per Fase**:

| Fase        | Fokus                                                | Lead Skills                                                | Gate Verifikasi                                               |
| ----------- | ---------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| **Phase 0** | Runtime Migration                                    | `incremental-implementation`                               | ✅ DONE (`bun.lock`, build OK)                                |
| **Phase 1** | Foundation (Next 15, React 19, Tailwind v4, Oxlint)  | `source-driven-development` + `incremental-implementation` | `bun install`, `bun run lint` (0 error), `bun run typechecks` |
| **Phase 2** | Core Components (Lenis, Scramble, Cursor)            | `doubt-driven-development` + `frontend-ui-engineering`     | Visual & feel parity check 100%                               |
| **Phase 3** | Home Sections (M3 Cards, Hero, About, Skills, Modal) | `frontend-ui-engineering`                                  | M3 tokens, responsive, WCAG AA                                |
| **Phase 4** | Contact Page (Zod & M3 Text Fields)                  | `frontend-ui-engineering` + `security-and-hardening`       | Zod validation edge cases                                     |
| **Phase 5** | Polish, SEO & Launch                                 | `performance-optimization` + `shipping-and-launch`         | Lighthouse >= 90 semua metrik, production build               |

---

### Session 5 — 2026-09-20

1. **Phase 1 — Slice 1.3 (Migrasi Tailwind CSS v4 & M3 Expressive Palette)**:
   - **Upgrade Engine**: `tailwindcss@4.3.3` & `@tailwindcss/postcss@4.3.3` dipasang via Bun.
   - **Pruning**: `autoprefixer` dan `tailwind.config.js` dihapus total (Tailwind v4 sepenuhnya CSS-first, vendor prefixing & minification ditangani oleh Lightning CSS engine bawaan).
   - **PostCSS Setup**: `postcss.config.js` dimigrasikan ke `@tailwindcss/postcss: {}`.
   - **Prettier Plugin**: `.prettierrc.js` disesuaikan untuk Tailwind v4 (`tailwindStylesheet: './src/styles/globals.css'`).
   - **M3 Expressive @theme**: `src/styles/globals.css` menggunakan `@import 'tailwindcss';`, `@custom-variant dark (&:where(.dark, .dark *));`, serta blok `@theme` lengkap yang memetakan seluruh role M3 Expressive ke CSS variables `:root` dan `.dark` dari seed `#D3F36A`.
   - **Backward-Compatible Aliases**: Token lama (`custom-black`, `custom-white`, `custom-white-2`, `custom-green`, `custom-blue`, `lime`) dialiaskan di dalam `@theme` ke CSS variables M3 baru, sehingga 51 komponen lama tetap tampil konsisten tanpa perubahan kode.
   - **Verifikasi Kualitas**: `bun run format:check` (pass), `bun run typechecks` (0 error), `bun run lint` (0 error, Oxlint 33ms), `bun run build` (pass 5.7s, 6/6 static pages). Commit `987a207`.
2. **Phase 1 — Slice 1.4 (Typography Setup — Google Sans Flex & Next.js 15 Best Practices)**:
   - **Resolusi Font Google Sans Flex**:
     - Hapus total 6 file font legacy (`KataGrotesk-*.woff2` & `NeutralFace*.woff2`) dan file slicing rusak.
     - Muat Google Sans Flex variable font resmi via Google Fonts CDN `@import url(...)` di `src/styles/globals.css` (mencakup seluruh unicode-range latin & seluruh sumbu variable `wght 100–1000` & `opsz 6–144`).
     - Bind `--font-sans`, `--font-display`, `--font-body`, serta selector `html, body` langsung ke `'Google Sans Flex', 'Google Sans Text', system-ui, -apple-system, sans-serif`.
     - `src/utils/localFont.ts` diekspor sebagai `{ className: 'font-sans', variable: '--font-sans' }`, dan seluruh 8 komponen direfactor ke nama bersih `googleSansFlex` tanpa menyisakan variabel lama.
   - **Implementasi Best Practices Next.js 15 App Router (Context7 Audit)**:
     - `src/components/ui/next-image.tsx`: Hapus legacy `layout="fill"`, ganti dengan boolean prop `fill?: boolean`, bersihkan eslint suppression.
     - `src/app/not-found.tsx`: Buat custom 404 Not Found page berstandar M3 Expressive.
     - `src/app/global-error.tsx`: Buat root global error boundary lengkap dengan tag `<html>` & `<body>`.
     - Metadata routes dinamis native TypeScript: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`.
   - **Verifikasi Kualitas**: `format:check` (pass), `typechecks` (0 error), `lint` (0 error, Oxlint 44ms), `build` (pass 5.1s, 9/9 static pages). Commit `f6893a6` & `4694f6e`.
3. **Phase 2 — Slice 2.1 (Locomotive Scroll → Native Lenis Migration)**:
   - **Lead Skill**: `doubt-driven-development` + `frontend-ui-engineering` (diaktifkan).
   - Refactor `src/components/ui/page-wrapper.tsx` menggunakan `Lenis` native dengan konfigurasi identik (`lerp: 0.06`, `smoothWheel: true`), loop `requestAnimationFrame`, serta cleanup lifecycle `lenis.destroy()` dan `cancelAnimationFrame(rafId)` saat unmount untuk mencegah memory leak.
   - Import default styles `lenis/dist/lenis.css` ke dalam `src/styles/globals.css`.
   - Hapus paket `locomotive-scroll` dari `package.json` dan `bun.lock` (1 package removed).
   - Update `BRAINSTORMING.md` dan `MEMORY.md` menandai Phase 1 selesai penuh (100%).
   - **Verifikasi Kualitas**: `format:check` (pass), `typechecks` (0 error), `lint` (0 error, Oxlint 32ms), `build` (pass 7.4s, 9/9 static pages). Commit `ef733db`.
4. **Phase 2 — Slice 2.2 (Native `useTextScramble` Hook — Eliminasi `baffle`)**:
   - **Lead Skill**: `doubt-driven-development` + `frontend-ui-engineering` (diaktifkan).
   - Buat `src/hooks/useTextScramble.ts` native React/TS hook dengan pengelolaan lifecycle ketat (`intervalsRef` & `timeoutsRef` dibersihkan otomatis pada unmount) untuk mencegah memory leak.
   - Refactor `src/components/hero/hero.tsx` untuk memanggil `useTextScramble` dengan efek visual dan timing yang identik (`characters: 'xxxxxxxxxxxx'`, `speed: 100`, `revealDuration: 1000`, `revealDelay: 100`).
   - Hapus file wrapper `src/hooks/useBaffle.ts`.
   - Hapus deklarasi modul `declare module 'baffle';` dari `types.d.ts`.
   - Uninstall dependensi `baffle` dari `package.json` dan `bun.lock` (1 package removed).
   - **Verifikasi Kualitas**: `format:check` (pass), `typechecks` (0 error), `lint` (0 error, Oxlint 28ms), `build` (pass 6.8s, 9/9 static pages). Commit `c4380aa`.
5. **Phase 2 — Slice 2.3 (Custom Cursor Optimization)**:
   - **Lead Skill**: `doubt-driven-development` + `frontend-ui-engineering` (diaktifkan).
   - Refactor `src/hooks/useCursorPosition.ts`:
     - Ganti event `mousemove` ke `pointermove` dengan `{ passive: true }`.
     - Pisahkan event capture dari state update menggunakan `requestAnimationFrame` throttle (maksimal 1 update per frame, menghemat cycle pada mouse 1000Hz+).
     - Hapus total tipe `any` dan supresi linter; gunakan `PointerEvent` yang type-safe.
     - Tambahkan guard `window.matchMedia('(pointer: coarse)').matches` agar event listener tidak dipasang pada perangkat layar sentuh/mobile.
     - Sesuaikan centering offset ke 12px (`clientX - 12`, `clientY - 12`) menyesuaikan ukuran kursor 24px (`h-6 w-6`).
   - Sempurnakan `src/components/ui/custom-cursor.tsx`: Tambahkan atribut `aria-hidden="true"` agar elemen visual dekoratif diabaikan oleh screen reader (WCAG AA accessibility).
   - Sempurnakan `.cursor` di `src/styles/globals.css`: Reset anchor coordinates ke `left: 0; top: 0;` dan sembunyikan otomatis pada touch devices via `@media (pointer: coarse) { display: none; }`.
   - **Verifikasi Kualitas**: `format:check` (pass), `typechecks` (0 error), `lint` (0 error, Oxlint 33ms), `build` (pass 5.9s, 9/9 static pages). Commit `2c56188`.
6. **Phase 2 — Slice 2.4 (Layout & Navigation: M3 Surface & Sun/Moon Toggle)**:
   - **Lead Skill**: `doubt-driven-development` + `frontend-ui-engineering` (diaktifkan).
   - Refactor `src/components/navigation/navigation.tsx`:
     - Ganti icon equalizer `MdGraphicEq` dan rotated text dengan icon **Sun/Moon** modern (`MdLightMode` & `MdDarkMode`) dalam M3 rounded-full icon button.
     - Tambahkan `aria-label="Switch to light/dark mode"` untuk kepatuhan aksesibilitas WCAG AA.
     - Perbarui logo badge "HTMA" dengan M3 `rounded-xl`, tracking, dan contrast hover states.
     - Tetapkan header background solid `bg-surface` dengan `border-b border-outline-variant/30`.
   - Refactor `src/components/layout/layout-wrapper.tsx`:
     - Ganti `bg-custom-white-2 dark:bg-custom-black` pada `mask-top` dan `mask-bottom` dengan semantic M3 token `bg-surface`.
   - **Verifikasi Kualitas**: `format:check` (pass), `typechecks` (0 error), `lint` (0 error, Oxlint 24ms), `build` (pass 3.8s, 9/9 static pages).

---

### Session 6 — 2026-09-23

1. **Penyelesaian Slice 3.3 (Skills Section)** — M3 Surface Container Low cards, optical weight balancing, magnetic hover feedback.
2. **Custom Cursor — Smooth Fluid Shrink + Magnetic Parallax** (commit `f69acd5`):
   - Kursor dot menyusut fluid ke dalam elemen interaktif (`scale 1 → 0`, `opacity 1 → 0`) via spring M3 (`stiffness: 350, damping: 26`).
   - Magnetic parallax pada elemen hover (`translate(var(--parallax-x), var(--parallax-y))` maks 3.5px).
   - Umpan balik tekanan `scale(0.85)` saat `mousedown`.
3. **Two-Stage Section Header Interaction** (commit `b681783`):
   - Tahap 1: kursor masuk area section → pill judul aktif (`bg-primary-container`), panah `-rotate-45`, kursor dot tetap bebas.
   - Tahap 2: kursor ke pill judul → dot menyusut masuk ke pill.
   - Diterapkan di `about.tsx`, `skills.tsx`, dan kemudian `portfolio.tsx`.
4. **Header Transparan + Hero Diperlebar** (commit `5cc2e39`):
   - Header: `bg-surface` + `border-b` → `bg-transparent` + `pointer-events-none`. Logo & toggle `pointer-events-auto`.
   - Tombol toggle diberi `bg-surface-container-high` + `shadow-sm` agar tetap kontras.
   - Gradient mask atas (`mask-top`) dihapus dari `layout-wrapper.tsx` — konten scroll dari ujung atas viewport.
   - Hero grid: `lg:col-start-2 lg:col-end-5` → `lg:col-start-1 lg:col-end-5` (4 kolom).
5. **Dokumentasi sinkron** (commit `6611c43`) — update `BRAINSTORMING.md` Section 8.3/8.4/8.5/8.9 dan `DESIGN.md` Section 12.3/12.11.
6. **Slice 3.4 — Portfolio Section & Modal** (kode selesai, **belum di-commit**):
   - Card → **M3 Filled Card** mengikuti referensi desain card (light & dark): `bg-surface-container`, radius `24px` → hover `28px` → active `16px`, thumbnail `rounded-[inherit]` rasio `16/9`, content `p-6` + `text-left`.
   - **Bug ditemukan**: `<button>` punya `text-align: center` bawaan UA stylesheet → judul/deskripsi jadi center. Diperbaiki dengan `text-left`.
   - **Grid diperbaiki**: `md:grid-rows-[10]` (CSS invalid, baris pertama jadi 10px) + bento span hardcoded membuat card terhimpit (gambar 55px, teks 5 baris) → diganti `md:grid-cols-2` + auto rows, card index 0 `md:col-span-2`.
   - **Modal** → M3 Basic Dialog: elemen native `<dialog open inert>` (lolos rule `jsx-a11y(prefer-tag-over-role)`), radius 28px, scrim `bg-on-surface/32`, tombol Demo `bg-primary` / Repository `bg-secondary-container`, close button `h-11 w-11 rounded-full`.
   - **Copywriting**: field `description` ditambahkan ke `IPortfolio` (`types.d.ts`) + `portfolio-data.ts` untuk 7 project.
   - **Cleanup**: `src/components/ui/svg/ArrowSVG.tsx` dihapus (tidak ada caller setelah bottom-bar card lama diganti).
   - **Verifikasi**: `lint` ✅ `typechecks` ✅ `format:check` ✅ `build` 9/9 ✅, plus verifikasi runtime via CDP (resting/hover/pressed, modal open/close, cursor merge).
7. **Ukuran Custom Cursor 24px → 40px**:
   - Token `--cursor-size: 2.5rem` di `:root` (disamakan tombol toggle tema `h-10 w-10`).
   - Offset centering di `useCursorPosition.ts` dibaca dari `offsetWidth` elemen `.cursor` (bukan hardcode `-12`) agar tidak drift saat ukuran diubah.
   - Catatan: pendekatan `@property --cursor-size` dicoba tapi tidak resolve ke px di dev (Lightning CSS), sehingga `offsetWidth` dipilih.

8. **Slice 3.5 — Sidebar & Footer** (keputusan user: rail `bg-surface-container-highest`, buang underline, perf fix digabung):
   - **Sidebar rail**: `lg:rounded-t-full lg:bg-custom-black` / `dark:lg:bg-custom-green` → `lg:rounded-t-[28px] lg:bg-surface-container-highest`. Varian `dark:` dihapus (token auto-switch).
   - **Sidebar links**: active jadi M3 Active Indicator `bg-primary-container text-on-primary-container rounded-full px-4 py-1.5`; inactive `text-on-surface-variant hover:bg-on-surface/8`; tipografi `text-label-lg`.
   - **`globals.css`**: blok `.menu-link` (animasi underline, ~48 baris) dihapus — sudah diverifikasi hanya dipakai `sidebar-link.tsx`.
   - **Scroll-top FAB**: `rounded bg-custom-black` → `rounded-xl bg-primary-container text-on-primary-container`, hover `-translate-y-1 shadow-md`, plus `focus-visible:outline-2` dan `aria-label`.
   - **Footer**: teks `text-body-sm text-on-surface-variant`, brain `text-tertiary` (sebelumnya hardcoded `text-red-400`). `border-t` **tidak** ditambahkan (Portfolio sudah `border-b`).
   - **BUG DITEMUKAN & DIPERBAIKI**: rule magnetic parallax di `globals.css` bersifat unlayered → mengalahkan utility `translate-*` Tailwind di `@layer utilities` (unlayered selalu menang atas layered). Akibatnya `translate-y-[999px]` pada FAB tidak pernah aktif dan FAB **selalu terlihat** sejak Session 6. Fix: atribut opt-out `data-no-magnetic` + selector `:not([data-no-magnetic])`.
   - **Perf fix scroll listener**: `setScrollPosition(window.scrollY)` tiap event → state diganti boolean `isVisible`; listener pakai `{ passive: true }`.
   - **Verifikasi runtime**: light mode rail `#E5E5E0` / active `#D0EF67`+`#171E00` / inactive+footer `#46483C` / brain `#3A665E`; dark mode rail `#353530` / active `#3D4D00`+`#D0EF67` / brain `#A1D0C5`. Siklus FAB terverifikasi: top `translate: 0px 999px` (di luar viewport) → scroll 2000 `translate: none` (terlihat) → klik → `scrollY: 0` (tersembunyi lagi).

### Session 7 — 2026-09-23

1. **Slice 4.1 — Zod Schema & Validation**:
   - File baru `src/utils/contact-schema.ts` — `contactSchema` + `export type ContactFormValues = z.infer<typeof contactSchema>`.
   - Setiap field `trim()` → `min(1, '… is required')` → `max(...)`: nama 80, email 254, subjek 120, pesan 2000. Batas panjang menjaga payload ke endpoint template publik tidak bisa digelembungkan.
   - **Email divalidasi dengan `.pipe(z.email({ message }))`, bukan `.email()`.** Zod 4.6.5 (versi terpasang) sudah menandai `z.string().email()` **deprecated** — `node_modules/zod/v4/classic/schemas.d.cts:113` → `@deprecated Use z.email() instead.`. Bentuk `pipe` dipilih karena `z.email()` adalah format check: kalau dirantai langsung (`z.email().trim()`), `trim()` jalan **setelah** cek format sehingga email berpadded spasi akan ditolak. Dengan `z.string().trim().min().max().pipe(z.email())`, trim jalan lebih dulu.
   - Perilaku terverifikasi: `"  a@b.co  "` → lolos (jadi `a@b.co`), `"   "` → "Email is required", `"nope@"` → "Enter a valid email address", >254 char → pesan panjang.
2. **Slice 4.2 — M3 Text Fields & UI**:
   - `src/components/ui/input-form.tsx` ditulis ulang jadi **M3 Filled Text Field**: container `bg-surface-container-highest rounded-t-xs border-b-2 border-outline` + `focus-within:border-b-primary`, input `px-4 pt-6 pb-2 text-body-lg text-on-surface bg-transparent outline-none` (total tinggi 56px), label absolute yang terangkat dari `text-label-lg text-on-surface-variant` ke `text-label-sm`.
   - **Floating label tanpa state JS**: `placeholder=' '` pada field + varian arbitrary `peer-[:placeholder-shown:not(:focus)]:` untuk posisi istirahat. Bentuk `:placeholder-shown:not(:focus)` dipilih supaya aturan istirahat dan aturan fokus tidak pernah bertabrakan (tidak bergantung urutan variant Tailwind). Terverifikasi di CSS hasil build.
   - State error: indicator + label `text-error`, helper text `text-body-sm text-error` di bawah field; `aria-invalid` + `aria-describedby` menunjuk ke id helper. Label sekarang benar-benar terhubung ke input lewat `htmlFor={id}` + `useId()` (sebelumnya label tanpa asosiasi apa pun).
   - `forwardRef` diperbaiki: `forwardRef<unknown, …>` → `forwardRef<RefType, …>` (RefType = `HTMLInputElement | HTMLTextAreaElement`), cast ke `LegacyRef<T>`; `displayName` dipertahankan (Fix 4 BRAINSTORMING).
   - `contact-form.tsx`: `useState` status manual dibuang, diganti `react-hook-form` + `zodResolver(contactSchema)` dengan `isSubmitting` dari `formState`. Tombol Send jadi M3 Filled Button (`rounded-full px-8 py-3 text-label-lg font-medium bg-primary text-on-primary`, `hover:bg-primary/92 hover:shadow-md active:scale-95`) + spinner in-button (`size-4 animate-spin border-2 border-current border-t-transparent`). Form pakai `noValidate` supaya validasi browser bawaan tidak menimpa pesan Zod.
   - `contact.tsx`: header lama (hover hitam) diganti **two-stage section header** yang identik dengan About/Skills/Portfolio (`section-header magnetic-item group/header`, pill `bg-primary-container`), plus subtitle `text-body-lg text-on-surface-variant` dan border `border-outline-variant`.
   - Grid Name/Email: `gap-y-4` → `gap-4` (kolom sebelumnya saling menempel tanpa jarak horizontal).
3. **Cleanup**: interface global `Inputs` dihapus dari `types.d.ts` — sudah tanpa konsumen setelah `ContactFormValues`.
4. **Temuan Session 7**:
   - **`cursor-not-allowed` pada tombol disabled tidak pernah aktif** — rule global `@media (pointer: fine) { * { cursor: none !important } }` (DESIGN 12.11) selalu menang. Bukan regresi; dua spesifikasi DESIGN memang bertabrakan di titik ini. Dibiarkan sesuai DESIGN.
   - **`.env.local` tidak ada di lokal**, jadi `NEXT_PUBLIC_EMAILJS_*` `undefined` dan submit apa pun langsung jatuh ke toast "Something went wrong". Diisi lewat environment platform saat deploy.
   - **`bun run build` tidak boleh jalan bersamaan dengan `next dev`** — keduanya berbagi `.next`; build menghapus `_buildManifest.js` milik dev, dev lalu spamming `ENOENT` dan berhenti melayani halaman. Hentikan dev dulu, baru build (dan restart dev setelahnya).
   - **Bundle `/contact` = 121 kB (First Load 305 kB)**, naik karena zod + react-hook-form + resolvers. Perlu ditinjau di Phase 5 kalau Lighthouse Performance turun.
5. **Perbaikan susulan — tipografi kartu portfolio responsif** (permintaan user: header & description kartu seksi terlalu besar di mobile & tablet):
   - **Masalah terukur**: di viewport 390px kartu portfolio hanya **197px** lebar (grid `mx-4` + kolom konten ~229px), sehingga content inner = **149px** — sementara title tetap 22px (`text-title-lg`) dan memaksa wrapping berat. Lebar kartu membesar murni mengikuti viewport: `card ≈ vw - 183` selama masih satu kolom (`<768px`), lalu lompat ke dua kolom di `md:`. Titik nyaman title 22px adalah content inner ≥ ~260px (kartu ≥ ~310px), yang baru tercapai di `vw ≈ 490px`.
   - **Solusi**: title `text-title-lg` → `text-title-md sm:text-title-lg` (16px → 22px) dan desc `text-body-md` → `text-body-sm sm:text-body-md` (12px → 14px). Breakpoint `sm:` (640px) dipilih karena sudah jadi langkah standar di proyek ini (`skills`, `section header`) — container query sengaja **tidak** dipakai supaya tidak lahir konvensi kedua.
   - **Verifikasi runtime**: 360/390/600px → title `16px/24px` + desc `12px/18px`; 640/768/1024/1440px → title `22px/33px` + desc `14px/21px`. Judul tetap satu baris di 360px. Screenshot mobile 390px & tablet 768px diperiksa visual. Commit `01decd0`.
   - **Modal card tidak diubah** — title-nya sudah responsif (`text-4xl md:text-5xl`).
   - **Catatan sisa**: `p-6` pada content block masih memakan 48px dari 197px (24%) di mobile. Kalau masih terasa kurang proporsional, lever berikutnya adalah padding responsif (`p-4 sm:p-6`), bukan ukuran teks lagi.
6. **Audit menyeluruh tipografi responsif** (permintaan user: "cek text size seluruh component, sudah responsive semua belum", dengan syarat **breakpoint ikut standar Tailwind**):
   - **Breakpoint dikonfirmasi dari docs resmi** `https://tailwindcss.com/docs/responsive-design` (Tailwind v4): `sm` 40rem/640px, `md` 48rem/768px, `lg` 64rem/1024px, `xl` 80rem/1280px, `2xl` 96rem/1536px. Proyek **tidak** mendefinisikan `--breakpoint-*` di `@theme` (grep `breakpoint` di `globals.css` = 0 hasil), jadi murni default Tailwind. Semua variant yang dipakai (`sm:`/`md:`/`lg:`/`2xl:`) sudah standar — tidak ada breakpoint kustom.
   - **Sudah responsif sebelum audit**: hero "hello, I'm" (`text-xs md:text-sm lg:text-title-md`), hero "hutama" (`text-xl md:text-3xl lg:text-display-md 2xl:text-display-lg`), hero socials (`text-label-lg md:text-title-sm`), About body (`text-body-md md:text-body-lg`), kartu portfolio (commit `01decd0`), modal title (`text-4xl md:text-5xl`), footer icon (`text-xl md:text-2xl`), halaman error (`text-lg md:text-2xl`).
   - **4 body copy yang masih fixed 16px → disamakan** ke konvensi About: `text-body-md md:text-body-lg` (14px mobile → 16px `md:`). Target: paragraf GitHub di `portfolio.tsx`, subtitle di `contact.tsx`, description di `modal-card.tsx`, body di `not-found.tsx`. Verifikasi terukur: 390px = 14px/21px, 768px+ = 16px/24px di keempatnya.
   - **Sengaja TIDAK diubah + alasan**: (a) **input form `text-body-lg` 16px fixed** — di bawah 16px iOS Safari auto-zoom saat field difokuskan, jangan pernah diturunkan; (b) section header `text-headline-sm` 24px — spec DESIGN 7.2, teks pendek dan tetap 1 baris di 390px; (c) subheading skills `text-title-md` 16px; (d) label/helper form dan sidebar link (`text-label-lg`, `text-body-sm`); (e) footer text `text-body-sm` 12px — spec 7.2 de-emphasize; (f) nav logo `text-title-md`.
   - **Pitfall pengukuran**: hero pakai `-rotate-90` di bawah `lg:`, jadi `getBoundingClientRect()` melaporkan lebar/tinggi tertukar (H1 "hello, I'm" terbaca `w=16px`). Metrik `width`/`lines` **tidak valid** untuk elemen dalam ancestor ber-transform — deteksi lewat `DOMMatrixReadOnly(transform).b`. Selain itu `tab.run` **tidak menangkap closure**, jadi argumen harus di-embed ke string kode atau lewat `{ args: [...] }`.
   - **Temuan non-tipografi (belum diperbaiki)**: `not-found.tsx` masih memakai token legacy (`custom-black`, `custom-white-2`, `custom-green`, `rounded-xl`) dan `error.tsx` masih `custom-*` + `shadow-custom-shadow` — belum ikut migrasi M3; `global-error.tsx` memakai hex mentah (`#fdfcfa`, `#d0ef67`) dan bukan token. Kandidat Phase 5.
   - **DESIGN.md** mendapat section baru **7.4 Breakpoint Standar & Inventaris Tipografi Responsif**: tabel breakpoint + sumber docs, konvensi body copy, inventaris yang scaling, dan tabel "sengaja tidak scaling + alasan". Spec per-komponen (12.4 About, 12.6 GitHub paragraph, 12.7 Modal, 12.10 Contact) ikut disinkronkan.

### Session 8 — 2026-09-24

1. **Migrasi token legacy ke peran M3** (commit `948742d`):
   - `globals.css`: alias `custom-black`, `custom-green`, `custom-white-2`, `custom-shadow` dihapus, plus `.loader` (ring 3 div ber-border + keyframes `spin`) dan `.text-outline` hardcoded. Sekarang hanya satu skema penamaan: peran M3.
   - Pemetaan caller: `text-red-500` → `text-error`; tombol high-emphasis → `bg-on-surface text-primary-container` (light) dan `dark:enabled:bg-primary dark:enabled:text-surface` (dark); disabled → `bg-on-surface/[0.12] text-on-surface/[0.38]` (opasitas M3 12%/38%, bukan alias 50%); skeleton → `dark:bg-primary/40`; logo nav → `bg-on-surface text-primary-container` + `dark:bg-primary dark:text-surface`; radius tombol `rounded-xl` → `rounded-full` mengikuti spec Filled Button.
   - `global-error.tsx`: Next.js **tidak memuat stylesheet app ke root error boundary**, jadi alias legacy memang tidak pernah resolve di sana. Gaya sekarang self-contained di konstanta `globalErrorStyles`, keyed ke `prefers-color-scheme` — kelas `.dark` juga tidak tersedia di boundary ini. Komentar header file menjelaskan alasannya supaya tidak "diperbaiki" jadi utility Tailwind lagi.
2. **Indikator loading M3 Expressive** (commit `c1afe20`):
   - File: `src/components/ui/loading-spin.tsx` (render loop) + `loading-spin-shapes.ts` (data bentuk) — keduanya baru; loader CSS lama diganti seluruhnya.
   - Spec yang diterapkan: loop **7 bentuk M3** berurutan, morph tiap **650ms**, rotasi konstan **50deg per bentuk** + settle spring **90deg** (stiffness 200, damping ratio 0.6), box **48dp** dengan bentuk **38dp** (rasio 0.79).
   - **`loading-spin-shapes.ts`**: 7 outline di-flatten ke sampel cubic, lalu **didistribusikan ulang ke `POINTS_PER_SHAPE` ray yang sama** sehingga semua bentuk punya jumlah titik dan sudut identik (prasyarat lerp titik-per-titik). Oval (indeks 6) tidak punya path di referensi → digenerate dari fungsi radialnya.
   - **Kenapa canvas, bukan CSS/SVG**: morph M3 me-lerp titik searah antar bentuk; interpolasi `d` CSS tidak bisa karena outline beda jumlah cubic dan beda titik awal. Konsekuensi: canvas tidak mewarisi warna → `--color-primary` dibaca dari computed style dan dibaca ulang saat tema ditukar lewat `MutationObserver`. Delta frame di-clamp 100ms supaya tab yang lama di-background tidak melanjutkan dengan satu lompatan besar.
   - `prefers-reduced-motion`: bentuk diam di indeks 0 dan hanya fade (rotasi + morph yang memicu vestibular).
   - A11y: elemen `progress` indeterminate tetap dirender untuk assistive tech; canvas sendiri `aria-hidden`.
3. **Verifikasi runtime (Chromium + dev server)**:
   - Boundary `app/loading.tsx` ter-mount saat navigasi klien; canvas menggambar (`filled > 0`), hash frame **berubah** antar sampel 360ms (animasi hidup), backing store 48×48 px = `h-8` (32px) × dpr 1.5.
   - Warna mengikuti token persis di kedua tema, termasuk saat kelas tema ditukar **selagi canvas hidup**: light `#526600` → rata-rata piksel (82,102,0); dark `#b4d34e` → (180,211,78).
   - Halaman 404: `on-surface` (228,227,218), `on-surface-variant` (199,200,184), `primary-container` (224,230,196) di dark — migrasi peran M3 terbukti tampil.
4. **Pitfall Session 8**:
   - **`page.emulateNetworkConditions` di puppeteer terpasang memakai field `download`/`upload`**, bukan `downloadThroughput`/`uploadThroughput`; nama lama gagal dengan `Failed to deserialize params.downloadThroughput`.
   - **Loading boundary tidak muncul di navigasi klien berulang**: Next sudah prefetch `/contact` sehingga navigasi instan. Harus pakai tab **dingin** (tutup lalu buka lagi) + throttle jaringan (latency 4–5s) supaya boundary bertahan cukup lama untuk disampel.
   - **next-themes langsung resolve ke dark di Chromium headless** (`prefers-color-scheme: dark`), jadi uji tema terang wajib melepas kelas `dark` eksplisit — jangan mengandalkan default.
   - Catatan Session 7 "token legacy belum diperbaiki di `not-found.tsx`/`error.tsx`/`global-error.tsx`" **sudah selesai** di Session 8 (poin 1); catatan lama di Session 7 sengaja dibiarkan sebagai jejak.

### Session 9 — 2026-09-24

1. **Security headers statis** (`next.config.ts`, commit `4aa5eff`):
   - `headers()` mengembalikan 5 header untuk `/:path*`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/microphone/geolocation/browsing-topics dimatikan), dan CSP minimal `base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'`.
   - **CSP sengaja TANPA `script-src`/`style-src`**: inline script `next-themes` butuh nonce, dan `script-src` tanpa nonce akan mematikan tema. Ceiling ini ditulis sebagai komentar di file supaya tidak "dilengkapi" tanpa nonce.
   - Verifikasi runtime: `curl -D - http://127.0.0.1:3000/` → `HTTP/1.1 200 OK` + kelima header tampil apa adanya.
   - **Rate limiting TIDAK diimplementasikan (ditunda)**: form memanggil endpoint EmailJS langsung dari browser dengan public key, jadi throttle di klien tidak mengikat penyerang. Mitigasi nyata butuh route server + KV/edge store. Aktifkan kalau spam terbukti di produksi.
2. **Override PostCSS 8.5.28** (`package.json` → `overrides`, commit `bdcfe3d`):
   - Sebelum override, `next` memakai salinan transitif `postcss@8.4.31` (entri `next/postcss` di lockfile) — ini yang kena advisory.
   - Setelah `"overrides": { "postcss": "8.5.28" }`: entri `next/postcss` hilang dari `bun.lock`, dan di `node_modules` hanya tersisa satu instalasi `postcss@8.5.28` di top-level (tidak ada `node_modules/**/node_modules/postcss`).
   - `bun audit` → **No vulnerabilities found (checked 276 packages)**.
   - `bun run build` tetap lulus (9/9 static pages) — Tailwind v4 / Lightning CSS tidak terpengaruh.
3. **Oxlint diperketat** (`.oxlintrc.json`, commit `f62e815`):
   - Plugin: `typescript`, `react`, `nextjs` → ditambah `unicorn`, `oxc`, `jsx-a11y`.
   - Kategori: `suspicious` dan `perf` jadi `warn`; rule error baru `nextjs/no-head-element`, `nextjs/no-async-client-component`, `react/no-children-prop`, `typescript/no-floating-promises`.
   - Gerbang `bun run lint:strict` (`oxlint --deny-warnings`) → 0 error, 0 warning.
4. **Sinkronisasi dokumen dengan realitas (drift audit)** (commit dokumen ini):
   - `BRAINSTORMING.md`: `bun.lockb` → `bun.lock` (§2.2, §2.5, §9.2, §12); blok script §2.3 disamakan dengan `package.json` nyata (`build --turbopack`, `lint:fix`, `lint:strict` = `--deny-warnings`, tanpa `prepare: husky`); §2.6/§2.7 "Husky/lint-staged kompatibel" diganti catatan migrasi Lefthook; blok `.oxlintrc.json` di §3.3 disalin dari file asli; kontrak §3.7 → gate `Lint Quality` lewat `lint:strict` + baris baru **Security Headers**.
   - `MEMORY.md`: baris keputusan #23 → `bun.lock`; Session 8 sudah tercatat di commit `a7d4b56`.
5. **Verifikasi akhir Session 9**: `format:check` ✅, `lint:strict` ✅ (0 warning), `typechecks` ✅ (0 error), `build` ✅ 9/9 static pages. Dev server dihentikan lebih dulu sebelum build (aturan Session 7).

### Session 10 — 2026-09-24

1. **M3 Expressive Loading Skeletons & Hydration Stabilization (Slice 5.0c)** (commit `758168f`):
   - `globals.css`: implementasi efek M3 Expressive loading placeholder skeleton wave dengan `--skeleton-wave-span: 40vw` dan `background-attachment: fixed` (viewport-anchored sweep). Seluruh skeleton di halaman disapu secara serempak dengan satu gelombang on-surface tint, dengan fallback per-block sweep untuk browser non-fixed attachment (iOS Safari).
   - `loading-skeleton.tsx`: dijadikan elemen murni dekoratif dengan `aria-hidden="true"` dan class `.skeleton`.
   - `src/modules/home-page/home-content.tsx`: komponen hydration gate (`isClient` dari Zustand). Menampilkan placeholder skeleton struktural sebelum hidrasi yang mencerminkan padding, border, grid mode, dan line height section asli (About, Skills, Portfolio, Footer). Dilengkapi atribut `aria-busy="true"` pada kontainer root skeleton untuk assistive technology.
   - `src/components/hero/*`: penyesuaian bentuk placeholder (`rounded-full`, `rounded-3xl` rasio 136/230 pada logo) serta penambahan state `aria-busy={isClient ? undefined : true}` pada hero container saat SSR.
   - `src/hooks/useTextScramble.ts`: layout width (`offsetWidth`) dipin ke style `minWidth` selama animasi teks scramble berjalan agar tidak memicu horizontal layout shift/jitter.
   - `src/components/ui/input-form.tsx`: penambahan M3 state layer `before:bg-on-surface/8` dengan opacity transition saat hover.
   - `src/components/sidebar/sidebar-link.tsx`: penyesuaian ketebalan font rail link menjadi `font-medium` (`text-label-lg font-medium`).
2. **Hasil Pengukuran Layout Shift Hidrasi**:
   - `768px`, `1024px`, `1440px`, `1920px`: **0px delta** (`dBody: 0`, `dMain: 0`, `dTop: 0`). Presisi sempurna antara pre-hidrasi dan post-hidrasi.
   - `390px` (mobile): residual `dMain: -16px` dan `dTop: -24px` (berasal dari entrance animation `initial={{ y: 24 }}` Framer Motion pada `PageWrapper`).
3. **Verifikasi Kualitas Session 10**:
   - `format:check` ✅ (Prettier)
   - `lint:strict` ✅ (Oxlint 0 warning)
   - `typechecks` ✅ (tsc 0 error)
   - `build` ✅ (9/9 static pages prerendered)
   - Browser screenshot proof pre-hydration tersimpan di `/tmp/skel-1440-pre.png` dan `/tmp/skel-390-pre.png`.

### Session 11 — 2026-09-24

1. **Metadata, OpenGraph & JSON-LD Structured Data (Slice 5.1)** (commit `5d0c6fa`):
   - `src/app/layout.tsx`: konfigurasi `metadataBase: new URL('https://htma.site')`, `title.template` (`%s | Hutama — Web Developer`), `title.default` (`Hutama — Web Developer`), OpenGraph (`og:title`, `og:description`, `og:site_name`, `og:url`), Twitter card (`summary_large_image`), `robots` (index/follow + googleBot options), dan keywords komprehensif.
   - `JSON-LD`: structured data skema `Person` (`name: Hutama`, `jobTitle: Web Developer`, `sameAs: github.com/hutamadev`) dan `WebSite` (`publisher: #person`) yang disematkan langsung di dalam `<body>`.
   - `src/app/opengraph-image.tsx`: auto-generated dynamic OpenGraph preview (1200x630 PNG) menggunakan `ImageResponse` dari `next/og`. Desain selaras dengan Material 3 Expressive (background dark surface `#1b1c17`, aksen primary `#b4d34e` dan container `#526600`, deskripsi typography Google Sans style, metadata footer).
   - `src/app/page.tsx` & `src/app/contact/page.tsx`: per-page metadata diperbarui dengan canonical URLs (`/` dan `/contact`), `absolute` title pada home page agar tidak double-apply template, dan deskripsi SEO yang terarah.
2. **Hasil Verifikasi Runtime**:
   - `GET /` → tag `<title>`, `<meta name="description">`, `<meta property="og:*">`, canonical link, dan JSON-LD ter-render sempurna di SSR HTML.
   - `GET /contact` → title ter-render `Contact | Hutama — Web Developer` via template layout.
   - `GET /opengraph-image` → status `200 OK`, `image/png`, ukuran 36.5 KB, visual M3 Expressive terverifikasi.
   - `GET /sitemap.xml` dan `/robots.txt` → `200 OK`.
3. **Verifikasi Kualitas Session 11**:
   - `format:check` ✅ (Prettier)
   - `lint:strict` ✅ (Oxlint 0 warning)
   - `typechecks` ✅ (tsc 0 error)
   - `build` ✅ (10/10 static pages prerendered)

---

### Session 12 — 2026-09-25

1. **Slice 5.2 — Audit Lighthouse ✅ SELESAI** (permintaan "tahan commit" sudah selesai: kode masuk `d97e616`, dokumen `d7c2203`):
   - **Metode**: `bun run build` + `next start`, Lighthouse **13.5.0** via `bunx --bun lighthouse --port=<cdp-port>` ke **Chromium bersih** (bukan Helium); 4 target: `/` & `/contact` × mobile & desktop.
   - **Hasil**: `/` mobile **78 → 92** · `/contact` mobile **81 → 96** · `/` & `/contact` desktop **100/100/100/100**. Best Practices **96 → 100** dan SEO **92 → 100** di keempat target; A11y 100. Metrik akhir mobile: FCP 0.8–1.0 s, LCP **4.3 → 2.7 s** (`/`) & **3.7 → 2.2 s** (`/contact`), TBT 250/200 ms, **CLS 0** di semua run.
   - **Akar masalah LCP**: konten di bawah hero hanya dirender **setelah hidrasi** — gate `isClient` di `home-content.tsx` + `motion` wrapper `initial={{ opacity: 0 }}`. HTML SSR cuma berisi **86 div skeleton** (`Garuda Universe` = 0 kemunculan, wrapper `style="opacity:0;transform:translateY(24px)"`), sehingga LCP = waktu hidrasi.
   - **Perbaikan**: `src/modules/home-page/home-content.tsx` **dihapus**; `src/app/page.tsx` merender `About/Skills/Portfolio/Footer` langsung (SSR); `page-wrapper.tsx` entrance jadi **transform-only** (`y: 24 → 0`, tanpa opacity). `loading-skeleton.tsx` tetap dipakai hero (hero masih `isClient`-gated).
   - **Perbaikan non-perf**: `<Analytics/>` digate `process.env.VERCEL` (hilang 404 `/_vercel/insights/script.js` + 2 console error); `aria-label` kartu portfolio dihapus (name tidak memuat teks terlihat → WCAG 2.5.3); anchor Demo `modal-card.tsx` hanya dirender saat `portfolioData.url` ada (sebelumnya `href` undefined = anchor tanpa href); typo `}` pada `alt` gambar modal dibetulkan.
   - **Verifikasi**: `format` ✅ `lint:strict` ✅ `typechecks` ✅ `build` **10/10** ✅. Modal diuji lewat pointer click nyata → `inert` hilang, `opacity` 1, anchor Demo ber-`href`; screenshot light & dark diperiksa. **CLS tetap 0** setelah gate dihapus — skeleton memang bukan penyumbang stabilisasi (shift residual lama berasal dari entrance `motion` wrapper).
   - **Pitfall audit**: browser ber-adblock bawaan (Helium/uBOL) merusak hasil Lighthouse. Prosedur lengkap + sanity check ada di skill global **`local-browser-verification`** (Session 13) — rincian panjang tidak diduplikasi di sini.
   - **Lever yang belum diambil** (target sudah lewat): hero masih client-gated; `image-delivery-insight` 190 KiB (thumbnail portfolio 600×600 untuk slot ~212 px); `legacy-javascript` 14 KiB & `unused-javascript` 116–131 KiB dari chunk framework; `render-blocking` 140–180 ms dari `@import` Google Fonts di `globals.css`.

---

### Session 13 — 2026-09-27

1. **Sinkronisasi dokumen dengan realitas git (drift audit)** — blok `Git State` lama di file ini masih mengklaim Slice 5.2 belum di-commit dan branch belum di-push. Realitas (`git rev-list --left-right --count origin/feat/portfolio-update...HEAD` → `0 0`): Slice 5.2 sudah di-commit (`d97e616` perf, `d7c2203` docs) dan branch sudah sinkron penuh dengan origin. Blok itu diganti dengan keadaan sebenarnya.
2. **Keputusan dependency `use-sync-external-store@^1.7.0` — DIPERTAHANKAN.** Uncommitted diff menyisakan satu baris dependency + entri lockfile tanpa penjelasan. Ternyata bukan sisa: `src/store/useStore.ts:2` memakai `createWithEqualityFn` dari `zustand/traditional`, dan `node_modules/zustand/esm/traditional.mjs:2` mengimpor `use-sync-external-store/shim/with-selector.js`. Jadi peer itu benar-benar dieksekusi di runtime; entri dependency-nya sah dan harus ikut ter-commit. Jangan dihapus — `zustand/traditional` akan gagal resolve di instalasi bersih.
3. **Gerbang kualitas Slice 5.3 (kode) — LULUS SEMUA**:
   - `bun run format:check` ✅ (Prettier, "All matched files use Prettier code style")
   - `bun run lint:strict` ✅ (exit 0)
   - `bun run typechecks` ✅ (exit 0, tsc 0 error)
   - `bun run build` ✅ **10/10 static pages**. Bundle: `/` 9.54 kB (First Load **199 kB**), `/contact` 121 kB (First Load **311 kB** — naik dari catatan 305 kB Session 7), shared JS 200 kB.
   - Server dev/prod dimatikan lebih dulu sebelum build (aturan Session 7) — terverifikasi tidak ada proses `next-server` hidup.
4. **Verifikasi runtime tanpa browser (`next start` + `curl`)** — menutup bagian SSR/metadata Slice 5.3:
   - `/` → `200`, HTML 95.980 byte, `x-nextjs-prerender: 1`. Konten nyata ada di HTML awal (`Garuda Universe`, `Ibrahim Law`), dan `skeleton` hanya muncul **6** kali (hero) — jalur SSR hasil Slice 5.2 terbukti masih utuh.
   - 5 security header tampil apa adanya (`nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, CSP minimal).
   - JSON-LD `Person` + `WebSite` ter-render sekali masing-masing.
   - `/contact` → `<title>Contact | Hutama — Web Developer</title>` + canonical `https://htma.site/contact`.
   - `/robots.txt` 200 (83 B), `/sitemap.xml` 200 (404 B), `/manifest.webmanifest` 200 (257 B), `/opengraph-image` 200 `image/png` 36.562 B, path tidak dikenal → **404**.
5. **Kontrak Zod diuji ulang di luar browser** — skrip ad-hoc `bun run` (tidak di-commit): **7/7** kasus negatif mencocokkan pesan persis (`Name is required`, `Email is required`, `Enter a valid email address`, tiga pesan batas panjang, `Message must be 2000 characters or fewer`) plus asersi `trim()` untuk nama (`"  Hutama  "` → `Hutama`) dan email (`"  a@b.co  "` → `a@b.co`). Ini menggantikan sebagian uji form yang dulu dijalankan lewat browser.
6. **BLOCKER: lingkungan ini tidak punya browser sama sekali.** Tidak ada `chromium`/`chrome`/`firefox`/`helium` di `PATH`, `/usr/bin`, `/opt`, maupun flatpak; `~/.cache/puppeteer` kosong dan tidak ada `puppeteer`/`playwright` di `node_modules`. Akibatnya dua butir Slice 5.3 **belum bisa dieksekusi di sesi ini**: (a) uji submit form kontak end-to-end lewat request interception ke `api.emailjs.com`, (b) uji cross-browser non-Chromium (fallback skeleton non-`background-attachment: fixed`, Lenis, `mix-blend-difference`). Keduanya butuh keputusan user (pasang browser atau verifikasi manual di mesin lain).
   - Catatan tambahan: **skill global `lighthouse-audit-local` yang disebut di Session 12 tidak ada.** Rujukan itu digantikan oleh skill global baru **`local-browser-verification`** (dibuat di Session 13 akhir), yang isinya: pemilihan engine, kendali CDP mentah, protokol median Lighthouse, penolakan Lightpanda untuk verifikasi, dan aturan tidak melonggarkan postur keamanan tool. Skill itu butuh `/reload` sebelum terdaftar di sesi berjalan.
7. **Fallback cross-browser dicek dari sumber** (bukan tebakan): fallback skeleton bukan `@supports` eksplisit, melainkan degradasi yang memang didokumentasikan di komentar `src/styles/globals.css` ("Browsers that ignore fixed backgrounds (iOS Safari) fall back to a per-block sweep"). Blok `.skeleton` juga sudah punya `prefers-reduced-motion` (animasi dimatikan, bukan diputar 0,01 ms) dan `forced-colors: active` (wave disembunyikan, base jadi `GrayText`) — dua hal yang belum tercatat di DESIGN.md, jadi ikut dicatat di sana.
8. **Lingkungan browser terpecahkan**: `chromium 154.0.8037.57` terpasang via `apt` (Debian 13 trixie) di `/usr/bin/chromium`; **PinchTab 0.15.2** terpasang (lewat fnm/npm) dengan config `~/.pinchtab/config.json` (server `127.0.0.1:9867`, stateDir `~/.pinchtab`). `pinchtab doctor` → `chrome_present OK /usr/bin/chromium -> 154.0.8037.57 (>= 120.0.0)`, 3 passed / 0 failed.
9. **Lightpanda ditolak untuk pengujian fungsional (bukan sekadar "tidak nyaman")**. Binary ada di `/home/hutamatr/lightpanda` (v1.0.0-nightly.9823), mode `serve` (CDP :9222) dan `fetch --dump`; `--dump png/pdf`-nya berlabel _text-only rendering_, jadi **tidak ada paint/layout → Lighthouse mustahil** di sana. Yang lebih penting, skrip 18-cek yang sama dijalankan di dua engine:
   - Lightpanda: 17/18, dengan `reset()` react-hook-form **no-op** (field tetap terisi) dan toast hantu `Something went wrong` ikut tertinggal di DOM — padahal `window.onerror`, `unhandledrejection`, dan `console.error` semuanya **kosong**.
   - Chromium asli: **18/18 PASS**, toast cuma satu (`Message sent successfully`), keempat field kembali kosong.
   - **Kesimpulan: anomali "dua toast + reset gagal" itu artifact Lightpanda, bukan bug aplikasi.** Binari-nya jangan dihapus — masih berguna untuk scraping DOM murah tanpa Chrome — tapi **jangan pernah** dipakai sebagai browser verifikasi fungsional atau audit karena gagal secara senyap, bukan dengan error.
10. **Uji form end-to-end (butir Slice 5.3) — SELESAI di Chromium asli.** Dua hal yang sengaja TIDAK dilakukan demi menjaga postur keamanan daemon: `security.allowEvaluate`, `security.allowNetworkIntercept`, dan `security.idpi.strictMode` **dibiarkan pada nilai default yang membatasi**. Sebagai gantinya, skrip CDP mentah (`/tmp/cdp.ts`, WebSocket bawaan Bun, tanpa dependency baru) + stub `window.fetch` di page context. Hasil 18/18: hydration marker React ada, 4 nama field benar, `POST https://api.emailjs.com/api/v1.0/email/send` tertangkap dengan `template_params` persis berisi 4 nilai, id service/template/user ter-inline, toast sukses tunggal, form ter-reset, tombol kembali idle; jalur error: 4 field `aria-invalid="true"` + 4 pesan Zod dan **nol** request keluar. EmailJS asli tetap belum teruji karena `.env.local` tidak ada — nilai yang dipakai dummy.
    - Catatan temuan PinchTab: `pinchtab snap` diblokir IDPI dengan "jailbreak pattern detected; role-hijack pattern detected" **pada halaman kita sendiri** — false positive. Artinya pembacaan berbasis snapshot untuk projekt ini butuh `security.idpi.strictMode false`. Dipilih **tidak**, jadi jalur snapshot tidak dipakai.
11. **PinchTab audit (0.15.2) — dipakai sebagai sinyal sekunder, bukan gerbang.** `pinchtab audit <url> --json`:
    - `/`: LCP 1488 ms · FCP 1488 ms · TTFB 31.8 ms · CLS 0.000008 · 42 request, **0 gagal** · 32 interactive element.
    - `/contact`: LCP 2148 ms · FCP 1028 ms · TTFB 27.7 ms · CLS 0.0005 · 20 request, **0 gagal** · `accessibilityScore: 20`.
    - `summaryScore` = rata-rata **skor aksesibilitas** ([FACT — source: `docs/audit.md:85` + `internal/audit/run.go:287`]). Di halaman `/` field `accessibilityScore` **tidak ada sama sekali** sehingga `summaryScore` jatuh ke 0 — bukan karena halamannya buruk, tapi karena pemindaiannya tidak menghasilkan angka. Karena itu skor ini **tidak boleh** dibandingkan langsung dengan Accessibility Lighthouse (yang 100) maupun dipakai sebagai gerbang; versi 0.15.2 juga tidak memuat rincian temuan a11y yang dideskripsikan dokumen branch main.
12. **Lighthouse 13.5.0 (versi identik dengan baseline Session 12) — hasil resmi sesi ini:**
    - **Desktop `/` dan `/contact`: 100/100/100/100**, LCP 0.6 s, TBT 10 ms, CLS 0.001.
    - **Mobile (median, n=4 per halaman)**: `/` perf **89** (TBT ~370 ms, LCP 2.4 s) · `/contact` perf **88.5** (TBT ~415 ms, LCP 2.2 s). A11y/Best Practices/SEO **100** di keempat target.
    - **Di bawah gerbang 90, dan itu tidak bisa diklaim sebagai regresi maupun lulus.** Dua metode pengukuran (Lighthouse launch browser sendiri vs `--port=9222` ke Chromium bersih yang sudah hidup) menghasilkan **median sama, 89** → metode bukan penyebab. Variansi antar-run besar: `/` 83–93, `/contact` 69–90; TBT 165–1138 ms. Pemicu utamanya kontensi host: agent `pi` sendiri memakan ~38–43% CPU di mesin WSL 4 GB, sementara Lighthouse mensimulasikan pelambatan CPU 4×.
    - **TBT dijelaskan, bukan misteri**: chunk `c2d8dfc9e40000eb.js` (= **react-dom**, 188 K raw) menyumbang 916–1014 ms scripting dan inline RSC script di dokumen `3000/` ~767 ms. Chunk zod+emailjs `79ceaaca50d8040d.js` (476 K raw / 113.4 KiB transfer) **tidak dimuat di `/`** — diverifikasi dari HTML build: `/` memuat 14 chunk, `/contact` 16 (menambah `79ceaaca…` + `fda0b3f0…` = lenis). Jadi tidak ada kebocoran bundle lintas halaman.
13. **Protokol pengukuran resmi dijalankan user di host idle (`/tmp/lh-median.sh`, n=5 median)** — dan hasilnya membalik kesimpulan sementara sesi ini. **Sebelum code-split: `/` mobile median 94 (90–95), `/contact` mobile median 88 (83–94).** Jadi angka 88–89 yang gua ukur sambil bekerja memang murni kontensi host, dan `/` sebenarnya sudah lolos gerbang dengan nyaman — yang benar-benar gagal cuma `/contact`.
14. **Cross-browser: diputuskan dicatat sebagai known-unverified**, tanpa unduhan tambahan. Alasan eksplisit: hanya Chromium tersedia; Firefox tidak membuktikan kasus `background-attachment: fixed` milik iOS Safari (Gecko bukan WebKit), dan WebKit Linux milik Playwright pun bukan iOS Safari — jadi memasang keduanya hanya menambah biaya tanpa mengubah status bukti.
15. **BUG TOOLING DITEMUKAN: pre-commit/commit-msg hook lefthook rusak karena nama direktori repo memuat tanda kurung.** `[FACT — source: .git/hooks/pre-commit:11-21]` template hook membuat fungsi `call_lefthook()` yang menulis path absolut tanpa kutip: `elif /home/hutamatr/gitrepo(hutamadev)/htma/node_modules/.../lefthook -h`. Karena path itu ada **di dalam definisi fungsi**, `/bin/sh` gagal saat parse body fungsi → `Syntax error: word unexpected (expecting ")")` → **setiap commit gagal**, dan `PATH` maupun `LEFTHOOK_BIN` tidak menolong (parse gagal sebelum cabang mana pun dievaluasi). Perbaikan yang dilakukan: mengutip path di kedua file hook (`sed` lokal + verifikasi `sh -n`). Ini file `.git/` yang tidak ikut ter-commit, jadi **clone baru di path ber-kurung akan mengalami hal yang sama** — kalau itu terjadi, kutip path di `.git/hooks/pre-commit` dan `.git/hooks/commit-msg`, atau pindahkan repo ke path tanpa kurung.
16. **LEVER DIAMBIL: form kontak di-code-split (butir penutup Slice 5.3).** Bukti penyebabnya dulu: `/contact` memuat satu chunk yang `/` tidak punya — `79ceaaca50d8040d.js` (476 K raw / **113.4 KiB transfer**) berisi **zod + react-hook-form + emailjs**, dan chunk itu ada di jalur kritis demi widget di bawah fold. Perbaikannya:
    - File baru `src/modules/contact-page/contact-form-lazy.tsx` (`'use client'` + `next/dynamic(..., { ssr: false, loading: <placeholder> })`); `contact.tsx` mengimpor loader itu, bukan `contact-form` langsung.
    - **`ssr: false` wajib** di sini: tanpa itu chunk-nya tetap ikut bundle awal sehingga tidak ada yang dihemat. Konsekuensi yang diterima: form tidak ada di HTML SSR (form ini memang sudah sepenuhnya bergantung JS lewat react-hook-form).
    - Placeholder memakai `LoadingSkeleton` (utility `.skeleton` yang sudah ada) dengan **geometri hasil ukur DOM, bukan tebakan**: field 58 px (`h-[3.625rem]`), textarea 161 px (`h-[10.0625rem]`), tombol 45 px (`h-[2.8125rem]`), gap 16 px → total form 370 px pada `md` ke atas. Placeholder pertama gua salah 7 px (textarea) dan 1 px (tombol), dan itu memang muncul sebagai CLS desktop 0.002; setelah dikoreksi jadi 0.001 — sama dengan `/` yang tidak punya placeholder, jadi sisa 0.001 itu pre-existing, bukan dari swap.
    - **Hasil terukur**: bundle `/contact` **121 kB → 12.1 kB** (First Load **311 kB → 202 kB**), chunk di HTML turun 16 → 14, chunk form **tidak** lagi di-preload. n=5 median di host idle: **`/` 95** (TBT 245 → **179 ms**) dan **`/contact` 92** (TBT 433 → **299 ms**), LCP 2.4/2.2 s, **CLS 0** di kedua halaman mobile — keduanya lolos gerbang 90. Desktop tetap **100/100/100/100** (LCP 0.6 s), CLS 0.001/0.001.
    - **Verifikasi ulang setelah split**: gate `format`/`lint:strict`/`typechecks`/`build` lulus (10/10 static pages), form e2e **18/18 PASS** di build ber-split (dijalankan ulang, bukan diwarisi), dan build akhir sudah direbuild bersih tanpa env dummy (0 string `dummy_service` di chunk).
    - Sisa TBT setelah split didominasi `react-dom` (`c2d8dfc9e40000eb.js`, ~1.3 s scripting di bawah throttle 4×), bukan kode kita — itu batas framework, bukan regresi section.

---

## Git State

- **Branch aktif:** `feat/portfolio-update` — **punya commit lokal yang belum di-push** (2 commit Session 13: `0d1969b` dependency, `bc05e4f` dokumen; plus commit dokumen 5.3 menyusul). Sebelum Session 13 branch ini sinkron penuh dengan origin (`0 0`); sekarang **ahead**. Push **tidak** dilakukan — user memutuskan tanpa PR dan menyerahkan push/merge ke keputusan sendiri.
- **Branch migrasi Bun:** `feat/migrate-bun` (menunjuk ke commit `71eceea`); `main` (di `5c96a1a`) sudah menerima PR #1 dari branch itu.
- **Working tree:** bersih kecuali perubahan dokumen sesi ini (`MEMORY.md`, `BRAINSTORMING.md`, `DESIGN.md`). Dependency `use-sync-external-store` **sudah di-commit**, bukan lagi menggantung.
- **Commit Octopus terakhir:** `bc05e4f` (docs Session 13 tahap 1); kode terakhir `d97e616` (perf SSR home + perbaikan audit).
- **Build aktif di `.next`:** build bersih TANPA env dummy (diverifikasi: tidak ada string `dummy_service` di chunk). Server produksi sedang hidup di `127.0.0.1:3000` untuk keperluan protokol ukur `/tmp/lh-median.sh`.

### File belum di-commit

```
 M MEMORY.md
 M BRAINSTORMING.md
```

---

## Langkah Selanjutnya

1. **Phase 1 — Foundation SELESAI PENUH** ✅
2. **Phase 2 — Core Components & Mechanics SELESAI PENUH** ✅ (Slices 2.1–2.4)
3. **Phase 3 — Sections (Home Page)** — ✅ **SELESAI PENUH**:
   - Slice 3.1: Hero Section ✅ (commit `7b2ba93`)
   - Slice 3.2: About Section ✅ (commit `623127b`)
   - Slice 3.3: Skills Section ✅
   - Slice 3.4: Portfolio Section & Modal ✅ (commit `8e8b307`, `8ab9fde`)
   - Slice 3.5: Sidebar & Footer ✅
4. **Phase 4 — Contact Page** — ✅ **SELESAI PENUH** (commit `1b4546f`):
   - Slice 4.1: Zod Schema & Validation ✅ (`src/utils/contact-schema.ts`)
   - Slice 4.2: M3 Text Fields & UI ✅ (M3 Filled Text Field + Filled Button + spinner)
5. **Phase 5 — Polish, SEO & Launch** ⏳ — berjalan. `robots.ts`, `sitemap.ts`, dan `manifest.ts` sudah ada.
   - **Slice 5.0 — token legacy → peran M3 ✅** (commit `948742d`, Session 8)
   - **Slice 5.0b — indikator loading M3 Expressive ✅** (commit `c1afe20`, Session 8)
   - **Slice 5.0c — M3 Expressive Loading Skeletons & Hydration Swap ✅** (commit `758168f`, Session 10)
   - **Slice 5.1 — Metadata & SEO ✅** (commit `5d0c6fa`, Session 11)
   - **Slice 5.2 — Audit Kualitas Lighthouse ✅ SELESAI** (Session 12): `/` mobile **92**, `/contact` mobile **96**, desktop **100/100/100/100**; Best Practices & SEO 100.
     - Lever opsional yang belum diambil: hero masih client-gated; `image-delivery-insight` 190 KiB; `legacy-javascript`/`unused-javascript` dari chunk framework; `render-blocking` 140–180 ms dari `@import` Google Fonts.
   - **Slice 5.3 — Cross-Browser & Final Build** — mayoritas selesai (Session 13):
     - ✅ Gerbang `format:check` → `lint:strict` → `typechecks` → `build` semuanya lulus (10/10 static pages).
     - ✅ Verifikasi runtime `next start` + `curl`: SSR home memuat konten nyata, 5 security header, JSON-LD, canonical `/contact`, `robots.txt`/`sitemap.xml`/`manifest.webmanifest`/`opengraph-image` semua 200, path tak dikenal 404.
     - ✅ Kontrak Zod diuji ad-hoc di luar browser (7/7 kasus negatif + asersi trim).
     - ✅ **Form kontak end-to-end terverifikasi di Chromium asli (18/18)** lewat skrip CDP + stub `fetch`; anomali Lightpanda dibuktikan sebagai artifact engine, bukan bug app.
     - ✅ **Lighthouse 13.5.0**: desktop `/` & `/contact` **100/100/100/100**; mobile median `/` **89**, `/contact` **88.5**, a11y/BP/SEO 100 semua target.
     - ✅ PinchTab audit tersimpan: `/` & `/contact` nol request gagal, TTFB 28–32 ms, CLS ≈ 0, screenshot di `/tmp/audit-home` dan `/tmp/audit-contact`.
     - ✅ **Gerbang perf mobile 90+ TUNTAS**: n=5 median di host idle — `/` **95** (TBT 179 ms), `/contact` **92** (TBT 299 ms), LCP 2.4/2.2 s, CLS 0. Desktop `/` & `/contact` **100/100/100/100**. Dicapai setelah form kontak di-code-split (First Load `/contact` 311 → 202 kB; detail + bukti di Session 13 poin 16).
     - ✅ **Form kontak e2e diverifikasi ulang setelah split: 18/18** di Chromium asli.
     - ⚠️ **Cross-browser dicatat known-unverified** atas keputusan user: mesin hanya punya Chromium, dan engine lain tidak bisa membuktikan kasus `background-attachment: fixed` milik iOS Safari.
     - ⚠️ `.env.local` tidak ada → jalur EmailJS nyata tetap belum terverifikasi; validasi klien sudah, dengan id dummy yang di-inline saat uji (build akhir sudah direbuild bersih).
     - Catatan: rujukan lama ke skill **`lighthouse-audit-local` tidak berlaku** (skill itu tidak pernah ada). Penggantinya: skill global **`local-browser-verification`**, plus skrip milik project `bun run verify:form` dan `bun run audit:lighthouse`.
     - Branch `feat/portfolio-update` punya commit lokal baru di atas `origin` (dependency `use-sync-external-store` + dokumen) — **belum di-push**, dan user memutuskan **tanpa PR**: push/merge diserahkan ke keputusan sendiri nanti.

**Pekerjaan tambahan Session 6 yang sudah selesai** (di luar slice): custom cursor smooth fluid shrink + magnetic parallax, two-stage section header, header transparan + hero diperlebar, ukuran kursor 40px, hapus `ArrowSVG.tsx`, Slice 3.5 (sidebar rail, active indicator, FAB, footer) + perf fix scroll listener.

---

## Catatan untuk Agent Berikutnya

- Baca `BRAINSTORMING.md` untuk rencana lengkap (semua Q&A sudah terjawab di section 14)
- Baca `DESIGN.md` untuk aturan spesifik Material 3 Expressive (15 sections)
- Baca `MEMORY.md` (file ini) untuk status & 25 keputusan final
- Data portfolio existing jangan diubah (foto, list, judul, URL, repo). Field `description` sudah ditambahkan di Session 6
- Layout vertical WAJIB tetap
- Scroll effect & text scramble effect HARUS sama persis setelah migrasi
- Ikuti Global Rules (AGENTS.md): strict TS, no `any`, functional, immutable, validasi input
- Runtime & package manager: Bun (bukan Node/pnpm)
- Linter: **Oxlint** (hapus seluruh artifak ESLint saat migrasi)
- Git hooks: **Lefthook** (hapus Husky + lint-staged saat migrasi)
- Font: **Google Sans Flex** variable font (fallback: **Google Sans Text**). Hapus Kata Grotesk & Neutral Face
- Navbar: **transparan** (`bg-transparent` + `pointer-events-none`), logo & toggle tetap solid via `pointer-events-auto` (diubah Session 6, menggantikan keputusan solid `bg-surface` sebelumnya)
- Gradient mask: hanya **bottom mask** yang tersisa; top mask dihapus Session 6
- Theme toggle: Sun/Moon icons (bukan MdGraphicEq), dibungkus `bg-surface-container-high` + `shadow-sm`
- Custom cursor: 40px (`--cursor-size: 2.5rem`), smooth fluid shrink + magnetic parallax; offset centering dibaca dari `offsetWidth`
- Portfolio card: radius 24px, thumbnail `16/9` atas, content `p-6` `text-left` (WAJIB override `text-align: center` bawaan `<button>`)
- Contact form (Session 7): validasi di `src/utils/contact-schema.ts` (`contactSchema` + `ContactFormValues`), field M3 Filled Text Field di `src/components/ui/input-form.tsx` (props `title` / `error` / `isTextArea`), label float via `placeholder=' '` + varian `peer-[:placeholder-shown:not(:focus)]`. Jangan pasang `placeholder` asli di field kontak — akan merusak mekanisme float.
- Zod 4.6.5: pakai `z.email()` (top-level), **bukan** `z.string().email()` yang sudah deprecated. Kalau butuh `trim()` sebelum cek format, gunakan `.pipe(z.email({ message }))`.
- **Working tree** sejauh Session 13 hanya menyisakan `package.json` + `bun.lock` (dependency `use-sync-external-store`, lihat Session 13 poin 2). **Jangan jalankan `bun run build` selagi `next dev` hidup** — keduanya berbagi `.next` dan dev akan mati dengan `ENOENT _buildManifest.js`.
- **`use-sync-external-store@^1.7.0` wajib ada di `dependencies`**: `src/store/useStore.ts` memakai `createWithEqualityFn` dari `zustand/traditional`, yang mengimpor `use-sync-external-store/shim/with-selector.js`. Menghapusnya membuat `zustand/traditional` gagal resolve pada instalasi bersih.
- **Lingkungan ini punya Chromium dan PinchTab (Session 13)**: `/usr/bin/chromium` (154.0.8037.57, dipasang via apt Debian 13) dan `pinchtab 0.15.2` (config `~/.pinchtab/config.json`, server `127.0.0.1:9867`). Jalankan `pinchtab doctor` dulu — satu-satunya cek yang pernah gagal adalah `chrome_present`.
- **PinchTab capability flags sengaja default (dibatasi)**: `security.allowEvaluate`, `security.allowNetworkIntercept`, dan `security.idpi.strictMode` **false**. Akibatnya `pinchtab eval`, `pinchtab network route`, dan `pinchtab snap` mengembalikan 403 — `snap` bahkan diblokir IDPI karena copy halaman kita sendiri memicu "jailbreak/role-hijack pattern" (false positive). Untuk uji fungsional, gunakan CDP mentah + stub `window.fetch` di page context (skrip `/tmp/cdp.ts` + `/tmp/form-e2e.ts`), bukan melonggarkan postur keamanan daemon.
- **Lightpanda BUKAN browser verifikasi**: `/home/hutamatr/lightpanda` tidak punya paint/layout (Lighthouse mustahil) dan gagal senyap pada React — `reset()` react-hook-form jadi no-op tanpa error apa pun, dan node toast lama tertinggal di DOM. Pakai hanya untuk scraping DOM murah.
- **Kalau commit tiba-tiba gagal dengan `Syntax error: word unexpected (expecting ")")`**: itu hook lefthook yang menulis path repo tanpa kutip, dan path repo ini memuat `(` `)`. Perbaiki dengan mengutip path di `.git/hooks/pre-commit` dan `.git/hooks/commit-msg` (dua file itu tidak ikut ter-commit, jadi fix-nya tidak ikut ke clone lain).
- **Form kontak di-load lewat `dynamic(..., { ssr: false })`** (`src/modules/contact-page/contact-form-lazy.tsx`): zod + react-hook-form + emailjs (~113 KiB) sengaja dikeluarkan dari jalur kritis `/contact`. Jangan diganti kembali jadi import statis tanpa mengukur ulang — import statis itulah yang menahan `/contact` mobile di 88 (target 90). Kalau mengubah placeholder, **ukur dulu** tinggi form aslinya di DOM (58 px field, 161 px textarea, 45 px tombol) karena selisih beberapa piksel muncul sebagai CLS desktop.
- **Variansi Lighthouse di mesin ini besar** (mobile perf 69–93 untuk kode yang sama) karena agent sendiri memakan ~40% CPU di WSL 4 GB. Satu-satunya angka yang boleh dipakai untuk keputusan adalah **median n=5 di host idle** (`/tmp/lh-median.sh`); angka yang diukur sambil agent bekerja bisa meleset 5–10 poin ke bawah.
- Verifikasi tanpa browser yang tetap berguna: `bun run start` + `curl` (SSR HTML, security header, title/canonical, rute metadata, status 404) dan `bun run` skrip ad-hoc untuk kontrak Zod di `src/utils/contact-schema.ts`.
- `.env.local` belum ada di lokal; untuk uji submit, isi `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` (lihat `.env.example`) atau stub request ke `api.emailjs.com` lewat request interception supaya tidak mengirim email nyata.
- **Indikator loading (Session 8)**: `src/components/ui/loading-spin.tsx` (render loop canvas) + `src/components/ui/loading-spin-shapes.ts` (7 bentuk M3, semua di-resample ke ray & jumlah titik yang sama). Canvas **bukan pilihan gaya**: morph M3 me-lerp titik searah, dan interpolasi `d` CSS tidak bisa karena outline beda jumlah cubic + beda titik awal. Jangan disederhanakan jadi CSS/SVG; kalau diubah, patuhi spec — morph **650ms**, rotasi **50deg/bentuk** + settle **90deg** (stiffness 200, ratio 0.6), box **48dp** dengan bentuk **38dp**.
- Warna indikator dibaca dari `--color-primary` via computed style lalu dibaca ulang saat tema ditukar (`MutationObserver`). Sudah diverifikasi: light `#526600`, dark `#b4d34e`, termasuk ketika kelas `dark` ditukar selagi canvas hidup.
- `global-error.tsx` **self-contained by necessity**: Next.js tidak memuat stylesheet app ke root error boundary, jadi utility Tailwind maupun `--color-*` tidak tersedia. Gaya ditulis inline di `globalErrorStyles` dan keyed ke `prefers-color-scheme`. Jangan dialihkan ke utility — hasilnya tak bergaya.
- Alias token legacy (`custom-black`, `custom-green`, `custom-white-2`, `custom-shadow`) **sudah dihapus** dari `globals.css` (Session 8). Gunakan peran M3 (`on-surface`, `primary`, `error`, `outline-variant`, …).
- **Security headers** ada di `next.config.ts` (`securityHeaders` + `headers()` untuk `/:path*`). CSP sengaja tanpa `script-src`/`style-src` karena inline script `next-themes` butuh nonce; jangan pasang directive itu tanpa nonce atau tema akan mati. Verifikasi cepat: `curl -D - http://127.0.0.1:3000/`.
- **`overrides.postcss = 8.5.28`** di `package.json` wajib dipertahankan: tanpa itu `next` menarik kembali `postcss@8.4.31` (advisory), dan `bun audit` tidak lagi bersih. Jangan hapus entri `overrides` tanpa menjalankan ulang `bun audit`.
- Kalau `bun audit` melaporkan advisory baru pada dependency transitif, pola yang dipakai project ini adalah **`overrides` di `package.json`** (bukan downgrade paket induk) lalu verifikasi pohon `node_modules` + `bun run build`.
- Verifikasi UI di browser: pakai **tab dingin** (prefetch membuat navigasi klien berulang instan sehingga loading boundary tak sempat muncul) + `page.emulateNetworkConditions({ offline, latency, download, upload })` — nama field versi ini `download`/`upload`, bukan `downloadThroughput`. Chromium headless resolve `prefers-color-scheme: dark`, jadi uji tema terang harus melepas kelas `dark` secara eksplisit.
- Konten home (About/Skills/Portfolio/Footer) sekarang **SSR langsung** dari `src/app/page.tsx`; hanya hero yang masih `isClient`-gated. Jangan tambahkan gate hidrasi baru di jalur render tanpa mengukur LCP lagi — gate itu yang menahan `/` mobile di 78 (Slice 5.2).
- **Audit Lighthouse & verifikasi browser**: ikuti skill global **`local-browser-verification`** (pemilihan engine + CDP mentah + median Lighthouse). Skrip milik project: `bun run verify:form` (18-cek form kontak lewat CDP) dan `bun run audit:lighthouse` (median n=5 per halaman); detail di `scripts/README.md`. Jangan pakai browser ber-adblock, jangan unduh salinan Chrome terpisah, dan jangan percaya satu run Lighthouse.
