# Notes

## Decisions

- La aplicación ofrecerá dos modalidades dentro del mismo flujo: normal y cronómetro.
- El modo normal será el predeterminado y ofrecerá el mismo contenido sin límite temporal.
- Los tiempos iniciales serán 60 segundos en nivel básico, 45 en intermedio y 30 en avanzado.
- Responder o agotar el tiempo detendrá la cuenta atrás. El agotamiento mostrará feedback y explicación, pero nunca avanzará automáticamente.
- Una pregunta agotada se registrará como no contestada e incorrecta, sin inventar una opción seleccionada.
- El tiempo no otorgará bonificaciones: la comprensión y el número de aciertos seguirán siendo la métrica principal.
- El cronómetro se pausará mientras la pestaña esté oculta y continuará con el tiempo restante al volver.
- No se anunciará cada segundo; se anunciarán de forma puntual los últimos diez segundos y el agotamiento.
- Resultados y mejores marcas se separarán por modalidad.
- Esta funcionalidad se desarrollará después de cerrar la spec 003 para reutilizar su flujo y persistencia sin crear una segunda aplicación.
- Una recarga durante una partida cronometrada descarta la ronda y vuelve al menú. Conserva materia, nivel, modalidad, mazos, rotación mixta y récords; no registra un resultado, no devuelve preguntas ya consumidas al mazo y no intenta reconstruir la cuenta atrás desde una marca temporal persistida.
- Se mantienen 60/45/30 segundos como valores iniciales. La alternativa normal equivalente, la ausencia de bonificaciones por rapidez y el feedback manual posterior al agotamiento limitan el coste educativo de una cuenta avanzada deliberadamente exigente.
- La modalidad es estado de dominio (`normal | timed`) y el temporizador usa estados explícitos `running`, `paused`, `answered` y `expired`. Una expiración se representa como respuesta con `selectedOptionId: null` y `timedOut: true`, nunca mediante un ID de opción ficticio.
- Si una respuesta y el vencimiento coinciden, el tiempo agotado prevalece: una respuesta cronometrada solo se registra cuando conserva tiempo positivo. La expiración es idempotente y no avanza automáticamente.

## Implementation Notes

- T1 no modifica código de producción. La spec 003 ya figura como `Implemented`, por lo que dejó de ser una dependencia bloqueante.
- Para validar las duraciones se midió el contenido visible antes de responder —enunciado, código y cuatro opciones; no la explicación— en las 180 preguntas. Cada nivel contiene 60 preguntas. Básico tiene 19,7 palabras de media, mediana de 17 y rango 10–68; intermedio, 28,1 de media, mediana de 26 y rango 12–67; avanzado, 31 de media, mediana de 34 y rango 8–51.
- Ejemplos revisados: `javascript-logical-not-101`, `css-selectors-001` y `css-box-model-001` en básico; `javascript-set-101`, `css-nth-child-101` y `css-visibility-001` en intermedio; `css-not-specificity-101`, `javascript-lexical-this-101` y `css-stacking-contexts-101` en avanzado. La muestra cubre extremos y medianas, con y sin código.
- T2 añadió los contratos `QuizMode`, `QuizTimerState` y la unión explícita de respuestas seleccionadas o agotadas. Las transiciones puras inician 60/45/30 según el nivel, calculan el restante desde una referencia temporal, pausan, reanudan, detienen al responder, expiran una sola vez y limpian el temporizador al avanzar, reiniciar, repetir fallos, abandonar o volver al menú.
- El middleware todavía conserva el esquema persistido v1: los datos existentes se rehidratan como modo normal con temporizador nulo y el nuevo estado temporal no se persiste. La versión, migración y validación completas del modo cronometrado permanecen dentro de T7.

## Validation Results

- 2026-09-17, T1: revisión completa de `spec.md`, `tasks.md`, `notes.md`, `DESIGN.md`, el estado de la spec 003 y el catálogo de 180 preguntas. La política de recarga quedó expresada en REQ-18 y AC-17; las duraciones 60/45/30 quedaron confirmadas para la primera implementación. `git diff --check` pasó. No se ejecutaron checks de aplicación porque T1 solo cambia documentación.
- 2026-09-17, T2: pasaron `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` con 30 archivos y 161 pruebas, `pnpm build` y `git diff --check`. Las pruebas focalizadas cubren las tres duraciones, ausencia de temporizador en modo normal, cálculo sin deriva, pausa/reanudación, detención al responder, expiración explícita e idempotente, desempate en el límite y avance manual posterior.

## Deviations From Spec

- None.

## Visual Deviations

- None.
