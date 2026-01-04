# LexiREAD 📚

A modern, web-based dyslexia screening platform designed to help psychologists and healthcare professionals identify early signs of dyslexia in children through interactive assessments.

## 🌟 Features

- **Role-Based Access** - Separate dashboards for patients and psychologists
- **Interactive Screening** - Engaging tests for children including rapid naming, phonological awareness, and reading fluency
- **Real-Time Analytics** - Track patient progress with comprehensive statistics
- **Secure Authentication** - Built with Supabase for secure, scalable auth
- **Modern UI** - Clean, accessible interface built with shadcn/ui components
- **Mobile-First Design** - Responsive layout that works on all devices

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Database**: PostgreSQL with [Prisma ORM](https://prisma.io)
- **Authentication**: [Supabase](https://supabase.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs)
- **Validation**: [Zod](https://zod.dev)
- **Package Manager**: [pnpm](https://pnpm.io)

## 📋 Prerequisites

- Node.js 18.x or later
- pnpm 8.x or later
- PostgreSQL database
- Supabase project

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Eloe321/lexiRead.git
cd lexiRead
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY="your-supabase-anon-key"
```

### 4. Set up the database

```bash
pnpm prisma generate
pnpm prisma db push
```

### 5. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── auth/                 # Authentication pages
│   ├── dashboard/
│   │   ├── patient/          # Patient dashboard
│   │   └── psychologist/     # Psychologist dashboard
│   ├── lib/
│   │   ├── auth/             # Auth actions
│   │   ├── hooks/            # Custom React hooks
│   │   ├── stores/           # Zustand stores
│   │   ├── supabase/         # Supabase client
│   │   └── validations/      # Zod schemas
│   └── prisma/               # Prisma client
├── components/ui/            # shadcn/ui components
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## 🔐 User Roles

| Role             | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| **Patient**      | Parents/guardians who register their children for screening |
| **Psychologist** | Healthcare professionals who conduct and review screenings  |

## 📜 Available Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `pnpm dev`           | Start development server |
| `pnpm build`         | Build for production     |
| `pnpm start`         | Start production server  |
| `pnpm lint`          | Run ESLint               |
| `pnpm prisma studio` | Open Prisma database GUI |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Made with ❤️ for early dyslexia detection
</p>
