import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";

export async function Home(lang) {
  const file = lang === "ar" 
    ? "./pages/Home.ar.html" 
    : "./pages/Home.en.html";

  const res = await fetch(file);
  const content = await res.text();

  return `
    ${await Header(lang)}
    ${content}
    ${await Footer(lang)}
  `;
}