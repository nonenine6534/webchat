import { useState, useEffect, useRef } from 'react'
import Mensaje from './Mensaje.jsx'

// ============================================================
// Componente VentanaChat: la conversación abierta a la derecha.
//
// Muestra:
//   - cabecera con avatar, nombre, descripción y estado
//     ("escribiendo…" cuando el contacto está respondiendo)
//   - lista de mensajes de ESE contacto
//   - indicador animado "escribiendo…" dentro de la conversación
//   - formulario para escribir y enviar (Enter o botón)
//
// Props que recibe desde App.jsx:
//   contacto    -> objeto del contacto activo
//   mensajes    -> arreglo de mensajes de su conversación
//   escribiendo -> true si ese contacto está "escribiendo"
//   onEnviar    -> función(texto) que agrega el mensaje y
//                  programa la respuesta simulada
//
// El texto del input es un estado LOCAL: solo esta ventana
// necesita saber lo que se está escribiendo.
// ============================================================

export default function VentanaChat({ contacto, mensajes, escribiendo, onEnviar }) {
  // Texto que el usuario está escribiendo ahora mismo
  const [texto, setTexto] = useState('')

  // Referencia a la zona de mensajes para hacer auto-scroll.
  // useRef permite acceder a un elemento del DOM sin usar
  // document.querySelector (eso no se hace en React).
  const zonaMensajesRef = useRef(null)

  // Referencia al input para devolverle el foco tras enviar
  const inputRef = useRef(null)

  // Auto-scroll: cada vez que cambia la lista de mensajes,
  // que cambia el contacto o que aparece "escribiendo…",
  // bajamos el scroll hasta el final con un efecto suave.
  useEffect(() => {
    const zona = zonaMensajesRef.current
    if (zona) {
      zona.scrollTo({ top: zona.scrollHeight, behavior: 'smooth' })
    }
  }, [mensajes, escribiendo, contacto.id])

  // Al cambiar de contacto, el texto a medias se limpia:
  // cada conversación empieza con el input vacío.
  useEffect(() => {
    setTexto('')
    inputRef.current?.focus()
  }, [contacto.id])

  // Enviar: se llama al enviar el formulario.
  // El formulario captura tanto el clic en el botón como
  // la tecla Enter dentro del input.
  function manejarEnvio(evento) {
    evento.preventDefault() // evita que la página se recargue

    const limpio = texto.trim()
    if (limpio === '') return // no se envían mensajes vacíos

    onEnviar(limpio)
    setTexto('')
    inputRef.current?.focus()
  }

  // Atajo extra: Enter envía y Shift+Enter no hace nada raro
  // porque el input es de una sola línea; aun así dejamos el
  // comportamiento del formulario como vía principal.
  return (
    <section className="ventana-chat">
      {/* --- Cabecera de la conversación --- */}
      <header className="chat-cabecera">
        <div
          className="avatar avatar-grande"
          style={{ backgroundColor: contacto.color }}
        >
          {contacto.inicial}
        </div>
        <div className="chat-info">
          <h2>{contacto.nombre}</h2>
          <p className="chat-descripcion">{contacto.descripcion}</p>
          <p className={`chat-estado ${escribiendo ? 'escribiendo-texto' : ''}`}>
            {escribiendo ? 'escribiendo…' : contacto.estado}
          </p>
        </div>
      </header>

      {/* --- Zona de mensajes (con scroll propio) --- */}
      <div className="mensajes" ref={zonaMensajesRef}>
        {mensajes.map((mensaje) => (
          <Mensaje key={mensaje.id} mensaje={mensaje} />
        ))}

        {/* Burbuja de "escribiendo…" con tres puntos animados */}
        {escribiendo && (
          <div className="mensaje contacto mensaje-escribiendo" aria-live="polite">
            <span className="puntos">
              <span />
              <span />
              <span />
            </span>
            <span className="escribiendo-label">escribiendo…</span>
          </div>
        )}
      </div>

      {/* --- Formulario de envío (controlado) --- */}
      <form className="chat-entrada" onSubmit={manejarEnvio}>
        <input
          ref={inputRef}
          type="text"
          placeholder={`Escribe un mensaje a ${contacto.nombre.split(' ')[0]}…`}
          autoComplete="off"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
        />
        <button type="submit" disabled={texto.trim() === ''}>
          Enviar
        </button>
      </form>
    </section>
  )
}
