// ============================================================
// Datos de la aplicación: lista de contactos
//
// Este archivo separa los DATOS de la lógica (componentes).
// Así App.jsx no se llena de texto y es fácil añadir un
// contacto nuevo: basta con agregar un objeto a este arreglo.
//
// Cada contacto tiene:
//   id         -> identificador único (se usa como key y para
//                 saber a qué conversación pertenece un mensaje)
//   nombre     -> nombre que se muestra en la interfaz
//   inicial    -> letra del avatar circular
//   color      -> color de fondo del avatar
//   estado     -> texto bajo el nombre ("en línea", etc.)
//   descripcion-> tema principal del contacto (para la cabecera)
//   saludo     -> primer mensaje que ya trae la conversación
//   respuestas -> banco de respuestas simuladas PROPIO.
//                 Cada contacto "habla" de lo suyo, por eso
//                 las respuestas son diferentes según quién sea.
// ============================================================

export const CONTACTOS = [
  {
    id: 'lucia',
    nombre: 'Lucía Torres',
    inicial: 'L',
    color: '#7c3aed',
    estado: 'en línea',
    descripcion: 'Compañera de programación · UCI',
    saludo:
      '¡Hola, Carlos! ¿Ya probaste el useEffect para el scroll automático? Si quieres lo revisamos juntos.',
    respuestas: [
      'Eso se resuelve fácil con un useState y un evento onChange, ¿quieres que te pase un ejemplo?',
      'Recuerda: en React nunca modifiques el estado directo, crea siempre un arreglo nuevo con el spread [...previos].',
      'Para la prueba técnica practica listas con key, props y componentes controlados. ¡Es lo que más preguntan!',
      'Yo estoy peleando con un useEffect que se ejecuta dos veces… ah, era el StrictMode de React 18 😅',
      '¿Ya hiciste el build con Vite? Si compila sin errores, ya tienes la mitad del camino.',
      'Un consejo: separa los datos en un archivo aparte, como hicimos aquí. El código se lee mucho mejor.',
      'Python está muy bien, pero para frontend el que manda es JavaScript. ¡Sigue practicando React!',
      'Cuando quieras repasamos las preguntas típicas de entrevista: qué es el DOM virtual, qué son las props…',
    ],
  },
  {
    id: 'marco',
    nombre: 'Marco Pérez',
    inicial: 'M',
    color: '#0891b2',
    estado: 'en línea',
    descripcion: 'Amigo · Fútbol y deportes',
    saludo:
      '¡Bro! ¿Viste el partido de anoche? Todavía estoy pensando en ese gol del minuto 90.',
    respuestas: [
      'Para mí el mejor del mundo sigue siendo Messi, no hay discusión posible.',
      'Este fin de semana hay clásico, ¿lo vemos en mi casa? Yo pongo las palomitas.',
      'Estoy en un equipo de fútbol sala los jueves, si quieres te consigo un hueco.',
      'La Champions este año está buenísima, cualquiera puede ganarla.',
      '¿Jugamos un FIFA después? La última vez me ganaste de suerte, pido revancha.',
      'Entrenar temprano da una energía distinta, pruébalo un día y me cuentas.',
      'Ese delantero nuevo es un crack, acuérdate de lo que te digo.',
      'Nada como ver el partido con los amigos, eso no tiene precio.',
    ],
  },
  {
    id: 'sofia',
    nombre: 'Sofía Ramírez',
    inicial: 'S',
    color: '#db2777',
    estado: 'últ. vez hoy a las 9:41',
    descripcion: 'Prima · Viajes y fotografía',
    saludo:
      '¡Hola! Te mandé las fotos de La Habana Vieja, la luz de la tarde estaba preciosa 📸',
    respuestas: [
      'Mi sueño es recorrer toda Cuba con la cámara, empezando por Viñales y Trinidad.',
      'Un truco de foto: busca la hora dorada, justo antes de que se ponga el sol. Todo se ve mejor.',
      '¿Viste las fotos del Malecón? Las subí ayer, dime cuál te gusta más.',
      'Para viajar ligero: una mochila, buen calzado y la cámara siempre lista.',
      'Estoy editando las fotos del último viaje, cuando termine te paso el álbum completo.',
      'La Habana tiene un rincón bonito en cada cuadra, nunca me canso de fotografiarla.',
      'El próximo viaje quiero hacerlo contigo, así me ayudas con las fotos nocturnas.',
      'Viajar enseña más que cualquier libro, ¿no crees?',
    ],
  },
  {
    id: 'diego',
    nombre: 'Diego Morales',
    inicial: 'D',
    color: '#ea580c',
    estado: 'en línea',
    descripcion: 'Amigo · Música y videojuegos',
    saludo:
      '¡Oye! Escuché un tema nuevo que te va a encantar, te lo paso ahora 🎧',
    respuestas: [
      'Estoy armando una playlist para estudiar y programar, puro lo-fi y jazz suave.',
      '¿Ya probaste ese juego nuevo? La historia está buenísima, llevo 10 horas y no puedo parar.',
      'La música cubana nunca falla: un buen son y se arregla cualquier día.',
      'Si programo sin música siento que me falta algo, ¿a ti también te pasa?',
      'Este fin de semana hay un concierto en la ciudad, ¿nos apuntamos?',
      'Te recomiendo ese álbum completo, sin saltar canciones: es una obra de principio a fin.',
      'Subí el volumen, que viene la mejor parte de la canción 🔊',
      'Gaming y código: mis dos vicios confesables, en ese orden… o al revés.',
    ],
  },
  {
    id: 'valentina',
    nombre: 'Valentina Cruz',
    inicial: 'V',
    color: '#059669',
    estado: 'últ. vez hoy a las 8:15',
    descripcion: 'Compañera de estudio · Inglés y universidad',
    saludo:
      'Hi Carlos! Recuerda que hoy practicamos inglés a las 5. No faltes, please 🙏',
    respuestas: [
      'Un tip para el inglés: 15 minutos diarios valen más que 3 horas un solo día.',
      'Para la entrevista practica esta frase: "I learned to code at university and with online projects".',
      '¿Repasaste el vocabulario técnico? props, state, hooks… en inglés suena más profesional.',
      'En la UCI el grupo de estudio se reúne mañana, traemos ejercicios de algoritmos en C++.',
      'Your English is getting better! Solo te falta practicar en voz alta sin pena.',
      'Apunta las palabras nuevas en una libreta y repásalas antes de dormir, funciona de verdad.',
      'El examen se acerca, pero vas bien: constancia mata talento cuando el talento no se esfuerza.',
      'Después de estudiar, ¿vemos una serie en inglés con subtítulos? Aprendes sin darte cuenta.',
    ],
  },
]

