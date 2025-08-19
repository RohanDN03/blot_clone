import dedent from "dedent";

export default {
  SUGGESTIONS: [
    "Create TODO App in React",
    "Build a Weather App using OpenWeather API",
    "Develop a Markdown Note-taking App",
    "Make a Personal Portfolio Website",
    "Create a Chat Application with Socket.IO"
  ],
  HERO_HEADING: ' What do you want to build?',
  HERO_DESC: "Prompt , Run , Edit and Deploy full-stack web apps.",
  INPUT_PLACEHOLDER: "What do you want to build?",

  SIGNIN_HEADING: "Continue With Bolt",
  SIGNIN_SUBHEADING: "To use Bolt you need to sign in with your account",
  SIGNIN_AGREEMENT_TEXT:
    "By using Bolt you agree to our Terms of Service and Privacy Policy.",

  DEMO: {
    projectTitle: "React ToDo App",
    description: "A basic ToDo application built with React and functional components.",
    generatedFiles: [
      "/src/App.js",
      "/src/components/TodoList.js",
      "/src/components/TodoForm.js",
      "/src/components/TodoItem.js",
      "/src/index.css"
    ],
    code: dedent`
      import React, { useState } from 'react';
      import TodoList from './components/TodoList';
      import TodoForm from './components/TodoForm';
      
      function App() {
        const [todos, setTodos] = useState([]);
        
        const addTodo = text => {
          setTodos([...todos, { text }]);
        };
        
        const removeTodo = index => {
          setTodos(todos.filter((_, i) => i !== index));
        };
        
        return (
          <div className="app">
            <h1>React ToDo App</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} removeTodo={removeTodo} />
          </div>
        );
      }
      
      export default App;
    `
  },

  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- ✅ Tailwind loaded via PostCSS, no CDN needed -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>`
    },

    '/src/index.js': {
      code: dedent`
        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import App from './App';
        import './index.css'; // ✅ Tailwind imported here

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
      `
    },

    '/src/index.css': {
      code: `@tailwind base;
@tailwind components;
@tailwind utilities;`
    },

    '/tailwind.config.js': {
      code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};`
    },

    '/postcss.config.js': {
      code: `/** @type {import('postcss').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;`
    }
  },

  DEPENDANCIES: {
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "latest",
    "react-router-dom": "latest",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
  },

  PRICING_DESG: "Start with a free account to speed up your workflow or upgrade anytime for more features.",

  PRICING_OPTIONS: [
    {
      name: "Free",
      tokens: '50k',
      value: 50000,
      desc: "Ideal for hobbyists and casual users for light exploration, experimentation, and learning.",
      price: 4.99
    },
    {
      name: 'Starter',
      tokens: '120k',
      value: 120000,
      desc: 'Designed for professionals who need to use Bolt occasionally for projects, client work, and team tasks.',
      price: 9.99
    },
    {
      name: "Pro",
      tokens: "2.5M",
      value: 2500000,
      desc: "Perfect for power users and growing teams who require Bolt regularly for advanced workflows, research, and large-scale projects.",
      price: 29.99
    },
    {
      name: "Unlimited",
      tokens: "Unlimited",
      value: 99999999999,
      desc: "Best for enterprises and organizations that need unrestricted access to Bolt with maximum performance, scalability, and priority support.",
      price: 49.99
    }
  ]
};