export async function Footer(lang) {
  const file = lang === "ar" 
    ? "./components/Footer.ar.html" 
    : "./components/Footer.en.html";
    
  const res = await fetch(file);
  return await res.text();
}