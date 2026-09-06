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

## Implementation Notes

- Dependencias: spec 002 para datos/equidad y spec 001 para identidad pública final.

## Validation Results

- Not run.

## Deviations From Spec

- None.

## Visual Deviations

- None.
