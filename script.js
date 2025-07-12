const cursos = {
    biologia: {
        nombre: "Introducción a la Biología",
        datos: [
            "Créditos: 3",
            "Área: FM-BPS",
            "Tipo: Obligatoria",
            "Modalidad: Presencial",
            "Prerrequisitos: Ninguno"
        ]
    },
    comunicacion: {
        nombre: "Introducción a la Comunicación",
        datos: [
            "Créditos: 2",
            "Área: HE",
            "Tipo: Obligatoria",
            "Modalidad: Presencial",
            "Prerrequisitos: Ninguno"
        ]
    },
    fisica: {
        nombre: "Introducción a la Física General",
        datos: [
            "Créditos: 3",
            "Área: FM",
            "Tipo: Obligatoria",
            "Modalidad: Presencial",
            "Prerrequisitos: Ninguno"
        ]
    }
};

function mostrarDetalles(id) {
    const curso = cursos[id];
    document.getElementById('nombre-curso').innerText = curso.nombre;
    const lista = document.getElementById('info-curso');
    lista.innerHTML = '';
    curso.datos.forEach(info => {
        const li = document.createElement('li');
        li.innerText = info;
        lista.appendChild(li);
    });
    document.getElementById('detalles').classList.remove('oculto');
}

function cerrarDetalles() {
    document.getElementById('detalles').classList.add('oculto');
}
