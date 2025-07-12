
document.addEventListener("DOMContentLoaded", () => {
  const frases = [
    "Hoy estás un paso más cerca de tu bata blanca.",
    "No se llega a medicina por casualidad, sino por vocación.",
    "Shany, tú no naciste para rendirte.",
    "Cada checkbox es un ladrillo más en tu futuro."
  ];
  const frase = frases[Math.floor(Math.random() * frases.length)];
  document.getElementById("frase-motivacional").innerText = frase;

  actualizarEstado();
});

function actualizarEstado() {
  const cursos = document.querySelectorAll(".curso");
  let total = 0, completados = 0;

  cursos.forEach(curso => {
    const checkbox = curso.querySelector("input[type='checkbox']");
    const id = curso.getAttribute("data-id");
    const prereq = curso.getAttribute("data-prerrequisito");

    if (!checkbox.disabled) total++;

    if (checkbox.checked) {
      curso.classList.add("aprobado");
      curso.classList.remove("activo");
      completados++;
    } else {
      curso.classList.remove("aprobado");
    }

    if (prereq) {
      const prereqCurso = document.querySelector(`[data-id='${prereq}'] input`);
      if (prereqCurso && prereqCurso.checked) {
        checkbox.disabled = false;
        curso.classList.add("activo");
      } else {
        checkbox.disabled = true;
        curso.classList.remove("activo");
      }
    }
  });

  const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;
  document.getElementById("progreso").style.width = porcentaje + "%";
  document.getElementById("progreso-texto").innerText = porcentaje + "% completado";
}
