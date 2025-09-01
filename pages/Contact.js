import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";

export async function Contact(lang) {
  const file = lang === "ar" 
    ? "./pages/Contact.ar.html" 
    : "./pages/Contact.en.html";

  const res = await fetch(file);
  const content = await res.text();

  return `
    ${await Header(lang)}
    ${content}
    ${await Footer(lang)}
  `;
}