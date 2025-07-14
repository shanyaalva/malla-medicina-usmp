import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const CICLOS = [
  {
    nombre: "I CICLO",
    cursos: [
      { nombre: "Matemática", creditos: 3, prereq: [], icono: "📐" },
      { nombre: "Lenguaje", creditos: 3, prereq: [], icono: "📝" },
      { nombre: "Informática I", creditos: 1, prereq: [], icono: "💻" },
      { nombre: "Química", creditos: 4, prereq: [], icono: "⚗️" },
      { nombre: "Ecología", creditos: 2, prereq: [], icono: "🌱" },
      { nombre: "Filosofía", creditos: 2, prereq: [], icono: "🤔" },
      { nombre: "Procedimientos básicos en medicina", creditos: 3, prereq: [], icono: "🩺" },
      { nombre: "Actividades Deportivas y Culturales", creditos: 1, prereq: [], icono: "🎨" },
      { nombre: "Inglés I", creditos: 1, prereq: [], icono: "🇺🇸" }
    ]
  },
  {
    nombre: "II CICLO",
    cursos: [
      { nombre: "Antropología", creditos: 2, prereq: [], icono: "👥" },
      { nombre: "Biología celular y molecular", creditos: 3, prereq: [], icono: "🧬" },
      { nombre: "Física", creditos: 1, prereq: ["Matemática"], icono: "🔭" },
      { nombre: "Salud Publica I", creditos: 4, prereq: ["Ecología"], icono: "🌎" },
      { nombre: "Ciudadanía Interculturalidad", creditos: 2, prereq: [], icono: "🌍" },
      { nombre: "Realidad nacional", creditos: 2, prereq: [], icono: "🗺️" },
      { nombre: "Inglés II", creditos: 3, prereq: ["Inglés I"], icono: "📘" }
    ]
  },
  {
    nombre: "III CICLO",
    cursos: [
      { nombre: "Anatomía Humana I", creditos: 7, prereq: ["Biología celular y molecular"], icono: "🦴" },
      { nombre: "Histología Humana", creditos: 5, prereq: ["Biología celular y molecular"], icono: "🔬" },
      { nombre: "Embriología humana y genética básica", creditos: 5, prereq: ["Biología celular y molecular"], icono: "👶" },
      { nombre: "Psicología médica", creditos: 3, prereq: [], icono: "🧠" },
      { nombre: "Asignatura electiva I", creditos: 2, prereq: [], icono: "🧩" }
    ]
  },
  {
    nombre: "IV CICLO",
    cursos: [
      { nombre: "Anatomía Humana II", creditos: 4, prereq: ["Anatomía Humana I"], icono: "🦵" },
      { nombre: "Bioquímica", creditos: 5, prereq: ["Biología celular y molecular", "Química"], icono: "🧪" },
      { nombre: "Microbiología", creditos: 4, prereq: ["Biología celular y molecular"], icono: "🧫" },
      { nombre: "Parasitología", creditos: 3, prereq: ["Biología celular y molecular"], icono: "🦠" },
      { nombre: "Bioestadística", creditos: 4, prereq: ["Matemática"], icono: "📊" },
      { nombre: "Asignatura electiva II", creditos: 2, prereq: [], icono: "🧩" }
    ]
  },
  {
    nombre: "V CICLO",
    cursos: [
      { nombre: "Fisiología Humana", creditos: 9, prereq: [], icono: "🫀" },
      { nombre: "Epidemiología", creditos: 5, prereq: [], icono: "📉" },
      { nombre: "Informática II", creditos: 1, prereq: [], icono: "🖥️" },
      { nombre: "Inmunología básica", creditos: 3, prereq: [], icono: "🛡️" },
      { nombre: "Metodología de la investigación", creditos: 3, prereq: [], icono: "🔍" }
    ]
  },
  {
    nombre: "VI CICLO",
    cursos: [
      { nombre: "Farmacología", creditos: 7, prereq: [], icono: "💊" },
      { nombre: "Patología I", creditos: 6, prereq: [], icono: "🧾" },
      { nombre: "Fisiopatología", creditos: 5, prereq: [], icono: "🩻" },
      { nombre: "Bioética y deontología", creditos: 4, prereq: [], icono: "⚖️" }
    ]
  },
  {
    nombre: "VII CICLO",
    cursos: [
      { nombre: "Diagnóstico por imagen", creditos: 4, prereq: [], icono: "🖼️" },
      { nombre: "Laboratorio clínico", creditos: 4, prereq: [], icono: "🧫" },
      { nombre: "Medicina I", creditos: 12, prereq: [], icono: "🏥" },
      { nombre: "Nutrición clínica", creditos: 2, prereq: [], icono: "🥗" }
    ]
  },
  {
    nombre: "VIII CICLO",
    cursos: [
      { nombre: "Medicina II", creditos: 12, prereq: [], icono: "🩺" },
      { nombre: "Patología II", creditos: 3, prereq: [], icono: "🧾" },
      { nombre: "Telesalud", creditos: 2, prereq: [], icono: "📡" },
      { nombre: "Medicina familiar y comunitaria", creditos: 2, prereq: [], icono: "🏘️" },
      { nombre: "Asignatura electiva III", creditos: 2, prereq: [], icono: "🧩" }
    ]
  },
  {
    nombre: "IX CICLO",
    cursos: [
      { nombre: "Medicina III", creditos: 12, prereq: [], icono: "🧑‍⚕️" },
      { nombre: "Psiquiatría", creditos: 3, prereq: [], icono: "🧠" },
      { nombre: "Neurología", creditos: 4, prereq: [], icono: "🧠" },
      { nombre: "Tesis I", creditos: 1, prereq: [], icono: "📄" },
      { nombre: "Terapéutica", creditos: 2, prereq: [], icono: "💉" }
    ]
  },
  {
    nombre: "X CICLO",
    cursos: [
      { nombre: "Casos clínicos quirúrgicos", creditos: 1, prereq: [], icono: "📋" },
      { nombre: "Cirugía del aparato locomotor", creditos: 5, prereq: [], icono: "🦿" },
      { nombre: "Cirugía general y digestiva", creditos: 5, prereq: [], icono: "🔪" },
      { nombre: "Cuidados paliativos y terapia del dolor", creditos: 2, prereq: [], icono: "🕊️" },
      { nombre: "Especialidades quirúrgicas", creditos: 3, prereq: [], icono: "🔧" },
      { nombre: "Técnica operatoria – anestesiología", creditos: 4, prereq: [], icono: "💉" }
    ]
  },
  {
    nombre: "XI CICLO",
    cursos: [
      { nombre: "Pediatría General I", creditos: 5, prereq: [], icono: "👶" },
      { nombre: "Pediatría General II", creditos: 4, prereq: [], icono: "👧" },
      { nombre: "Neonatología", creditos: 4, prereq: [], icono: "👶" },
      { nombre: "Emergencias Médicas y Toxicológicas", creditos: 5, prereq: [], icono: "🚑" },
      { nombre: "Medicina Legal y Patología Forense", creditos: 2, prereq: [], icono: "⚖️" },
      { nombre: "Genética médica", creditos: 2, prereq: [], icono: "🧬" },
      { nombre: "Asignatura electiva IV", creditos: 2, prereq: [], icono: "🧩" }
    ]
  },
  {
    nombre: "XII CICLO",
    cursos: [
      { nombre: "Ginecología", creditos: 5, prereq: ["Pediatría General I", "Pediatría General II", "Neonatología"], icono: "🧫" },
      { nombre: "Obstetricia", creditos: 5, prereq: ["Pediatría General I", "Pediatría General II", "Neonatología"], icono: "🤰" },
      { nombre: "Salud Pública II", creditos: 5, prereq: ["Medicina Legal y Patología Forense"], icono: "🏥" },
      { nombre: "Geriatría", creditos: 3, prereq: ["Medicina III"], icono: "👵" },
      { nombre: "Gestión en Servicios de Salud", creditos: 2, prereq: ["Medicina Legal y Patología Forense"], icono: "🧾" },
      { nombre: "Principios de la Medicina Física y Rehabilitación", creditos: 2, prereq: ["Cirugía del aparato locomotor", "Especialidades quirúrgicas"], icono: "♿" },
      { nombre: "Tesis II", creditos: 1, prereq: ["Tesis I", "Pediatría General I"], icono: "📃" }
    ]
  },
  {
    nombre: "XIII CICLO",
    cursos: [
      { nombre: "Internado Médico I", creditos: 32, prereq: ["Asignaturas del ciclo I al XII"], icono: "🧑‍⚕️" },
      { nombre: "Internado Médico II", creditos: 32, prereq: ["Asignaturas del ciclo I al XII"], icono: "🧑‍⚕️" },
      { nombre: "Trabajo de Investigación", creditos: 2, prereq: ["Asignaturas del ciclo I al XII"], icono: "📑" }
    ]
  },
  {
    nombre: "XIV CICLO",
    cursos: [
      { nombre: "Rotación Clínica Integral I", creditos: 16, prereq: ["Internado Médico I", "Internado Médico II"], icono: "🏥" },
      { nombre: "Rotación Clínica Integral II", creditos: 16, prereq: ["Internado Médico I", "Internado Médico II"], icono: "🏥" },
      { nombre: "Trabajo Final de Investigación", creditos: 2, prereq: ["Trabajo de Investigación"], icono: "📘" }
    ]
  }
];

