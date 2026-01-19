
 # Next.js Full-Stack Store Project

A modern, high-performance E-commerce storefront built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This project features a complete shopping flow from product discovery to secure checkout.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [Prisma ORM](https://www.prisma.io/) (PostgreSQL/MongoDB)
- **Authentication:** [Clerk](https://clerk.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **File Storage:** [Supabase Storage](https://supabase.com/storage)
- **Form Validation:** [Zod](https://zod.dev/)

## ✨ Key Features

- **Product Management:** Browse, search, and filter products with grid/list view toggles.
- **Shopping Cart:** Fully functional persistent cart with real-time tax and shipping calculations.
- **Checkout Flow:** Integrated Stripe Embedded Checkout for secure payments.
- **User Features:** Add products to Favourites, leave reviews, and track order history.
- **Admin Dashboard:** Dedicated area for admins to create, update, and delete products, plus view total sales.
- **Dark Mode:** Seamless theme switching using `next-themes`.
- **Image Uploads:** Direct integration with Supabase buckets for product images.

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd nextjs-store-project
```


### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your credentials:

```env
# Database
DATABASE_URL="your_database_url"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Supabase
SUPABASE_URL="your_supabase_url"
SUPABASE_KEY="your_supabase_anon_key"

# Admin Access
ADMIN_USER_ID="your_clerk_user_id"

```

### 4. Database Initialization

Generate the Prisma client and push your schema to the database:

```bash
npx prisma generate
npx prisma db push

```

_(Optional) Seed the database with initial products:_

```bash
node prisma/seed.js

```

### 5. Run the Development Server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## 📦 Available Commands

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Starts the development server.                   |
| `npm run build`     | Builds the application for production.           |
| `npm run start`     | Starts the production server.                    |
| `npm run lint`      | Runs ESLint to check for code quality.           |
| `npx prisma studio` | Opens a GUI to view and edit your database data. |

## 📜 License

This project is licensed under the MIT License.
