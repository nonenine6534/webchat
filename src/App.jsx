import { useState, useEffect, useRef } from 'react'
import Mensaje from './components/Mensaje.jsx'
import './App.css'

// ============================================================
// WebChat en React
//
// El estado principal es la lista de mensajes. En React no se
// toca el DOM a mano: se actualiza el estado con setMensajes
// y React vuelve a dibujar la pantalla automáticamente.
// ============================================================

// Respuestas que el "contacto" envía de forma simulada, en orden
const RESPUESTAS = [
  '¡Hola! ¿En qué te puedo ayudar?',
  'Claro, cuéntame más.',
  'Muy interesante lo que dices.',
  'Perfecto, lo reviso y te aviso enseguida.',
  '¿Podrías darme más detalles?',
  'De acuerdo, ¡gracias por escribir!',
]

// Devuelve la hora actual en formato HH:MM (por ejemplo "09:05")
function horaActual() {
  const ahora = new Date()
  const horas = String(ahora.getHours()).padStart(2, '0')
  const minutos = String(ahora.getMinutes()).padStart(2, '0')
  return `${horas}:${minutos}`
}

export default function App() {
  // Lista de mensajes: cada uno es { id, texto, autor, hora }
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      texto: '¡Hola! Soy Ana, tu contacto de práctica. Escríbeme algo para empezar.',
      autor: 'contacto',
      hora: horaActual(),
    },
  ])

  // Texto que el usuario está escribiendo en el campo de entrada
  const [texto, setTexto] = useState('')

  // true mientras el contacto simulado "está escribiendo"
  const [escribiendo, setEscribiendo] = useState(false)

  // useRef guarda valores que no necesitan redibujar la pantalla:
  // el contador de ids y el índice de la próxima respuesta.
  const siguienteId = useRef(2)
  const indiceRespuesta = useRef(0)

  // Referencia a la zona de mensajes para hacer auto-scroll
  const zonaMensajes = useRef(null)

  // useEffect se ejecuta tras cada cambio de la lista:
  // baja el scroll para que se vea el mensaje más reciente.
  useEffect(() => {
    const zona = zonaMensajes.current
    if (zona) {
      zona.scrollTop = zona.scrollHeight
    }
  }, [mensajes])

  // Simula que el contacto escribe y responde tras una pausa
  function responderAutomaticamente() {
    setEscribiendo(true)
    const espera = 900 + Math.random() * 900

    setTimeout(() => {
      const respuesta = RESPUESTAS[indiceRespuesta.current % RESPUESTAS.length]
      indiceRespuesta.current += 1
      setMensajes((previos) => [
        ...previos,
        { id: siguienteId.current++, texto: respuesta, autor: 'contacto', hora: horaActual() },
      ])
      setEscribiendo(false)
    }, espera)
  }

  // Al enviar el formulario (botón o tecla Enter en el campo)
  function enviarMensaje(evento) {
    evento.preventDefault() // evita que la página se recargue

    const limpio = texto.trim()
    if (limpio === '') return // no enviar mensajes vacíos

    // Se crea un arreglo NUEVO (no se modifica el anterior):
    // así es como se actualiza el estado en React.
    setMensajes((previos) => [
      ...previos,
      { id: siguienteId.current++, texto: limpio, autor: 'yo', hora: horaActual() },
    ])
    setTexto('')
    responderAutomaticamente()
  }

  return (
    <main className="chat">
      {/* Cabecera: avatar, nombre y estado del contacto */}
      <header className="chat-cabecera">
        <div className="avatar">A</div>
        <div className="chat-info">
          <h1>Ana (contacto simulado)</h1>
          <p>{escribiendo ? 'escribiendo...' : 'en línea'}</p>
        </div>
      </header>

      {/* Lista de mensajes: un componente <Mensaje /> por elemento */}
      <section className="mensajes" ref={zonaMensajes}>
        {mensajes.map((mensaje) => (
          <Mensaje key={mensaje.id} mensaje={mensaje} />
        ))}
      </section>

      {/* Formulario controlado: el valor del input vive en el estado */}
      <form className="chat-entrada" onSubmit={enviarMensaje}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          autoComplete="off"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </main>
  )
}
