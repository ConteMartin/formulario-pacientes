// Aquí irá el JS final exportado desde Script Lab. Simplificado para ejemplo.
function addPaciente() {
  const container = document.getElementById("form-container");
  const div = document.createElement("div");
  div.className = "paciente-card";
  div.innerHTML = '<label>Nombre:</label><input type="text"/>';
  container.appendChild(div);
}
function guardarFormulario() {
  console.log("Formulario guardado");
}