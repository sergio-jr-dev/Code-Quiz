# Notes

## Decisions

- La suite será Vitest con Testing Library y `user-event`.
- Diez preguntas es el tamaño fijo inicial de cada partida; no se mostrará un selector de cantidad.
- Cada configuración jugable parte de al menos veinte preguntas y consume un mazo aleatorio sin repetición antes de volver a barajar.
- El modo mixto usa una distribución 4/3/3 y rota la materia que recibe la pregunta adicional.
- Las pruebas se centrarán en comportamiento observable y accesibilidad.
- No se añadirá backend para progreso o mejores resultados.
- La spec sustituirá el contexto actual por Zustand como ejercicio deliberado de arquitectura de estado. El store gestionará el dominio; foco, anuncios, confeti y otros efectos visuales permanecerán en la capa de interfaz.
- Los componentes usarán selectores pequeños. La persistencia tendrá versión y validación propia para tolerar datos ausentes, antiguos o corruptos.
- La migración a Zustand se realizará como práctica guiada: el usuario implementará los checkpoints de T2, consultará dudas cuando lo necesite y pedirá una revisión antes de avanzar. El asistente no implementará esos checkpoints salvo petición explícita.
- Las respuestas conservarán radios nativos y añadirán marcadores visuales A–D derivados del orden mostrado, sin sustituir los IDs de dominio.
- Preguntas, opciones y explicaciones con código tendrán resaltado de sintaxis seguro para los lenguajes tipados admitidos y fallback como texto escapado.
- La partida mostrará barra y texto de progreso sincronizados.
- Los límites de tiempo no forman parte del alcance confirmado. Antes de incorporarlos debe decidirse si son informativos u opcionales, qué efecto tienen y cómo se garantiza una alternativa accesible; se recomienda una spec posterior para un modo contrarreloj.
- La configuración de Vitest y Testing Library ya existe por la spec 004; T1 la auditará y ampliará sin rehacerla.
- El contrato acordado para Zustand conserva como estado de dominio `round`, `currentQuestionIndex`, respuestas vinculadas por `questionId` y una vista explícita `playing | score | review`. La pregunta y respuesta actuales, la puntuación, los porcentajes y los totales se derivarán; el foco, los anuncios y el confeti seguirán fuera del store.
- La migración inicial a Zustand reproducirá solo el flujo que ya existe. La configuración y las transiciones del mazo se implementarán en T3 junto al menú y los filtros que definen sus invariantes, evitando ampliar el store mínimo con estado todavía especulativo.
- Durante T2.4, `QuizContextProvider` funcionará temporalmente como adaptador del store antes de migrar sus consumidores. Así el contexto antiguo y los componentes ya migrados compartirán una sola ronda y no habrá sincronización ni estado de dominio duplicado; el adaptador se eliminará en T2.5.

## Implementation Notes

- La dependencia de datos/equidad está resuelta: la spec 002 figura como `Implemented`.
- Permanece la dependencia de la spec 001 para la identidad pública final.
- La estrategia y posible dependencia de resaltado de sintaxis se decidirán antes de implementar T4.
- T1 auditó la infraestructura heredada de la spec 004. `vitest.config.ts` ya usa jsdom, carga `src/test/setup.ts` y restaura mocks; el setup registra `jest-dom`, limpia Testing Library tras cada prueba y simula `matchMedia` para movimiento reducido.
- Los scripts `test` y `test:watch` son reproducibles y funcionan con la suite actual. No se añadió configuración, dependencia ni script de cobertura porque la spec no define un umbral asociado a un riesgo concreto.
- La limpieza específica de `localStorage`, los temporizadores falsos y cualquier mock adicional se incorporarán junto a las funcionalidades que los necesiten, no de forma anticipada en T1.
- T2.1 añadió `src/types/quizStore.ts` con contratos separados para estado y acciones. Cada respuesta conserva `questionId` y `selectedOptionId`, evitando depender de su posición en el array.
- T2.2 añadió transiciones puras para responder, avanzar, mostrar la revisión y reiniciar, además del cálculo derivado de puntuación. Las guardas devuelven la misma referencia cuando una acción no es válida; los cambios crean estado nuevo sin mutar las entradas.
- T2.3 instaló Zustand 5.0.15 y añadió `src/stores/quizStore.ts`. El store mínimo inicializa la partida actual y expone las cuatro acciones de dominio sobre las transiciones puras de T2.2. Un `StateCreator` separado queda envuelto por `devtools` con el nombre `quiz-store`; no se añadió persistencia ni se trasladaron al store efectos de interfaz o valores derivados.
- T2.4 migró todos los consumidores de interfaz a `useQuizStore` mediante selectores pequeños. Las respuestas se consultan por `questionId`, los valores derivados permanecen fuera del store y los efectos de confeti continúan en los componentes. El test de `Results` prepara directamente el estado de Zustand y conserva la comprobación visible de corrección por ID tras reordenar opciones.
- T2.5 retiró el adaptador temporal: `App` renderiza `Game` directamente y se eliminaron `QuizContext`, `QuizContextProvider` y el tipo `QuizContextValue`. Zustand queda como única fuente de verdad del flujo actual.

## Validation Results

- 2026-09-09, T1: `pnpm test` pasó con 11 archivos y 59 pruebas; `pnpm test:watch -- --run` pasó con 11 archivos y 59 pruebas; `pnpm typecheck` pasó. La auditoría no encontró cambios necesarios en la configuración actual.
- 2026-09-11, T2.1: el contrato tipado pasó `tsc -b`, `oxfmt --check src/types/quizStore.ts` y `git diff --check`. La revisión confirmó que el estado derivado no se duplica y que los efectos de interfaz quedan fuera del store.
- 2026-09-12, T2.2: 12 archivos y 76 pruebas pasaron. También pasaron `oxfmt --check .`, `oxlint`, `tsc -b`, `vite build` y `git diff --check`.
- 2026-09-12, T2.3: Zustand 5.0.15 figura como dependencia. Pasaron `./node_modules/.bin/tsc -b`, `./node_modules/.bin/oxlint src/stores/quizStore.ts`, `./node_modules/.bin/oxfmt --check src/stores/quizStore.ts`, `./node_modules/.bin/vitest run` con 12 archivos y 76 pruebas, y `git diff --check`. Las invocaciones equivalentes mediante `pnpm` se bloquearon sin producir salida en el entorno de esta sesión y se interrumpieron; la validación se completó con los binarios locales ya instalados.
- 2026-09-14, T2.4: la búsqueda de `useQuiz`, `QuizContext` y `QuizContextProvider` confirmó que no quedan consumidores de interfaz del contexto; solo permanecen la infraestructura legada y el wrapper de `App`, reservados para T2.5. Pasaron `./node_modules/.bin/tsc -b`, Oxlint y Oxfmt sobre `Results` y su test, `./node_modules/.bin/vitest run` con 12 archivos y 76 pruebas, y `git diff --check`.
- 2026-09-14, T2.5: no quedan referencias a `useQuiz`, `QuizContext`, `QuizContextProvider` ni `QuizContextValue`. Pasaron `./node_modules/.bin/oxfmt --check .`, `./node_modules/.bin/tsc -b`, `./node_modules/.bin/oxlint`, `./node_modules/.bin/vitest run` con 12 archivos y 76 pruebas, `./node_modules/.bin/vite build` y `git diff --check`.

## Deviations From Spec

- None.

## Visual Deviations

- None.
