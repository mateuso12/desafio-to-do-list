import { Header } from './components/Header'
import "tailwindcss/tailwind.css";
import "./global.css";
import { TaskList } from './components/TaskList';
import React from 'react';

function App() {

  return (
    <section className="flex flex-col items-center">
      <Header />
      <TaskList />
    </section>
    )
}

export default App
