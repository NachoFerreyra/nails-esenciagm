export const studioCategories = [
  { id: "all", label: "Todos" },
  { id: "kapping-gel", label: "Kapping gel" },
  { id: "soft-gel", label: "Soft gel" },
  { id: "semipermanente", label: "Semipermanente" },
];

export const studioInfo = {
  name: "Nails EsenciaGM",
  kicker: "Nail studio",
  phrase: "Cuidar tus uñas también es cuidar de vos.",
  hours: "Lunes a sabados de 14:00 a 19:00 hs",
  address: "Wenceslao Núñez 1161",
  phone: "549263500-0278",
  instagramUrl: "https://www.instagram.com/nails__esenciagm__/",
  mapsUrl:
    "https://www.google.com/maps/place/Wenceslao+Nu%C3%B1ez+1161,+M5577+Rivadavia,+Mendoza",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4134.516793540324!2d-68.4599241!3d-33.1900804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e5c24baefd4c1%3A0x8de6089ee937999f!2sWenceslao%20Nu%C3%B1ez%201161%2C%20M5577%20Rivadavia%2C%20Mendoza!5e1!3m2!1ses!2sar!4v1783955937891!5m2!1ses!2sar",
  services: studioCategories
    .filter((category) => category.id !== "all")
    .map((category) => category.label),
  whatsappMessage:
    "¡Hola! ¿Tenés disponibilidad para esta semana? Me gustaría reservar un turno.",
};
