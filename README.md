# CustomerFlow CRM

A modern, full-stack customer relationship management platform built with Next.js, Node.js, and PostgreSQL. CustomerFlow CRM enables businesses to manage customer data, create dynamic segments, and run targeted marketing campaigns with AI-powered content suggestions.

## 🚀 Live Demo

- **Frontend**: [https://customerflow-crm.vercel.app/](https://customerflow-crm.vercel.app/)
- **Database**: PostgreSQL hosted on Neon

## ✨ Features

### Customer Management
- Import customer data from CSV files
- Track customer spending and visit patterns
- Manage customer profiles and contact information
- Real-time customer analytics

### Dynamic Segmentation
- Create customer segments based on spending, visit frequency, and behavior
- JSON-based flexible rule engine
- Real-time audience size calculation
- Visual segment builder interface

### Campaign Management
- Create and schedule marketing campaigns
- AI-powered message suggestions using OpenAI
- Personalized message templates with customer data
- Real-time campaign performance tracking

### Analytics & Reporting
- Campaign delivery metrics
- Customer engagement analytics
- Segment performance insights
- Export capabilities

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component library
- **NextAuth.js** - Authentication with Google OAuth
- **TanStack React Query** - Server state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database
- **Redis** - Caching and job queues
- **OpenAI API** - AI content generation

### Infrastructure
- **Vercel** - Frontend deployment
- **Neon** - PostgreSQL hosting
- **GitHub** - Version control

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
git clone https://github.com/yourusername/customerflow-crm.git
cd customerflow-crm
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
# Frontend
cp apps/frontend/ENV_EXAMPLE.txt apps/frontend/.env.local

# Backend
cp apps/backend/ENV_EXAMPLE.txt apps/backend/.env
```

4. **Configure environment variables**
   - Update `.env.local` and `.env` files with your credentials
   - Set up Google OAuth credentials
   - Configure database and Redis URLs
   - Add OpenAI API key

5. **Set up the database**
```bash
cd apps/backend
npx prisma migrate dev
npx prisma generate
```

6. **Start the development servers**
```bash
# Terminal 1 - Backend
cd apps/backend
npm run dev

# Terminal 2 - Frontend
cd apps/frontend
npm run dev
```

## 📁 Project Structure

```
customerflow-crm/
├── apps/
│   ├── frontend/          # Next.js React application
│   └── backend/           # Node.js Express API server
├── docs/                  # Documentation
└── README.md             # This file
```

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

**Backend:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript
- `npm run start` - Start production server

### Database Management
- `npx prisma studio` - Open database GUI
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma generate` - Generate Prisma client

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend
1. Deploy to your preferred platform (Railway, Render, etc.)
2. Set environment variables
3. Run database migrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built by [Your Name] as a demonstration of full-stack development skills.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Vercel for hosting and deployment
- OpenAI for AI capabilities
