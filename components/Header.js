export async function Header(lang) {
  const file = lang === "ar" 
    ? "./components/Header.ar.html" 
    : "./components/Header.en.html";
    
  const res = await fetch(file);
  return await res.text();
}