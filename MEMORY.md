# MEMORY — Portfolio Website Update (htma.site)

> **Last Updated:** 2026-09-20
> **Project:** `/home/hutamatr/git-repo(hutamadev)/htma`
> **Branch Aktif:** `feat/portfolio-update` (dibuat dari `main`)

---

## Status Saat Ini: PHASE 2 — CORE COMPONENTS & MECHANICS (Phase 0 & Phase 1 Selesai Penuh)

- **Phase 0 — Runtime Migration**: ✅ Selesai (Bun runtime & package manager, `bun.lock` stabil).
- **Phase 1 — Foundation (Tooling, Next 15, Tailwind v4, M3 Palette, Google Sans Flex)**: ✅ **100% Selesai**.
- **Phase 2 — Core Components & Mechanics**: 🚀 **Sedang Berjalan** (Memulai Slice 2.1 Locomotive Scroll → Lenis).

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

| #   | Keputusan                     | Detail                                                                                                        |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | Layout vertical               | TETAP 100%, tidak berubah                                                                                     |
| 2   | Design system                 | Material 3 Expressive — ambil prinsipnya, panduan lengkap ada di DESIGN.md                                    |
| 3   | Seed color                    | `#D3F36A` → generate M3 tonal palette (via `@material/material-color-utilities`, replace estimasi)            |
| 4   | Basic color tone              | Tetap sama (gelap/terang/hijau), hanya dihaluskan ke M3 Expressive                                            |
| 5   | Data portfolio                | TIDAK BERUBAH (foto, list, judul, URL, repo semua tetap)                                                      |
| 6   | `locomotive-scroll` → `lenis` | Hapus locomotive, ganti lenis. Hasil scroll HARUS sama persis                                                 |
| 7   | `baffle` → native hook        | Hapus baffle.js, buat `useTextScramble` native. Hasil HARUS SAMA PERSIS                                       |
| 8   | Custom cursor                 | Tetap dipertahankan, improve performance (pointermove, passive, rAF, fix `any`)                               |
| 9   | Runtime                       | Bun (full) — ganti Node.js                                                                                    |
| 10  | Package manager               | Bun — ganti pnpm                                                                                              |
| 11  | Halaman contact               | Ikut di-update (M3 Expressive text fields, Zod validation)                                                    |
| 12  | Global Rules                  | Diterapkan (strict TS, no `any`, immutability, input validation, zero hardcoded secrets)                      |
| 13  | Better T Stack                | Diterapkan sebagai fondasi (tsconfig strict, full Oxlint untuk linter, tetap single app)                      |
| 14  | Deployment                    | Tetap Vercel                                                                                                  |
| 15  | Linter                        | Full menggunakan Oxlint (50-100x lebih cepat, native support Next.js/React/TS)                                |
| 16  | Font                          | Full M3 Expressive — **Google Sans Flex** (fallback: **Google Sans Text**). Hapus Kata Grotesk & Neutral Face |
| 17  | Portfolio card                | Full M3 Expressive elevated card — hapus brutalist offset shadow                                              |
| 18  | Theme toggle icon             | Ganti ke **Sun/Moon** (`MdLightMode` / `MdDarkMode`). Hapus `MdGraphicEq`                                     |
| 19  | Navbar background             | Solid `bg-surface` — tanpa `backdrop-blur`                                                                    |
| 20  | Tailwind v4                   | Migrasi config JS → CSS-based `@theme`                                                                        |
| 21  | Framer Motion                 | `framer-motion` & `motion` di-upgrade ke v13 (`^13.3.0`)                                                      |
| 22  | React 19 + Next.js 15         | `react@^19.3.0` + `next@^15.5.25` (LTS stabil, Next 16 ditahan)                                               |
| 23  | Bun lockfile                  | **Commit `bun.lockb`** ke git (reproducible builds)                                                           |
| 24  | Monorepo                      | **Tetap single app** — tidak convert ke Turborepo                                                             |
| 25  | Git hooks                     | **Migrasi ke Lefthook** (ganti Husky + lint-staged)                                                           |

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

| File                    | Aksi                         | Detail                                                            |
| ----------------------- | ---------------------------- | ----------------------------------------------------------------- |
| `htma/BRAINSTORMING.md` | Created (S1), Confirmed (S2) | Rencana detail update portfolio — final                           |
| `htma/DESIGN.md`        | Created (S1), Expanded (S2)  | Panduan M3 Expressive — tambah 3 section baru (15 sections total) |
| `htma/MEMORY.md`        | Created (S1), Updated (S2)   | File ini                                                          |

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
   - **Verifikasi Kualitas**: `format:check` (pass), `typechecks` (0 error), `lint` (0 error, Oxlint 33ms), `build` (pass 5.9s, 9/9 static pages).

---

## Git State

- **Branch aktif:** `feat/portfolio-update` (ahead 18 commits dari origin)
- **Branch migrasi Bun:** `feat/migrate-bun` (menunjuk ke commit `71eceea`)
- **Branch lain:** `main`, `remotes/origin/develop`, `remotes/origin/main`
- **Working tree:** Modified (Slice 2.3 completed, ready to commit)
- **Commit terbaru:** `c4380aa` (`refactor(hero): replace baffle with native useTextScramble hook`)

---

## Langkah Selanjutnya

1. **Phase 1 — Foundation SELESAI PENUH** ✅ (Semua slice 1.1–1.4 terverifikasi dan ter-commit)
2. Eksekusi **Phase 2 — Core Components & Mechanics**:
   - Slice 2.1: Migrasi Smooth Scroll (`locomotive-scroll` → `lenis`) ✅ (Commit `ef733db`)
   - Slice 2.2: Native `useTextScramble` hook (eliminasi `baffle`) ✅ (Commit `c4380aa`)
   - Slice 2.3: Custom cursor optimization (pointermove, rAF, no any) ✅
   - Slice 2.4: Layout & Navigation (solid `bg-surface`, Sun/Moon icon toggle)

---

## Catatan untuk Agent Berikutnya

- Baca `BRAINSTORMING.md` untuk rencana lengkap (semua Q&A sudah terjawab di section 14)
- Baca `DESIGN.md` untuk aturan spesifik Material 3 Expressive (15 sections)
- Baca `MEMORY.md` (file ini) untuk status & 25 keputusan final
- Jangan ubah data portfolio (foto, list, detail)
- Layout vertical WAJIB tetap
- Scroll effect & text scramble effect HARUS sama persis setelah migrasi
- Ikuti Global Rules (AGENTS.md): strict TS, no `any`, functional, immutable, validasi input
- Runtime & package manager: Bun (bukan Node/pnpm)
- Linter: **Oxlint** (hapus seluruh artifak ESLint saat migrasi)
- Git hooks: **Lefthook** (hapus Husky + lint-staged saat migrasi)
- Font: **Google Sans Flex** variable font (fallback: **Google Sans Text**). Hapus Kata Grotesk & Neutral Face
- Navbar: solid background (tanpa backdrop-blur)
- Theme toggle: Sun/Moon icons (bukan MdGraphicEq)
