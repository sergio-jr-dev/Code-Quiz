# AGENTS.md

## Alcance

Estas instrucciones se aplican a todo el repositorio. `DESIGN.md` es la fuente de verdad visual; este archivo define cómo analizar, implementar y verificar cambios.

## Producto

Code Quiz es una aplicación educativa en español para practicar HTML, CSS y JavaScript mediante preguntas de opción única, feedback inmediato, explicación y revisión final.

La dirección del producto es evolucionar una sola aplicación, no crear quizzes o repositorios duplicados. La arquitectura objetivo debe poder ampliar el catálogo por:

- materia: HTML, CSS y JavaScript, con posibilidad de incorporar otras áreas en el futuro;
- nivel: básico, intermedio y avanzado;
- tema: por ejemplo, semántica, selectores o layout;
- modalidad: materia concreta o quiz mixto.

Todas las materias comparten el mismo sistema de color. Diferéncialas principalmente mediante el logo, el nombre y el contenido; no asignes una paleta completa a cada lenguaje salvo que el usuario cambie esta decisión.

Mantén la experiencia breve, clara y didáctica. La puntuación es secundaria respecto a comprender por qué una respuesta es correcta.

## Stack y estructura actual

- React 19 con componentes funcionales, TypeScript estricto y TSX.
- Vite 8 y `@vitejs/plugin-react`.
- pnpm, con `pnpm-lock.yaml` como lockfile autoritativo.
- CSS modular por componente, además de los estilos y tokens globales de `src/App.css`.
- Estado compartido en `src/context/QuizContextProvider.tsx`.
- Banco actual en `src/data/questions.ts`.
- Markdown de explicaciones renderizado con `marked` y sanitizado con DOMPurify.
- Build estático desde la raíz, desplegado en https://codequiz-game.vercel.app/.

No introduzcas un backend, router, framework CSS o librería de estado sin una necesidad demostrable y aprobación explícita.

## Antes de cambiar código

1. Lee este archivo y `DESIGN.md`.
2. Revisa `git status --short` y conserva todos los cambios previos del usuario.
3. Traza el flujo afectado desde los datos hasta el componente y el estado; no corrijas un síntoma aislado sin comprender su contrato.
4. Consulta la skill local que corresponda. Lee su `SKILL.md` completo y abre únicamente las referencias necesarias.
5. Si el cambio altera datos, estado, rutas de despliegue o presentación pública, identifica primero sus invariantes y casos límite.

## Skills locales

Las skills están en `.agents/skills/` y se aplican por el tipo de trabajo, no por conveniencia:

- `accessibility`: auditorías o cambios de teclado, foco, lector de pantalla, contraste, movimiento o WCAG 2.2.
- `frontend-design`: nuevas pantallas, componentes o cambios visuales importantes. Debe respetar `DESIGN.md` y la identidad existente.
- `react-best-practices`: escritura, revisión, refactor o rendimiento de componentes React.
- `composition-patterns`: APIs de componentes, contextos, composición, variantes y límites de responsabilidad.
- `vite`: `vite.config.ts`, plugins, build, resolución de assets o migraciones de Vite.
- `seo`: metadatos, Open Graph, indexación, contenido compartido o datos estructurados.
- `nodejs-best-practices`: decisiones reales de runtime o tooling Node.js.
- `nodejs-backend-patterns`: solo si el alcance aprobado incorpora un servidor o API Node.js.

Si varias skills aplican, usa el conjunto mínimo que cubra el cambio y resuelve primero arquitectura, después implementación y finalmente validación.

## Alcance de la primera versión

La spec 004 conserva las 25 preguntas actuales de HTML y CSS, sus IDs numéricos y la partida completa. Las reglas de ampliación de banco, diez preguntas, niveles, modo mixto y persistencia siguientes son el objetivo de las specs 002/003, no funcionalidades disponibles.

## Arquitectura del quiz

### Datos

Las preguntas deben vivir fuera de los componentes. Al ampliar el banco, usa módulos por materia y un esquema estable equivalente a:

```js
{
  id: 'css-selectors-001',
  subject: 'css',
  level: 'intermediate',
  topic: 'selectors',
  question: '...',
  options: [
    { id: 'a', content: '...' },
  ],
  correctAnswer: 'a',
  explanation: '...',
}
```

- Los identificadores deben ser únicos, estables e independientes de la posición en el array.
- `correctAnswer` debe apuntar a un `option.id` existente.
- No derives materia, nivel o tema a partir del texto.
- Modela pregunta, opciones y explicación con bloques de contenido seguros que puedan combinar texto y ejemplos de código con lenguaje explícito.
- Renderiza el código como texto escapado dentro de `pre`/`code`; no conviertas una respuesta con código en HTML arbitrario.
- Conserva la asociación entre pregunta, opciones, respuesta del usuario y explicación aunque se aleatorice el orden.
- Valida el banco en desarrollo o mediante pruebas antes de iniciar una partida.
- Las explicaciones deben ser concretas, técnicamente correctas y útiles incluso al revisar fallos más tarde.
- Redacta opciones paralelas en estructura, precisión y longitud. La correcta no debe destacar por ser sistemáticamente más extensa, específica o cuidada que los distractores.

