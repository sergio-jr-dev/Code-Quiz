# Quiz flow and test foundation

**Status:** In progress

## Goal

Evolucionar el flujo actual hacia partidas breves, variadas, accesibles y persistentes, respaldadas por Vitest y Testing Library y construidas sobre el banco justo y extensible de la spec 002.

## Context

La aplicación inicia directamente una partida, mantiene todo el estado en un contexto y dispone de la base de Vitest y Testing Library creada en la spec 004. La spec 002 ya proporciona el banco extensible, el contenido tipado, el validador y las utilidades de aleatorización y equidad. La interfaz todavía no ofrece menú, filtros, progreso persistente ni repetición de fallos.

## Requirements

- REQ-1: La pantalla inicial permitirá elegir HTML, CSS, JavaScript o modo mixto y nivel básico, intermedio o avanzado.
- REQ-2: Cada partida tendrá diez preguntas seleccionadas sin repetición de un banco filtrado con al menos veinte candidatas.
- REQ-3: Una combinación materia–nivel con menos de veinte preguntas aprobadas no se ofrecerá como jugable; la interfaz podrá identificarla como próxima sin iniciar una partida incompleta.
- REQ-4: El flujo incluirá progreso textual, feedback, explicación, siguiente pregunta, resultado, resumen por materia/tema y revisión de respuestas.
- REQ-5: Desde resultados se podrá volver al menú, repetir la configuración, iniciar otra categoría o repetir únicamente los fallos cuando existan.
- REQ-6: Toda partida nueva reiniciará pregunta, selección, puntuación, respuestas, finalización, revisión y anuncios transitorios.
- REQ-7: Mejores resultados y progreso se guardarán en `localStorage` con esquema versionado, validación y recuperación segura ante datos corruptos.
- REQ-8: Toda acción será operable por teclado; los cambios de pregunta/vista gestionarán foco y anunciarán respuesta, progreso y resultado sin depender del color.
- REQ-9: Confeti, vibración, scroll suave y escalado decorativo se desactivarán con `prefers-reduced-motion: reduce`.
- REQ-10: La suite existente de Vitest, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom` y jsdom se ampliará sin reconstruir la configuración ya completada en la spec 004.
- REQ-11: Se conservarán scripts reproducibles para test único y watch; la cobertura se añadirá solo si se adopta un umbral relacionado con riesgos concretos.
- REQ-12: Las pruebas cubrirán filtros, selección, equilibrio de respuestas, puntuación, reinicio completo, persistencia, repetición de fallos, código en respuestas, foco y anuncios accesibles.
- REQ-13: Las pruebas de componentes observarán comportamiento visible y roles accesibles, evitando asserts sobre detalles internos de React.
- REQ-14: La integración mantendrá URLs y assets compatibles con el despliegue raíz en Vercel y los metadatos SITE_URL de la spec 004.
- REQ-15: La selección usará un mazo aleatorio por configuración: no repetirá preguntas hasta agotar las candidatas disponibles y, con un banco de veinte, una repetición inmediata usará las diez preguntas restantes antes de iniciar un nuevo ciclo.
- REQ-16: Una partida mixta repartirá las diez preguntas entre HTML, CSS y JavaScript como 4/3/3 y alternará de forma equilibrada la materia que aporta la cuarta pregunta.
- REQ-17: Cada respuesta conservará un `input` de tipo radio y mostrará un marcador visual A, B, C o D determinado por su posición en la partida, sin sustituir el ID estable usado para corregirla.
- REQ-18: Los bloques completos de código de preguntas, respuestas y explicaciones tendrán resaltado de sintaxis para los lenguajes permitidos por el modelo; los fragmentos aislados usarán una superficie técnica sin coloreado parcial. Los bloques de texto podrán declarar términos inline explícitos para conservar completas unidades como `Promise.all` o `(a, b) => a - b`. Todo el contenido conservará el texto escapado como fallback seguro.
- REQ-19: Durante la partida se mostrará una barra de progreso acompañada por el texto «Pregunta N de 10»; ambos representarán el mismo avance y el valor será comprensible sin depender del color ni de la animación.

## Design Requirements

- Seguir `DESIGN.md`; el menú debe pertenecer a la misma familia visual que la tarjeta del quiz.
- Mantener una columna protagonista; las cuatro respuestas se apilan siempre para que el código y el texto largo se comparen completos sin lectura en zigzag.
- Compartir un contenedor centrado de hasta `90ch` y la misma sombra compacta entre menú, partida, resultado y revisión. El hover de materias y niveles cambia el fondo sin desplazar las tarjetas.
- Presentar cada opción como una unidad compuesta por marcador A–D, contenido y estado textual; los estados seleccionada, correcta e incorrecta no dependerán solo del color.
- Integrar MicroLighter con su tema GitHub adaptativo en la identidad violeta existente, limitado a bloques sintácticamente completos. Los fragmentos y las respuestas largas deben envolver sin provocar scroll horizontal de la opción.
- Usar un fondo técnico oscuro y discreto durante todo el flujo. Los símbolos decorativos se concentran en los bordes para preservar el contraste y el foco de lectura central.
- La barra de progreso vivirá dentro de la tarjeta, en su parte superior, ocupando el espacio disponible a la izquierda de «Pregunta N de 10»; debe reforzar la orientación sin competir con la pregunta ni anunciar actualizaciones redundantes.
- Verificar temas claro/oscuro, 320 CSS px, texto ampliado, foco, estados vacíos y movimiento reducido.
- El logo final y naming dependen de la spec 001; la lógica de preguntas depende de la spec 002.

## Acceptance Criteria

- [ ] AC-1: El usuario configura materia y nivel y solo recibe diez preguntas compatibles sin duplicados. [REQ-1–REQ-3]
- [ ] AC-2: Cada combinación jugable dispone de al menos veinte candidatas y genera una partida de diez. [REQ-2, REQ-3]
- [ ] AC-3: El flujo completo puede terminarse y reiniciarse con teclado sin conservar estado anterior. [REQ-4, REQ-6, REQ-8]
- [x] AC-4: Resultados ofrece menú, repetición, cambio de categoría y repetición de fallos según proceda. [REQ-5]
- [ ] AC-5: Datos persistidos válidos se restauran y datos inválidos se ignoran sin romper la aplicación. [REQ-7]
- [ ] AC-6: Feedback, progreso y resultado están disponibles para tecnologías de asistencia y no dependen solo del color. [REQ-8]
- [ ] AC-7: Con movimiento reducido no se ejecuta confeti, vibración, scroll suave ni escalado decorativo. [REQ-9]
- [ ] AC-8: `pnpm test` ejecuta Vitest y Testing Library en local y CI. [REQ-10, REQ-11]
- [ ] AC-9: Las pruebas automatizadas cubren todos los comportamientos enumerados en REQ-12 sin depender de implementación interna. [REQ-12, REQ-13]
- [ ] AC-10: `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan, salvo fallos previos explícitamente separados. [REQ-10–REQ-14]
- [ ] AC-11: La verificación visual no detecta pérdida de contenido en claro/oscuro, 320 px, zoom/texto ampliado o movimiento reducido. [Design Requirements]
- [ ] AC-12: Dos partidas consecutivas de la misma combinación con un banco de veinte no comparten preguntas; el siguiente ciclo vuelve a barajar de forma determinista bajo una semilla de prueba. [REQ-15]
- [ ] AC-13: Una partida mixta siempre contiene las tres materias, ninguna supera a otra por más de una pregunta y la materia con cuatro preguntas no queda fijada entre partidas. [REQ-16]
- [ ] AC-14: Las respuestas muestran marcadores A–D en orden visual, siguen siendo un grupo de radios operable con teclado y se corrigen por ID aunque se reordenen. [REQ-17]
- [ ] AC-15: El código completo de HTML, CSS y JavaScript se distingue mediante resaltado de sintaxis; los fragmentos aislados no reciben coloreado parcial y los términos inline declarados se mantienen completos. Todo permanece escapado, legible y sin desbordar las respuestas. [REQ-18]
- [ ] AC-16: La barra y el texto de progreso coinciden desde la primera hasta la décima pregunta y su estado es accesible para tecnologías de asistencia. [REQ-19]

