# Notes

## Decisions

- Las materias iniciales son HTML, CSS y JavaScript.
- La corrección se identifica por ID, no por índice.
- La posición correcta se equilibra por partida; no se confía únicamente en una distribución aleatoria global.
- Las opciones no deben revelar la correcta por longitud, detalle o estructura.
- El código se modela como contenido seguro, no como HTML arbitrario.
- Pregunta, opciones y explicación usan el mismo array de bloques discriminados. Se permite combinar texto y código en una opción para explicar fragmentos sin recurrir a HTML arbitrario.
- Los bloques de código requieren lenguaje explícito: `html`, `css` o `javascript`.
- Los IDs de pregunta siguen `<subject>-<topic>-<sequence>` y los IDs de opción son estables dentro de su pregunta, con independencia del orden visual.
- Las excepciones editoriales identifican la regla de equidad (`length` o `structure`) y exigen un motivo no vacío.
- Cada pareja materia–nivel tendrá al menos veinte preguntas y cada partida usará diez, lo que fija un mínimo inicial de 180 preguntas.

## Implementation Notes

- Dependencia: la spec 003 consume el modelo y las funciones puras definidos aquí.
- `src/types/questionBank.ts` contiene el contrato aditivo. El banco actual conserva temporalmente el contrato de la spec 004 hasta la migración de T5.
- El validador separa errores de integridad de avisos editoriales. Una alerta no invalida el banco, pero debe corregirse o justificarse antes de aprobar su contenido.
- La alerta de longitud se activa cuando la correcta mide al menos 1,75 veces el distractor más largo y lo supera por 20 caracteres visibles o más. La alerta estructural aparece cuando solo la correcta usa una firma de bloques distinta.
- `shuffleWith` conserva Fisher–Yates y exige una fuente aleatoria inyectada; `shuffle` mantiene la API actual con `Math.random` como valor predeterminado.
- `buildBalancedPositions` reparte primero ciclos completos de posiciones y aleatoriza el plan. `buildRound` baraja preguntas y distractores sin mutar el banco e inserta la correcta por ID en la posición planificada.
- `QuestionContent`, `OptionContent` y `ExplanationContent` comparten un renderizador que interpola texto con React y representa código literalmente mediante `pre > code`; no utiliza HTML inyectado.
- Cada componente vive en su propio archivo. `ContentBlock` resuelve un bloque y `ContentBlocks` compone la secuencia; no hay lógica de estado que justifique extraer un custom hook en T4.
- Los estilos de bloque, secuencia y variante de opción están separados por responsabilidad. Las pruebas se dividen entre seguridad del bloque, semántica de la pregunta y composición de opciones/explicaciones.
- Las hojas de T4 se integran en `@layer components` y limitan su alcance mediante `@scope`. El orden de capas se declara desde `src/main.css`, importado antes del árbol de componentes.
- La migración de cascada se verificó en Chromium a 320 × 700 y 1280 × 900 durante el flujo de pregunta, feedback, resultado y revisión. No se observaron pérdidas de estilos ni desbordamiento horizontal.
- El código conserva un tamaño mínimo de `1rem`, igual que el resto del texto funcional.
- El primer bloque de `QuestionPrompt` queda tipado como texto para conservar un `h2` válido. Los bloques técnicos posteriores mantienen espacios, lenguaje explícito y scroll horizontal local.
- T5 migró las 25 preguntas heredadas a `BankQuestion`, metadatos explícitos, IDs de dominio y opciones identificadas por `a`–`d`, conservando entonces sus enunciados, respuestas correctas y significado para revisarlos por separado en T6.
- El flujo activo crea la partida completa mediante `buildRound`, por lo que baraja preguntas y distractores sin mutar el banco y equilibra las posiciones correctas. Selección, puntuación, revisión y reinicio comparan IDs de opción.
- Preguntas, opciones y explicaciones consumen los componentes de bloques de T4. Al desaparecer la fuente Markdown se eliminaron `renderExplanation`, `marked` y DOMPurify; el contenido se representa como nodos React escapados, sin `dangerouslySetInnerHTML`.
- `QuestionId` tipa el prefijo de materia y delega el patrón completo al validador runtime. Esta separación permite temas legibles con guiones, que TypeScript no puede descomponer de forma fiable con el tipo plantilla anterior.
- T6 revisó manualmente las 25 preguntas. Se eliminaron referencias dependientes del orden como “la 1 y la 2” y “todas son correctas”, y se reescribieron `css-numbers-001`, `css-opacity-001`, `css-selector-lists-001` y `html-links-002` con una sola respuesta inequívoca y opciones estructuralmente paralelas.
- La revisión afinó terminología y explicaciones en los casos donde una simplificación podía confundir: `display: flex` crea un contenedor flex, `viewport` es un valor de `meta[name]`, `details` representa un disclosure widget y `download` expresa la intención de descargar el recurso enlazado.
- No se necesitaron excepciones editoriales: las 25 preguntas quedan sin errores ni avisos del validador. La prueba del catálogo ahora exige el resultado completo `{ valid: true, issues: [] }` para evitar que reaparezcan pistas heurísticas inadvertidas.
- La revisión final necesitó fijar `inline-size: 100%` en el contenido de opción dentro de `.results`: así los fragmentos largos conservan scroll horizontal local sin ensanchar la página a 320 px.

