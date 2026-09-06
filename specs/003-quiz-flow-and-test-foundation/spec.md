# Quiz flow and test foundation

**Status:** Draft

## Goal

Evolucionar el flujo actual hacia partidas breves, variadas, accesibles y persistentes, respaldadas por Vitest y Testing Library y construidas sobre el banco justo y extensible de la spec 002.

## Context

La aplicación inicia directamente una partida de 25 preguntas, mantiene todo el estado en un contexto y dispone de la suite mínima de regresión de la spec 004. No ofrece menú, filtros, progreso persistente ni repetición de fallos.

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
- REQ-10: La suite usará Vitest, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom` y un entorno DOM compatible con Vite.
- REQ-11: Existirán scripts reproducibles para test único, watch y cobertura si se adopta cobertura como requisito de CI.
- REQ-12: Las pruebas cubrirán filtros, selección, equilibrio de respuestas, puntuación, reinicio completo, persistencia, repetición de fallos, código en respuestas, foco y anuncios accesibles.
- REQ-13: Las pruebas de componentes observarán comportamiento visible y roles accesibles, evitando asserts sobre detalles internos de React.
- REQ-14: La integración mantendrá URLs y assets compatibles con el despliegue raíz en Vercel y los metadatos SITE_URL de la spec 004.
- REQ-15: La selección usará un mazo aleatorio por configuración: no repetirá preguntas hasta agotar las candidatas disponibles y, con un banco de veinte, una repetición inmediata usará las diez preguntas restantes antes de iniciar un nuevo ciclo.
- REQ-16: Una partida mixta repartirá las diez preguntas entre HTML, CSS y JavaScript como 4/3/3 y alternará de forma equilibrada la materia que aporta la cuarta pregunta.

## Design Requirements

- Seguir `DESIGN.md`; el menú debe pertenecer a la misma familia visual que la tarjeta del quiz.
- Mantener una columna protagonista y apilar controles cuando el contenido lo requiera.
- Verificar temas claro/oscuro, 320 CSS px, texto ampliado, foco, estados vacíos y movimiento reducido.
- El logo final y naming dependen de la spec 001; la lógica de preguntas depende de la spec 002.

## Acceptance Criteria

- [ ] AC-1: El usuario configura materia y nivel y solo recibe diez preguntas compatibles sin duplicados. [REQ-1–REQ-3]
- [ ] AC-2: Cada combinación jugable dispone de al menos veinte candidatas y genera una partida de diez. [REQ-2, REQ-3]
- [ ] AC-3: El flujo completo puede terminarse y reiniciarse con teclado sin conservar estado anterior. [REQ-4, REQ-6, REQ-8]
- [ ] AC-4: Resultados ofrece menú, repetición, cambio de categoría y repetición de fallos según proceda. [REQ-5]
- [ ] AC-5: Datos persistidos válidos se restauran y datos inválidos se ignoran sin romper la aplicación. [REQ-7]
- [ ] AC-6: Feedback, progreso y resultado están disponibles para tecnologías de asistencia y no dependen solo del color. [REQ-8]
- [ ] AC-7: Con movimiento reducido no se ejecuta confeti, vibración, scroll suave ni escalado decorativo. [REQ-9]
- [ ] AC-8: `pnpm test` ejecuta Vitest y Testing Library en local y CI. [REQ-10, REQ-11]
- [ ] AC-9: Las pruebas automatizadas cubren todos los comportamientos enumerados en REQ-12 sin depender de implementación interna. [REQ-12, REQ-13]
- [ ] AC-10: `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan, salvo fallos previos explícitamente separados. [REQ-10–REQ-14]
- [ ] AC-11: La verificación visual no detecta pérdida de contenido en claro/oscuro, 320 px, zoom/texto ampliado o movimiento reducido. [Design Requirements]
- [ ] AC-12: Dos partidas consecutivas de la misma combinación con un banco de veinte no comparten preguntas; el siguiente ciclo vuelve a barajar de forma determinista bajo una semilla de prueba. [REQ-15]
- [ ] AC-13: Una partida mixta siempre contiene las tres materias, ninguna supera a otra por más de una pregunta y la materia con cuatro preguntas no queda fijada entre partidas. [REQ-16]

## Out Of Scope

- Autenticación, sincronización remota o rankings globales.
- Backend o base de datos.
- Traducción a otros idiomas.
- Gamificación adicional fuera de puntuación, mejores resultados y feedback actual.

## Technical Notes

- Implementar primero la spec 002 y consumir sus funciones puras en esta spec.
- Sustituir el contexto actual por un store de Zustand al comenzar esta spec. Separar estado y acciones de dominio de los efectos de interfaz, consumir el store mediante selectores pequeños y mantener las transformaciones puras fuera de Zustand.
- Usar persistencia versionada y validada para el mínimo estado necesario; no delegar en el middleware la validación de datos antiguos o corruptos.
- Versionar claves de `localStorage` bajo un namespace de Code Quiz y nunca persistir contenido HTML.
- Persistir el estado mínimo del mazo por configuración para mantener la variedad entre recargas, validando IDs frente al banco vigente.
- Construir el modo mixto mediante selección estratificada por materia, no mediante una muestra plana que pueda omitir una de ellas por azar.
- Configurar limpieza entre tests y matchers de `jest-dom` en un setup compartido.
- Añadir cobertura solo si se define un umbral útil; no perseguir porcentaje sin relación con riesgos.

## Risks Or Open Questions

- Falta concretar el criterio de “mejor resultado” para modo mixto y filtros distintos.
- Debe definirse si “repetir fallos” conserva el orden visto o crea una nueva distribución equilibrada.
