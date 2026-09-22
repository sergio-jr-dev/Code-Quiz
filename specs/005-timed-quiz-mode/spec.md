# Timed quiz mode

**Status:** Implemented

## Goal

Añadir una modalidad opcional con tiempo limitado por pregunta que aporte tensión y variedad sin sustituir la experiencia educativa normal ni convertir la velocidad en el objetivo principal del producto.

## Context

La spec 003 incorpora el menú de configuración, las partidas de diez preguntas, el flujo completo, los resultados, la persistencia y la base accesible del quiz. Esta spec se implementará después de su cierre y ampliará una sola aplicación con dos modalidades: normal y cronómetro.

El modo normal seguirá ofreciendo las mismas preguntas y resultados sin límite temporal. El modo cronómetro aplicará un tiempo por pregunta que disminuirá al aumentar la dificultad y tratará el tiempo agotado como una respuesta no contestada, mostrando feedback antes de que el usuario decida avanzar.

## Requirements

- REQ-1: El menú permitirá elegir entre modo normal y modo cronómetro antes de comenzar una partida; el modo normal estará seleccionado inicialmente.
- REQ-2: Ambos modos usarán el mismo banco, filtros, tamaño de partida y reglas de equidad; ninguna pregunta o categoría estará disponible exclusivamente en el modo cronómetro.
- REQ-3: El modo cronómetro asignará inicialmente 60 segundos por pregunta básica, 45 por pregunta intermedia y 30 por pregunta avanzada.
- REQ-4: El tiempo comenzará cuando la nueva pregunta se presente como contexto activo y se reiniciará con la duración correspondiente al avanzar a la siguiente pregunta.
- REQ-5: La interfaz mostrará el tiempo restante mediante texto y un indicador visual sincronizados; el estado y la proximidad del final no dependerán solo del color, el movimiento o la forma del indicador.
- REQ-6: Al seleccionar una respuesta, el cronómetro se detendrá inmediatamente y el flujo normal de corrección, feedback, explicación y avance permanecerá bajo control del usuario.
- REQ-7: Al agotarse el tiempo sin respuesta, la pregunta quedará registrada como «Sin responder · Tiempo agotado», se mostrará la respuesta correcta y su explicación, y la aplicación no avanzará automáticamente.
- REQ-8: Una pregunta agotada contará como incorrecta para el total de aciertos, pero no se concederán puntos adicionales ni bonificaciones por responder más rápido.
- REQ-9: Al ocultar la pestaña o el documento, el cronómetro se pausará; al volver, continuará desde el tiempo restante sin reiniciarse ni consumir el intervalo oculto.
- REQ-10: Reiniciar, repetir una configuración, repetir fallos o comenzar otra partida limpiará todo estado temporal anterior. Las repeticiones conservarán la modalidad elegida hasta que el usuario la cambie desde el menú.
- REQ-11: El modo normal no creará, mostrará ni aplicará estado temporal y conservará el comportamiento resultante de la spec 003.
- REQ-12: Resultados y revisión distinguirán una respuesta incorrecta elegida de una pregunta no contestada por tiempo agotado.
- REQ-13: Los mejores resultados y cualquier resumen persistido se separarán por modalidad; un resultado normal no competirá ni sobrescribirá uno cronometrado equivalente, y los datos anteriores continuarán interpretándose como modo normal.
- REQ-14: Antes de iniciar el modo cronómetro se explicarán sus límites y permanecerá disponible la alternativa normal equivalente sin penalización ni contenido exclusivo.
- REQ-15: La cuenta atrás no producirá anuncios de lector de pantalla cada segundo. Se anunciará de forma puntual la entrada en los últimos diez segundos y el agotamiento del tiempo, sin interrumpir la lectura de la pregunta.
- REQ-16: Con movimiento reducido, el indicador conservará su valor y cambios de estado sin animaciones decorativas, pulsos, escalados o transiciones continuas.
- REQ-17: Las transiciones del temporizador, el cálculo del tiempo restante y la expiración serán deterministas y comprobables con un reloj inyectable, sin depender de detalles internos de React.
- REQ-18: Si se recarga la aplicación durante una partida cronometrada, la ronda en curso se descartará y se volverá al menú con materia, nivel y modalidad conservados. La recarga no registrará un resultado ni devolverá al mazo las preguntas ya consumidas.

## Design Requirements

- Seguir `DESIGN.md` y conservar la tarjeta protagonista, la identidad violeta y los mismos tokens adaptativos de los dos esquemas.
- Presentar la modalidad como una decisión de configuración clara, no como una aplicación, materia o paleta diferente.
- Integrar el indicador temporal junto al progreso de la pregunta sin competir con el enunciado ni reducir el espacio disponible para leer código.
- Mantener siempre visible un texto equivalente a «Tiempo restante: N s»; cualquier barra, anillo o cambio cromático será apoyo secundario.
- Diferenciar los estados en curso, detenido tras responder y agotado mediante texto además del tratamiento visual.
- Verificar 320 CSS px, texto ampliado, claro/oscuro, `forced-colors`, navegación por teclado y movimiento reducido.
- Documentar en `DESIGN.md` los patrones reutilizables del selector de modalidad, el indicador temporal y el estado agotado antes de cerrar la spec.

## Acceptance Criteria

