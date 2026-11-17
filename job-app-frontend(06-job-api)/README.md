# Jobio — Job Tracking App

A React application for tracking job applications. The frontend uses React, React Router, styled-components, Axios, and Vite.

## Requirements

- Node.js 20.19+ or 22.12+ (Node.js 24 is also supported)
- npm

## Setup

```bash
npm install
```

## Run in development

```bash
npm run dev
```

Vite prints the local URL in the terminal (usually http://localhost:5173).

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## API

The app currently connects to the existing jobs API at:

`https://node-course-jobs-api.onrender.com/api/v1`

The API base URL is configured in `src/axios.js`.
