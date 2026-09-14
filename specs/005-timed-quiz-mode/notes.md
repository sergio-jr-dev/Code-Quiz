# Notes

## Decisions

- La aplicación ofrecerá dos modalidades dentro del mismo flujo: normal y cronómetro.
- El modo normal será el predeterminado y ofrecerá el mismo contenido sin límite temporal.
- Los tiempos iniciales serán 60 segundos en nivel básico, 45 en intermedio y 30 en avanzado.
- Responder o agotar el tiempo detendrá la cuenta atrás. El agotamiento mostrará feedback y explicación, pero nunca avanzará automáticamente.
- Una pregunta agotada se registrará como no contestada e incorrecta, sin inventar una opción seleccionada.
- El tiempo no otorgará bonificaciones: la comprensión y el número de aciertos seguirán siendo la métrica principal.
- El cronómetro se pausará mientras la pestaña esté oculta y continuará con el tiempo restante al volver.
- No se anunciará cada segundo; se anunciarán de forma puntual los últimos diez segundos y el agotamiento.
- Resultados y mejores marcas se separarán por modalidad.
- Esta funcionalidad se desarrollará después de cerrar la spec 003 para reutilizar su flujo y persistencia sin crear una segunda aplicación.

## Implementation Notes

- Not started.

## Validation Results

- Not run.

## Deviations From Spec

- None.

## Visual Deviations

- None.