### Selección y aleatoriedad

- Cada combinación publicada de materia y nivel debe tener al menos veinte preguntas aprobadas; con tres materias y tres niveles, el banco inicial completo suma como mínimo 180.
- Genera partidas fijas de diez preguntas a partir de filtros explícitos.
- Usa Fisher–Yates o una utilidad equivalente con posibilidad de inyectar el generador aleatorio en pruebas.
- No uses `sort(() => Math.random() - 0.5)`.
- Equilibra la posición de las respuestas correctas dentro de cada partida: la frecuencia por posición debe diferir como máximo en una aparición cuando el número de preguntas lo permita.
- Consume cada banco filtrado como un mazo aleatorio sin repetición; con veinte candidatas, una repetición inmediata debe usar las diez no vistas antes de iniciar otro ciclo.
- En el modo mixto, reparte las diez preguntas entre las tres materias como 4/3/3 y alterna qué materia recibe la cuarta para que ninguna domine sistemáticamente.
- No mutes el banco fuente ni reutilices accidentalmente una partida anterior.
- Si también se aleatorizan opciones, calcula la corrección por ID, nunca por índice visual.

### Estado

- Mantén una única fuente de verdad para configuración, partida, progreso y resultados.
- Prefiere estado derivado a estado duplicado; no guardes porcentajes o totales que puedan calcularse.
- Toda nueva partida debe reiniciar pregunta, selección, puntuación, respuestas, finalización, revisión de resultados y cualquier anuncio transitorio.
- Separa las transformaciones puras —filtrado, muestreo, puntuación y resumen— de React para poder probarlas sin renderizar la interfaz.
- Versiona y valida cualquier dato persistido en `localStorage`. Tolera datos ausentes, antiguos o corruptos sin bloquear la aplicación.
- Si el contexto crece hasta mezclar configuración, ejecución y persistencia, divídelo por responsabilidades o usa un reducer antes de añadir más setters públicos.

### Componentes React

- Mantén componentes pequeños con responsabilidades explícitas.
- Usa composición y variantes con nombres claros; evita cadenas crecientes de props booleanas.
- No declares componentes dentro de otros componentes.
- Los efectos son para sincronizar con sistemas externos, no para mantener estado derivado.
- Conserva claves estables basadas en IDs de dominio.
- En React 19, pasa `ref` como prop cuando proceda; no introduzcas `forwardRef` sin una razón de compatibilidad.

## Contenido seguro

El banco actual es local y de confianza, pero el producto debe estar preparado para fuentes futuras:

- No envíes HTML no confiable directamente a `dangerouslySetInnerHTML`.
- Si las explicaciones continúan en Markdown, sanitiza el HTML resultante con una allowlist antes de renderizarlo.
- No habilites HTML arbitrario, URLs inseguras, scripts, manejadores de eventos ni estilos inline procedentes del contenido.
- Añade pruebas con payloads maliciosos cuando se introduzca la capa de sanitización.

## Accesibilidad

El objetivo mínimo es WCAG 2.2 AA.

- Todo el flujo debe poder completarse con teclado y mantener un orden de foco lógico.
- Al cambiar de pregunta o vista, mueve el foco de forma deliberada a un encabezado o contenedor adecuado; no dependas del scroll.
- Anuncia respuesta correcta/incorrecta, progreso y resultado mediante texto y regiones de estado pertinentes.
- No comuniques acierto, error o selección solo mediante verde/rojo.
- Mantén controles nativos cuando aporten semántica; no conviertas respuestas en `div` clicables.
- Define `:focus-visible` perceptible y distinto de hover y selección.
- Respeta `prefers-reduced-motion`; el confeti y la vibración son decorativos y deben omitirse cuando se solicite movimiento reducido.
- Verifica reflow a 320 CSS px, texto al 200 %, objetivos táctiles y contraste de todos los estados.
- Los iconos decorativos deben ocultarse de tecnologías de asistencia; los iconos funcionales necesitan nombre accesible.

## Diseño y CSS

