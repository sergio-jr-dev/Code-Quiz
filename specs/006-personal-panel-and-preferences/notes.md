# Notes

## Decisions

- El panel se llamará «Mi Code Quiz» y agrupará dos secciones compactas: mejores marcas y preferencias. No adoptará una composición de dashboard con tarjetas independientes.
- El disparador formará parte de la superficie global y estará disponible en el menú, los resultados y la revisión. Se ocultará durante una pregunta activa para que cerrar el panel no se confunda con abandonar o pausar la ronda.
- En viewports amplios el panel será una superficie lateral superpuesta que no reduzca el quiz. En viewports estrechos ocupará el ancho disponible como diálogo modal, con scroll interno si fuese necesario, cierre siempre accesible, contención de foco y restauración al disparador.
- Las mejores marcas serán el único resumen personal persistido. Se presentarán por modalidad y, dentro de cada modalidad, por materia y nivel; no se guardará historial de partidas en esta spec.
- La spec 005 ya implementó la separación de récords entre modo normal y cronómetro y la migración de datos anteriores como normales. La spec 006 reutilizará ese contrato v2 y se implementará sobre la spec 005 cerrada.
- La fuente inicial de sonidos será UI SFX, cuyos assets de audio se publican con licencia CC0. Se usará el pack `soft` por su carácter breve, cálido y poco intrusivo.
- El inventario sonoro inicial queda limitado a `success` para una respuesta correcta, `error` para una respuesta incorrecta, `warning` para tiempo agotado y `complete` al completar una partida configurada. Las repeticiones de fallos usarán los mismos cues de respuesta, pero no dispararán `complete` como si generasen una nueva marca.
- No habrá sonidos de hover, foco, pulsación, apertura/cierre del panel, avance de pregunta, ticks del cronómetro ni aviso sonoro de los últimos diez segundos.
- El sonido comenzará silenciado. Solo podrá reproducirse después de que el usuario lo active deliberadamente; la preferencia se conservará entre sesiones.
- La primera versión tendrá un interruptor, sin selector de pack ni control de volumen. Los cues compartirán un volumen interno fijo y bajo, que se ajustará en contexto durante T6.
- Se copiarán al proyecto solo los assets necesarios y se conservará su procedencia. No se añadirá el runtime de UI SFX mientras las APIs nativas cubran reproducción, desbloqueo y concurrencia.
- Todo evento sonoro conservará el feedback visual y textual existente y se disparará por una transición semántica única, nunca por un render.
- Las preferencias usarán un store Zustand independiente, `preferencesStore`, con su propia persistencia. El `quizStore` seguirá siendo la única fuente de configuración, partida, progreso y mejores marcas.
- La clave estable será `code-quiz:preferences` y la versión inicial será `1`. No existe una clave de preferencias anterior que migrar.
- El contrato persistido v1 guardará exclusivamente `theme: 'auto' | 'light' | 'dark'` y `soundEnabled: boolean`. Sus valores iniciales serán `theme: 'auto'` y `soundEnabled: false`.
- `auto` representa la preferencia del sistema y no un tema resuelto. Claro/oscuro efectivo, hidratación, panel abierto, audio desbloqueado, instancias de audio y cualquier error de reproducción serán datos derivados o efímeros y no se persistirán.
- Las acciones públicas del store serán setters explícitos equivalentes a `setTheme(theme)` y `setSoundEnabled(enabled)`. La UI podrá derivar un toggle sin almacenar un segundo booleano inverso.
- La persistencia usará un esquema Zod estricto tanto para el contenedor de Zustand como para el estado v1, `partialize` para excluir acciones y estado efímero, y un adaptador seguro ante `localStorage` ausente, bloqueado o sin cuota.
- Un JSON corrupto, un contenedor incompleto, un enum o booleano inválido, campos extra y versiones desconocidas se descartarán por completo. La aplicación continuará en memoria con `auto` y sonido desactivado sin borrar ni invalidar `code-quiz:quiz-state`.
- Las migraciones de preferencias serán incrementales: cada nueva versión conservará el esquema de la versión anterior, validará antes de transformar, migrará paso a paso hasta la versión vigente y validará el resultado final. Una versión futura desconocida nunca se convertirá por suposición.
- El bootstrap de tema previo al primer pintado leerá defensivamente `code-quiz:preferences` y solo aceptará el contenedor v1 y los tres valores de `theme`. Aplicará `data-theme="light"` o `data-theme="dark"` a `<html>`; para `auto` o cualquier dato inválido eliminará el atributo. El store realizará después la validación autoritativa completa.
- `:root` declarará `color-scheme: light dark`; los selectores `:root[data-theme='light']` y `:root[data-theme='dark']` fijarán el esquema explícito. No se persistirá ni duplicará `resolvedTheme`.
- Las mejores marcas continuarán exclusivamente en `quizStore.bestResults` y `code-quiz:quiz-state` v2. El panel seleccionará ese objeto mediante un selector estrecho y derivará la presentación fuera del store.
- La lectura de una marca recibirá explícitamente `bestResults`, `{ subject, level }` y `mode`, y reutilizará `quizConfigurationKey`. Las claves normales conservarán `subject:level` por compatibilidad y las cronometradas `subject:level:timed`; la UI no parseará strings para reconstruir dominio.
- El panel derivará la matriz de modalidades, materias y niveles a partir de las constantes de dominio y representará una entrada ausente como «Sin marca». Esa matriz, sus agrupaciones y totales no se guardarán en ningún store.
- La migración v1 → v2 de `quizStore` ya interpreta todas las marcas anteriores como normales. La spec 006 no reescribirá esa migración ni moverá récords entre claves.

