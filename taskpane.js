let pacienteIndex = 0;

function getUnidadesOptions() {
  const unidades = [
    "UH2A",
    "UH2B",
    "UH2C",
    "UH2D",
    "UH2E",
    "UH2F",
    "UH3E",
    "UH3F",
    "UCI",
    "REA",
    "HDM",
    "DIÁLISIS",
    "HVT_1",
    "HVT_2",
    "HVT_3",
    "HVT_4",
    "HVT_POLIVALENTE",
    "HVT_FISIO Y RHB",
    "NEO",
    "URG_SALA_TTO",
    "URG_SALA_ESPERA_CONVEN",
    "URG_OBS_SILLONES",
    "URG_CONVEN",
    "URG_CAMA_PREING"
  ];
  return unidades.map((u) => `<option value="${u}">${u}</option>`).join("");
}

function addPaciente() {
  const container = document.getElementById("form-container");
  if (!container) {
    console.error("form-container no encontrado");
    return;
  }

  const card = document.createElement("div");
  card.className = "paciente-card";
  card.setAttribute("data-index", pacienteIndex);

  card.innerHTML = `
    <h3>Paciente ${pacienteIndex + 1}</h3>
    <div class="paciente-icon">👤</div>

    <label>Nombre del observador:</label>
    <input type="text" name="nombreObservador">

    <label>Unidad observada:</label>
    <select name="unidadObservada" onchange="toggleUnidadOtra(this)">
      ${getUnidadesOptions()}
      <option value="OTRAS">OTRAS</option>
    </select>
    <div class="sub-question unidad-otra" style="display: none;">
      <label>Especifique otra unidad:</label>
      <input type="text" name="unidadOtra">
    </div>

    <label>¿Lleva pulsera identificativa?</label>
    <select name="pulsera" onchange="togglePulseraDetalle(this)">
      <option value="">Seleccione</option>
      <option value="SI">Sí</option>
      <option value="SI_PROBLEMAS">Sí, pero con problemas</option>
      <option value="NO">No</option>
    </select>

    <div class="sub-question pulsera-4B" style="display: none;">
      <label>Detalle del problema:</label>
      <select name="detalle4B">
        <option value="">Seleccione</option>
        <option>La tiene pero no se la ha puesto a su llegada al hospital</option>
        <option>Está puesta en la cama</option>
        <option>Le queda grande. No se ha entregado el tamaño adecuado</option>
        <option>Deteriorada</option>
        <option>Ilegible</option>
        <option>Corresponde a otro paciente</option>
        <option>Corresponde a otro Hospital</option>
        <option value="OTRAS">OTRAS</option>
      </select>
      <input type="text" name="detalle4B_otra" style="display: none;" placeholder="Especifique otra">
    </div>

    <div class="sub-question pulsera-4C" style="display: none;">
      <label>Motivo de no disponer de la pulsera:</label>
      <select name="detalle4C">
        <option value="">Seleccione</option>
        <option>En proceso de reposición.</option>
        <option>Pérdida en ese u otro servicio/deterioro y no reposición</option>
        <option>El personal sanitario se la ha quitado para facilitar una maniobra y no hay reposición.</option>
        <option>El personal sanitario se la ha quitado porque le hace daño, obesidad, o similar y no hay reposición.</option>
        <option>El paciente se la ha quitado/no se la quiere poner.</option>
        <option>Ingreso vía urgente y nadie le ha impreso y puesto la pulsera</option>
        <option>Desconocido</option>
        <option value="OTRAS">OTRAS</option>
      </select>
      <input type="text" name="detalle4C_otra" style="display: none;" placeholder="Especifique otra">
    </div>

    <div class="pregunta-5" style="display: none;">
      <label>¿El paciente tiene alguna alergia?</label>
      <select name="alergia" onchange="toggleClip(this)">
        <option value="">Seleccione</option>
        <option>Sí</option>
        <option>No</option>
      </select>
    </div>

    <div class="pregunta-6" style="display: none;">
      <label>En caso afirmativo, ¿lleva el clip naranja en pulsera?</label>
      <select name="clip">
        <option value="">Seleccione</option>
        <option>Sí</option>
        <option>No</option>
      </select>
    </div>
  `;

  container.appendChild(card);
  pacienteIndex++;
}

function toggleUnidadOtra(select) {
  const card = select.closest(".paciente-card");
  const otraDiv = card.querySelector(".unidad-otra");
  otraDiv.style.display = select.value === "OTRAS" ? "block" : "none";
}

