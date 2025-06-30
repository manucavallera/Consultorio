import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PacienteForm from "./components/PacientForm";
import PacienteList from "./components/PacientList";
import { useState } from "react";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  const handlePacienteSubmit = (paciente, accion) => {
    if (accion === "creado") {
      setPacientes((prev) => [...prev, paciente]);
    } else if (accion === "editado") {
      setPacientes((prev) =>
        prev.map((p) => (p._id === paciente._id ? paciente : p))
      );
      setPacienteEditando(null);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/pacientes'
          element={
            <div style={{ padding: "2rem" }}>
              <h2>Gestión de Pacientes</h2>
              <PacienteForm
                onPacienteSubmit={handlePacienteSubmit}
                pacienteEditando={pacienteEditando}
              />
              <hr />
              <PacienteList
                pacientes={pacientes}
                setPacientes={setPacientes}
                onEditPaciente={setPacienteEditando}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
