# Crack — Backend Service

Backend REST API untuk aplikasi **Crack**, sistem booking yang dibangun menggunakan **Next.js App Router** dengan **Supabase** sebagai database & authentication provider.

> Project ini merupakan bagian dari program **Revou Full Stack Software Engineering (Oct 2025)**.

---

## 📋 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Struktur Proyek](#-struktur-proyek)
- [API Endpoints](#-api-endpoints)
- [Instalasi](#-instalasi)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🚀 Tech Stack

| Kategori          | Teknologi                                    |
|-------------------|----------------------------------------------|
| Framework         | [Next.js 15](https://nextjs.org/) (App Router) |
| Language          | TypeScript                                   |
| Database & Auth   | [Supabase](https://supabase.com/) (PostgreSQL) |
| Database Client   | `@supabase/supabase-js`, `@supabase/ssr`     |
| Validation        | [Zod](https://zod.dev/)                      |
| Styling           | [Tailwind CSS](https://tailwindcss.com/)     |
| Linting           | ESLint (Next.js config)                      |
| Build Tool        | Turbopack                                    |
| Runtime           | Node.js 18+                                  |

---

## 📁 Struktur Proyek

```
crack-be-wmibrahim/
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   └── api/                # API Routes (App Router)
│   │       ├── auth/           # Endpoint autentikasi
│   │       ├── bookings/
│   │       │   ├── route.ts    # GET, POST /api/bookings
│   │       │   └── [id]/
│   │       │       └── route.ts # GET, PUT, DELETE /api/bookings/:id
│   │       ├── members/
│   │       │   ├── route.ts    # GET, POST /api/members
│   │       │   └── [id]/
│   │       │       └── route.ts # GET, PUT, DELETE /api/members/:id
│   │       └── slots/
│   │           └── route.ts    # GET, POST /api/slots
│   └── lib/
│       ├── supabase/           # Supabase client configuration
│       └── types/              # TypeScript type definitions
├── .env.local                  # Environment variables (gitignored)
├── .gitignore
├── next.config.ts              # Konfigurasi Next.js
├── tsconfig.json               # Konfigurasi TypeScript
├── tailwind.config.ts          # Konfigurasi Tailwind
├── eslint.config.mjs           # Konfigurasi ESLint
└── package.json
```

---

## 🛠️ API Endpoints

### 🔐 Authentication
| Method | Endpoint     | Deskripsi                       |
|--------|--------------|---------------------------------|
| POST   | `/api/auth`  | Login / register user           |

### 📅 Bookings
| Method | Endpoint              | Deskripsi                     |
|--------|-----------------------|-------------------------------|
| GET    | `/api/bookings`       | Mengambil semua booking       |
| POST   | `/api/bookings`       | Membuat booking baru          |
| GET    | `/api/bookings/[id]`  | Detail booking berdasarkan ID |
| PUT    | `/api/bookings/[id]`  | Update booking                |
| DELETE | `/api/bookings/[id]`  | Hapus booking                 |

### 👥 Members
| Method | Endpoint             | Deskripsi                    |
|--------|----------------------|------------------------------|
| GET    | `/api/members`       | Mengambil semua member       |
| POST   | `/api/members`       | Membuat member baru          |
| GET    | `/api/members/[id]`  | Detail member berdasarkan ID |
| PUT    | `/api/members/[id]`  | Update member                |
| DELETE | `/api/members/[id]`  | Hapus member                 |

### 🕐 Slots
| Method | Endpoint        | Deskripsi                       |
|--------|-----------------|---------------------------------|
| GET    | `/api/slots`    | Mengambil daftar slot tersedia  |
| POST   | `/api/slots`    | Membuat slot baru               |

---

## ⚙️ Instalasi

### Prasyarat

- **Node.js** versi 18 atau lebih baru
- **npm**, **yarn**, atau **pnpm**
- Akun **Supabase** ([https://supabase.com](https://supabase.com))

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/Revou-FSSE-Oct25/crack-be-wmibrahim.git
   cd crack-be-wmibrahim
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Buat file `.env.local` di root project (lihat bagian [Environment Variables](#-environment-variables) di bawah).

4. **Setup Supabase Database**
   
   - Buat project baru di [Supabase Dashboard](https://supabase.com/dashboard)
   - Buat tabel yang dibutuhkan (`members`, `bookings`, `slots`) melalui SQL Editor atau Table Editor
   - Konfigurasi Row Level Security (RLS) sesuai kebutuhan
   - Copy `Project URL` dan `anon public key` ke `.env.local`

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

   Server akan berjalan di [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Buat file `.env.local` di root project dengan konfigurasi berikut:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ **Catatan keamanan:** Jangan commit file `.env.local` ke repository. Pastikan file ini sudah ada di `.gitignore`.

---

## 📜 Scripts

| Command           | Deskripsi                                  |
|-------------------|--------------------------------------------|
| `npm run dev`     | Menjalankan development server (Turbopack) |
| `npm run build`   | Build aplikasi untuk production            |
| `npm run start`   | Menjalankan production server              |
| `npm run lint`    | Menjalankan ESLint                         |

---

## 🌐 Deployment

Project ini dapat di-deploy ke platform yang mendukung Next.js, antara lain:

- **[Vercel](https://vercel.com)** (rekomendasi untuk Next.js)
- **[Netlify](https://netlify.com)**
- **[Railway](https://railway.app)**

### Langkah deploy ke Vercel:

1. Push code ke GitHub
2. Import project di [vercel.com/new](https://vercel.com/new)
3. Tambahkan environment variables di Vercel Dashboard
4. Deploy 🚀

---

## 👤 Author

**Wildan Ibrahim**

- 🔗 GitHub Repository: [crack-be-wmibrahim](https://github.com/Revou-FSSE-Oct25/crack-be-wmibrahim)
- 🎓 Program: Revou Full Stack Software Engineering — Oct 2025 Batch

---

## 📝 License

This project is created for educational purposes as part of Revou FSSE coursework.

---

<p align="center">Made with ❤️ using Next.js & Supabase</p>