function togglePulseraDetalle(select) {
  const card = select.closest(".paciente-card");
  const pulsera4B = card.querySelector(".pulsera-4B");
  const pulsera4C = card.querySelector(".pulsera-4C");
  const pregunta5 = card.querySelector(".pregunta-5");

  pulsera4B.style.display = "none";
  pulsera4C.style.display = "none";

  if (select.value === "SI_PROBLEMAS") {
    pulsera4B.style.display = "block";
  } else if (select.value === "NO") {
    pulsera4C.style.display = "block";
  }

  // Mostrar pregunta 5 siempre que se haya respondido algo en pregunta 3
  if (select.value !== "") {
    pregunta5.style.display = "block";
  } else {
    pregunta5.style.display = "none";
  }

  const detalle4B = card.querySelector('select[name="detalle4B"]');
  const input4B = card.querySelector('input[name="detalle4B_otra"]');
  if (detalle4B && input4B) {
    detalle4B.onchange = () => {
      input4B.style.display = detalle4B.value === "OTRAS" ? "block" : "none";
    };
  }

  const detalle4C = card.querySelector('select[name="detalle4C"]');
  const input4C = card.querySelector('input[name="detalle4C_otra"]');
  if (detalle4C && input4C) {
    detalle4C.onchange = () => {
      input4C.style.display = detalle4C.value === "OTRAS" ? "block" : "none";
    };
  }
}
function toggleClip(select) {
  const card = select.closest(".paciente-card");
  const clipDiv = card.querySelector(".pregunta-6");
  clipDiv.style.display = select.value === "Sí" ? "block" : "none";
}

function guardarFormulario() {
  const cards = document.querySelectorAll(".paciente-card");
  const data = [];

  // Encabezados
  const headers = [
    "Nombre del observador",
    "Unidad observada",
    "Otra unidad",
    "Pulsera",
    "Detalle 4B",
    "Otra 4B",
    "Detalle 4C",
    "Otra 4C",
    "Alergia",
    "Clip"
  ];
  data.push(headers);

  // Datos por paciente
  cards.forEach((card) => {
    const get = (name) => {
      const el = card.querySelector(`[name="${name}"]`);
      return el && "value" in el ? el.value : "";
    };

    const alergia = get("alergia");

    const fila = [
      get("nombreObservador"),
      get("unidadObservada"),
      get("unidadOtra"),
      get("pulsera"),
      get("detalle4B"),
      get("detalle4B_otra"),
      get("detalle4C"),
      get("detalle4C_otra"),
      alergia,
      alergia === "Sí" ? get("clip") : ""
    ];

    data.push(fila);
  });

  // Inserta los datos como una matriz en Excel
  Office.context.document.setSelectedDataAsync(data, { coercionType: Office.CoercionType.Matrix }, (result) => {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      console.log("Formulario guardado correctamente.");
      alert("¡Datos guardados en Excel!");
    } else {
      console.error("Error:", result.error.message);
      alert("Error al guardar: " + result.error.message);
    }
  });
}
function guardarFormulario() {
  const cards = document.querySelectorAll(".paciente-card");
  const data = [];

  const obtenerFechaHora = () => {
    const ahora = new Date();
    return ahora.toLocaleString("es-ES"); // Ej: 05/06/2025 18:40:22
  };

  cards.forEach((card) => {
    const get = (name) => {
      const el = card.querySelector(`[name="${name}"]`);
      return el && "value" in el ? el.value : "";
    };

    const alergia = get("alergia");

    const fila = [
      obtenerFechaHora(), // Columna A: fecha y hora
      get("nombreObservador"),
      get("unidadObservada"),
      get("unidadOtra"),
      get("pulsera"),
      get("detalle4B"),
      get("detalle4B_otra"),
      get("detalle4C"),
      get("detalle4C_otra"),
      alergia,
      alergia === "Sí" ? get("clip") : ""
    ];

    data.push(fila);
  });

  Excel.run(async (context) => {
    const hoja = context.workbook.worksheets.getActiveWorksheet();
    const usedRange = hoja.getUsedRange(true);
    usedRange.load("rowCount");

    await context.sync();

    const ultimaFila = usedRange.rowCount;
    const destino = hoja.getRangeByIndexes(ultimaFila, 0, data.length, data[0].length);
    destino.values = data;

    await context.sync();
    console.log("Datos guardados debajo de la última fila.");
    alert("¡Datos guardados correctamente!");
  }).catch(function(error) {
    console.error("Error:", error);
    alert("Error al guardar: " + error.message);
  });
}
