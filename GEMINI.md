# Project Overview

This is a Next.js web application for managing sacrament meetings. It allows users to view, create, and manage the agenda for sacrament meetings.

## Key Technologies

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Database:** [Vercel Postgres](https://vercel.com/storage/postgres)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **Schema Validation:** [Zod](https://zod.dev/)

## Project Structure

*   `app/`: Contains the application's routes.
    *   `app/(public)/meetings`: The main page for listing all sacrament meetings.
    *   `app/(public)/meetings/[id]`: The detail page for a single meeting.
    *   `app/(public)/meetings/create`: The page for creating a new meeting.
    *   `app/api/`: Contains API routes.
*   `components/`: Contains reusable React components.
*   `lib/`: Contains core application logic.
    *   `lib/meetings-db.ts`: Functions for interacting with the Vercel Postgres database.
    *   `lib/action.ts`: Next.js server actions for creating and modifying data.
    *   `lib/types.ts`: TypeScript type definitions.
    *   `lib/utils.ts`: Utility functions.
*   `public/`: Static assets.

## Building and Running

### Prerequisites

*   Node.js
*   npm (or yarn/pnpm)

### Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Linting

To run the linter:

```bash
npm run lint
```

## Development Conventions

*   **Server Logic:** Business logic is handled primarily through Next.js Server Actions (`lib/action.ts`) and API routes (`app/api/`).
*   **Database Interaction:** All database queries are co-located in `lib/meetings-db.ts`.
*   **Data Validation:** Zod is used for validating form data and other data structures.
*   **UI:** The UI is built with React components, styled with Tailwind CSS, and uses shadcn/ui for common UI elements.
*   **Routing:** The application uses the Next.js App Router, with routes organized in the `app/` directory.
