import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";

export async function About(lang) {
  const file = lang === "ar" 
    ? "./pages/About.ar.html" 
    : "./pages/About.en.html";

  const res = await fetch(file);
  const content = await res.text();

  return `
    ${await Header(lang)}
    <div class="container animate__animated animate__fadeIn min-vh-100">
    ${content}
    </div>
    ${await Footer(lang)}
  `;
}