## Persisted Contracts

```ts
type ThemePreference = 'auto' | 'light' | 'dark';

interface PreferencesState {
  theme: ThemePreference;
  soundEnabled: boolean;
}

interface PreferencesActions {
  setTheme: (theme: ThemePreference) => void;
  setSoundEnabled: (enabled: boolean) => void;
}

type PreferencesStore = PreferencesState & PreferencesActions;

interface PersistedPreferencesV1 {
  theme: ThemePreference;
  soundEnabled: boolean;
}
```

El valor serializado bajo `code-quiz:preferences` tendrá exactamente este envoltorio de Zustand:

```json
{
  "state": {
    "theme": "auto",
    "soundEnabled": false
  },
  "version": 1
}
```

El acceso a una marca se diseña con una firma pura equivalente a:

```ts
selectBestResultForConfiguration(
  bestResults: QuizBestResults,
  configuration: QuizConfiguration,
  mode: QuizMode,
): number | undefined;
```

La función delegará la construcción de la clave en `quizConfigurationKey(configuration, mode)`. No recibirá el store completo ni producirá una copia persistible de la matriz.

## Implementation Notes

- T1 no modifica código de producción. Cierra las decisiones necesarias para diseñar los contratos persistidos en T2.
- T5 incorpora el selector nativo de tema en Preferencias y el store persistente v1 independiente del quiz. Un script síncrono en `<head>` aplica la selección antes de los estilos y React; `auto` sigue el sistema. `color-scheme` y los tokens `light-dark()` gobiernan colores y controles nativos. Se selecciona el logo correspondiente al esquema y se atenúa el fondo vectorial en claro. Una transición CSS temporal de `280ms` solo se activa tras una elección del usuario, y se omite con movimiento reducido o colores forzados. El orden de importación de `main.css` se adelanta para que la declaración de capas preceda a las hojas de componentes.
- Ajuste visual de T5 solicitado por el usuario: el tema pasa de tres opciones con texto a una barra segmentada de tres iconos, en orden claro, oscuro y automático, con la opción activa realzada. Los rótulos se ocultan solo visualmente; se conservan radios, nombres accesibles, foco y navegación con flechas. La barra se alinea al inicio y limita su ancho a `15rem` para no ocupar toda la sección.
- T4 presenta las 24 combinaciones derivadas de las constantes de materia, nivel y modalidad, sin guardar matrices ni alterar el esquema v2. `selectBestResultForConfiguration` recibe el objeto de marcas y una combinación explícita, reutiliza `quizConfigurationKey` y conserva `0 de 10` como marca válida. El panel usa encabezados por modalidad y materia y listas de descripción por nivel; las ausencias aparecen como «Sin marca».
- Ajuste visual de T4 solicitado por el usuario: Preferencias se coloca antes de las marcas para quedar a la vista al abrir; la barra de scroll se hace fina. Las marcas reutilizan los assets decorativos de modalidad, materia y nivel ya presentes en el menú, con texto visible y sin nombres accesibles duplicados. Las bandas de modalidad emplean `control-surface` y no se añaden tarjetas por marca.
- UI SFX declara 78 cues semánticos, audio CC0 y runtime MIT. Su guía recomienda un inventario pequeño, silencio para interacciones rutinarias, feedback equivalente sin audio, desbloqueo desde un gesto y preferencias persistentes.
- La spec 003 y la spec 005 figuran como `Implemented`; no queda dependencia de secuencia abierta.
- T2 no modifica código de producción. Define el contrato que T3 puede consumir para el shell y que T5/T6 implementarán para tema y sonido sin acoplarlos al estado de la partida.
- El patrón existente de `quizPersistence.ts` —clave y versión estables, `partialize`, esquema Zod estricto, `PersistStorage` seguro y `merge` defensivo— será la referencia. La persistencia de preferencias no necesita validación contra el catálogo ni debe compartir su ciclo de fallo.
- T3 incorpora «Mi Code Quiz» en la cabecera para menú, puntuación y revisión. El disparador se desmonta durante la partida. El diálogo modal nativo aporta Escape y aislamiento del fondo; un ciclo explícito de Tab mantiene el foco dentro incluso cuando «Cerrar» es el único control. «Cerrar» recibe el foco inicial y el evento de cierre lo restaura al disparador. Las secciones de marcas y preferencias muestran avisos explícitos de disponibilidad hasta T4, T5 y T6.
- Ajuste visual de T3 solicitado tras la primera revisión: el disparador pasa a ser un icono fijo arriba a la derecha con etiqueta en hover/foco, y el cierre también queda como icono con nombre accesible. El panel conserva su apertura lateral, suma separación respecto al viewport, sombra en tres lados y transición reversible. Se elimina `scrollbar-gutter: stable` del documento para evitar la franja vacía visible a la derecha.
- Segunda revisión visual de T3: el disparador recupera el texto «Mi Code Quiz» en escritorio y mantiene solo el icono hasta `48rem`; se elimina la etiqueta emergente. El diálogo conserva margen y sombra completa en escritorio y ocupa todo el viewport en móvil. El cierre reduce su padding a `0.25rem` y su objetivo a `36px`, todavía por encima del mínimo de WCAG 2.2 AA.
- La cabecera del panel centra verticalmente «Mi Code Quiz» respecto al icono de cierre, también cuando el título se adapta a un viewport estrecho.
- El fondo del diálogo deja de usar la superficie azul `primary`: se compone con el token carbón `canvas` y dos halos violetas suaves mediante gradientes CSS. No añade un archivo de imagen ni duplica la textura del fondo general; se adapta al panel lateral y a la variante móvil de pantalla completa.
- Por petición posterior del usuario, el acceso «Mi Code Quiz» iguala el padding de «Apoyar el proyecto» (`0.5rem 0.75rem`) y prescinde de sombra. Los gradientes del panel se elevan a `--content-surface-background` y se comparten con menú, partida, puntuación, revisión, diálogo de salida y barra de revisión; en `forced-colors` se suprimen. Los colores semánticos de respuestas y feedback permanecen diferenciados.
- Revisión visual posterior: `--card-shadow` combina un halo violeta alrededor y una capa oscura de profundidad para menú, partida normal, resultados, revisión, barra de revisión y diálogos. El modal de salida prescinde del borde en condiciones normales y lo recupera en `forced-colors`. El fondo general usa una nueva versión WebP más nítida que mantiene la composición técnica original; el asset anterior se retira cuando deja de tener referencias.
- Ajuste final a partir de la revisión en pantalla: el fondo superpone una zona central de `canvas` sólido sobre el WebP, con transición hacia los motivos de los bordes; en móvil, la transición preserva los motivos del lado visible. La sombra compartida añade un contorno fino basado en `progress`, además del halo violeta y la capa de profundidad, para separar superficies del fondo oscuro sin modificar el tamaño de las tarjetas.
- Tras la siguiente revisión, se reduce `--card-shadow`: el contorno baja de 65 % a 45 %, el halo de `1.5rem` con expansión a `0.5rem` sin expansión y la capa oscura de `2rem` a `0.75rem`. Mantiene la separación sin extender el resplandor tanto sobre el fondo.
- El fondo se rehace de cero como `game-background.svg` transparente: base `canvas` sólida, centro vacío y motivos vectoriales discretos en los extremos. Se eliminan el WebP derivado y los gradientes CSS que intentaban ocultar su textura; la composición móvil alinea el SVG al inicio.