## T7 · Catálogo completo (2026-09-07)

- Se añadieron 155 preguntas a las 25 revisadas en T6. Los módulos `src/data/bank/html.ts`, `css.ts` y `javascript.ts` componen `questionCatalog.ts`; las preguntas heredadas se reutilizan por referencia y aparecen una sola vez.
- `questionFactory.ts` comparte la construcción tipada que ya utilizaba el banco y admite bloques de código después del encabezado textual. Cada nueva pregunta declara ID estable, materia, nivel, tema, cuatro opciones, respuesta por ID y explicación. Los sufijos 101 son identificadores explícitos, no índices calculados.
- La ronda activa mantiene las 25 preguntas de `questions.ts`. Publicar filtros y rondas de diez pertenece a la spec 003; conectar directamente las 180 al contexto actual produciría una partida de 180 preguntas. El catálogo completo queda disponible para esa integración y se valida en la suite.
- Criterio editorial: básico cubre vocabulario y operaciones directas; intermedio, aplicación y relaciones; avanzado, interacciones entre reglas y casos límite. Esta clasificación no presupone calibración empírica de dificultad.
- Revisión de opciones: estructura homogénea por pregunta, distractores independientes del orden y escenarios explícitos (modo estricto, tipo de script, condiciones de colapso, origen/importancia de cascada). No se añadieron excepciones editoriales.
- Las pruebas de inventario protegen las nueve combinaciones, el total mínimo, la conservación de las 25 originales, los enunciados completos únicos, las opciones distintas y la correspondencia ID–materia–tema. T8 sigue pendiente para revisar la cobertura global de la spec.

| Materia | Básico | Intermedio | Avanzado | Total |
| --- | ---: | ---: | ---: | ---: |
| HTML | 20 | 20 | 20 | 60 |
| CSS | 20 | 20 | 20 | 60 |
| JavaScript | 20 | 20 | 20 | 60 |
| Total | 60 | 60 | 60 | 180 |

Fuentes técnicas consultadas para los casos delicados:

