const cursos = {
  "Pediatría General I": {
    estado: "Matriculado",
    convalidado: false,
    descripcion: "Curso del ciclo 11 que cubre el cuidado pediátrico general."
  },
  "Pediatría General II": {
    estado: "Matriculado",
    convalidado: false,
    descripcion: "Continuación de Pediatría I, con mayor enfoque clínico."
  },
  "Neonatología": {
    estado: "Matriculado",
    convalidado: false,
    descripcion: "Manejo integral del recién nacido en diversos contextos clínicos."
  }
};

function mostrarDetalle(nombre) {
  const curso = cursos[nombre];
  const detalleDiv = document.getElementById('detalleCurso');
  detalleDiv.style.display = "block";
  detalleDiv.innerHTML = `
    <h3>${nombre}</h3>
    <p><strong>Estado:</strong> ${curso.estado}</p>
    <p><strong>Convalidado:</strong> ${curso.convalidado ? "Sí" : "No"}</p>
    <p><strong>Descripción:</strong> ${curso.descripcion}</p>
  `;
}
