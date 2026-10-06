export const requestTypes = {
  preventivo: "Richiesta preventivo",
  collaborazione: "Collaborazione / lavoro",
  informazioni: "Informazioni generali",
};
export const limits = { nome: 100, email: 254, telefono: 40, messaggio: 5000 };
const controls = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u;
export function validateContact(input) {
  const errors = {};
  const data = {};
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { errors: { form: "Richiesta non valida." }, data };
  for (const field of [
    "nome",
    "email",
    "telefono",
    "tipo_richiesta",
    "messaggio",
  ]) {
    if (typeof input[field] !== "string") {
      if (field === "telefono" && input[field] === undefined) {
        data[field] = "";
        continue;
      }
      errors[field] = "Controlla questo campo.";
      continue;
    }
    const value = input[field].trim();
    data[field] = value;
    const check =
      field === "messaggio" ? value.replace(/[\n\r\t]/g, "") : value;
    if (controls.test(check)) errors[field] = "Rimuovi i caratteri non validi.";
    if (limits[field] && value.length > limits[field])
      errors[field] = `Inserisci al massimo ${limits[field]} caratteri.`;
    if (field !== "telefono" && !value) errors[field] = "Compila questo campo.";
  }
  if (data.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email))
    errors.email = "Inserisci un indirizzo email valido.";
  if (data.telefono && !/^[+\d\s()./-]{3,40}$/.test(data.telefono))
    errors.telefono = "Inserisci un numero di telefono valido.";
  if (!Object.hasOwn(requestTypes, data.tipo_richiesta || ""))
    errors.tipo_richiesta = "Seleziona un tipo di richiesta valido.";
  if (data.nome && data.nome.length < 2)
    errors.nome = "Inserisci almeno 2 caratteri.";
  if (data.messaggio && data.messaggio.length < 10)
    errors.messaggio = "Inserisci almeno 10 caratteri.";
  return { data, errors };
}
