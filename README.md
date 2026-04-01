# Vijaya Industries B2B Platform

A professional, industrial-grade B2B manufacturing website for "Vijaya Industries", built with Next.js and Tailwind CSS. The platform is designed specifically for bulk distributors, workshops, and assembly lines, providing a highly reliable and performant product visualization and ordering experience.

## Tech Stack

*   **Framework:** Next.js (App Router)
*   **Library:** React 19
*   **Styling:** Tailwind CSS v4
*   **Icons:** Lucide React
*   **Language:** TypeScript

## Features

*   **Premium B2B Aesthetic:** A clean, industrial, and highly professional user interface using a consistent design system focused on reliability and structural integrity.
*   **Dynamic Product Catalogue (`/products`):** A responsive and interactive Product Detail Page (PDP) offering robust B2B ordering capabilities.
    *   **Advanced Filtering:** Search by product name, filter by brand (e.g., Maruti, Hyundai, Tata), and filter by component category.
    *   **Stock & MOQ Display:** Readily available information regarding bulk pricing, minimum order quantities, and material specifications.
*   **Admin/Development Portal:** A built-in, temporary (Hackathon/Development mode) admin portal togglable on the catalogue page, facilitating mock CRUD operations (Add/Delete products) locally. *Note: Architecture is prepped for future MongoDB integration and robust Authentication.*
*   **Modular Component Architecture:** Clean, modular React components (`TrustBar`, `Navbar`, `CTA`, and `Footer`) ensuring perfect UI alignment site-wide.
*   **Responsive:** Engineered to provide a perfect viewing experience from desktop logistics centers to mobile devices on the shop floor.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Future Roadmap

*   **Backend Integration:** Wire up the catalogue and product states to a live MongoDB cluster.
*   **Authentication:** Implement a robust session/authentication system to lock away administration controls and enable distributor verified accounts.
*   **Quote Engine:** Evolve the catalogue component to handle a formalized proforma invoice request system.
