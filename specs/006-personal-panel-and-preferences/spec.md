# Personal panel and preferences

**Status:** In progress

## Goal

Crear un espacio personal local de Code Quiz que reúna mejores marcas y preferencias de experiencia sin convertir la aplicación en un dashboard ni exigir cuenta, backend o sincronización remota.

## Context

La spec 003 persiste la configuración, la partida en curso, los mazos y una mejor marca por combinación de materia y nivel. La spec 005 incorporó los modos normal y cronómetro y separó sus resultados. El producto también prevé un tema claro completo y efectos sonoros configurables, pero todavía no existe una superficie común para consultar o cambiar estas preferencias.

La spec 005 ya está implementada y separa los resultados normales y cronometrados. Esta primera versión del panel se limitará a mejores marcas y preferencias: no guardará un historial de partidas.

## Requirements

- REQ-1: La aplicación ofrecerá un acceso estable a un panel personal identificado como «Mi Code Quiz» desde el menú, los resultados y la revisión. El acceso no se mostrará mientras haya una pregunta activa.
- REQ-2: En viewports amplios el panel podrá presentarse como una superficie lateral; en viewports estrechos deberá adaptarse sin reducir el contenido principal ni producir desbordamiento horizontal.
- REQ-3: El panel mostrará las mejores marcas locales por modalidad, materia y nivel. El modo normal y el modo cronómetro nunca competirán por el mismo récord.
- REQ-4: La aplicación permitirá elegir tema automático, claro u oscuro y conservará la preferencia entre sesiones sin mostrar un tema parcial durante la carga.
- REQ-5: Se incorporarán efectos sonoros breves para respuesta correcta, respuesta incorrecta, tiempo agotado y final de partida, con un control persistente para activarlos o silenciarlos; comenzarán silenciados y no se reproducirá audio antes de que el usuario los active mediante una interacción deliberada.
- REQ-6: Resultados y preferencias continuarán funcionando sin conexión y se guardarán localmente mediante esquemas versionados y validados.
- REQ-7: El estado de preferencias estará separado del estado de ejecución de la partida. Los valores derivados para presentar marcas o agrupaciones no se duplicarán en el store.
- REQ-8: El panel será operable con teclado, gestionará apertura, cierre y restauración de foco, tendrá nombres accesibles y no dependerá del color, iconos o sonido para comunicar información.
- REQ-9: El tema y el sonido respetarán las preferencias del sistema aplicables, `forced-colors`, movimiento reducido y las alternativas visuales o textuales existentes.
- REQ-10: Los datos anteriores a la modalidad cronometrada continuarán interpretándose como marcas del modo normal mediante una migración explícita.

## Design Requirements

- Seguir `DESIGN.md` y conservar la tarjeta protagonista y la identidad violeta; el panel será una utilidad secundaria, no una segunda aplicación compitiendo con el quiz.
- Evitar una colección genérica de tarjetas de dashboard. Mejores marcas, preferencias visuales y sonido deben formar secciones reconocibles con una jerarquía compacta.
- En móvil, texto ampliado y 320 CSS px, la superficie debe permitir lectura y cierre sin ocultar acciones ni atrapar el foco.
- El tema claro se implementará como sistema completo de tokens, controles nativos, assets y metadatos; no como excepciones aisladas por componente.
- El sonido será complementario: cada evento conservará feedback visual y textual equivalente.

## Acceptance Criteria

- [ ] AC-1: El panel se abre y cierra con puntero y teclado, mantiene un nombre accesible y devuelve el foco al disparador. [REQ-1, REQ-2, REQ-8]
- [ ] AC-2: Las mejores marcas se consultan por modo, materia y nivel y los datos anteriores aparecen bajo el modo normal. [REQ-3, REQ-10]
- [ ] AC-3: La selección automática, clara u oscura se aplica sin destello de tema incorrecto y persiste tras recargar. [REQ-4, REQ-6]
- [ ] AC-4: El usuario puede silenciar y reactivar los efectos; la preferencia persiste y no existe reproducción previa a su primera interacción. [REQ-5, REQ-6]
- [ ] AC-5: Desactivar el sonido no elimina ningún feedback necesario para responder, revisar o interpretar resultados. [REQ-5, REQ-9]
- [ ] AC-6: Preferencias y ejecución del quiz mantienen contratos de estado separados y sus datos persistidos inválidos se ignoran de forma segura. [REQ-6, REQ-7]
- [ ] AC-7: No hay pérdida de contenido, controles o foco a 320 CSS px, 400 % de zoom, claro/oscuro, movimiento reducido o `forced-colors`. [REQ-8, REQ-9]
- [ ] AC-8: Las pruebas cubren migración, persistencia, marcas por modalidad, teclado, foco, tema y sonido; pasan los checks completos del repositorio. [REQ-3–REQ-10]

