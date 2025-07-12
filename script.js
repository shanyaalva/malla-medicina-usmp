
function actualizar() {
  const cursos = document.querySelectorAll('.curso input');
  const total = cursos.length;
  const completados = Array.from(cursos).filter(c => c.checked).length;
  const porcentaje = Math.round((completados / total) * 100);
  document.querySelector('.relleno').style.width = porcentaje + '%';
  document.getElementById('contador').innerText = `${completados} cursos completados | ${total} cursos totales | ${porcentaje}%`;
}
