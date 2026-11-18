import { useState } from 'react'

// ============================================================
// Componente ListaContactos: barra lateral con el buscador
// y la lista de contactos.
//
// Props que recibe desde App.jsx:
//   contactos            -> arreglo con todos los contactos
//   contactoActivoId     -> id del contacto abierto ahora
//   noLeidos             -> objeto { idContacto: cantidad }
//   ultimoMensaje        -> función que devuelve el último
//                           mensaje de una conversación (para
//                           mostrar la vista previa bajo el nombre)
//   onSeleccionar        -> función que se llama al hacer clic
//                           en un contacto
//
// El texto del buscador vive en un estado LOCAL de este
// componente (useState), porque solo se usa aquí dentro.
// Filtrar es simplemente un .filter() sobre el arreglo.
// ============================================================

export default function ListaContactos({
  contactos,
  contactoActivoId,
  noLeidos,
  ultimoMensaje,
  onSeleccionar,
}) {
  // Texto escrito en el buscador
  const [busqueda, setBusqueda] = useState('')

  // Lista visible: si no hay búsqueda se muestran todos;
  // si la hay, solo los cuyo nombre contenga el texto
  // (sin importar mayúsculas/minúsculas).
  const textoBusqueda = busqueda.trim().toLowerCase()
  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(textoBusqueda)
  )

  return (
    <aside className="sidebar">
      {/* --- Buscador de contactos --- */}
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar contacto…"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          aria-label="Buscar contacto"
        />
        {/* Botón para limpiar la búsqueda rápidamente */}
        {busqueda !== '' && (
          <button
            type="button"
            className="buscador-limpiar"
            onClick={() => setBusqueda('')}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* --- Lista de contactos --- */}
      <ul className="lista-contactos">
        {contactosFiltrados.map((contacto) => {
          const cantidadNoLeidos = noLeidos[contacto.id] || 0
          const preview = ultimoMensaje(contacto.id)
          const estaActivo = contacto.id === contactoActivoId

          return (
            <li key={contacto.id}>
              <button
                type="button"
                className={`contacto-item ${estaActivo ? 'activo' : ''}`}
                onClick={() => onSeleccionar(contacto.id)}
              >
                <span
                  className="avatar"
                  style={{ backgroundColor: contacto.color }}
                >
                  {contacto.inicial}
                </span>

                <span className="contacto-datos">
                  <span className="contacto-fila-superior">
                    <span className="contacto-nombre">{contacto.nombre}</span>
                    {preview && (
                      <span className="contacto-hora">{preview.hora}</span>
                    )}
                  </span>
                  <span className="contacto-fila-inferior">
                    <span className="contacto-preview">
                      {preview
                        ? `${preview.autor === 'yo' ? 'Tú: ' : ''}${preview.texto}`
                        : 'Sin mensajes todavía'}
                    </span>
                    {/* Badge de no leídos: solo si hay alguno */}
                    {cantidadNoLeidos > 0 && (
                      <span className="badge" aria-label="mensajes no leídos">
                        {cantidadNoLeidos}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Mensaje cuando la búsqueda no encuentra a nadie */}
      {contactosFiltrados.length === 0 && (
        <p className="sin-resultados">
          No se encontró ningún contacto con «{busqueda}».
        </p>
      )}
    </aside>
  )
}
