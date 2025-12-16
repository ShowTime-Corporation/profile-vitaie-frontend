# ProfileVit[AI]e - Frontend

## Project Summary

ProfileVit[AI]e is the frontend application for an AI-powered career growth platform for tech professionals. It helps users showcase their professional profile, analyze skills and experience using AI, and provides personalized career roadmaps and job recommendations.

This repository contains only the frontend; the backend API is a separate service. Backend URL: **https://github.com/ShowTime-Corporation/profile-vitaie-backend**

## Project Goals

- Provide a polished UI for users to build and manage their professional profile.
- Offer AI-driven insights and personalized career roadmaps.
- Deliver a responsive, accessible, and performant single-page application.
- Support a progressive feature set with clear separation of concerns between frontend and backend.

## Technologies Used

This project leverages a modern web development stack to deliver a robust and scalable application.

-   **Angular**: A powerful framework for building single-page applications.
-   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
-   **Lucide icons**: (via `lucide-angular`) - A collection of beautiful and customizable open-source icons.
-   **RxJS**: Reactive Extensions for JavaScript, used for asynchronous programming with observable streams.
-   **jwt-decode**: A small library to decode JWT tokens.
-   **npm**: Package manager for JavaScript.

## Project Structure (High Level)

The project follows a feature-driven organization, promoting modularity and maintainability.

```
src/
├── main.ts                 # Application bootstrap
├── index.html              # Main HTML host page
├── styles.css              # Global styles
└── app/                    # Application source code
    ├── app.ts              # Root component
    ├── app.config.ts       # Application configuration
    ├── app.routes.ts       # Main routing module
    ├── core/               # Core application concerns (shared across features)
    │   ├── auth/           # Authentication services, guards, interceptors
    │   ├── services/       # Global utility services
    │   ├── layout/         # Common layout components (header, footer, modals)
    │   └── interfaces/     # Global interfaces and types
    ├── features/           # Feature modules and pages
    │   ├── landing/        # Landing page feature
    │   ├── dashboard/      # User dashboard feature
    │   ├── roadmap/        # User roadmap feedback feature
    │   ├── employability/  # User employability feedback feature
    │   ├── resume/         # User resume feedback feature
    │   └── edit-profile/   # Profile editing feature (components, services, modals)
    ├── assets/             # Static assets like images and files
```

**Note**: Small, focused components and services live within their respective `features/` directories, while shared concerns that are used across multiple features reside in `core/`.

## How to Run (Development)

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (LTS version recommended) and [npm](https://www.npmjs.com/) installed.

### Common Commands

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    Starts the Angular development server. The application will be accessible at `http://localhost:4200/`.
    ```bash
    npm start
    ```

3.  **Build for Production**:
    Compiles the application into optimized static files for deployment.
    ```bash
    npm run build
    ```

4.  **Run Tests**:
    Executes the unit tests.
    ```bash
    npm test
    ```

### Using Angular CLI Directly

If you have the Angular CLI installed globally, you can also use `ng` commands directly:

```bash
npx ng serve        # Run development server
npx ng build        # Build for production
npx ng test         # Run tests
```
