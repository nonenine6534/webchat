# WebChat — Aplicación de chat con React

Aplicación web de mensajería construida con **React 18 y Vite**, inspirada en la experiencia de WhatsApp Web: lista de contactos a la izquierda y conversación activa a la derecha. Todos los contactos y sus respuestas son **simulados en el navegador** (sin servidor), y cada contacto tiene su propia personalidad y su propio historial.

Proyecto de práctica de **Carlos Destrades**, estudiante de 2.º año de Ingeniería en Ciencias Informáticas en la Universidad de las Ciencias Informáticas (UCI), Cuba. Está pensado para demostrar en una entrevista o prueba técnica el manejo real de React: estado, efectos, props, listas, eventos y persistencia.

![React](https://img.shields.io/badge/React-18-61dafb)
![Vite](https://img.shields.io/badge/Vite-5-646cff)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e)

---

## ✨ Características

- **5 contactos con conversación independiente** — cada contacto guarda su propio historial; cambiar de chat no mezcla los mensajes.
- **Buscador de contactos** — filtra la lista en tiempo real por nombre, con botón para limpiar la búsqueda y mensaje cuando no hay resultados.
- **Contador de mensajes no leídos (badge)** — si llega una respuesta mientras estás en otra conversación, el contacto muestra una bolita verde con la cantidad. Al abrir su chat, el contador se limpia.
- **Indicador «escribiendo…»** — antes de cada respuesta aparece el estado en la cabecera y una burbuja animada con tres puntos dentro de la conversación.
- **Respuestas diferentes según el contacto** — cada contacto tiene su banco propio de respuestas y su tema:
  - **Lucía Torres** — programación y React (compañera de la UCI)
  - **Marco Pérez** — fútbol y deportes
  - **Sofía Ramírez** — viajes y fotografía
  - **Diego Morales** — música y videojuegos
  - **Valentina Cruz** — estudio e inglés para entrevistas
- **Hora en cada mensaje** — formato `HH:MM`, con doble check `✓✓` en los mensajes propios.
- **Enviar con Enter o con el botón** — formulario controlado; el botón se deshabilita si el texto está vacío y no se envían mensajes en blanco.
- **Scroll automático** — la conversación baja sola al último mensaje al enviar, al recibir y al cambiar de contacto (con desplazamiento suave).
- **Modo oscuro / modo claro** — interruptor en la cabecera, implementado con variables CSS. La preferencia se guarda y se recupera al recargar.
- **Persistencia con `localStorage`** — además del tema, se guardan las conversaciones y los contadores de no leídos. Botón **«Reiniciar chats»** para volver al estado inicial.
- **Vista previa en la lista** — cada contacto muestra su último mensaje y su hora, como en una app de mensajería real.
- **Diseño responsive** — en pantallas estrechas la lista pasa arriba y el chat debajo.

---

## 🛠️ Tecnologías

| Tecnología | Uso en el proyecto |
|---|---|
| **React 18** | Componentes funcionales, JSX, hooks (`useState`, `useEffect`, `useRef`) |
| **Vite 5** | Servidor de desarrollo con recarga rápida y empaquetado (`build`) |
| **JavaScript (ES6+)** | Spread, desestructuración, `map` / `filter`, template literals, módulos |
| **CSS3** | Flexbox, variables CSS para temas, animaciones (`@keyframes`), media queries |
| **localStorage** | Persistencia del tema, las conversaciones y los no leídos |

Sin librerías de UI ni de estado global: todo está hecho con React puro, para poder explicar cada línea.

---

## 🚀 Cómo ejecutarlo

Requisitos: **Node.js 18 o superior** y npm.

```bash
# 1. Instalar las dependencias (solo la primera vez)
npm install

# 2. Arrancar el servidor de desarrollo
npm run dev
```

Después abre en el navegador la dirección que muestra Vite, normalmente:

```
http://localhost:5173
```

Para generar la versión de producción y previsualizarla:

```bash
npm run build     # crea la carpeta dist/ lista para publicar
npm run preview   # sirve localmente esa versión de producción
```

---

## 📁 Estructura de carpetas

```
webchat/
├── index.html                  # HTML base: aquí se monta la app (div#root)
├── package.json                # Dependencias y scripts de npm
├── vite.config.js              # Configuración de Vite + plugin de React
├── README.md                   # Este documento
└── src/
    ├── main.jsx                # Punto de entrada: monta <App />
    ├── index.css               # Estilos globales (reset y fondo)
    ├── App.jsx                 # Componente raíz: estado global y lógica
    ├── App.css                 # Estilos y temas (variables CSS claro/oscuro)
    ├── data/
    │   └── contactos.js        # Datos separados: contactos, saludos,
    │                           # bancos de respuestas y utilidades de hora
    └── components/
        ├── ListaContactos.jsx  # Barra lateral: buscador + lista + badges
        ├── VentanaChat.jsx     # Conversación activa: cabecera, mensajes,
        │                       # indicador "escribiendo…" y formulario
        └── Mensaje.jsx         # Burbuja de un mensaje (componente de
                                # presentación, recibe todo por props)
```

**Idea de la estructura:** los *datos* viven en `src/data/`, la *lógica principal* en `App.jsx` y cada *pieza visual* en su propio componente. Si mañana llega una API real, solo cambiaría `src/data/` y las funciones que programan las respuestas simuladas.

---

## 🧠 Qué practica este proyecto

Esta sección resume los conceptos que el proyecto demuestra, tal como se explicarían en una entrevista:

- **`useState`** — conversaciones por contacto, contadores de no leídos, contacto activo, contacto que está escribiendo, modo oscuro, texto del buscador y texto del input. Incluye inicialización perezosa leyendo `localStorage`.
- **`useEffect`** — tres usos distintos: auto-scroll al cambiar los mensajes, guardar en `localStorage` cuando cambia el estado y sincronizar el tema con el documento.
- **`useRef`** — referencia al DOM para el scroll y el foco del input, contador de ids únicos, índice de respuestas por contacto y lectura del contacto activo dentro de un `setTimeout` sin valores obsoletos.
- **Props y composición** — `App` levanta el estado (*lifting state up*) y pasa datos y callbacks (`onSeleccionar`, `onEnviar`) a `ListaContactos` y `VentanaChat`; `Mensaje` es un componente puro de presentación.
- **Listas con `key`** — contactos y mensajes se renderizan con `.map()` y una `key` estable y única por elemento.
- **Renderizado condicional** — badge solo si hay no leídos, burbuja de «escribiendo…» solo mientras se espera la respuesta, mensaje de «sin resultados» en el buscador y botón deshabilitado con el input vacío.
- **Eventos y formularios controlados** — el valor de cada input vive en el estado (`value` + `onChange`); el envío usa `onSubmit` con `preventDefault()`, por lo que funciona igual con Enter y con el botón.
- **Inmutabilidad del estado** — nunca se modifica el estado directamente: se crean objetos y arreglos nuevos con el operador spread (`{ ...previos }`, `[...mensajes, nuevo]`).
- **`localStorage`** — lectura segura con `JSON.parse` dentro de `try/catch`, guardado con efectos y claves constantes para evitar errores de escritura.
- **Datos separados de la vista** — el archivo `src/data/contactos.js` concentra contactos y respuestas; añadir un contacto nuevo no exige tocar ningún componente.
- **CSS moderno** — variables CSS para implementar dos temas con una sola hoja de estilos, Flexbox para el layout de dos paneles, animación de puntos con `@keyframes` y diseño responsive con media queries.

---

## 🔮 Posibles mejoras futuras

- Conectar el chat a un servidor real con WebSockets para conversar entre dos navegadores.
- Sustituir las respuestas simuladas por una API de respuestas automáticas.
- Añadir envío de imágenes y notas de voz simuladas.
- Agregar pruebas automatizadas de componentes.

---

## 👤 Autor

**Carlos Destrades** — Estudiante de Ingeniería en Ciencias Informáticas, UCI (Cuba).
Stack que practica con este proyecto: JavaScript, React, Python y C++.
