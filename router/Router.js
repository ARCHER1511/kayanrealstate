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

  // Save language and direction
  localStorage.setItem("lang", lang);
  localStorage.setItem("dir", lang === "ar" ? "rtl" : "ltr");

  // Apply language and direction to document
  document.documentElement.setAttribute("lang", lang);
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // Apply font based on language
  const font = lang === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif";
  document.body.style.fontFamily = font;
  localStorage.setItem("font", font);

  // Reload current page with correct translation
  navigate(window.location.hash);
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
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");

  // check saved preference
  let currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
} 



// متابعة التغيير في الرابط
window.addEventListener("hashchange", () => navigate(window.location.hash));

// أول تحميل
window.addEventListener("DOMContentLoaded", () => {
  // Restore saved language settings before rendering
  const savedLang = localStorage.getItem("lang") || "ar";
  const savedDir = localStorage.getItem("dir") || "rtl";
  const savedFont = localStorage.getItem("font") || "'Cairo', sans-serif";

  document.documentElement.setAttribute("lang", savedLang);
  document.documentElement.setAttribute("dir", savedDir);
  document.body.style.fontFamily = savedFont;

  currentLang = savedLang;

  // Set default route if missing
  if (!window.location.hash) {
    window.location.hash = "#/home";
  }
  navigate(window.location.hash);
});