- [x] AC-1: Desde el menú puede iniciarse la misma configuración en modo normal o cronómetro, con normal seleccionado inicialmente. [REQ-1, REQ-2]
- [x] AC-2: Una pregunta básica comienza con 60 segundos, una intermedia con 45 y una avanzada con 30. [REQ-3, REQ-4]
- [x] AC-3: El texto y el indicador visual muestran el mismo tiempo restante desde el inicio hasta la detención o expiración. [REQ-5]
- [x] AC-4: Responder detiene el tiempo y permite consultar feedback y explicación antes de avanzar manualmente. [REQ-6]
- [x] AC-5: Al agotarse el tiempo se registra una respuesta no contestada, se revela la solución y no cambia la pregunta sin una acción del usuario. [REQ-7, REQ-8]
- [x] AC-6: Ocultar la pestaña durante un intervalo controlado no reduce el tiempo restante y volver a mostrarla tampoco lo reinicia. [REQ-9]
- [x] AC-7: Toda nueva partida o repetición empieza con un estado temporal limpio y conserva la modalidad esperada. [REQ-10]
- [x] AC-8: El modo normal completa una partida sin temporizador ni regresiones respecto al flujo de la spec 003. [REQ-11]
- [x] AC-9: Resultados y revisión identifican correctamente respuestas elegidas, aciertos y preguntas agotadas. [REQ-8, REQ-12]
- [x] AC-10: La persistencia separa los resultados por modalidad y migra datos previos como resultados normales válidos. [REQ-13]
- [x] AC-11: El usuario conoce el límite antes de empezar y puede escoger el modo normal con el mismo contenido y sin penalización. [REQ-14]
- [x] AC-12: Un lector de pantalla no recibe anuncios por segundo y sí recibe avisos comprensibles al entrar en los últimos diez segundos y al agotarse el tiempo. [REQ-15]
- [x] AC-13: El indicador sigue siendo comprensible sin color y no ejecuta animaciones decorativas con `prefers-reduced-motion: reduce`. [REQ-5, REQ-16]
- [x] AC-14: Las pruebas con reloj falso cubren inicio, avance, respuesta, expiración, pausa por visibilidad, reinicio y ausencia de temporizador en modo normal. [REQ-4, REQ-6–REQ-11, REQ-17]
- [x] AC-15: No hay pérdida de contenido o controles a 320 CSS px, con texto ampliado, claro/oscuro o `forced-colors`. [Design Requirements]
- [x] AC-16: `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `git diff --check` pasan, salvo fallos previos explícitamente separados.
- [x] AC-17: Recargar durante una partida cronometrada vuelve al menú sin resultado parcial, conserva la configuración y modalidad elegidas y mantiene el avance previo del mazo. [REQ-18]

## Out Of Scope

- Rankings, multijugador, competición remota o sincronización con un servidor.
- Bonificaciones de puntuación por rapidez, rachas, logros o recompensas exclusivas.
- Duraciones personalizadas, dificultad adaptativa o tiempos distintos por tema, longitud o tipo de contenido.
- Avance automático al expirar, modo de preguntas rápidas o eliminación inmediata de la explicación.
- Sonidos, música, vibraciones o notificaciones del sistema asociadas a la cuenta atrás.
- Sustituir o duplicar el banco de preguntas para esta modalidad.

## Technical Notes

- Implementar esta spec después de que la spec 003 figure como `Implemented`; reutilizar su configuración, ronda, navegación, resultados y persistencia en lugar de crear un flujo paralelo.
- Añadir una modalidad de dominio equivalente a `normal | timed` y representar el tiempo agotado de forma explícita; no usar un ID de opción ficticio para una pregunta no contestada.
- Mantener en Zustand solo el estado temporal de dominio necesario. El intervalo, `visibilitychange`, los anuncios y el refresco visual pertenecen a hooks o componentes de interfaz.
- Calcular el tiempo restante desde una referencia temporal en lugar de restar un segundo por tick, para evitar deriva. Las transiciones puras recibirán el tiempo o reloj necesario durante las pruebas.
- No actualizar ni anunciar el store global con mayor frecuencia de la necesaria; el render visual por segundo puede derivarse en la capa de interfaz y la expiración debe convertirse en una acción de dominio única.
- Pausar y reanudar mediante la Page Visibility API, limpiando listeners y tareas programadas al responder, expirar, cambiar de pregunta, cambiar de vista o desmontar el componente.
- Tratar el modo normal con el mismo contenido y sin penalización como la alternativa sin límite temporal requerida por [WCAG 2.2, criterio 2.2.1](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html); la elección debe estar disponible antes de encontrar el límite.
- Ampliar la versión y validación de los datos persistidos de la spec 003. Nunca confiar en tiempos, estados o IDs recuperados sin validarlos frente a la configuración y ronda vigentes.
- Al rehidratar una vista `playing` en modo cronómetro, aplicar la misma semántica de abandono seguro que al salir de una ronda: limpiar ronda, índice, respuestas y estado temporal; conservar configuración, modalidad, mazos, rotación mixta y récords. No persistir una marca temporal para intentar reconstruir la cuenta atrás.
- Añadir temporizadores falsos y simulación de visibilidad al setup o a las pruebas solo cuando esta spec los necesite.
- Mantener cada componente React en su propio archivo y extraer la coordinación temporal a un custom hook cuando su ciclo de vida adquiera entidad propia.

## Risks Or Open Questions

- Los valores iniciales 60/45/30 se confirmaron contra ejemplos cortos, medianos y largos de las 180 preguntas vigentes. Deben reevaluarse con evidencia de uso real si el modo resulta frustrante, sin introducir ajuste por longitud dentro de esta spec.
- La sincronización entre reloj, `visibilitychange`, respuesta y expiración puede producir carreras; las transiciones deben ser idempotentes y cubrir eventos simultáneos.