- [WHATWG: formularios](https://html.spec.whatwg.org/multipage/forms.html) y [construcción de entradas y controles](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-entry-list): propietario, controles excluidos y submitter.
- [WHATWG: scripts y plantillas](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element) y [diálogos](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element): ejecución diferida y modalidad.
- [W3C: especificidad](https://www.w3.org/TR/selectors-4/#specificity-rules): :is(), :where(), :not() y relaciones con :has().
- [W3C: cascada y capas](https://www.w3.org/TR/css-cascade-5/) y [variables inválidas](https://www.w3.org/TR/css-variables-1/#invalid-variables): prioridad de capas, importancia y fallback de var().
- [ECMAScript: promesas](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise.all): orden de resultados y rechazo de Promise.all. Además se ejecutaron los 36 fragmentos JavaScript con resultado observable del catálogo en contextos aislados de Node, comprobando valores, excepciones y orden de mensajes frente a las respuestas redactadas; el comprobador temporal quedó fuera del repositorio.

## Validation Results

- Comprobación intermedia tras T1–T3: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan.
- Vitest ejecuta 40 pruebas en 10 archivos, incluidas las pruebas de contrato, validación, excepciones editoriales, reproducibilidad, equilibrio y renderizado seguro.
- T4 verifica en DOM la semántica del encabezado, el lenguaje del código, la conservación exacta de espacios y que contenido con apariencia peligrosa no cree elementos. La verificación visual del flujo queda pendiente hasta T5, cuando los bloques se integren en la interfaz existente.
- Comprobación de T5: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan; Vitest ejecuta 35 pruebas en 9 archivos. Se retiraron las pruebas del render Markdown obsoleto y se conserva la cobertura de seguridad y semántica de los bloques de T4.
- Revisión local en navegador real: a 320 × 700 las opciones de código, el feedback y la explicación mantienen reflow sin desbordamiento horizontal (`scrollWidth` 309 para `innerWidth` 320); a 1280 × 900 el flujo conserva la tarjeta centrada y tampoco desborda. El foco inicial permanece en el `h2`, las opciones conservan nombres accesibles y no aparecieron errores ni avisos de consola.
- Comprobación de T6 (2026-09-07): `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan; Vitest ejecuta 35 pruebas en 9 archivos y el catálogo completo devuelve cero incidencias de validación.
- QA de T6 en navegador real: se recorrieron las 25 preguntas a 320 × 700, incluidas las ocho formulaciones reescritas; no hubo desbordamiento durante la partida y el foco avanzó al encabezado de cada pregunta. En la revisión final, el foco pasó al primer `h3`, el documento midió `scrollWidth` 309 con `innerWidth` 320 y los 15 bloques de código que lo necesitaban conservaron scroll local. A 1280 × 900 tampoco hubo desbordamiento (`scrollWidth` 1269 para `innerWidth` 1280), ni errores o avisos de consola.

### Validación T7 (2026-09-07)

- Checks run: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, `git diff --check`; comprobador temporal de 36 fragmentos JavaScript y navegador Chromium.
- Passing checks: tipos, lint, 47 pruebas en 10 archivos, build y whitespace. AC-10 confirmado: 180 preguntas, 20 por combinación, sin errores ni avisos editoriales.
- Passing checks: flujo de 25 preguntas con teclado a 320 × 700 y movimiento reducido, foco H2 en cada pregunta y al finalizar, cuatro radios y avance accesibles; los bloques de código con scroll pueden ser paradas adicionales de Tab. Sin desbordamiento de página durante preguntas y feedback. Revisión con foco H3, ancho de documento 320/320 en móvil y 1280/1280 en escritorio. Reinicio con foco H2, cero selecciones y Siguiente deshabilitado. Consola sin errores ni warnings (solo aviso informativo de React DevTools).
- Failing checks: None. El primer arranque de Vite necesitó permiso de escucha local; la CLI de navegador se ejecutó desde su instalación en caché al no poder resolver npm. El primer comprobador de teclado asumía un único Tab hasta Siguiente; se corrigió para contemplar el foco nativo de bloques desplazables, sin cambiar la aplicación.
- Unresolved risks: el catálogo ampliado todavía no se ofrece en el flujo público; su selección y QA de integración pertenecen a la spec 003. No se afirma calibración empírica de niveles ni compatibilidad visual en otros motores. T8 y T9 siguen pendientes; la spec permanece In progress.
- Sin modificaciones de diseño, estilos, dependencias, lockfile ni metadatos. Los artefactos temporales de navegador quedaron fuera del repositorio.

## Deviations From Spec

- None.

## Visual Deviations

- None.
