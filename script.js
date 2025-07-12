const frases = [
  "✨ Hoy estás un paso más cerca de tu bata blanca.",
  "💡 No se llega a medicina por casualidad, sino por vocación.",
  "🌟 Tú no naciste para rendirte."
];

document.addEventListener('DOMContentLoaded', () => {
  mostrarFraseMotivadora();
  cargarCursos();
});

function mostrarFraseMotivadora() {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById('fraseMotivadora').textContent = frase;
}

function cargarCursos() {
  const data = JSON.parse(localStorage.getItem("progresoCursos")) || {};
  const container = document.getElementById('ciclosContainer');
  const totalCursos = cursos.length;
  let completados = 0;

  cursos.forEach(ciclo => {
    const cicloDiv = document.createElement('div');
    cicloDiv.className = 'ciclo';
    cicloDiv.innerHTML = `<h2>${ciclo.nombre}</h2>`;

    ciclo.cursos.forEach(curso => {
      const id = curso.id;
      const estado = data[id] ? 'aprobado' : (verificarPrerequisitos(curso, data) ? 'activo' : 'bloqueado');
      if (estado === 'aprobado') completados++;

      const cursoDiv = document.createElement('div');
      cursoDiv.className = `curso estado-${estado}`;
      cursoDiv.innerHTML = `
        <label>
          <span>${curso.icono} ${curso.nombre} (${curso.creditos})</span>
          ${estado !== 'bloqueado' ? `<input type="checkbox" ${data[id] ? 'checked' : ''} onchange="toggleCurso('${id}')">` : ''}
        </label>
      `;
      cicloDiv.appendChild(cursoDiv);
    });

    container.appendChild(cicloDiv);
  });

  actualizarProgreso(completados, totalCursos);
}

function verificarPrerequisitos(curso, data) {
  if (!curso.prerequisitos || curso.prerequisitos.length === 0) return true;
  return curso.prerequisitos.every(id => data[id]);
}

function toggleCurso(id) {
  let data = JSON.parse(localStorage.getItem("progresoCursos")) || {};
  data[id] = !data[id];
  localStorage.setItem("progresoCursos", JSON.stringify(data));
  location.reload(); // recarga para actualizar estados
}

function actualizarProgreso(completados, total) {
  const porcentaje = Math.round((completados / total) * 100);
  document.getElementById('progresoGlobal').textContent = `✅ ${completados} cursos completados | 📘 ${total} cursos totales | 📈 ${porcentaje}% de avance`;
  if (porcentaje === 100) {
    setTimeout(() => alert("🎉 ¡Felicidades Dra./Dr.! Has completado todo tu plan de estudios. El futuro es tuyo."), 300);
  }
}

function reiniciarProgreso() {
  if (confirm("¿Estás segura/o de reiniciar tu progreso?")) {
    localStorage.removeItem("progresoCursos");
    location.reload();
  }
}

const cursos = [
  {
    nombre: "I CICLO",
    cursos: [
      { id: "anatomia1", nombre: "Anatomía Humana I", creditos: 4, icono: "🦴", prerequisitos: [] },
      { id: "biologia", nombre: "Biología Celular y Molecular", creditos: 3, icono: "🧬", prerequisitos: [] },
      { id: "quimica", nombre: "Fundamentos de Química", creditos: 3, icono: "⚗️", prerequisitos: [] },
      { id: "matematica", nombre: "Matemática Básica", creditos: 2, icono: "➗", prerequisitos: [] },
      { id: "comunicacion", nombre: "Introducción a la Comunicación", creditos: 2, icono: "🗣️", prerequisitos: [] },
      { id: "informatica", nombre: "Informática en Educación Médica", creditos: 1, icono: "💻", prerequisitos: [] }
    ]
  },
  {
    nombre: "II CICLO",
    cursos: [
      { id: "anatomia2", nombre: "Anatomía Humana II", creditos: 4, icono: "🦴", prerequisitos: ["anatomia1"] },
      { id: "epistemologia", nombre: "Epistemología Médica", creditos: 1, icono: "📜", prerequisitos: ["informatica"] },
      { id: "lenguaje", nombre: "Lenguaje", creditos: 2, icono: "📝", prerequisitos: ["comunicacion"] },
      { id: "bioquimica", nombre: "Bioquímica", creditos: 3, icono: "🧪", prerequisitos: ["quimica"] },
      { id: "fisiologia1", nombre: "Fisiología Humana I", creditos: 4, icono: "🫀", prerequisitos: ["biologia"] },
      { id: "inglesBasico", nombre: "Inglés Básico", creditos: 2, icono: "🇬🇧", prerequisitos: [] }
    ]
  }
  // Puedes seguir agregando los demás ciclos aquí
];
