# Question bank and answer fairness

**Status:** In progress

## Goal

Definir un banco de preguntas extensible y seguro para HTML, CSS y JavaScript que admita código en preguntas y respuestas y reduzca pistas involuntarias por posición, longitud o estructura.

## Context

El banco actual es un único módulo con 25 preguntas, IDs numéricos y contenido textual. La base TypeScript de la spec 004 conserva las opciones en su orden original, usa Fisher–Yates para las preguntas y sanitiza las explicaciones Markdown. Esta spec amplía el esquema y la equidad editorial.

Esta spec debe completarse antes de construir filtros, partidas de diez preguntas o persistencia en la spec 003.

## Requirements

- REQ-1: El banco debe incluir `subject` con valores `html`, `css` o `javascript`, además de `level`, `topic` e ID estable independiente de la posición.
- REQ-2: Pregunta, opciones y explicación deben usar un modelo de bloques que admita texto y código con lenguaje explícito sin requerir HTML arbitrario.
- REQ-3: Los bloques de código deben preservar espacios y saltos, escapar contenido y renderizarse semánticamente mediante `pre` y `code`.
- REQ-4: Cada opción tendrá ID estable y `correctAnswer` apuntará al ID, nunca al índice visual.
- REQ-5: Cada partida asignará posiciones correctas de forma equilibrada: la diferencia entre la posición más y menos frecuente será como máximo una cuando todas las preguntas tengan el mismo número de opciones.
- REQ-6: Los distractores se aleatorizarán con Fisher–Yates sin mutar el banco y con un generador aleatorio inyectable para pruebas deterministas.
- REQ-7: Las opciones de cada pregunta serán paralelas en estructura, precisión, terminología y longitud; la correcta no destacará sistemáticamente por ser más extensa o elaborada que los distractores.
- REQ-8: Un validador del banco detectará IDs duplicados, respuestas inexistentes, materias/niveles inválidos, bloques inseguros, opciones insuficientes y sesgos heurísticos de longitud o estructura.
- REQ-9: Una alerta de equidad podrá justificarse mediante una excepción editorial explícita, pero no silenciarse sin motivo registrado.
- REQ-10: Las explicaciones enseñarán por qué la opción es correcta y, cuando aporte valor, por qué los distractores son plausibles pero incorrectos.
- REQ-11: El contenido procedente de Markdown u otra fuente enriquecida se sanitizará antes de cualquier `dangerouslySetInnerHTML`.
- REQ-12: El modelo debe conservar la asociación pregunta–opciones–respuesta–explicación durante selección, aleatorización, revisión y repetición de fallos.
- REQ-13: Cada combinación publicada de materia y nivel debe disponer de un mínimo de veinte preguntas aprobadas antes de ofrecerse como jugable.
- REQ-14: Con HTML, CSS y JavaScript en niveles básico, intermedio y avanzado, el banco inicial completo tendrá como mínimo 180 preguntas: veinte por cada una de las nueve combinaciones materia–nivel.

## Design Requirements

- Seguir los componentes de respuesta, panel informativo y código de `DESIGN.md`.
- Las opciones con código deben seguir siendo objetivos completos, legibles y navegables por teclado.
- Evitar que resaltado, alto, número de líneas o formato visual revelen la respuesta correcta.

## Acceptance Criteria

- [ ] AC-1: Un esquema documentado representa texto y código en pregunta, opción y explicación para las tres materias. [REQ-1, REQ-2]
- [ ] AC-2: El render de código muestra literalmente contenido potencialmente peligroso sin ejecutarlo. [REQ-3, REQ-11]
- [ ] AC-3: El validador rechaza IDs duplicados y `correctAnswer` inexistentes. [REQ-4, REQ-8]
- [ ] AC-4: Para partidas de distintos tamaños, las posiciones correctas difieren como máximo en una aparición. [REQ-5]
- [ ] AC-5: Con una semilla conocida, pregunta, opciones y posición correcta son reproducibles sin mutar el banco. [REQ-6]
- [ ] AC-6: Las pruebas incluyen preguntas con respuestas de código HTML, CSS y JavaScript. [REQ-2, REQ-3]
- [ ] AC-7: El validador señala una correcta desproporcionadamente larga o con estructura única y acepta una excepción justificada. [REQ-7, REQ-8, REQ-9]
- [ ] AC-8: La revisión final conserva exactamente la opción elegida y la correcta después de aleatorizar. [REQ-12]
- [ ] AC-9: La suite dirigida de Vitest pasa y cubre validación, equilibrio, aleatorización, seguridad y render de contenido. [REQ-3–REQ-12]
- [x] AC-10: El inventario automatizado confirma al menos veinte preguntas válidas en cada combinación publicada de materia y nivel y un mínimo de 180 preguntas en el catálogo inicial completo. [REQ-13, REQ-14]

## Out Of Scope

- Diseñar el menú o la navegación entre materias.
- Persistir resultados o preferencias.
- Migrar todo el proyecto a TypeScript.

## Technical Notes

- Preferir transformaciones puras fuera de React: `validateQuestionBank`, `buildRound`, `buildBalancedPositions` y `shuffleWith`.
- El modelo ampliado se definirá en TypeScript y se validará en runtime; la spec 004 ya tipa el banco actual.
- Pregunta, opciones y explicación comparten una secuencia de bloques discriminados `text`/`code`. Una misma opción puede combinar ambos tipos cuando el contenido lo necesite; el bloque de código siempre declara `html`, `css` o `javascript`.
- El primer bloque de una pregunta es siempre textual y se renderiza como su encabezado. Los bloques posteriores se presentan como contenido asociado para mantener HTML semánticamente válido cuando existe código multilínea.
- Los IDs de pregunta siguen el patrón legible y estable `<subject>-<topic>-<sequence>`; los IDs de opción son locales a la pregunta y no dependen de su posición visual.
- Para cuatro opciones, una partida de diez preguntas debería distribuir posiciones correctas como 3/3/2/2 en algún orden.
- El mínimo de veinte se aplica a cada pareja `subject` + `level`, no a un nivel compartido entre materias; de otro modo, un filtro concreto podría no reunir diez preguntas variadas.
- La heurística de longitud debe comparar contenido visible normalizado y señalar anomalías; no debe sustituir la revisión editorial.
- Evitar opciones como “todas las anteriores” cuando el orden aleatorio cambie su significado.

## Risks Or Open Questions

- Debe definirse el umbral exacto de la alerta de longitud tras revisar ejemplos reales de texto y código.
