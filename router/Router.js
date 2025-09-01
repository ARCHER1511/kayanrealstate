import { Home } from "../pages/Home.js";
import { About } from "../pages/About.js";
import { Services } from "../pages/Services.js";
import { Clients } from "../pages/Clients.js";
import { Contact } from "../pages/Contact.js";

// اللغة الافتراضية
let currentLang = localStorage.getItem("lang") || "ar";

// دالة لتغيير اللغة
export function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  navigate(window.location.hash); // إعادة تحميل الصفحة الحالية بالترجمة الصحيحة
}

// نظام التوجيه (Routing)
async function navigate(hash) {
  const root = document.getElementById("app");
  let page = hash.replace("#/", "") || "home";

  let html = "";

  switch (page.toLowerCase()) {
    case "home":
      html = await Home(currentLang);
      break;
    case "about":
      html = await About(currentLang);
      break;
    case "services":
      html = await Services(currentLang);
      break;
    case "clients":
      html = await Clients(currentLang);
      break;
    case "contact":
      html = await Contact(currentLang);
      break;
    default:
      html = `<h2 style="text-align:center;margin:2rem;">404 - Page Not Found</h2>`;
  }

  root.innerHTML = html;

  // ✅ هنا نربط زرار اللغة بعد ما الصفحة تتحمل
  const langBtn = document.getElementById("lang-switch");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const next = currentLang === "ar" ? "en" : "ar";
      setLanguage(next);
    });
  }
}

// متابعة التغيير في الرابط
window.addEventListener("hashchange", () => navigate(window.location.hash));

// أول تحميل
window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "#/home"; // افتراضي الصفحة الرئيسية
  }
  navigate(window.location.hash);
});