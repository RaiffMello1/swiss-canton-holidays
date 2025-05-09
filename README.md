# Holiday Calendar App

A Next.js and React application that displays public holidays for Swiss cantons.

## Prerequisites

- Node.js 16.x or later
- npm or yarn package manager

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/RaiffMello1/swiss-canton-holidays.git
cd swiss-canton-holidays

# Install dependencies
npm install
```

## Development

### Running the Development Server

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Code Structure

- `/src/app` - Main application code and components
- `/src/app/api` - API services and utilities
- `/src/public` - Static assets
- `/src/app/__tests__` - Test files

## Testing

This project uses Jest and React Testing Library for testing.

### Running Tests

```bash
# Run all tests
npm test
```

### Test Structure

- End-to-end tests for components are located in `/src/app/__tests__` directory
- Jest configuration is in `jest.config.js`
- Jest setup file is in `jest.setup.js`

## Building for Production

### Creating a Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```
The static files will be generated in the `out` directory.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)