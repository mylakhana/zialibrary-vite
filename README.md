# Ship+Tag - React + Vite Application

A modern React application built with Vite, featuring internationalization (i18n), dark mode support, and responsive design.

## Features

- 🌐 Internationalization (English & Arabic)
- 🌓 Dark/Light Mode
- 📱 Responsive Design
- 🚀 Fast Development with Vite
- 🎨 Modern UI with HeroUI Components

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup and Run

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd shiptag_vite
npm install
```

2. Set up environment files:
```bash
# Copy .env file for development
cp .env.example .env.development

# Copy .env file for production
cp .env.example .env.production
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Environment Variables

The application uses the following environment variables:

- `VITE_API_URL`: Base URL for API requests
- `VITE_APP_NAME`: Application name
- `VITE_DEFAULT_LANGUAGE`: Default language (en/ar)

Make sure to set these variables in your `.env.development` and `.env.production` files.

## Project Structure

```
src/
├── components/     # Reusable components
├── contexts/      # React contexts (Theme, Language)
├── layouts/       # Layout components
├── locales/       # Translation files
├── pages/         # Page components
└── utils/         # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
