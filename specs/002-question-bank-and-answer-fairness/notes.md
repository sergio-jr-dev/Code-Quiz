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

## Validation Results

- Comprobación intermedia tras T1–T3: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan.
- Vitest ejecuta 35 pruebas en 6 archivos, incluidas las nuevas pruebas de contrato, validación, excepciones editoriales, reproducibilidad y equilibrio.
- La verificación visual queda pendiente hasta T4, cuando los bloques de contenido se integren en la interfaz.

## Deviations From Spec

- None.

## Visual Deviations

- None.
