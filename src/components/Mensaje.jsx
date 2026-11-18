// Componente Mensaje: dibuja la burbuja de UN solo mensaje.
//
// Recibe por "props" el objeto mensaje con esta forma:
//   { id, texto, autor, hora }
// El autor puede ser 'yo' o 'contacto' y decide el lado y
// el color de la burbuja mediante las clases de CSS.
export default function Mensaje({ mensaje }) {
  return (
    <div className={`mensaje ${mensaje.autor}`}>
      <span>{mensaje.texto}</span>
      <span className="hora">{mensaje.hora}</span>
    </div>
  )
}
