# WebChat — Chat web con React

Chat web de una sola ventana construido con **React y Vite**: el usuario escribe
mensajes y un contacto simulado responde automáticamente. Es mi proyecto de
práctica para una prueba técnica de desarrollo frontend.

## Características

- Enviar mensajes con el botón **Enviar** o con la tecla **Enter**.
- Respuestas automáticas simuladas del contacto, con estado «escribiendo...».
- Marca de tiempo (hora HH:MM) en cada mensaje.
- Desplazamiento automático (auto-scroll) al mensaje más reciente.
- Componente reutilizable `Mensaje` para cada burbuja de la conversación.

## Cómo ejecutarlo

Requisitos: tener instalado **Node.js 18 o superior**.

```bash
npm install     # instala las dependencias (solo la primera vez)
npm run dev     # arranca el servidor de desarrollo
```

Después abre en el navegador la dirección que muestra Vite
(normalmente http://localhost:5173).

Para generar la versión de producción:

```bash
npm run build   # crea la carpeta dist/ lista para publicar
```

## Estructura del proyecto

```
webchat/
├── index.html            # HTML base: aquí se monta la app (div#root)
├── package.json          # dependencias y scripts de npm
├── vite.config.js        # configuración de Vite + plugin de React
└── src/
    ├── main.jsx          # punto de entrada: monta <App />
    ├── App.jsx           # componente principal: estado y lógica del chat
    ├── App.css           # estilos de los componentes
    ├── index.css         # estilos globales
    └── components/
        └── Mensaje.jsx   # burbuja de un mensaje (recibe props)
```

## Tecnologías y conceptos de React usados

- **React 18** con componentes funcionales y JSX.
- **Vite 5** como herramienta de desarrollo y empaquetado.
- **useState**: lista de mensajes, texto del input y estado «escribiendo».
- **useEffect**: auto-scroll cada vez que cambia la lista de mensajes.
- **useRef**: contador de ids, índice de respuestas y referencia al DOM
  para hacer scroll.
- **Props**: el componente `Mensaje` recibe los datos por propiedades.
- Formularios **controlados**: el valor del input vive en el estado.

## Posibles mejoras

- Conectar el chat a un servidor real con WebSockets.
- Guardar el historial en localStorage.
- Permitir varios contactos y una lista de conversaciones.
