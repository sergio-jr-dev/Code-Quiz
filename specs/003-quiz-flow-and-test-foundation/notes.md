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

## Implementation Notes

- La dependencia de datos/equidad está resuelta: la spec 002 figura como `Implemented`.
- Permanece la dependencia de la spec 001 para la identidad pública final.
- La estrategia y posible dependencia de resaltado de sintaxis se decidirán antes de implementar T4.

## Validation Results

- Not run.

## Deviations From Spec

- None.

## Visual Deviations

- None.
