# Personal panel and preferences

**Status:** Draft

## Goal

Crear un espacio personal local de Code Quiz que reúna mejores marcas y preferencias de experiencia sin convertir la aplicación en un dashboard ni exigir cuenta, backend o sincronización remota.

## Context

La spec 003 persiste la configuración, la partida en curso, los mazos y una mejor marca por combinación de materia y nivel. La spec 005 incorporará los modos normal y cronómetro y exige separar sus resultados. El producto también prevé un tema claro completo y efectos sonoros configurables, pero todavía no existe una superficie común para consultar o cambiar estas preferencias.

Esta spec queda abierta como borrador hasta resolver el alcance del historial, la política inicial de sonido y su secuencia respecto a la spec 005.

## Requirements

- REQ-1: La aplicación ofrecerá un acceso estable a un panel personal identificado como «Mi Code Quiz» o un nombre equivalente definitivo.
- REQ-2: En viewports amplios el panel podrá presentarse como una superficie lateral; en viewports estrechos deberá adaptarse sin reducir el contenido principal ni producir desbordamiento horizontal.
- REQ-3: El panel mostrará las mejores marcas locales por modalidad, materia y nivel. El modo normal y el modo cronómetro nunca competirán por el mismo récord.
- REQ-4: La aplicación permitirá elegir tema automático, claro u oscuro y conservará la preferencia entre sesiones sin mostrar un tema parcial durante la carga.
- REQ-5: Se incorporarán efectos sonoros funcionales para eventos acordados del quiz y un control persistente para activarlos o silenciarlos; no se reproducirá audio antes de una interacción del usuario.
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
- Guardar un historial ilimitado de partidas en `localStorage`.

## Technical Notes

- Implementar después de cerrar la spec 003 y coordinar el esquema de resultados con la modalidad de la spec 005.
- Evaluar un store persistido de preferencias separado del store de dominio del quiz. Reutilizar Zustand `persist`, Zod y la recuperación segura ya adoptada, sin crear un ciclo manual equivalente.
- Mantener las mejores marcas como resumen duradero. Si se aprueba un historial de intentos, limitar su retención y definir una actualización atómica que no pueda desincronizarlo de la mejor marca.
- Cargar o reproducir audio solo cuando la funcionalidad esté habilitada y después de una interacción; no incorporar una dependencia de audio sin demostrar que la Web Audio API o `HTMLAudioElement` resultan insuficientes.
- Aplicar la preferencia de tema antes de los estilos visibles mediante una estrategia compatible con Vite y la CSP futura, evitando depender de un efecto de React posterior al primer render.

## Risks Or Open Questions

- Decidir si el panel mostrará solo mejores marcas o también un historial acotado de partidas recientes.
- Si se incorpora historial, definir cantidad retenida, campos, orden, borrado y si las repeticiones de fallos aparecen como intentos independientes.
- Decidir qué eventos tienen sonido, qué assets y licencia se usarán, si el sonido empieza activado o silenciado y si hace falta volumen además de un interruptor.
- Resolver si el panel estará disponible durante una partida o solo desde el menú y resultados, para no confundir su cierre con abandonar la ronda.
- Acordar si esta spec se implementa completa después de la spec 005 o si tema y shell del panel pueden entregarse antes sin duplicar migraciones.
