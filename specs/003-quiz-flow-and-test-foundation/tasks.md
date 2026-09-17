# Tasks

**Current task:** T11
**Blockers:** None

- [x] T1: Auditar la base de Vitest y Testing Library creada en la spec 004 y añadir solo el setup o los scripts que exijan los nuevos comportamientos.
- [x] T2: Sustituir el contexto por Zustand mediante checkpoints implementados por el usuario y revisados antes de avanzar.
  - [x] T2.1: Inventariar el estado actual y clasificarlo como dominio, estado derivado o efecto de interfaz; acordar el contrato tipado del store.
  - [x] T2.2: Extraer y probar las transiciones puras de la partida actual, puntuación, revisión y reinicio completo.
  - [x] T2.3: Instalar Zustand e implementar el store mínimo con estado inicial y acciones de dominio, sin persistencia ni efectos visuales.
  - [x] T2.4: Migrar los consumidores uno a uno mediante selectores pequeños y revisar cada tramo para evitar estado duplicado o suscripciones amplias.
  - [x] T2.5: Retirar `QuizContext` y `QuizContextProvider` solo después de verificar que no quedan consumidores.
  - [x] T2.6: Probar el store, el reinicio completo y las transiciones principales; ejecutar revisión final antes de comenzar T3.
- [x] T3: Implementar menú, configuración, filtros y transiciones puras del mazo sobre el modelo de la spec 002.
- [x] T4: Implementar la presentación de la partida: marcadores A–D sin perder los radios nativos, estados de respuesta, feedback, información adicional, resaltado seguro de sintaxis y barra de progreso; actualizar `DESIGN.md` con los patrones reutilizables acordados.
- [x] T5: Implementar resultados y resumen por categorías.
- [x] T6: Implementar navegación posterior y repetición de fallos.
- [x] T7: Implementar persistencia versionada del progreso, mejores resultados y mazos, con recuperación segura.
  - [x] T7.1: Permitir abandonar una partida en curso mediante confirmación accesible, conservando configuración, mazos, rotación y mejores marcas.
- [x] T8: Añadir gestión de foco, anuncios y movimiento reducido, incluyendo la semántica accesible del progreso y los estados no cromáticos.
  - [x] T8.1: Unificar el banco de producción antes de T9: trasladar las 25 preguntas originales a los módulos HTML y CSS conservando IDs y orden relativo, retirar `questions.ts`, sustituir su uso en pruebas por fixtures explícitas y verificar las invariantes del catálogo completo.
- [x] T9: Completar pruebas de integración con interacciones reales de usuario, reordenación de opciones, contenido con código y progreso.
- [x] T10: Verificar diseño, resaltado, temas, viewports, zoom, teclado y build raíz para Vercel.
  - [x] T10.1: Refinar la composición móvil del resultado y las acciones de la pregunta después de la verificación visual.
- [ ] T11: Ejecutar checks completos y registrar validación en `notes.md`.
