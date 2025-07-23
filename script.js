const CICLOS = [
  {
    nombre: "I CICLO",
    cursos: [
      { nombre: "Matemática", creditos: 3, prereq: [], icono: "📐" },
      { nombre: "Lenguaje", creditos: 3, prereq: [], icono: "🗣️" },
      { nombre: "Informática I", creditos: 1, prereq: [], icono: "💻" },
      { nombre: "Química", creditos: 4, prereq: [], icono: "⚗️" },
      { nombre: "Ecología", creditos: 2, prereq: [], icono: "🌱" },
      { nombre: "Filosofía", creditos: 2, prereq: [], icono: "📜" },
      { nombre: "Procedimientos básicos en medicina", creditos: 3, prereq: [], icono: "🩺" },
      { nombre: "Actividades Deportivas y Culturales", creditos: 1, prereq: [], icono: "🏃‍♀️" },
      { nombre: "Inglés I", creditos: 1, prereq: [], icono: "🇬🇧" }
    ]
  },
  {
    nombre: "II CICLO",
    cursos: [
      { nombre: "Antropología", creditos: 2, prereq: [], icono: "🧍" },
      { nombre: "Biología celular y molecular", creditos: 3, prereq: [], icono: "🧬" },
      { nombre: "Física", creditos: 1, prereq: ["Matemática"], icono: "🧲" },
      { nombre: "Salud Publica I", creditos: 4, prereq: ["Ecología"], icono: "🏥" },
      { nombre: "Ciudadanía Interculturalidad", creditos: 2, prereq: [], icono: "🌍" },
      { nombre: "Realidad nacional", creditos: 2, prereq: [], icono: "🇵🇪" },
      { nombre: "Inglés II", creditos: 3, prereq: ["Inglés I"], icono: "🇬🇧" }
    ]
  }
];

const FRASES = [
  "✨ Hoy estás un paso más cerca de tu bata blanca.",
  "💡 No se llega a medicina por casualidad, sino por vocación.",
  "🌟 Tú no naciste para rendirte."
];

const root = document.getElementById("root");
let nombreUsuario = prompt("¿Cómo te llamas?") || "Shanya";
let cursosCompletados = JSON.parse(localStorage.getItem("cursosCompletados") || '{}');

function guardarEstado() {
  localStorage.setItem("cursosCompletados", JSON.stringify(cursosCompletados));
}

function crearCiclo(ciclo) {
  const card = document.createElement("div");
  card.className = "card";
  const titulo = document.createElement("h2");
  titulo.textContent = ciclo.nombre;
  card.appendChild(titulo);

  ciclo.cursos.forEach(curso => {
    const div = document.createElement("div");
    const completado = cursosCompletados[curso.nombre];
    const prereqListos = curso.prereq.every(p => cursosCompletados[p]);
    let estado = "bg-gray-300";
    if (completado) estado = "bg-pink-200";
    else if (prereqListos) estado = "bg-blue-200";

    div.className = `curso ${estado}`;
    div.innerHTML = `<span>${curso.icono} ${curso.nombre} (${curso.creditos} créditos)</span><input type='checkbox' ${completado ? "checked" : ""}/>`;
    div.onclick = () => {
      if (prereqListos) {
        cursosCompletados[curso.nombre] = !cursosCompletados[curso.nombre];
        guardarEstado();
        location.reload();
      }
    };
    card.appendChild(div);
  });

  return card;
}

function mostrarTodo() {
  const titulo = document.createElement("h1");
  titulo.textContent = "👩‍⚕️📚🧠✨ Plan de Estudios Medicina Humana USMP";
  root.appendChild(titulo);

  const motivacion = document.createElement("div");
  motivacion.className = "motivacion";
  motivacion.textContent = FRASES[Math.floor(Math.random() * FRASES.length)];
  root.appendChild(motivacion);

  const totalCursos = CICLOS.flatMap(c => c.cursos);
  const completados = totalCursos.filter(c => cursosCompletados[c.nombre]).length;
  const porcentaje = Math.round((completados / totalCursos.length) * 100);

  const progreso = document.createElement("div");
  progreso.className = "progreso";
  progreso.innerHTML = `<div class='progreso-barra' style='width:${porcentaje}%;'></div>`;
  root.appendChild(progreso);

  const resumen = document.createElement("div");
  resumen.style.textAlign = "center";
  resumen.innerHTML = `✅ ${completados} completados | 📘 ${totalCursos.length} cursos | 📈 ${porcentaje}%`;
  root.appendChild(resumen);

  CICLOS.forEach(ciclo => root.appendChild(crearCiclo(ciclo)));

  const reiniciar = document.createElement("button");
  reiniciar.textContent = "🔄 Reiniciar progreso";
  reiniciar.onclick = () => {
    localStorage.removeItem("cursosCompletados");
    location.reload();
  };
  root.appendChild(reiniciar);

  if (porcentaje === 100) {
    const final = document.createElement("div");
    final.style.textAlign = "center";
    final.style.color = "green";
    final.style.fontSize = "1.5rem";
    final.textContent = `🎉 ¡Felicidades Dra. ${nombreUsuario}! Has completado todo tu plan de estudios. El futuro es tuyo.`;
    root.appendChild(final);
    const audio = new Audio("https://www.myinstants.com/media/sounds/cash-register.mp3");
    audio.play();
  }
}

mostrarTodo();
