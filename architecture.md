# Xeno CRM Platform - High-Level Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Next.js Frontend (React + TypeScript + Tailwind)             │
│  ├── Authentication (NextAuth.js + Google OAuth)              │
│  ├── Campaign Builder UI (React Flow)                         │
│  ├── Campaign History Dashboard                               │
│  └── Real-time Updates (Socket.io)                            │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTPS/REST API
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│  Express.js Backend (Node.js + TypeScript)                    │
│  ├── Authentication Middleware (JWT)                          │
│  ├── API Rate Limiting                                        │
│  ├── Request Validation (Joi/Zod)                             │
│  └── Error Handling                                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  Service Layer                                                 │
│  ├── Customer Service                                          │
│  ├── Campaign Service                                          │
│  ├── Segment Service                                           │
│  ├── AI Service (OpenAI/Vertex AI)                            │
│  └── Notification Service                                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  Prisma ORM                                                    │
│  ├── Database Migrations                                       │
│  ├── Query Optimization                                        │
│  └── Connection Pooling                                        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL Database                                           │
│  ├── Customers & Orders                                        │
│  ├── Campaigns & Segments                                      │
│  ├── Communication Logs                                        │
│  └── AI Generated Content                                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MESSAGE BROKER LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│  Redis Streams + Bull Queue                                    │
│  ├── Data Ingestion Queue                                      │
│  ├── Campaign Delivery Queue                                   │
│  ├── AI Processing Queue                                       │
│  └── Delivery Receipt Queue                                    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES LAYER                     │
├─────────────────────────────────────────────────────────────────┤
│  Third-party APIs                                              │
│  ├── Google OAuth 2.0                                          │
│  ├── OpenAI GPT-4 API                                          │
│  ├── Google Vertex AI                                          │
│  ├── Replicate (Image Generation)                              │
│  └── Mock Vendor API (Campaign Delivery)                       │
└─────────────────────────────────────────────────────────────────┘
```

## Key Components Flow

### 1. Data Ingestion Flow
```
API Request → Validation → Redis Stream → Consumer → Database
```

### 2. Campaign Creation Flow
```
UI Rule Builder → Segment Creation → AI Enhancement → Campaign Creation → Queue Processing
```

### 3. Campaign Delivery Flow
```
Campaign Trigger → Customer Selection → Message Generation → Vendor API → Delivery Receipt → Status Update
```

### 4. AI Integration Points
```
Natural Language Input → AI Processing → Rule Generation → UI Display
Campaign Objective → AI Processing → Message Suggestions → User Selection
Performance Data → AI Processing → Insight Generation → Dashboard Display
```
