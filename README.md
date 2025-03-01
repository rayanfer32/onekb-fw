# 1KB Frontend Framework

This project implements an ultra-lightweight frontend framework in just 1KB of JavaScript, inspired by modern reactive frameworks. It demonstrates how to build a functional reactive UI system with minimal code while maintaining developer ergonomics.

## Framework Features

The framework (`fw.js`) provides several core features typically found in larger frameworks:

- **Reactive State Management**: Using signals for reactive state handling
- **Effects System**: For handling side effects and DOM updates
- **Computed Values**: Derived state that updates automatically
- **HTML Template Engine**: JSX-like template syntax with dynamic binding
- **Component System**: Function-based components with props
- **List Rendering**: Efficient keyed list rendering with diffing algorithm

## How It Works

The framework is built around three main concepts:

1. **Signals**: Reactive state containers that notify subscribers of changes
2. **Effects**: Side effects that automatically re-run when their dependencies change
3. **HTML Templates**: Tagged template literals for declarative UI description

## Todo App Example

The project includes a fully functional todo application demonstrating the framework's capabilities:

- Add, remove, and toggle todos
- Persistent storage using localStorage
- Computed values for remaining items
- Reusable components (TextInput, Button)
- Tailwind CSS styling via twind.style

### Features
- Add new todos with Enter key or button
- Toggle todo completion
- Remove todos
- Persistent storage
- Remaining items counter
- Responsive design

## Running the Project

1. Clone the repository
2. Serve the files using any HTTP server (e.g., using the included serve package):
```bash
npm install -g serve 
serve .
```
3. Open `http://localhost:3000` in your browser
4. You can also use live server extension

## Technical Details

- Framework size: ~1KB
- You can literally read the internals of fw.js (how cool is that!)
- No build step required
- Works in modern browsers

## Credit

Based on the article [1kb Frontend Library - Final Bytes](https://dev.to/fedia/1kb-frontend-library-final-bytes-1n0m) demonstrating how to build a minimal yet powerful frontend framework.