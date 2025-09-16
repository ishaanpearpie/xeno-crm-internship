# Xeno Mini CRM - Complete Project Documentation

## 🚀 Live Applications

- **Frontend (Production)**: [https://xeno-crm-internship.vercel.app/](https://xeno-crm-internship.vercel.app/)
- **Database (PostgreSQL)**: [https://console.neon.tech/app/projects/raspy-union-79934955?database=neondb&branchId=br-red-mouse-a1h55m7r](https://console.neon.tech/app/projects/raspy-union-79934955?database=neondb&branchId=br-red-mouse-a1h55m7r)

## 📋 Project Overview

Xeno Mini CRM is a customer segmentation and campaign management platform built with modern web technologies. It allows users to manage customers, create segments, and run targeted marketing campaigns with AI-powered content suggestions.

## 🏗️ Architecture

The project follows a **monorepo structure** with separate frontend and backend applications:

```
Xeno/
├── apps/
│   ├── frontend/     # Next.js React application
│   └── backend/      # Node.js Express API server
├── customers.csv     # Sample customer data
├── orders.csv        # Sample order data
└── requirements.md   # Project requirements
```

## 🛠️ Tech Stack Breakdown

### Frontend Technologies

#### **Core Framework**
- **[Next.js 15.5.3](https://nextjs.org/)** - React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes
  - Built-in optimization features

#### **React & UI Libraries**
- **[React 19.1.0](https://react.dev/)** - JavaScript library for building user interfaces
- **[React DOM 19.1.0](https://react.dev/reference/react-dom)** - React rendering library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

#### **UI Components & Styling**
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
  - `@radix-ui/react-avatar` - Avatar component
  - `@radix-ui/react-dropdown-menu` - Dropdown menu
  - `@radix-ui/react-slot` - Composition primitive
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Class Variance Authority (CVA)](https://cva.style/)** - Component variant management
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes
- **[Tailwind CSS Animate](https://tailwindcss-animate.vercel.app/)** - Animation utilities

#### **State Management & Data Fetching**
- **[TanStack React Query 5.87.4](https://tanstack.com/query/latest)** - Server state management
- **[Axios 1.12.1](https://axios-http.com/)** - HTTP client for API requests

#### **Authentication**
- **[NextAuth.js 4.24.11](https://next-auth.js.org/)** - Authentication for Next.js
  - Google OAuth provider
  - JWT session strategy
  - Custom callbacks for user data

#### **Theming & Utilities**
- **[Next Themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Dark/light mode support
- **[Zod 4.1.8](https://zod.dev/)** - TypeScript-first schema validation
- **[CLSX 2.1.1](https://github.com/lukeed/clsx)** - Conditional className utility

#### **Development Tools**
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

### Backend Technologies

#### **Core Framework**
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express.js 5.1.0](https://expressjs.com/)** - Web application framework
- **[TypeScript 5.9.2](https://www.typescriptlang.org/)** - Type-safe JavaScript

#### **Database & ORM**
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Prisma 6.16.1](https://www.prisma.io/)** - Database ORM and query builder
  - Type-safe database queries
  - Database migrations
  - Prisma Studio for database management

#### **Authentication & Security**
- **[JWT (jsonwebtoken 9.0.2)](https://jwt.io/)** - JSON Web Token authentication
- **[bcryptjs 3.0.2](https://github.com/dcodeio/bcrypt.js)** - Password hashing
- **[Helmet 8.1.0](https://helmetjs.github.io/)** - Security middleware

#### **API & Middleware**
- **[CORS 2.8.5](https://github.com/expressjs/cors)** - Cross-Origin Resource Sharing
- **[Morgan 1.10.1](https://github.com/expressjs/morgan)** - HTTP request logger
- **[Multer 2.0.2](https://github.com/expressjs/multer)** - File upload handling

#### **AI Integration**
- **[OpenAI 5.20.2](https://openai.com/)** - AI content generation
  - Message suggestions
  - Image suggestions
  - Customer insights

#### **Background Jobs & Caching**
- **[Bull 4.16.5](https://github.com/OptimalBits/bull)** - Redis-based job queue
- **[IORedis 5.7.0](https://github.com/luin/ioredis)** - Redis client for Node.js

#### **Logging & Monitoring**
- **[Pino 9.9.5](https://github.com/pinojs/pino)** - Fast JSON logger
- **[Pino Pretty 13.1.1](https://github.com/pinojs/pino-pretty)** - Pretty printer for Pino

#### **Environment & Configuration**
- **[dotenv 17.2.2](https://github.com/motdotla/dotenv)** - Environment variable management
- **[Zod 4.1.8](https://zod.dev/)** - Environment variable validation

#### **Development Tools**
- **[tsx 4.20.5](https://github.com/esbuild-kit/tsx)** - TypeScript execution
- **[ts-node-dev 2.0.0](https://github.com/wclr/ts-node-dev)** - Development server with hot reload

### Database Schema

The application uses a comprehensive PostgreSQL schema with the following main entities:

#### **Core Models**
- **User** - Authentication and user management
- **Customer** - Customer data with spending and visit tracking
- **Order** - Order history and transaction data
- **Segment** - Customer segmentation rules and criteria
- **Campaign** - Marketing campaign management
- **CommunicationLog** - Message delivery tracking
- **AIContent** - AI-generated content storage

#### **Key Features**
- UUID primary keys for all entities
- Proper indexing for performance optimization
- Cascade deletion for data integrity
- JSON fields for flexible rule storage
- Enum types for status management

### Deployment & Infrastructure

#### **Frontend Deployment**
- **Platform**: [Vercel](https://vercel.com/)
- **Features**: 
  - Automatic deployments from Git
  - Edge functions
  - Global CDN
  - Environment variable management

#### **Database Hosting**
- **Platform**: [Neon](https://neon.tech/)
- **Features**:
  - Serverless PostgreSQL
  - Automatic scaling
  - Branching for development
  - Connection pooling

#### **Backend Deployment**
- **Platform**: Not specified (likely Vercel or Railway)
- **Features**: 
  - Environment variable management
  - Health check endpoints
  - CORS configuration for frontend integration

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Backend (.env)
```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:3000
OPENAI_API_KEY=your-openai-api-key
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis instance
- Google OAuth credentials
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Xeno
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd apps/frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Set up environment variables**
```bash
# Copy example files
cp apps/frontend/ENV_EXAMPLE.txt apps/frontend/.env.local
cp apps/backend/ENV_EXAMPLE.txt apps/backend/.env
```

4. **Set up the database**
```bash
cd apps/backend
npx prisma migrate dev
npx prisma generate
```

5. **Start the development servers**
```bash
# Terminal 1 - Backend
cd apps/backend
npm run dev

# Terminal 2 - Frontend
cd apps/frontend
npm run dev
```

## 📁 Project Structure

### Frontend Structure
```
apps/frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── campaigns/         # Campaign management pages
│   ├── segments/          # Customer segmentation pages
│   ├── ingestion/         # Data ingestion pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Navigation header
│   └── Providers.tsx     # Context providers
├── lib/                  # Utility functions
│   ├── auth.ts          # NextAuth configuration
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

### Backend Structure
```
apps/backend/
├── src/
│   ├── config/          # Configuration files
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── prisma/
│   └── schema.prisma    # Database schema
└── dist/               # Compiled JavaScript
```

## 🔑 Key Features

### Customer Management
- Customer data ingestion from CSV
- Customer profile management
- Spending and visit tracking
- Order history management

### Segmentation
- Rule-based customer segmentation
- Dynamic audience size calculation
- JSON-based rule storage for flexibility

### Campaign Management
- Campaign creation and scheduling
- AI-powered content suggestions
- Delivery status tracking
- Communication logging

### AI Integration
- OpenAI-powered content generation
- Message and image suggestions
- Customer insights and analytics

### Authentication
- Google OAuth integration
- JWT-based session management
- Secure API endpoints

## 🛡️ Security Features

- **Helmet.js** - Security headers
- **CORS** - Cross-origin request protection
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing
- **Input validation** - Zod schema validation
- **Environment variables** - Secure configuration management

## 📊 Performance Optimizations

- **Database indexing** - Optimized queries
- **React Query** - Efficient data fetching and caching
- **Next.js optimizations** - Built-in performance features
- **Redis caching** - Background job processing
- **Connection pooling** - Database connection optimization

## 🔄 Development Workflow

1. **Database changes**: Update Prisma schema and run migrations
2. **API development**: Add routes in `apps/backend/src/routes/`
3. **Frontend development**: Create pages in `apps/frontend/app/`
4. **Testing**: Use development servers for local testing
5. **Deployment**: Push to main branch for automatic deployment

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

---

*This documentation was generated to help you remember and understand all the technologies and components used in the Xeno Mini CRM project.*
