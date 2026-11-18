// ============================================================
// Componente Mensaje: dibuja la burbuja de UN solo mensaje.
//
// Recibe por "props" el objeto mensaje con esta forma:
//   { id, texto, autor, hora }
//
// - autor 'yo'       -> burbuja a la derecha, con doble check ✓✓
// - autor 'contacto' -> burbuja a la izquierda
//
// Es un componente "tonto" o de presentación: no tiene estado
// propio, solo muestra lo que le pasan por props. Eso lo hace
// fácil de reutilizar y de explicar en una entrevista.
// ============================================================

export default function Mensaje({ mensaje }) {
  const esMio = mensaje.autor === 'yo'

  return (
    <div className={`mensaje ${esMio ? 'yo' : 'contacto'}`}>
      <span className="mensaje-texto">{mensaje.texto}</span>
      <span className="mensaje-meta">
        <span className="hora">{mensaje.hora}</span>
        {/* El doble check solo se muestra en mis mensajes, como en WhatsApp */}
        {esMio && (
          <span className="checks" aria-label="leído">
            ✓✓
          </span>
        )}
      </span>
    </div>
  )
}
