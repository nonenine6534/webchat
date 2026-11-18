import { useState, useEffect, useRef } from 'react'
import ListaContactos from './components/ListaContactos.jsx'
import VentanaChat from './components/VentanaChat.jsx'
import {
  CONTACTOS,
  horaActual,
  crearConversacionesIniciales,
  crearNoLeidosIniciales,
} from './data/contactos.js'
import './App.css'

// ============================================================
// WebChat en React — componente principal (App)
//
// Idea central: el estado vive aquí arriba y los componentes
// hijos solo RECIBEN datos por props y AVISAN con funciones
// (onSeleccionar, onEnviar). Esto se llama "levantar el estado"
// (lifting state up) y es un patrón muy preguntado en entrevistas.
//
// Estados principales:
//   conversaciones -> { idContacto: [mensajes] } historial
//                     independiente por contacto
//   noLeidos       -> { idContacto: cantidad } para los badges
//   contactoActivoId -> qué conversación está abierta
//   escribiendoId  -> id del contacto que está "escribiendo…"
//                     (null si nadie escribe)
//   modoOscuro     -> tema visual, guardado en localStorage
// ============================================================

// Claves usadas en localStorage (para no escribirlas a mano)
const CLAVE_TEMA = 'webchat-tema'
const CLAVE_CONVERSACIONES = 'webchat-conversaciones'
const CLAVE_NO_LEIDOS = 'webchat-no-leidos'

// Lee un valor JSON de localStorage de forma segura.
// Si no existe o está dañado, devuelve el valor por defecto.
function leerDeLocalStorage(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : valorPorDefecto
  } catch {
    return valorPorDefecto
  }
}

