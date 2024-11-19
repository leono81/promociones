const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";

/**
 * Genera el enlace de Google Calendar para una promoción.
 * @param {string} title - Título del evento.
 * @param {string} description - Descripción del evento.
 * @param {Array} days - Lista de días de aplicación (por nombre, como "Lunes").
 * @param {Object} vigencia - Objeto con las fechas de vigencia { desde, hasta }.
 * @returns {string} - URL de Google Calendar.
 */
export const addDaysToGoogleCalendar = (title, description, days, vigencia) => {
  // Caso: Todos los días
  if (days.includes("Todos los días")) {
    const startDate = vigencia?.desde
      ? vigencia.desde.replace(/-/g, "")
      : new Date().toISOString().split("T")[0].replace(/-/g, "");
    const endDate = vigencia?.hasta ? vigencia.hasta.replace(/-/g, "") : "";
    const rrule = "RRULE:FREQ=DAILY";

    return `${baseUrl}&text=${encodeURIComponent(title)}&details=${encodeURIComponent(
      description
    )}&dates=${startDate}/${endDate}&rrule=${rrule}`;
  }

  // Caso: Días específicos
  if (days.length > 0) {
    const dates = days
      .map((day) => {
        const nextDate = getNextDateForDay(day);
        return `${nextDate.replace(/-/g, "")}/${nextDate.replace(/-/g, "")}`;
      })
      .join(",");

    return `${baseUrl}&text=${encodeURIComponent(title)}&details=${encodeURIComponent(
      description
    )}&dates=${dates}`;
  }

  // Caso: Consultar día en la web
  if (days.includes("Consultar día en la web")) {
    return null; // O puedes devolver un enlace genérico si es necesario
  }

  return null;
};

/**
 * Obtiene la fecha de la próxima ocurrencia de un día específico.
 * @param {string} day - Nombre del día (por ejemplo, "Lunes").
 * @returns {string} - Fecha en formato YYYY-MM-DD.
 */
const getNextDateForDay = (day) => {
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const targetDayIndex = daysOfWeek.indexOf(day);
  const today = new Date();
  const currentDayIndex = today.getDay() - 1; // -1 porque getDay empieza en Domingo
  let diff = targetDayIndex - currentDayIndex;
  if (diff < 0) diff += 7; // Ajusta para la próxima semana
  today.setDate(today.getDate() + diff);
  return today.toISOString().split("T")[0];
};
