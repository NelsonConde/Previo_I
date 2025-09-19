const APP_NAME = "TechBlog";
let visitas = Number(localStorage.getItem("visitas") || 0);

const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const saludoPorHora = () => {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
};

const bienvenida = (nombre) => `Bienvenido/a ${nombre} a ${APP_NAME}`;

const setText = (el, value) => { if (el) el.textContent = value; };

const initSaludo = () => {
  const el = $("#saludo");
  if (!el) return;
  setText(el, `${saludoPorHora()} — ${APP_NAME}`);
};

const renderVisitas = () => {
  const el = $("#contador");
  if (el) setText(el, String(visitas));
};

const initVisitas = () => {
  const btn = $("#btnVisitas");
  if (!btn) return;
  renderVisitas();
  btn.addEventListener("click", () => {
    visitas += 1;
    localStorage.setItem("visitas", String(visitas));
    renderVisitas();
  });
};

const initColores = () => {
  const p = $("#texto");
  if (!p) return;
  const map = {
    "#btnRojo": "red",
    "#btnVerde": "green",
    "#btnAzul": "blue",
  };
  Object.entries(map).forEach(([sel, color]) => {
    const b = $(sel);
    if (b) b.addEventListener("click", () => { p.style.color = color; });
  });
};

const initNotas = () => {
  const input = $("#nuevaNota");
  const btn = $("#agregarNota");
  const lista = $("#listaNotas");
  if (!input || !btn || !lista) return;
  btn.addEventListener("click", () => {
    const v = input.value.trim();
    if (!v) return;
    const li = document.createElement("li");
    li.textContent = v;
    lista.prepend(li);
    input.value = "";
    input.focus();
  });
};

const clearErrors = (form) => { form.querySelectorAll(".error-msg").forEach(e => e.textContent = ""); };
const err = (id, msg) => { const el = $(id); if (el) el.textContent = msg; };

const initContacto = () => {
  const form = $("form.formulario");
  if (!form) return;
  const status = $("#formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors(form);
    let ok = true;

    const correo = $("#correo");
    const mensaje = $("#mensaje");
    const opcion = $("#opcion");

    const emailVal = (correo?.value || "").trim();
    const msgVal = (mensaje?.value || "").trim();
    const selVal = opcion?.value || "";

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailVal || !emailRe.test(emailVal)) { err("#err-correo", "Ingresa un email válido."); ok = false; }
    if (msgVal.length < 10) { err("#err-mensaje", "El mensaje debe tener al menos 10 caracteres."); ok = false; }
    if (!selVal) { err("#err-opcion", "Selecciona una opción válida."); ok = false; }

    if (!ok) return;

    if (status) { status.textContent = "Formulario enviado correctamente"; }
    form.reset();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initSaludo();
  initVisitas();
  initColores();
  initNotas();
  initContacto();
});