## Validation Results

- 2026-09-23, ajuste visual de T5 — Checks run: `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (38 archivos, 220 pruebas), `pnpm build` y `git diff --check`. Passing checks: todos pasan. En navegador se revisó la barra compacta en claro y oscuro y el cambio entre opciones mediante teclado. Unresolved risks: la revisión de reflow a 320 CSS px, texto ampliado y `forced-colors` queda en T8.
- 2026-09-23, T5 — Checks run: `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (38 archivos, 220 pruebas), `pnpm build` y `git diff --check`. Passing checks: todos pasan. En navegador se revisaron menú, panel, pregunta, feedback, puntuación y revisión en claro; también el menú y panel en oscuro y automático. El cambio explícito mostró la transición CSS y la recarga conservó el tema oscuro y el logo correspondiente. Las pruebas cubren preferencias v1 válidas e inválidas, almacenamiento bloqueado, bootstrap previo a los estilos, cambio manual y las excepciones de movimiento reducido y colores forzados. Unresolved risks: faltan comprobaciones visuales a 320 CSS px, texto ampliado y `forced-colors`; se harán en T8 junto con la validación del sonido de T6.
- 2026-09-23, ajuste visual de T4 — Checks run: `pnpm test` (35 archivos, 204 pruebas), `pnpm typecheck`, `pnpm lint`, `pnpm build`, `git diff --check`, formato específico de los archivos del panel y revisión del panel en navegador de escritorio. Passing checks: todos los anteriores pasan; Preferencias aparece antes de Mejores marcas, las imágenes decorativas no duplican nombres accesibles, los iconos y el scroll fino se ven en el panel. Failing checks: `pnpm format:check` solo señala `src/components/menu/menu.css`, que permanece sin modificar. Unresolved risks: la nueva composición a 320 CSS px y texto ampliado sigue pendiente de la validación de T8.
- 2026-09-23, T4 — Checks run: `pnpm test` (35 archivos, 204 pruebas), `pnpm typecheck`, `pnpm lint`, `pnpm build`, `git diff --check` y revisión visual del panel en escritorio, incluido cierre con Escape y foco restaurado. Passing checks: todos esos comandos pasan; las pruebas cubren modalidades separadas, las 24 combinaciones, la ausencia de marca y el resultado cero. Failing checks: `pnpm format:check` falla únicamente por `src/components/menu/menu.css`, archivo sin cambios en este trabajo; los archivos modificados se formatearon. Unresolved risks: falta comprobar la nueva lista a 320 CSS px y con texto ampliado porque el navegador disponible no expuso ajuste de viewport; `forced-colors`, tema y sonido permanecen para T8 tras T5/T6.
- 2026-09-22: revisión documental de `spec.md`, `tasks.md`, `notes.md`, `DESIGN.md`, la persistencia v2 y los récords de la spec 005. Arquitectura de información, disponibilidad del panel, historial, eventos sonoros, estado inicial, controles, fuente/licencia y secuencia quedaron definidos. `pnpm format:check` y `git diff --check` pasan. No se ejecutaron typecheck, lint, tests ni build porque T1 solo cambia documentación de la spec.
- 2026-09-22: T2 contrastó el contrato propuesto con `quizStore.ts`, `quizPersistence.ts`, `quizRecords.ts`, `index.html`, `main.tsx`, `main.css` y `DESIGN.md`. Quedaron definidos clave, versión, esquema, valores iniciales, estado no persistido, validación, recuperación, migraciones futuras, bootstrap de tema y consumo no duplicado de marcas v2. `pnpm format:check` y `git diff --check` pasan. No se ejecutaron typecheck, lint, tests ni build porque T2 solo cambia documentación de la spec.
- 2026-09-22: T3 pasó `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (35 archivos, 196 pruebas), `pnpm build` y `git diff --check`. En navegador se verificaron el panel lateral de escritorio y el diálogo a 320 × 700 CSS px (sin overflow horizontal), foco inicial en «Cerrar», ciclo de Tab, cierre con Escape y restauración al disparador. La prueba de componentes cubre disponibilidad en menú, puntuación y revisión, apertura/cierre por teclado y ausencia durante la partida. Zoom 400 %, `forced-colors` y los estados de tema quedan para la validación conjunta de T8 tras implementar T5/T6.
- 2026-09-22: tras la revisión visual del usuario, se repitieron `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (35 archivos, 196 pruebas), `pnpm build` y `git diff --check`: todos pasan. Brave en escritorio muestra el acceso fijo lejos del logo y el panel con separación y sombra; a 320 y 360 CSS px el logo y el icono no se solapan, el diálogo mantiene márgenes y cierre visibles, y no hay overflow horizontal. El scroll conserva su barra solo cuando el contenido la necesita; ya no se reserva una franja permanente. La animación de entrada y salida y la variante sin movimiento se definen en CSS, pero no se cronometraron visualmente ni se verificó aún `forced-colors`.
- 2026-09-22: la segunda revisión visual confirmó en Brave el disparador con icono y texto y la sombra de cuatro lados en escritorio. A 320 × 700 CSS px, el texto del disparador se oculta, el diálogo mide toda el área de contenido visible (`309 × 700` con `11px` de barra nativa), el cierre tiene `4px` de padding y no hay overflow horizontal. El título y el cierre comparten centro vertical (34px en la revisión móvil). Pasan `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (35 archivos, 196 pruebas), `pnpm build` y `git diff --check`.
- 2026-09-22: el nuevo fondo carbón con halos violetas se revisó en Brave a tamaño de escritorio y en el navegador a 320 × 700 CSS px; texto, separadores y cierre permanecen legibles. Pasan `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (35 archivos, 196 pruebas), `pnpm build` y `git diff --check`.
- 2026-09-22: la revisión de superficies y fondo verificó en el navegador la partida y el diálogo de salida a tamaño de escritorio, con sombra alrededor y sin borde normal en el modal; a 320 CSS px el documento mide 309 px con la barra nativa y no desborda. El nuevo WebP mide 1672 × 941 y 37 KB frente a los 13 KB del anterior, con trazos mejor definidos. Pasan `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (35 archivos, 196 pruebas), `pnpm build` y `git diff --check`. La apariencia de `forced-colors` aún requiere revisión visual en T8.
- 2026-09-22: tras detectar todavía textura en el centro y poca separación entre superficies, se comprobó visualmente el menú, la partida, el diálogo de salida y el panel lateral en escritorio. El área central del body usa `canvas` sólido y conserva los motivos laterales; el contorno y halo compartidos distinguen las cuatro superficies del fondo. A 320 × 700 CSS px el diálogo de salida mantiene 277 px de ancho y el documento no desborda (`309px` de ancho con barra nativa). Pasan `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (35 archivos, 196 pruebas), `pnpm build` y `git diff --check`.
- 2026-09-22: se revisó en el navegador la sombra más compacta del menú sobre el fondo sólido. El contorno permanece visible y el halo ya no se extiende ampliamente. Pasan `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (35 archivos, 196 pruebas), `pnpm build` y `git diff --check`.
- 2026-09-22: el fondo vectorial nuevo se revisó con el menú en escritorio y a 320 × 700 CSS px. El centro permanece sólido, los motivos quedan en los laterales y no hay overflow horizontal (`309px` de documento con barra nativa). `xmllint --noout` valida el SVG. Pasan `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test` (35 archivos, 196 pruebas), `pnpm build` y `git diff --check`.

## Deviations From Spec

- None.

## Visual Deviations

- None.
