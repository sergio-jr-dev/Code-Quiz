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
- UI SFX declara 78 cues semánticos, audio CC0 y runtime MIT. Su guía recomienda un inventario pequeño, silencio para interacciones rutinarias, feedback equivalente sin audio, desbloqueo desde un gesto y preferencias persistentes.
- La spec 003 y la spec 005 figuran como `Implemented`; no queda dependencia de secuencia abierta.
- T2 no modifica código de producción. Define el contrato que T3 puede consumir para el shell y que T5/T6 implementarán para tema y sonido sin acoplarlos al estado de la partida.
- El patrón existente de `quizPersistence.ts` —clave y versión estables, `partialize`, esquema Zod estricto, `PersistStorage` seguro y `merge` defensivo— será la referencia. La persistencia de preferencias no necesita validación contra el catálogo ni debe compartir su ciclo de fallo.

## Validation Results

- 2026-09-22: revisión documental de `spec.md`, `tasks.md`, `notes.md`, `DESIGN.md`, la persistencia v2 y los récords de la spec 005. Arquitectura de información, disponibilidad del panel, historial, eventos sonoros, estado inicial, controles, fuente/licencia y secuencia quedaron definidos. `pnpm format:check` y `git diff --check` pasan. No se ejecutaron typecheck, lint, tests ni build porque T1 solo cambia documentación de la spec.
- 2026-09-22: T2 contrastó el contrato propuesto con `quizStore.ts`, `quizPersistence.ts`, `quizRecords.ts`, `index.html`, `main.tsx`, `main.css` y `DESIGN.md`. Quedaron definidos clave, versión, esquema, valores iniciales, estado no persistido, validación, recuperación, migraciones futuras, bootstrap de tema y consumo no duplicado de marcas v2. `pnpm format:check` y `git diff --check` pasan. No se ejecutaron typecheck, lint, tests ni build porque T2 solo cambia documentación de la spec.

## Deviations From Spec

- None.

## Visual Deviations

- None.