export default function App() {
  // --- Tema: se inicializa desde localStorage (lectura perezosa) ---
  // Pasar una FUNCIÓN a useState hace que solo se ejecute al montar.
  const [modoOscuro, setModoOscuro] = useState(
    () => leerDeLocalStorage(CLAVE_TEMA, false) === true
  )

  // --- Conversaciones: también se recuperan de localStorage ---
  // Así, si recargas la página, no pierdes lo que conversaste.
  const [conversaciones, setConversaciones] = useState(() =>
    leerDeLocalStorage(CLAVE_CONVERSACIONES, crearConversacionesIniciales())
  )

  // --- Contadores de mensajes no leídos por contacto ---
  const [noLeidos, setNoLeidos] = useState(() =>
    leerDeLocalStorage(CLAVE_NO_LEIDOS, crearNoLeidosIniciales())
  )

  // --- Contacto cuya conversación está abierta ---
  const [contactoActivoId, setContactoActivoId] = useState(CONTACTOS[0].id)

  // --- Contacto que está escribiendo (su id) o null ---
  const [escribiendoId, setEscribiendoId] = useState(null)

  // useRef para datos que NO deben provocar un nuevo render:
  // - contador global de ids únicos para los mensajes
  // - en qué respuesta va cada contacto (índice por contacto)
  // - cuál es el contacto activo (para leerlo dentro de setTimeout
  //   sin depender de un estado que puede haber cambiado)
  const siguienteId = useRef(1)
  const indiceRespuestaPorContacto = useRef({})
  const contactoActivoRef = useRef(contactoActivoId)

  // Mantener la ref sincronizada con el estado del contacto activo
  useEffect(() => {
    contactoActivoRef.current = contactoActivoId
  }, [contactoActivoId])

  // --- Persistencia en localStorage con useEffect ---
  // Cada vez que cambia el tema, las conversaciones o los
  // no leídos, se guarda una copia en el navegador.

  useEffect(() => {
    localStorage.setItem(CLAVE_TEMA, JSON.stringify(modoOscuro))
    // También reflejamos el tema en <html> para los estilos globales
    document.documentElement.dataset.tema = modoOscuro ? 'oscuro' : 'claro'
  }, [modoOscuro])

  useEffect(() => {
    localStorage.setItem(CLAVE_CONVERSACIONES, JSON.stringify(conversaciones))
  }, [conversaciones])

  useEffect(() => {
    localStorage.setItem(CLAVE_NO_LEIDOS, JSON.stringify(noLeidos))
  }, [noLeidos])

  // Contacto activo como objeto completo (para pasarlo por props)
  const contactoActivo =
    CONTACTOS.find((contacto) => contacto.id === contactoActivoId) || CONTACTOS[0]

  // Devuelve el último mensaje de una conversación (o null).
  // Lo usa la lista lateral para la vista previa y la hora.
  function ultimoMensajeDe(contactoId) {
    const mensajes = conversaciones[contactoId] || []
    return mensajes.length > 0 ? mensajes[mensajes.length - 1] : null
  }

  // Al hacer clic en un contacto: se abre su conversación y
  // su contador de no leídos se pone a cero.
  function seleccionarContacto(contactoId) {
    setContactoActivoId(contactoId)
    setNoLeidos((previos) => ({ ...previos, [contactoId]: 0 }))
  }

  // Agrega un mensaje a la conversación de un contacto concreto.
  // Siempre se crea un objeto NUEVO de conversaciones y un
  // arreglo NUEVO para esa conversación (inmutabilidad).
  function agregarMensaje(contactoId, mensaje) {
    setConversaciones((previas) => ({
      ...previas,
      [contactoId]: [...(previas[contactoId] || []), mensaje],
    }))
  }

  // Programa la respuesta simulada de un contacto:
  // 1. muestra "escribiendo…" durante 1–2 segundos
  // 2. elige la siguiente respuesta de SU banco propio
  // 3. agrega el mensaje; si esa conversación NO está abierta,
  //    suma 1 a su contador de no leídos
  function programarRespuesta(contacto) {
    setEscribiendoId(contacto.id)

    const espera = 1100 + Math.random() * 1000

    setTimeout(() => {
      const indiceActual = indiceRespuestaPorContacto.current[contacto.id] || 0
      const respuesta =
        contacto.respuestas[indiceActual % contacto.respuestas.length]
      indiceRespuestaPorContacto.current[contacto.id] = indiceActual + 1

      agregarMensaje(contacto.id, {
        id: `msg-${siguienteId.current++}`,
        texto: respuesta,
        autor: 'contacto',
        hora: horaActual(),
      })

      // Solo limpiamos "escribiendo" si sigue siendo este contacto
      setEscribiendoId((actual) => (actual === contacto.id ? null : actual))

      // Si el usuario cambió de conversación mientras llegaba
      // la respuesta, ese mensaje cuenta como no leído.
      if (contactoActivoRef.current !== contacto.id) {
        setNoLeidos((previos) => ({
          ...previos,
          [contacto.id]: (previos[contacto.id] || 0) + 1,
        }))
      }
    }, espera)
  }

  // Enviar un mensaje al contacto activo (lo llama VentanaChat)
  function enviarMensaje(texto) {
    const contacto = contactoActivo

    agregarMensaje(contacto.id, {
      id: `msg-${siguienteId.current++}`,
      texto,
      autor: 'yo',
      hora: horaActual(),
    })

    programarRespuesta(contacto)
  }

  // Borra el historial guardado y vuelve a las conversaciones
  // iniciales. Útil para "empezar de cero" y para demostrar
  // el manejo de localStorage.
  function reiniciarConversaciones() {
    setConversaciones(crearConversacionesIniciales())
    setNoLeidos(crearNoLeidosIniciales())
    indiceRespuestaPorContacto.current = {}
    setEscribiendoId(null)
  }

  return (
    <div className={`app ${modoOscuro ? 'tema-oscuro' : 'tema-claro'}`}>
      {/* --- Barra superior de la aplicación --- */}
      <header className="app-cabecera">
        <div className="app-marca">
          <span className="app-logo" aria-hidden="true">
            💬
          </span>
          <div>
            <h1>WebChat</h1>
            <p>Chat con React · Carlos Destrades — UCI</p>
          </div>
        </div>

        <div className="app-acciones">
          <button
            type="button"
            className="btn-secundario"
            onClick={reiniciarConversaciones}
            title="Borrar el historial guardado y empezar de nuevo"
          >
            Reiniciar chats
          </button>
          {/* Interruptor de modo oscuro */}
          <button
            type="button"
            className="btn-tema"
            onClick={() => setModoOscuro((previo) => !previo)}
            aria-pressed={modoOscuro}
            title={modoOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {modoOscuro ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>
      </header>

      {/* --- Cuerpo: lista de contactos + ventana de chat --- */}
      <main className="app-cuerpo">
        <ListaContactos
          contactos={CONTACTOS}
          contactoActivoId={contactoActivoId}
          noLeidos={noLeidos}
          ultimoMensaje={ultimoMensajeDe}
          onSeleccionar={seleccionarContacto}
        />

        <VentanaChat
          contacto={contactoActivo}
          mensajes={conversaciones[contactoActivoId] || []}
          escribiendo={escribiendoId === contactoActivoId}
          onEnviar={enviarMensaje}
        />
      </main>

      <footer className="app-pie">
        <small>
          Proyecto de práctica con React + Vite — los contactos y sus respuestas
          son simulados, sin servidor real.
        </small>
      </footer>
    </div>
  )
}