const frases = [
  "✨ Hoy estás un paso más cerca de tu bata blanca.",
  "💡 No se llega a medicina por casualidad, sino por vocación.",
  "🌟 Tú no naciste para rendirte."
];

export default function App() {
  const [nombre, setNombre] = useState("");
  const [progreso, setProgreso] = useState({});
  const [frase, setFrase] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("progreso_malla")) || {};
    setProgreso(saved);
    setNombre(localStorage.getItem("nombre_usuario") || "");
    setFrase(frases[Math.floor(Math.random() * frases.length)]);
  }, []);

  useEffect(() => {
    localStorage.setItem("progreso_malla", JSON.stringify(progreso));
    localStorage.setItem("nombre_usuario", nombre);
  }, [progreso, nombre]);

  const toggleCurso = (ciclo, curso) => {
    const key = `${ciclo}-${curso}`;
    const nuevo = { ...progreso, [key]: !progreso[key] };
    setProgreso(nuevo);
  };

  const reset = () => {
    setProgreso({});
  };

  const totalCursos = CICLOS.reduce((acc, ciclo) => acc + ciclo.cursos.length, 0);
  const cursosCompletados = Object.values(progreso).filter(Boolean).length;
  const porcentaje = Math.round((cursosCompletados / totalCursos) * 100);

  useEffect(() => {
    if (porcentaje === 100) confetti();
  }, [porcentaje]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 animate-pulse">
          👩‍⚕️ Plan de Estudios Medicina Humana USMP
        </h1>
        <p className="italic">{frase.replace("Tú", nombre || "Tú")}</p>
        <div className="mt-2">
          <Input
            placeholder="Escribe tu nombre..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="max-w-sm mx-auto"
          />
        </div>
      </header>

      <div className="flex justify-between items-center mb-4">
        <div>
          ✅ {cursosCompletados} cursos completados | 📘 {totalCursos} cursos totales | 📈 {porcentaje}%
        </div>
        <Button variant="destructive" onClick={reset}>Reiniciar progreso</Button>
      </div>
      <Progress value={porcentaje} className="mb-8" />

      <div className="grid gap-8">
        {CICLOS.map((ciclo, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-r from-purple-200 to-blue-100 rounded-2xl p-4 shadow"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl font-bold mb-4">{ciclo.nombre}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ciclo.cursos.map((curso, i) => {
                const key = `${ciclo.nombre}-${curso.nombre}`;
                const estado = progreso[key] ? "bg-pink-200" : "bg-slate-200";
                return (
                  <Card
                    key={i}
                    className={`transition-all duration-300 cursor-pointer ${estado}`}
                    onClick={() => toggleCurso(ciclo.nombre, curso.nombre)}
                  >
                    <CardContent className="p-4">
                      <div className="text-2xl">{curso.icono}</div>
                      <div className="font-semibold">{curso.nombre}</div>
                      <div className="text-sm">Créditos: {curso.creditos}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {porcentaje === 100 && (
        <motion.div
          className="text-center mt-10 text-xl font-bold text-green-700 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🎉 ¡Felicidades Dra. {nombre || ""}! Has completado tu plan de estudios. El futuro es tuyo. 🎓
        </motion.div>
      )}

      <footer className="mt-16 text-center text-xs text-gray-500">
        Hecho con 💖 por Shanya Alva · Personalízalo y compártelo · 📸
      </footer>
    </div>
  );
}

