import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";

export async function Services(lang) {
  const file = lang === "ar" 
    ? "./pages/Services.ar.html" 
    : "./pages/Services.en.html";

  const res = await fetch(file);
  const content = await res.text();

  return `
    ${await Header(lang)}
    <main class="container animate__animated animate__fadeIn min-vh-100">
    ${content}
    </main>
    ${await Footer(lang)}
  `;
}