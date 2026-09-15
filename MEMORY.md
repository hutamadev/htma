# MEMORY — Portfolio Website Update (htma.site)

> **Last Updated:** 2026-09-03
> **Project:** `/home/hutamatr/git-repo(hutamadev)/htma`
> **Branch Aktif:** `feat/portfolio-update` (dibuat dari `main`)

---

## Status Saat Ini: BRAINSTORMING PHASE (Belum ada kode yang diubah)

Belum ada file source code yang diedit. Hanya 3 file dokumentasi yang ada:
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

| # | Keputusan | Detail |
|---|-----------|--------|
| 1 | Layout vertical | TETAP 100%, tidak berubah |
| 2 | Design system | Material 3 Expressive — ambil prinsipnya, panduan lengkap ada di DESIGN.md |
| 3 | Seed color | `#D3F36A` → generate M3 tonal palette (via `@material/material-color-utilities`, replace estimasi) |
| 4 | Basic color tone | Tetap sama (gelap/terang/hijau), hanya dihaluskan ke M3 Expressive |
| 5 | Data portfolio | TIDAK BERUBAH (foto, list, judul, URL, repo semua tetap) |
| 6 | `locomotive-scroll` → `lenis` | Hapus locomotive, ganti lenis. Hasil scroll HARUS sama persis |
| 7 | `baffle` → native hook | Hapus baffle.js, buat `useTextScramble` native. Hasil HARUS SAMA PERSIS |
| 8 | Custom cursor | Tetap dipertahankan, improve performance (pointermove, passive, rAF, fix `any`) |
| 9 | Runtime | Bun (full) — ganti Node.js |
| 10 | Package manager | Bun — ganti pnpm |
| 11 | Halaman contact | Ikut di-update (M3 Expressive text fields, Zod validation) |
| 12 | Global Rules | Diterapkan (strict TS, no `any`, immutability, input validation, zero hardcoded secrets) |
| 13 | Better T Stack | Diterapkan sebagai fondasi (tsconfig strict, full Oxlint untuk linter, tetap single app) |
| 14 | Deployment | Tetap Vercel |
| 15 | Linter | Full menggunakan Oxlint (50-100x lebih cepat, native support Next.js/React/TS) |
| 16 | Font | Full M3 Expressive — **Google Sans Flex** (fallback: **Google Sans Text**). Hapus Kata Grotesk & Neutral Face |
| 17 | Portfolio card | Full M3 Expressive elevated card — hapus brutalist offset shadow |
| 18 | Theme toggle icon | Ganti ke **Sun/Moon** (`MdLightMode` / `MdDarkMode`). Hapus `MdGraphicEq` |
| 19 | Navbar background | Solid `bg-surface` — tanpa `backdrop-blur` |
| 20 | Tailwind v4 | Migrasi config JS → CSS-based `@theme` |
| 21 | Framer Motion | `framer-motion` → `motion` (v12 rebranding) |
| 22 | React 19 + Next.js 15 | Siap — terima potensi breaking changes |
| 23 | Bun lockfile | **Commit `bun.lockb`** ke git (reproducible builds) |
| 24 | Monorepo | **Tetap single app** — tidak convert ke Turborepo |
| 25 | Git hooks | **Migrasi ke Lefthook** (ganti Husky + lint-staged) |

---

## Keputusan yang Belum Final (Pertanyaan Terbuka) — ✅ SEMUA TERJAWAB

Semua 11 pertanyaan terbuka sudah dijawab di Session 2 (2026-09-03). Lihat `BRAINSTORMING.md` bagian 14 untuk detail. Ringkasan jawaban sudah dimasukkan ke tabel keputusan final di atas (#16–#25).

---

## File yang Sudah Dimodifikasi (Di Luar Project)

| File | Aksi | Detail |
|------|------|--------|
| `~/.agents/skills/permissioned-github/SKILL.md` | Rewrite | Zed-compatible, tambah Conventional Commits |

---

## File Project yang Sudah Dibuat/Dimodifikasi

| File | Aksi | Detail |
|------|------|--------|
| `htma/BRAINSTORMING.md` | Created (S1), Confirmed (S2) | Rencana detail update portfolio — final |
| `htma/DESIGN.md` | Created (S1), Expanded (S2) | Panduan M3 Expressive — tambah 3 section baru (15 sections total) |
| `htma/MEMORY.md` | Created (S1), Updated (S2) | File ini |

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

---

## Git State

- **Branch aktif:** `feat/portfolio-update` (ahead 1 commit dari origin)
- **Branch migrasi Bun:** `feat/migrate-bun` (menunjuk ke commit `71eceea`)
- **Branch lain:** `main`, `remotes/origin/develop`, `remotes/origin/main`
- **Working tree:** Clean
- **Commit terbaru:** `71eceea` (`feat: migrate runtime and package manager to bun`)

---

## Langkah Selanjutnya

1. Eksekusi **Phase 1 — Foundation** (package upgrades Next.js 15, React 19, Tailwind v4, Motion v12, lenis, zod, Oxlint, Lefthook, M3 color palette)
2. Lanjut Phase 2–5 sesuai roadmap di `BRAINSTORMING.md` section 13

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
