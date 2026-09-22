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

## Implementation Notes

- T1 no modifica código de producción. Cierra las decisiones necesarias para diseñar los contratos persistidos en T2.
- UI SFX declara 78 cues semánticos, audio CC0 y runtime MIT. Su guía recomienda un inventario pequeño, silencio para interacciones rutinarias, feedback equivalente sin audio, desbloqueo desde un gesto y preferencias persistentes.
- La spec 003 y la spec 005 figuran como `Implemented`; no queda dependencia de secuencia abierta.

## Validation Results

- 2026-09-22: revisión documental de `spec.md`, `tasks.md`, `notes.md`, `DESIGN.md`, la persistencia v2 y los récords de la spec 005. Arquitectura de información, disponibilidad del panel, historial, eventos sonoros, estado inicial, controles, fuente/licencia y secuencia quedaron definidos. `pnpm format:check` y `git diff --check` pasan. No se ejecutaron typecheck, lint, tests ni build porque T1 solo cambia documentación de la spec.

## Deviations From Spec

- None.

## Visual Deviations

- None.