- Consulta `DESIGN.md` antes de crear o modificar interfaz.
- Conserva la identidad violeta y centrada; el tema oscuro actual es la referencia de marca y no debe cambiar al incorporar otras materias.
- En el CSS, mantén los colores semánticos como `light-dark(valor-claro, valor-oscuro)` y preserva la paleta oscura actual en el segundo valor. Mientras el linter alpha no admita esa función en el frontmatter de `DESIGN.md`, documenta allí cada pareja como token oscuro y variante `-light`, además de conservar la asignación CSS normativa.
- No uses el color como diferenciador principal entre HTML, CSS u otras materias; usa el logo, el nombre y apoyos gráficos mínimos.
- Al implementar el modo claro, declara `color-scheme: light dark` en `:root`, añade el metadato equivalente antes de los estilos y permite que un control explícito establezca `color-scheme: light` o `dark` sin duplicar los tokens.
- Reutiliza tokens semánticos. Si aparece un valor repetido o con rol estable, añádelo primero a `DESIGN.md` y después al CSS.
- Usa CSS nesting nativo siempre que exista una relación clara con el selector padre; conserva `@scope` cuando corresponda y evita aumentar la especificidad innecesariamente.
- Prefiere propiedades lógicas: `inline-size`, `block-size`, `margin-inline`, `padding-block` e `inset-*`, en lugar de sus equivalentes físicos cuando expresen el mismo contrato.
- Anida las media queries dentro del selector al que afectan, junto a los estilos base y estados de ese selector. No concentres ajustes de componentes distintos en bloques responsive al final del archivo.
- Trabaja mobile-first, permite crecimiento intrínseco y evita alturas fijas en contenido o controles con texto.
- Mantén estados default, hover, active, focus-visible, selected, disabled, correct e incorrect coherentes.
- Toda modificación visual intencional debe actualizar `DESIGN.md` en el mismo cambio.

## SEO y despliegue

- El repositorio activo es `sergio-jr-dev/Code-Quiz`, privado y con historial nuevo. La carpeta local está conectada a ese historial; el antiguo se conserva en un respaldo separado y no debe mezclarse con el actual.
- `base` es `/`. En Vercel Production, `SITE_URL=https://codequiz-game.vercel.app` genera las URLs públicas durante el build. Dejar Preview sin SITE_URL: se omiten canonical y URLs sociales y se declara noindex. Volver a desplegar al cambiar la variable.
- Open Graph usa `property="og:..."`, no `name="og:..."`.
- Las URLs públicas de canonical, Open Graph e imágenes sociales deben ser absolutas.
- Verifica rutas y assets desde la raíz tanto en desarrollo como en el build de producción.
- No añadas afirmaciones de producto, niveles o materias que todavía no estén disponibles.

## Repositorio público

- Trata todo archivo versionado, historial de Git, asset, captura, log y salida de build como información potencialmente pública.
- No incluyas secretos, tokens, credenciales, archivos `.env`, claves privadas, rutas locales, datos de empresas anteriores ni datos personales innecesarios.
- No pegues valores reales de configuración en ejemplos. Usa nombres descriptivos como `YOUR_API_KEY` y documenta las variables sin sus valores.
- Antes de publicar, revisa archivos versionados y no versionados con una búsqueda de secretos y comprueba el diff completo.
- Mantén `README.md` sincronizado con lo realmente disponible. Distingue claramente funcionalidad actual, trabajo en especificación y hoja de ruta.
- Si se detecta una vulnerabilidad o secreto, no lo copies en issues públicos; usa un canal privado del repositorio y rota cualquier credencial afectada.

## Pruebas y verificación

La suite elegida es Vitest con Testing Library (`@testing-library/react`, `@testing-library/user-event` y `@testing-library/jest-dom`) sobre un entorno DOM apropiado. La suite mínima está configurada en la spec 004; la spec 003 amplía su cobertura para funcionalidades futuras. Prueba la lógica pura directamente y el comportamiento visible mediante interacciones de usuario, no mediante detalles internos del componente.

Antes de cerrar un cambio, ejecuta como mínimo:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
git diff --check
```

Además:

- ejecuta las pruebas automatizadas disponibles;
- prueba el flujo completo: iniciar, responder, avanzar, finalizar, revisar y reiniciar;
- comprueba teclado y foco;
- revisa al menos 320 px y un viewport de escritorio;
- comprueba los esquemas claro y oscuro cuando el cambio afecte a colores, assets o controles nativos;
- prueba movimiento reducido cuando haya animaciones;
- comprueba la URL construida y los metadatos si cambia SEO o despliegue;
- no dejes capturas, logs, informes ni artefactos de navegador dentro del repositorio.

No declares una tarea plenamente verificada si falta una comprobación relevante. Indica con precisión qué se validó y qué quedó pendiente.

## Límites del cambio

- Realiza el cambio mínimo coherente con la arquitectura objetivo.
- No reformatees ni refactorices archivos no relacionados.
- No sobrescribas cambios previos del usuario.
- No edites el lockfile ni añadas dependencias salvo que el cambio lo requiera.
- No mantengas código, assets o componentes sin uso; elimina residuos solo cuando su pertenencia y falta de uso estén verificadas.
- Mantén README, metadatos públicos y documentación sincronizados cuando cambie el comportamiento visible.
