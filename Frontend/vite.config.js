import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [tailwindcss(), flowbiteReact(), react()],
})