## Out Of Scope

- Autenticación, perfiles remotos, sincronización entre dispositivos o backend.
- Rankings globales, comparación con otros usuarios, logros o gamificación adicional.
- Música de fondo, reproducción automática continua o notificaciones del sistema.
- Ecualización, selección de paquetes de sonidos o controles avanzados de audio en la primera iteración.
- Guardar un historial de partidas, tanto acotado como ilimitado, en `localStorage`.

## Technical Notes

- La spec 003 y la spec 005 ya están implementadas. Reutilizar el esquema v2 que separa las mejores marcas normales y cronometradas, sin duplicar ni volver a migrar ese estado.
- Crear un store de preferencias separado del store de dominio del quiz, persistido bajo `code-quiz:preferences` con versión propia. Reutilizar Zustand `persist`, Zod y la recuperación segura ya adoptada, sin crear un ciclo manual equivalente.
- Persistir solo `theme: 'auto' | 'light' | 'dark'` y `soundEnabled: boolean`. Los valores iniciales serán `auto` y `false`; el tema efectivo, la hidratación, el desbloqueo del audio y la apertura del panel no formarán parte del contrato persistido.
- Validar estrictamente el contenedor y el estado al leer y escribir. Un valor ausente, corrupto, incompleto, con campos adicionales o con una versión desconocida recuperará las preferencias iniciales sin afectar al `quizStore`.
- Para evitar el destello inicial, un bootstrap previo al primer pintado podrá leer de forma defensiva la misma clave y aplicar `data-theme="light"` o `data-theme="dark"` al elemento raíz. `auto` no fijará el atributo y conservará `color-scheme: light dark`; el store validará después el contrato completo.
- Mantener las mejores marcas como único resumen duradero; no crear un modelo de intentos o historial.
- Consumir `bestResults` directamente desde el `quizStore` mediante una función pura que reciba modalidad, materia y nivel y reutilice `quizConfigurationKey`. No interpretar claves arbitrarias ni copiar agrupaciones o matrices derivadas al store de preferencias.
- Usar inicialmente los one-shots `success`, `error`, `warning` y `complete` del pack `soft` de UI SFX. Sus assets de audio son CC0. Incorporar solo los archivos necesarios como assets locales y conservar su procedencia en la documentación; no añadir el runtime de UI SFX si `HTMLAudioElement` o la Web Audio API nativa cubren el contrato.
- Mantener un volumen interno fijo, bajo y coherente; la primera versión solo ofrecerá activación/silencio. No sonorizar hover, pulsaciones rutinarias, navegación del panel, cada segundo del cronómetro ni el aviso de los últimos diez segundos.
- Cargar o reproducir audio solo cuando la funcionalidad esté habilitada y después de una interacción deliberada. Evitar solapamientos y asociar cada sonido a una transición semántica, no a un render.
- Aplicar la preferencia de tema antes de los estilos visibles mediante una estrategia compatible con Vite y la CSP futura, evitando depender de un efecto de React posterior al primer render.

## Risks Or Open Questions

- Verificar en T6 que los cuatro cues del pack `soft` mantienen suficiente contraste semántico, un nivel confortable y un coste de assets proporcionado en móvil; si alguno falla, sustituir solo ese cue por otro del mismo pack y documentar la desviación.
- La disponibilidad del panel durante resultados y revisión no debe interferir con la restauración de foco propia de esas vistas; el comportamiento se validará al implementar el shell.
