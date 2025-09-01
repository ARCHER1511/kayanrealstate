import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";

export async function Clients(lang) {
  const file = lang === "ar" 
    ? "./pages/Clients.ar.html" 
    : "./pages/Clients.en.html";

  const res = await fetch(file);
  const content = await res.text();

  return `
    ${await Header(lang)}
    <div class="container py-5 animate__animated animate__fadeIn min-vh-100">
    ${content}
    </div>
    ${await Footer(lang)}
  `;
}