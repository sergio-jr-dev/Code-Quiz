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
- Las 25 preguntas heredadas ya usan `BankQuestion`, metadatos explícitos, IDs de dominio y opciones identificadas por `a`–`d`. El catálogo conserva sus enunciados, respuestas correctas y significado; las correcciones de estilo y equidad quedan reservadas para T6.
- El flujo activo crea la partida completa mediante `buildRound`, por lo que baraja preguntas y distractores sin mutar el banco y equilibra las posiciones correctas. Selección, puntuación, revisión y reinicio comparan IDs de opción.
- Preguntas, opciones y explicaciones consumen los componentes de bloques de T4. Al desaparecer la fuente Markdown se eliminaron `renderExplanation`, `marked` y DOMPurify; el contenido se representa como nodos React escapados, sin `dangerouslySetInnerHTML`.
- `QuestionId` tipa el prefijo de materia y delega el patrón completo al validador runtime. Esta separación permite temas legibles con guiones, que TypeScript no puede descomponer de forma fiable con el tipo plantilla anterior.
- El validador no detecta errores de integridad en las 25 preguntas migradas. Deja para T6 cinco avisos editoriales: longitud y estructura en `css-numbers-001`, y estructura en `css-opacity-001`, `css-selector-lists-001` y `html-links-002`.

## Validation Results

- Comprobación intermedia tras T1–T3: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan.
- Vitest ejecuta 40 pruebas en 10 archivos, incluidas las pruebas de contrato, validación, excepciones editoriales, reproducibilidad, equilibrio y renderizado seguro.
- T4 verifica en DOM la semántica del encabezado, el lenguaje del código, la conservación exacta de espacios y que contenido con apariencia peligrosa no cree elementos. La verificación visual del flujo queda pendiente hasta T5, cuando los bloques se integren en la interfaz existente.
- Comprobación de T5: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan; Vitest ejecuta 35 pruebas en 9 archivos. Se retiraron las pruebas del render Markdown obsoleto y se conserva la cobertura de seguridad y semántica de los bloques de T4.
- Revisión local en navegador real: a 320 × 700 las opciones de código, el feedback y la explicación mantienen reflow sin desbordamiento horizontal (`scrollWidth` 309 para `innerWidth` 320); a 1280 × 900 el flujo conserva la tarjeta centrada y tampoco desborda. El foco inicial permanece en el `h2`, las opciones conservan nombres accesibles y no aparecieron errores ni avisos de consola.

## Deviations From Spec

- None.

## Visual Deviations

- None.
