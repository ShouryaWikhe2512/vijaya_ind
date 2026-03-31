# Vijaya Industries Management System

A comprehensive business management application built with Next.js, featuring inventory management, order processing, invoicing, ledger tracking, and administrative controls.

## Features

### 🏪 Business Management
- **Product Catalogue**: Manage and display products with detailed information
- **Order Management**: Process and track customer orders
- **Inventory Control**: Monitor stock levels and inventory logs
- **Invoice Generation**: Create and manage invoices
- **Ledger System**: Track financial transactions and balances

### 👥 User Management
- **Authentication**: Secure sign-in and sign-up functionality
- **Role-based Access**: Admin and user roles with different permissions
- **User Synchronization**: Sync user data across systems

### 🔧 Admin Panel
- **Dashboard**: Overview of business metrics and statistics
- **Buyers Management**: Handle customer information
- **Products Administration**: CRUD operations for products
- **Orders Administration**: Manage order lifecycle
- **Inventory Administration**: Stock management and reporting
- **Invoice Administration**: Invoice processing and tracking
- **Ledger Administration**: Financial record management

### 📊 Reporting
- **Inventory Reports**: Stock level analysis and logs
- **Business Analytics**: Key performance indicators and trends

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via PostCSS)
- **Database**: MongoDB (inferred from models)
- **Authentication**: NextAuth.js (Clerk based on sign-in structure)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- MongoDB database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vijaya_ind
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with the required environment variables (see `.env` for reference).

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
vijaya_ind/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   ├── products/          # Product catalog
│   └── sign-in|sign-up/   # Authentication
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── models/                # Database models
└── public/                # Static assets
```

## API Endpoints

### Products
- `GET/POST /api/products` - List/Create products
- `GET/PUT/DELETE /api/products/[id]` - Product CRUD

### Orders
- `GET/POST /api/orders` - List/Create orders
- `GET/PUT/DELETE /api/orders/[id]` - Order CRUD

### Inventory
- `GET /api/inventory/logs` - Inventory logs
- `GET /api/inventory/report` - Inventory reports
- `POST /api/inventory/update` - Update inventory

### Invoices
- `GET/POST /api/invoice` - List/Create invoices
- `GET/PUT/DELETE /api/invoice/[id]` - Invoice CRUD

### Users
- `GET/POST /api/users` - List/Create users
- `GET/PUT/DELETE /api/users/[id]` - User CRUD
- `POST /api/users/role` - Update user roles
- `POST /api/users/sync` - Sync user data

### Categories
- `GET/POST /api/categories` - List/Create categories
- `GET/PUT/DELETE /api/categories/[id]` - Category CRUD

### Ledger
- `GET/POST /api/ledger` - List/Create ledger entries
- `GET/PUT/DELETE /api/ledger/[id]` - Ledger CRUD

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support or questions, please contact the development team.