## Out Of Scope

- Autenticación, sincronización remota o rankings globales.
- Backend o base de datos.
- Traducción a otros idiomas.
- Límites de tiempo, rachas, logros u otras mecánicas de gamificación hasta definir su efecto en la partida y sus alternativas accesibles.

## Technical Notes

- Consumir el modelo, el banco validado y las funciones puras ya implementadas en la spec 002.
- Sustituir el contexto actual por un store de Zustand al comenzar esta spec. Separar estado y acciones de dominio de los efectos de interfaz, consumir el store mediante selectores pequeños y mantener las transformaciones puras fuera de Zustand.
- Ejecutar la migración a Zustand como trabajo guiado: el usuario implementará cada checkpoint, podrá consultar dudas durante el proceso y solicitará revisión antes de avanzar al siguiente. No retirar el contexto hasta que no queden consumidores.
- Usar el middleware `persist` de Zustand para el ciclo de almacenamiento e hidratación del mínimo estado necesario. Un `PersistStorage` propio validará con Zod el contenedor y el estado serializado al leer y escribir; `merge` conservará la validación semántica contra el catálogo vigente.
- Mantener una clave de `localStorage` estable bajo un namespace de Code Quiz, versionar su payload mediante `persist` y nunca guardar contenido HTML.
- Persistir el estado mínimo del mazo por configuración para mantener la variedad entre recargas, validando IDs frente al banco vigente.
- Guardar el mayor número de aciertos por combinación exacta de materia o modo mixto y nivel. Solo cuentan partidas configuradas completas de diez preguntas; las repeticiones de fallos no alteran el récord y los empates conservan el valor existente.
- Construir el modo mixto mediante selección estratificada por materia, no mediante una muestra plana que pueda omitir una de ellas por azar.
- Reutilizar la limpieza entre tests y los matchers de `jest-dom` del setup compartido existente; ampliar la configuración solo cuando un nuevo comportamiento lo exija.
- Derivar A–D del orden visible y conservar la corrección por `option.id`; el marcador no formará parte del banco ni de los datos persistidos.
- Usar MicroLighter de forma programática, limitado a los lenguajes admitidos por `CodeLanguage`, sin `dangerouslySetInnerHTML` y con el texto escapado actual como fallback cuando la CSS Custom Highlight API no esté disponible. Validar su integración con los cambios de React, el coste real del bundle y el resaltado en navegador; si el spike no resulta satisfactorio, revisar la estrategia antes de incorporar otra dependencia.
- Añadir cobertura solo si se define un umbral útil; no perseguir porcentaje sin relación con riesgos.

## Risks Or Open Questions

- El modo cronómetro opcional se ha separado en la spec 005 para definir sus tiempos, accesibilidad, pausa, puntuación, persistencia y pruebas sin ampliar T4.
- MicroLighter depende de una API Baseline Newly available; se acepta la falta de resaltado en navegadores antiguos siempre que el contenido permanezca legible y escapado.
- Muchos ejemplos CSS son fragmentos deliberadamente breves y no reglas completas. La decisión cerrada es no enviarlos a MicroLighter: conservan fondo técnico, radio y tipografía monoespaciada sin un coloreado parcial engañoso.