// Devuelve la hora actual en formato HH:MM (por ejemplo "09:05").
// Se usa al crear cada mensaje nuevo.
export function horaActual() {
  const ahora = new Date()
  const horas = String(ahora.getHours()).padStart(2, '0')
  const minutos = String(ahora.getMinutes()).padStart(2, '0')
  return `${horas}:${minutos}`
}

// Crea el objeto de conversaciones iniciales:
// una conversación (arreglo de mensajes) por cada contacto,
// empezando con su saludo.
//
// Ejemplo de resultado:
//   {
//     lucia:     [ { id, texto, autor, hora } ],
//     marco:     [ { id, texto, autor, hora } ],
//     ...
//   }
export function crearConversacionesIniciales() {
  const conversaciones = {}
  CONTACTOS.forEach((contacto, indice) => {
    conversaciones[contacto.id] = [
      {
        id: `inicial-${contacto.id}`,
        texto: contacto.saludo,
        autor: 'contacto',
        hora: '09:0' + indice, // hora decorativa del saludo inicial
      },
    ]
  })
  return conversaciones
}

// Crea el objeto de contadores de no leídos, todo en cero.
export function crearNoLeidosIniciales() {
  const noLeidos = {}
  CONTACTOS.forEach((contacto) => {
    noLeidos[contacto.id] = 0
  })
  return noLeidos
}
