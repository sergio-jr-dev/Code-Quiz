---
version: alpha
name: Code Quiz
description: Sistema visual violeta y didactico preparado para temas claro y oscuro.
colors:
  primary: "#16074E"
  secondary: "#462A8C"
  canvas: "#121212"
  canvas-accent: "#462A8C"
  option-surface: "#434343"
  success: "#007500"
  error: "#750019"
  info: "#5E458E"
  text-primary: "#EFEEEE"
  text-on-accent: "#EFEEEE"
  focus-ring: "#F2C94C"
  progress: "#A78BFA"
  timer-warning: "#F2C94C"
  timer-critical: "#FF5A70"
  success-accent: "#75CF8A"
  error-accent: "#F28BA0"
  success-accent-light: "#26753B"
  error-accent-light: "#A72746"
  code-surface: "#0D0A18"
  code-border: "#4F3C7A"
  primary-light: "#FFFFFF"
  secondary-light: "#462A8C"
  canvas-light: "#F7F5FC"
  canvas-accent-light: "#E8DFF6"
  option-surface-light: "#ECE9F2"
  success-light: "#D9F2DE"
  error-light: "#F8E0E6"
  info-light: "#E9E2F5"
  text-primary-light: "#1D1533"
  text-on-accent-light: "#FFFFFF"
  focus-ring-light: "#5A2CA0"
  progress-light: "#462A8C"
  timer-warning-light: "#8A5A00"
  timer-critical-light: "#B4233C"
  code-surface-light: "#F4F1FB"
  code-border-light: "#CFC4E8"
typography:
  display:
    fontFamily: "'Trebuchet MS', 'Avenir Next', Avenir, sans-serif"
    fontSize: 1.875rem
    fontWeight: 700
    lineHeight: 1.15
  heading-lg:
    fontFamily: "'Trebuchet MS', 'Avenir Next', Avenir, sans-serif"
    fontSize: 2.2rem
    fontWeight: 700
    lineHeight: 1.2
  heading-md:
    fontFamily: "'Trebuchet MS', 'Avenir Next', Avenir, sans-serif"
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "'Trebuchet MS', 'Avenir Next', Avenir, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  option-label:
    fontFamily: "'Trebuchet MS', 'Avenir Next', Avenir, sans-serif"
    fontSize: 1.1rem
    fontWeight: 400
    lineHeight: 1.5
  metric:
    fontFamily: "'Trebuchet MS', 'Avenir Next', Avenir, sans-serif"
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: 0.25rem
  lg: 1rem
  full: 9999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
components:
  page-shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
  page-shell-accent:
    backgroundColor: "{colors.canvas-accent}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
  page-title:
    textColor: "{colors.text-primary}"
    typography: "{typography.display}"
  quiz-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  question-heading:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.heading-md}"
  answer-option:
    backgroundColor: "{colors.option-surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.option-label}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  mode-option:
    backgroundColor: "{colors.option-surface}"
    selectedBackgroundColor: "{colors.info}"
    selectedBorderColor: "{colors.progress}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  configuration-step:
    currentBackgroundColor: "{colors.progress}"
    currentTextColor: "{colors.primary}"
    completeBackgroundColor: "{colors.canvas}"
    completeTextColor: "{colors.progress}"
    upcomingBackgroundColor: "{colors.option-surface}"
    upcomingTextColor: "{colors.text-primary}"
    connectorColor: "{colors.option-surface}"
    completeConnectorColor: "{colors.success}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
  answer-correct:
    backgroundColor: "{colors.success}"
    textColor: "{colors.text-primary}"
    typography: "{typography.option-label}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  answer-incorrect:
    backgroundColor: "{colors.error}"
    textColor: "{colors.text-primary}"
    typography: "{typography.option-label}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  info-panel:
    backgroundColor: "{colors.info}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  action-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-on-accent}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  action-primary-focus:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-on-accent}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  focus-indicator:
    backgroundColor: "{colors.focus-ring}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
  quiz-progress:
    backgroundColor: "{colors.option-surface}"
    accentColor: "{colors.progress}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
  quiz-timer:
    backgroundColor: "{colors.option-surface}"
    accentColor: "{colors.progress}"
    warningAccentColor: "{colors.timer-warning}"
    criticalAccentColor: "{colors.timer-critical}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
  score-heading:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    typography: "{typography.heading-lg}"
  score-result:
    backgroundColor: "{colors.primary}"
    accentColor: "{colors.progress}"
    textColor: "{colors.text-primary}"
    typography: "{typography.metric}"
    rounded: "{rounded.full}"
    size: 3.5rem
  inline-code:
    backgroundColor: "{colors.code-surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
  page-shell-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
  page-shell-accent-light:
    backgroundColor: "{colors.canvas-accent-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
  page-title-light:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.display}"
  quiz-card-light:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  answer-option-light:
    backgroundColor: "{colors.option-surface-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.option-label}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  mode-option-light:
    backgroundColor: "{colors.option-surface-light}"
    selectedBackgroundColor: "{colors.info-light}"
    selectedBorderColor: "{colors.progress-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  configuration-step-light:
    currentBackgroundColor: "{colors.progress-light}"
    currentTextColor: "{colors.primary-light}"
    completeBackgroundColor: "{colors.success-light}"
    completeTextColor: "{colors.text-primary-light}"
    upcomingBackgroundColor: "{colors.option-surface-light}"
    upcomingTextColor: "{colors.text-primary-light}"
    connectorColor: "{colors.option-surface-light}"
    completeConnectorColor: "{colors.success-light}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
  answer-correct-light:
    backgroundColor: "{colors.success-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.option-label}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  answer-incorrect-light:
    backgroundColor: "{colors.error-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.option-label}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  info-panel-light:
    backgroundColor: "{colors.info-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  action-primary-light:
    backgroundColor: "{colors.secondary-light}"
    textColor: "{colors.text-on-accent-light}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  focus-indicator-light:
    backgroundColor: "{colors.focus-ring-light}"
    textColor: "{colors.primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
  quiz-progress-light:
    backgroundColor: "{colors.option-surface-light}"
    accentColor: "{colors.progress-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
  quiz-timer-light:
    backgroundColor: "{colors.option-surface-light}"
    accentColor: "{colors.progress-light}"
    warningAccentColor: "{colors.timer-warning-light}"
    criticalAccentColor: "{colors.timer-critical-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
  score-result-light:
    backgroundColor: "{colors.primary-light}"
    accentColor: "{colors.progress-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.metric}"
    rounded: "{rounded.full}"
    size: 3.5rem
  inline-code-light:
    backgroundColor: "{colors.code-surface-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
---

# Code Quiz Design System

## Overview

Code Quiz es una experiencia educativa concentrada y ligeramente lúdica. Su identidad actual combina un lienzo casi negro, profundidad violeta, una tarjeta central y feedback inmediato. Debe sentirse técnica y accesible, no infantil ni competitiva en exceso.

La interfaz prioriza una sola decisión por vez: leer la pregunta, comparar respuestas, recibir una explicación y avanzar. La densidad es media y el contenido debe seguir siendo el protagonista cuando se incorporen menú, filtros, niveles, progreso y resúmenes por categoría.

La paleta oscura es la referencia de marca. El tema claro usa la misma estructura y una variante de los tokens adaptativos; el panel permite elegir automático, claro u oscuro y conserva esa preferencia localmente.

En Preferencias, «Efectos sonoros» tiene el mismo peso de título que «Tema». Debajo conserva un checkbox nativo con foco visible, representado por el icono de altavoz activo o silenciado a la izquierda y el texto informativo a la derecha. «Activados» o «Desactivados» aparece en negrita; el estado activo usa `progress` y el inactivo conserva `text-primary`. El sonido es complementario a las bandas de respuesta, avisos de tiempo agotado y resumen final; el control reutiliza los tokens existentes.

HTML, CSS y futuras materias comparten la misma paleta. Se distinguen mediante el logo, el nombre visible y apoyos gráficos mínimos; cambiar de materia no debe hacer que parezca otra aplicación.

La base documentada procede de la aplicación, sus capturas actuales y esta decisión de producto. Las reglas de foco, movimiento reducido, reflow y estados no cromáticos son requisitos normativos aunque todavía necesiten implementarse o verificarse en todas las vistas.

La cascada se organiza mediante las capas `reset`, `tokens`, `base`, `components` y `utilities`, declaradas en ese orden antes de cargar los componentes. Cada hoja de componente vive en `components` y usa `@scope` con una raíz propia; los estilos globales se limitan a responsabilidades compartidas. El ancho, centrado y gutters comunes pertenecen al componente `Container`, reutilizado por cabecera, juego y pie. Su ancho de lectura predeterminado es `90ch`; una composición puede ampliar ese máximo mediante `--container-max-inline-size` sin duplicar centrado ni gutters. La apariencia y los estados comunes del control nativo pertenecen al componente `Button`; sus contenedores solo ajustan composición y responsive. La proximidad de scope forma parte del contrato al combinar variantes o componentes anidados.

## Colors

El frontmatter conserva los colores oscuros actuales como tokens semánticos y añade variantes `-light`. El linter alpha de `DESIGN.md` todavía no acepta `light-dark()` como valor de color; por eso la función se define en esta asignación CSS normativa, con el valor claro primero y el oscuro segundo:

```css
:root {
  color-scheme: light dark;

  --primary-color: light-dark(#ffffff, #16074e);
  --secondary-color: light-dark(#462a8c, #462a8c);
  --canvas-color: light-dark(#f7f5fc, #121212);
  --canvas-accent-color: light-dark(#e8dff6, #462a8c);
  --option-color: light-dark(#ece9f2, #434343);
  --correct-color: light-dark(#d9f2de, #007500);
  --incorrect-color: light-dark(#f8e0e6, #750019);
  --info-color: light-dark(#e9e2f5, #5e458e);
  --text-color: light-dark(#1d1533, #efeeee);
  --text-on-accent-color: light-dark(#ffffff, #efeeee);
  --focus-ring-color: light-dark(#5a2ca0, #f2c94c);
  --progress-color: light-dark(#462a8c, #a78bfa);
  --timer-warning-color: light-dark(#8a5a00, #f2c94c);
  --timer-critical-color: light-dark(#b4233c, #ff5a70);
  --success-accent: light-dark(#26753b, #75cf8a);
  --error-accent: light-dark(#a72746, #f28ba0);
  --background-art-wash: light-dark(
    color-mix(in srgb, var(--canvas-color) 78%, transparent),
    transparent
  );
  --selection-surface: color-mix(in srgb, var(--info-color) 45%, var(--canvas-color));
  --control-surface: color-mix(in srgb, var(--option-color) 72%, var(--canvas-color));
  --answer-success-surface: color-mix(in srgb, var(--correct-color) 20%, var(--canvas-color));
  --answer-error-surface: color-mix(in srgb, var(--incorrect-color) 20%, var(--canvas-color));
  --code-surface-color: light-dark(#f4f1fb, #0d0a18);
  --code-border-color: light-dark(#cfc4e8, #4f3c7a);
}
```

- **Primary:** `#FFFFFF` / `#16074E`. Valor de referencia para detalles y mezclas de estado; las tarjetas de contenido usan ahora una superficie compuesta sobre canvas.
- **Secondary:** `#462A8C` en ambos esquemas. Botones, badges y acentos interactivos; mantiene el violeta como firma común.
- **Canvas:** `#F7F5FC` / `#121212`. Fondo base de página.
- **Canvas accent:** `#E8DFF6` / `#462A8C`. Extremo del halo o degradado, separado de secondary para que el tema claro no oscurezca toda la página.
- **Option surface:** `#ECE9F2` / `#434343`. Respuestas neutrales.
- **Code surface:** `#F4F1FB` / `#0D0A18`, con borde `#CFC4E8` / `#4F3C7A`. Separa el contenido técnico de las tarjetas grises sin salir de la profundidad violeta.
- **Info:** `#E9E2F5` / `#5E458E`. Explicaciones, contexto y métricas secundarias.
- **Success:** `#D9F2DE` / `#007500`; **error:** `#F8E0E6` / `#750019`. Feedback semántico, siempre acompañado de texto, icono o estado anunciado.
- **Text primary:** `#1D1533` / `#EFEEEE`. Texto sobre superficies de contenido.
- **Text on accent:** `#FFFFFF` / `#EFEEEE`. Texto sobre secondary; no usarlo sobre superficies claras.
- **Focus ring:** `#5A2CA0` / `#F2C94C`. Indicador de foco, no color decorativo ni identificador de materia.
- **Progress:** `#462A8C` / `#A78BFA`. Relleno del avance frente a option-surface; se acompaña siempre de «Pregunta N de 10».
- **Timer warning:** `#8A5A00` / `#F2C94C`; **timer critical:** `#B4233C` / `#FF5A70`. Acentos del perímetro temporal, siempre acompañados del valor y el estado textual.

El resaltado de sintaxis usa el tema GitHub adaptativo distribuido por MicroLighter. Sus variables `--syntax-*` y colores `light-dark()` pertenecen al contenido técnico, no amplían la paleta de marca ni diferencian materias. La superficie, el overflow y la tipografía del bloque continúan bajo el componente de Code Quiz.

Las combinaciones normativas superan WCAG AA para texto normal en ambos esquemas. El par con menor contraste es text-primary sobre success en oscuro, con `5.12:1`. Los estados con opacidad y cualquier gradiente deben validarse sobre el fondo compuesto real.

La superficie compartida de menú, partida, puntuación, revisión, diálogo de salida, barra de revisión y panel personal se compone de `canvas` y `--content-surface-background`: dos gradientes radiales con `secondary` al 40 % en la esquina superior derecha e `info` al 22 % en la inferior izquierda, que se disuelven en la base del esquema activo. No sustituye los colores semánticos de controles, respuestas ni feedback. En claro, `--background-art-wash` atenúa el dibujo vectorial para conservar el centro legible.

`:root` declara `color-scheme: light dark`; `light-dark()` elige el primer valor en claro y el segundo en oscuro. El metadato equivalente y un script externo síncrono en `<head>` aplican la preferencia persistida antes de cargar React y pintar los estilos. `data-theme="light"` y `data-theme="dark"` fijan el esquema; automático elimina el atributo y sigue al sistema. Solo un cambio deliberado activa una transición CSS de `280ms` para color, superficies, bordes y sombras. Con movimiento reducido o colores forzados, el cambio es inmediato. La transición no se activa al cargar o recargar la página.

## Typography

El texto funcional usa como mínimo `1rem`, incluido el código. Solo el contenido secundario marcado semánticamente con `<small>` puede bajar de ese tamaño; no se reduce texto para forzarlo dentro de un componente.

La interfaz usa `'Trebuchet MS', 'Avenir Next', Avenir, sans-serif`: una pila humanista, abierta y legible que refuerza el tono técnico-educativo sin descargar fuentes ni añadir dependencias. Los fragmentos de código conservan una pila monoespaciada nativa independiente.

- **Display:** título del producto, peso 700. La implementación debe usar `clamp(1.875rem, calc(0.75rem + 3vw), 3rem)` con interlineado `1.15`.
- **Heading large:** mensaje principal del resultado, `2.2rem`, peso 700.
- **Heading medium:** preguntas y títulos de sección, base `1.5rem`, peso 700. Puede reducirse de forma fluida solo si mantiene jerarquía y legibilidad.
- **Body:** texto general y controles, mínimo `1rem`, interlineado `1.5`.
- **Option label:** respuestas, `1.1rem`, interlineado `1.5`, preparado para varias líneas.
- **Metric:** puntuaciones breves, `1.25rem`, peso 700.

Usa `text-wrap: balance` en títulos cortos y `text-wrap: pretty` en párrafos cuando tenga soporte. Mantén el ancho de lectura del texto explicativo aproximadamente entre 45 y 75 caracteres. No trunques preguntas, respuestas ni explicaciones.

El contenido debe tolerar texto al 200 %, zoom del navegador al 400 %, palabras largas y futuras traducciones sin solaparse ni ocultar acciones.

## Layout

El CSS usa nesting nativo para agrupar descendientes y estados relacionados. Las media queries se anidan dentro del selector afectado y permanecen próximas a sus declaraciones base. Se prefieren propiedades lógicas para dimensiones, espaciados y posiciones; las excepciones físicas deben responder a una necesidad real del contenido, como un eje de desplazamiento de código.

La página usa tres bandas intrínsecas: cabecera, contenido flexible y pie. Cabecera, menú, partida, puntuación y revisión comparten una columna centrada con un ancho máximo de `90ch` y gutters de `1rem`; el pie puede ampliar esa misma columna para mantener compactos sus enlaces. Las cuatro respuestas permanecen apiladas también en escritorio: leer completa cada opción y comparar código prima sobre reducir la altura mediante una cuadrícula.

La escala espacial se basa en múltiplos de `0.5rem`, con un cuarto de rem para ajustes pequeños. Los grupos internos usan `1rem`; la tarjeta usa `2rem` en el eje de bloque y `1.5rem` en el eje inline. En anchos estrechos puede reducirse el padding, nunca el tamaño de texto esencial.

El diseño es mobile-first y cambia cuando el contenido lo requiere:

- Desde 320 CSS px, todo el flujo principal se presenta en una columna sin scroll horizontal de página.
- Preguntas, respuestas y botones crecen en altura y permiten wrap.
- La fila de progreso puede envolver el texto debajo de la barra cuando falte espacio, sin superponerse con preguntas largas.
- Los grupos de acciones pueden envolver o apilarse. La acción primaria mantiene un objetivo táctil preferente de al menos `2.75rem` por eje.
- Los indicadores fijos de revisión respetan safe areas y reservan espacio al final del documento para no ocultar contenido o foco.
- En escritorio se mantiene una columna contenida. En viewports de poca altura se compactan cabecera y separaciones; nunca se reduce el texto esencial ni se fija la altura del contenido para eliminar scroll. El scrollbar aparece solo cuando el contenido lo necesita, sin reservar una franja permanente en el lienzo.

Evita alturas fijas y dependencias de `100vh`. Usa `min-height: 100dvh` solo como base de página y conserva crecimiento y scroll naturales.

## Elevation & Depth

La profundidad procede principalmente de capas tonales: canvas casi negro, relieve técnico violeta en los bordes y tarjetas con gradiente carbón-violeta. Menú, partida, resultado, tarjetas de revisión, barra de revisión y diálogos comparten `card-shadow`: un contorno violeta fino, un halo corto de `0.5rem` y una sombra oscura compacta. El acceso «Mi Code Quiz» y la tarjeta del modo cronómetro no llevan sombra.

El título usa una sombra breve en info para mantener la firma visual. Limita este tratamiento al lockup principal; no apliques glow a párrafos, respuestas o todos los encabezados.

Los paneles superpuestos deben conservar suficiente contraste con cualquier contenido situado detrás. Cuando su separación normal depende de una sombra, deben tener un borde visible en `forced-colors`.

## Shapes

El radio dominante es `1rem`: tarjetas, respuestas, botones, badges y paneles forman una familia suave y consistente. El radio `0.25rem` se reserva para código inline y superficies técnicas pequeñas.

Los círculos completos se usan solo para métricas compactas e indicadores de revisión. No conviertas controles de texto o tarjetas de selección en píldoras sin una razón funcional.

Las formas deben crecer con el texto. No fijes alturas en botones, respuestas, badges o paneles informativos.

## Components

### Page shell and header

El fondo común representa un laboratorio nocturno de código con una base `canvas` sólida y un dibujo vectorial transparente, `game-background.svg`. Los trazos de circuito, corchetes, llaves y pequeños puntos se limitan al perímetro, sin textura ni degradado detrás del contenido. El SVG se escala sin pixelación, cubre el viewport en escritorio y se alinea al inicio en móvil para mostrar el detalle lateral sin invadir la columna de lectura. Permanece estable durante el scroll y no contiene texto ni información necesaria. El lockup combina el logo de la materia y el nombre del producto en columna, con `0.5rem` entre ambos. El logo se escala de forma fluida aproximadamente entre `11.25rem` y `14rem` sin distorsión.

La cabecera de Code Quiz usa el lockup horizontal 3D con el cubo `< >`, `{ }` y `JS` y la marca «CODE QUIZ». El WebP transparente mide 960 × 448 y se presenta a un ancho máximo de `24rem`, limitado por el contenedor y con altura automática. El encabezado obtiene su nombre accesible del `alt="Code Quiz"` de la imagen, sin repetir texto.

`code-quiz-logo-dark.webp` usa letras claras y violeta sobre fondos oscuros; `code-quiz-logo-light.webp` conserva letras violetas sobre fondos claros. El símbolo compacto mide 256 × 256, el favicon 48 × 48 y Open Graph 1200 × 630 con fondo canvas oscuro. Las variantes son assets de marca: no crean paletas distintas por materia. Solo el logo apropiado al esquema activo queda visible y expuesto como imagen accesible.

### Panel personal

«Mi Code Quiz» es una utilidad secundaria fija en la esquina superior derecha del viewport. En escritorio el disparador muestra icono y texto, usa el mismo padding `0.5rem 0.75rem` que «Apoyar el proyecto» y no tiene sombra; hasta `48rem` muestra solo el icono, conservando su nombre accesible y un objetivo de `44px`. Hasta `24rem`, el logo se reduce ligeramente y se desplaza hacia el inicio según se estrecha la pantalla para dejar espacio al icono. El disparador no aparece durante la partida activa. En escritorio, el panel se superpone sin reducir la tarjeta protagonista: entra desde la derecha con un máximo de `26rem`, deja `1rem` respecto a los bordes superior, inferior y derecho, tiene radio `1rem` y la sombra compartida alrededor. Hasta `48rem` ocupa todo el viewport, sin radio ni sombra. Comparte la superficie compuesta de contenido; el área bajo el texto conserva contraste en ambos esquemas. Separa marcas y preferencias mediante una línea, sin tarjetas internas. El título se centra verticalmente con el icono de cierre. El cierre tiene nombre accesible, objetivo de `36px` y padding de `0.25rem`; recibe el foco al abrir y lo devuelve al disparador al cerrar. La apertura y el cierre combinan desplazamiento horizontal y opacidad durante `250ms`; con movimiento reducido son instantáneos. El scroll pertenece al diálogo cuando su contenido excede el viewport; Escape usa el comportamiento nativo de `<dialog>` y Tab circula entre sus controles. En `forced-colors` se conserva un borde visible.

Las mejores marcas se organizan primero por modalidad (Normal y Cronómetro), después por materia (HTML, CSS, JavaScript y Quiz mixto) y nivel. Cada nivel usa una pareja de descripción nativa con el resultado «N de 10» o «Sin marca»; un cero se muestra como marca válida. Las agrupaciones comparten la superficie del panel, con separación y una línea discreta entre modalidades, sin tarjetas adicionales. La lista se adapta al ancho disponible y al texto ampliado mediante wrap, y conserva la jerarquía de encabezados para navegación asistida.

Preferencias aparece antes de Mejores marcas para quedar visible al abrir el panel; no se fija sobre el contenido. El diálogo usa una barra de scroll fina con el acento `progress` y mantiene el scroll nativo. Los títulos de sección usan iconos Tabler; modalidad, materia y nivel reutilizan sus imágenes del menú a escala contenida, siempre junto a texto visible y con alternativa vacía por ser decorativas. Cada modalidad se identifica con una banda discreta de `control-surface`; los resultados numéricos destacan por peso tipográfico.

El selector de tema es una barra segmentada compacta, alineada al inicio y limitada a `15rem`, inspirada en tres iconos para claro, oscuro y automático. La pista usa `control-surface`; la opción elegida se distingue mediante superficie `primary`, borde y símbolo `progress`. Los radios nativos conservan sus nombres accesibles aunque sus rótulos se oculten visualmente. Cada segmento mantiene un objetivo amplio y un foco visible independiente de la selección. La respuesta de hover y selección usa transiciones CSS breves, salvo con movimiento reducido.

### Quiz card

La tarjeta de superficie compuesta contiene progreso, pregunta, opciones, explicación y acciones con separación vertical de `1rem`. Cuando la pregunta incluye un bloque de código, este conserva al menos `0.875rem` respecto al título. Mantén un solo foco narrativo y evita subdividirla en paneles decorativos innecesarios.

El menú y la selección de partida reutilizan la misma superficie compuesta, radio de `1rem`, sombra compacta y ancho de la tarjeta del quiz; no forman una home visualmente ajena al juego. Su encabezado mantiene una introducción breve, una pregunta principal y una sola acción final.

### Configuración de partida

La configuración se divide en dos pasos para mantener la tarjeta compacta: primero materia; después nivel y modalidad. Solo el contenido del paso activo permanece en el DOM. La carga inicial no fuerza el foco sobre el título: el orden de teclado comienza en la primera materia. Avanzar, volver o regresar al menú desde otra vista sí mueve el foco al `h2` contextual, de modo que teclado y lector de pantalla reciben el nuevo contexto sin depender de una animación.

El progreso se representa mediante una lista ordenada no interactiva y compacta: «Materia» y «Partida». El paso actual usa progress y `aria-current="step"`; el completado muestra un check decorativo. Cada marcador ocupa 2rem y se alinea junto a su rótulo. El foco amarillo se reserva a controles interactivos. La entrada del contenido conserva 250ms y se omite con movimiento reducido.

Cada grupo visible mantiene su propio `fieldset` con `legend`, de forma que la relación entre opciones se conserva sin depender del layout. Cada elección sigue siendo un radio nativo: la tarjeta-label amplía el objetivo interactivo, mientras `:has(input:checked)` y `:has(input:focus-visible)` proyectan selección y foco sobre toda la superficie.

La modalidad ofrece «Normal» y «Cronómetro» como opciones equivalentes del mismo flujo. Normal aparece seleccionada inicialmente y explica que no tiene límite; Cronómetro muestra antes de empezar el límite correspondiente al nivel y aclara que no concede bonificaciones. Ambas comparten contenido, superficie, tipografía y estados visuales. En escritorio ocupan dos columnas y a partir de `34rem` o menos se apilan para preservar la lectura.

Las materias usan el mismo fondo y sistema de color de interfaz. HTML, CSS, JavaScript y mixto se distinguen mediante nombre, icono y descripción, no mediante paletas completas de pantalla. Sus iconos sí conservan los colores reconocibles de cada tecnología como detalle de identidad. En escritorio, las materias pueden ocupar dos columnas y los niveles tres; ambos grupos pasan a una sola columna cuando el contenido necesita espacio.

El cubo 3D queda reservado al logo de Code Quiz. Las materias usan versiones 3D independientes de sus símbolos reconocibles: HTML naranja, JavaScript amarillo y el nuevo logo CSS morado de esquina redondeada; mixto agrupa los tres sin introducir otro contenedor. Los niveles forman otra familia 3D común: brote para básico, escalones ascendentes para intermedio y trofeo para avanzado. Las modalidades continúan esa familia mediante un libro abierto violeta con páginas claras para Normal y un cronómetro violeta con detalles dorados para Cronómetro. Todos estos assets son imágenes decorativas con `alt` vacío porque el nombre visible de cada opción ya aporta su significado. La introducción no repite el tamaño de ronda; la única confirmación de las diez preguntas vive junto a la acción de inicio.

La selección usa control-surface en reposo y selection-surface con borde progress y check decorativo cuando está activa. El foco mantiene su anillo amarillo independiente. Las combinaciones no disponibles se deshabilitan de forma nativa. La franja final resume diez preguntas, materia, nivel y modalidad, con «Cambiar materia» discreto y «Comenzar partida» primario.

En dispositivos que admiten hover, las tarjetas de materia, nivel y modalidad cambian solo el tono de su superficie. No se desplazan ni escalan, de modo que la configuración conserva una retícula estable al explorar opciones.

### Progress

El progreso vive dentro de la parte superior de la tarjeta. Combina un `<progress>` nativo que crece en el espacio disponible a la izquierda y el texto visible «Pregunta 3 de 10» alineado al final. Ambos representan el mismo valor desde la primera hasta la décima pregunta.

La pista usa option-surface y el valor usa progress, con radio completo y una altura compacta de `0.75rem`. La fila permite wrap: si el texto ampliado o el viewport no permiten mantener ambos elementos juntos, la barra conserva un ancho útil y la etiqueta pasa a otra línea. El valor avanza durante `300ms` con una salida suave al cambiar de pregunta. El texto es la referencia comprensible; longitud, color o animación nunca son la única señal. El progreso no es una región viva propia para evitar anuncios redundantes al mover el foco a cada pregunta.

En modo Cronómetro, la franja superior alinea dos módulos centrados en el eje vertical: el progreso de pregunta a la izquierda ocupa dos filas y el texto temporal a la derecha una. Para darles la misma jerarquía, «Pregunta N de 10» aparece encima de su barra, como «Tiempo restante: N s» aparece junto al indicador visual que envuelve la tarjeta. Ambos módulos permiten wrap independiente y pasan a filas sucesivas cuando el ancho disponible no sostiene una lectura cómoda; desde `30rem` hacia abajo, el estado del temporizador puede pasar a una segunda fila antes de provocar overflow, sin truncar el tiempo restante. En escritorio permanece en la misma fila para conservar una composición estable desde el primer segundo. El temporizador conserva un máximo de `22rem` y nunca reduce ni trunca el progreso de pregunta. La tarjeta elimina su sombra en esta modalidad porque el perímetro ya establece el límite visual.

El tiempo restante se representa visualmente como un borde perimetral de `0.25rem` generado con `conic-gradient`. La porción disponible interpola linealmente durante un segundo entre actualizaciones, usa progress, pasa a timer-warning durante los últimos diez segundos y a timer-critical durante los últimos cinco. No pulsa ni altera la geometría. La pista agotada usa option-surface. Este borde es decorativo: un único `<progress>` nativo, oculto solo visualmente, conserva nombre, valor y máximo accesibles. Tanto esta interpolación como la del progreso de pregunta se eliminan con `prefers-reduced-motion: reduce`. En `forced-colors`, el perímetro se oculta y ese mismo `<progress>` se vuelve visible con los colores nativos del sistema; el borde de la tarjeta permanece perceptible.

El texto «Tiempo restante: N s» permanece siempre visible, usa cifras tabulares y se acompaña de «En curso», «Pausado», «Detenido», «Agotado» o «Últimos segundos». Este último rótulo aparece desde que quedan diez segundos, de modo que los estados warning y critical no dependen solo del color. Los cambios por segundo no son una región viva. Una región `polite` y atómica, inicialmente vacía, incorpora una sola vez «Quedan diez segundos o menos» al cruzar ese umbral y conserva el mismo nodo/texto hasta que la pregunta se detiene o expira. El agotamiento se anuncia una sola vez mediante el feedback `role="status"`, evitando un segundo anuncio desde el temporizador. Tras responder conserva el último valor; al expirar muestra `0 s`, revela el feedback y espera la acción manual para avanzar.

### Answer option

La opción completa es el objetivo interactivo y conserva el control radio nativo y su semántica, aunque su círculo queda oculto solo visualmente. El único marcador circular visible es la letra `A`, `B`, `C` o `D`, derivada del orden presentado; nunca se usa para resolver la corrección. La tarjeta usa control-surface en reposo, un aumento prudente de luminosidad en hover y refleja el foco del radio mediante un anillo focus-ring de al menos `0.1875rem`, separado por `0.125rem`, en `:focus-visible`.

Tras responder:

- la correcta usa answer-success-surface y borde success-accent; la selección incorrecta usa answer-error-surface y borde error-accent sin añadir contenido dentro de las tarjetas;
- una única banda situada entre el grupo y la información identifica mediante texto e icono si se acertó, la letra elegida y la correcta cuando difieren;
- las demás opciones permanecen legibles y no desaparecen;
- ninguna tarjeta cambia de tamaño al mostrar el estado.

La vibración de error es decorativa, dura como máximo `300ms` y se desactiva con `prefers-reduced-motion: reduce`.

### Information panel

El panel info aparece después de responder e incluye el encabezado «Por qué es correcta» con icono, texto explicativo y código cuando proceda. El código usa code-surface y code-border. Las menciones técnicas reconocibles dentro de preguntas, respuestas y explicaciones se presentan como código inline con fondo y esquinas redondeadas, sin intentar colorear una gramática incompleta; el texto restante permanece intacto y escapado. Usa un separador superior y la superficie de lectura, sin relleno violeta independiente.

Los bloques de texto declaran sus anotaciones inline de forma editorial y explícita; no se infiere código mediante expresiones regulares. Una anotación `code` identifica una unidad de código que MicroLighter puede interpretar con su lenguaje y contexto, como `Promise.all`, `<p>` o `(a, b) => a - b`. Una anotación `highlight` aplica la superficie técnica propia sin colorear una gramática, por ejemplo a nombres conceptuales como `flex` o `flex-direction`, y a fragmentos incompletos que el parser no puede tokenizar por sí solos. Siempre gana la coincidencia completa más larga y los identificadores solo coinciden como unidades completas, nunca dentro de palabras de la prosa. El código inline admite wrap sin perder su superficie para no crear overflow a 320 px.

Pregunta, respuestas y explicación comparten bloques de contenido. El primer bloque de una pregunta es texto y conserva el encabezado `h2`; los bloques posteriores viven debajo sin introducir `pre` dentro del encabezado. Un programa, regla CSS o elemento HTML completo se representa como texto literal en `pre > code`; un selector, propiedad, declaración aislada, etiqueta suelta, valor o expresión breve se presenta como `code` de snippet. Ambos declaran su lenguaje mediante `data-language`, conservan espacios y usan tipografía monoespaciada. Los bloques completos dentro de respuestas permiten wrap, crecimiento vertical y una superficie ajustada al ancho intrínseco del fragmento, limitada siempre por el ancho disponible.

MicroLighter se ejecuta como mejora progresiva sobre todo contenido anotado como `code`: programas completos, snippets y código inline dentro de la prosa. Solo las anotaciones `highlight` quedan fuera del parser y reciben exclusivamente los estilos CSS de Code Quiz. El tema GitHub adaptativo aporta los colores de tokens sin insertar HTML. Si la CSS Custom Highlight API no existe o el resaltado falla, se conserva exactamente el texto escapado, el lenguaje declarado y la superficie legible.

La entrada puede animar opacidad y tamaño durante `300ms`. Con movimiento reducido aparece de inmediato. La animación nunca retrasa el acceso al contenido ni mueve el foco sin intención.

### Buttons

El botón primario usa secondary, text-on-accent, radio grande y padding mínimo de `1rem` en bloque y `2rem` inline en vistas amplias. En móvil puede reducir el padding inline, no el objetivo táctil ni la legibilidad.

- **Hover:** aumento moderado de luminosidad, sin ser la única indicación de interactividad.
- **Active:** escala máxima hasta `0.9` solo cuando no se solicita movimiento reducido.
- **Focus-visible:** anillo focus-ring de alto contraste, distinguible de hover y selección.
- **Disabled:** conserva el texto legible, elimina el cursor de acción y comunica `disabled` semánticamente. No depende solo de opacidad o escala de grises.
- **Loading, si se incorpora:** mantiene etiqueta o nombre accesible, evita cambios bruscos de ancho y bloquea activaciones duplicadas.

Los botones con icono y texto mantienen al menos `0.5rem` entre ambos. Los iconos decorativos usan `aria-hidden="true"` y no repiten la etiqueta.

Los grupos de acciones permiten wrap y respetan el ancho disponible. Hasta `30rem` de viewport, cada botón ocupa una fila completa, centra icono y etiqueta y usa todo el ancho del grupo para evitar desbordamientos tanto en la partida como en resultados. Esa media query vive anidada dentro del selector de botón del grupo.

### Confirmación para salir de la partida

«Salir de la partida» es una acción secundaria situada junto a la navegación de la pregunta. Usa fondo transparente, borde perceptible, texto e icono de salida; no compite con «Siguiente» ni parece una navegación accidental del navegador.

La confirmación usa un `<dialog>` modal nativo abierto con `showModal()`. Mantiene una sola superficie compuesta, el radio de `1rem` y la sombra compartida con contorno fino, sin borde CSS en el esquema normal. En `forced-colors` muestra un borde explícito. El backdrop oscurece el canvas sin introducir blur ni una nueva superficie. El título y la descripción explican que se pierde solo el progreso de la ronda y que se conservan configuración y resultados.

«Continuar partida» recibe el foco inicial y usa option-surface; «Salir de la partida» usa error como acción destructiva y conserva una etiqueta textual completa. Escape o la acción de continuar cierran el modal y devuelven el foco al disparador. Hasta `30rem`, ambas acciones se apilan y ocupan todo el ancho.

La entrada combina opacidad, un desplazamiento vertical de `0.5rem` y escala `0.98 → 1` durante `200ms`; el backdrop aparece en el mismo intervalo. `@starting-style` define el estado inicial y las transiciones discretas de `display` y `overlay`, habilitadas mediante `transition-behavior: allow-discrete`, mantienen el diálogo en el top layer durante la salida inversa. Con `prefers-reduced-motion: reduce` ambas transiciones son instantáneas. El diálogo debe seguir siendo perceptible en `forced-colors`.

### Footer

El pie mantiene una jerarquía compacta en tres grupos: autoría, destinos del proyecto y acciones externas. El repositorio de Code Quiz, el portfolio y BaselineLab conservan etiquetas visibles; LinkedIn y X usan iconos con nombres accesibles; la donación se distingue como una llamada secundaria «Apoyar el proyecto».

Todos los destinos son enlaces nativos porque cambian de documento, incluido el apoyo económico: la apariencia de llamada a la acción no lo convierte en `Button`. Los iconos son decorativos respecto a sus etiquetas o nombres accesibles. Las redes mantienen objetivos circulares de `2.75rem`, foco visible y borde perceptible; la llamada de apoyo reutiliza secondary y text-on-accent.

El pie amplía su `Container` hasta `75rem` y, desde `64rem` de viewport, mantiene los tres grupos en una sola fila. En anchos menores pueden envolver de forma natural usando exclusivamente el `gap` del grupo, sin márgenes de lista adicionales. Hasta `30rem`, los destinos y la llamada ocupan todo el ancho mientras las redes permanecen juntas. El pie no compite con la tarjeta principal ni introduce colores o superficies nuevos.

### Results and review

El resultado presenta un mensaje adaptado al rendimiento y la modalidad completada. Una cifra moderada de aciertos/total precede a errores y precisión; Cronómetro mantiene el conteo separado de respuestas incorrectas y tiempo agotado. Las métricas usan listas de descripción nativas, sin anillos ni iconos decorativos. El mejor resultado sigue separado por materia, nivel y modalidad. El resumen por materia conserva sus logos y barras nativas. «Revisar respuestas» es la única acción primaria, las repeticiones son secundarias y «Volver al menú» usa la variante discreta.

Las acciones posteriores forman una navegación con nombre accesible. Desde el resultado permiten revisar respuestas, repetir únicamente los fallos cuando existan, generar otra ronda con la misma configuración o volver al menú. La repetición de fallos conserva el orden en que se vieron, puede contener menos de diez preguntas y no consume el mazo configurado. La vuelta al menú mantiene la materia y el nivel elegidos para que puedan confirmarse o cambiarse. Todas las acciones usan texto e icono; «Volver al menú» adopta option-surface como acción secundaria. Hasta `30rem` se apilan y ocupan el ancho disponible.

La revisión conserva las preguntas en orden de partida y muestra respuesta elegida, respuesta correcta y explicación. Una pregunta agotada se identifica como «Sin responder · Tiempo agotado» y no simula una opción elegida. Al activarla, el encabezado «Pregunta 1» recibe foco sin provocar un desplazamiento implícito y la primera tarjeta se alinea después de forma deliberada al inicio del viewport; el comportamiento suave depende del scroll global y se vuelve inmediato con movimiento reducido. El estado visible se consolida dentro de cada opción; una región de estado solo para tecnologías de asistencia conserva el anuncio inmediato sin repetir el mismo mensaje encima de la explicación. Los dots son navegación secundaria fija al borde inferior: cada enlace muestra número e icono de estado y distingue correcta, incorrecta elegida y tiempo agotado mediante su nombre accesible; necesita objetivo de `44px` y foco visible. En móvil conservan una sola fila con scroll horizontal propio para no convertir la barra en un overlay alto. La vista reserva padding equivalente a la barra, incluida la safe area, para que nunca cubra la última tarjeta al llegar al final.

### Empty, error and persistence states

Si una combinación no alcanza las veinte preguntas aprobadas necesarias para partidas de diez, no la presentes como jugable: muestra un mensaje accionable y permite cambiar materia o nivel. Si `localStorage` contiene datos inválidos, ignóralos de forma segura y continúa con valores predeterminados; no expongas errores técnicos al usuario. La persistencia guarda solo identificadores y estado de dominio versionado; el contenido se reconstruye desde el catálogo vigente.

## Do's and Don'ts

- Do conserva una única tarjeta protagonista y una jerarquía de acción clara.
- Do reutiliza roles semánticos y la escala de `0.5rem` antes de introducir valores nuevos.
- Do acompaña success y error con texto, icono y anuncios accesibles.
- Do permite wrap, contenido largo y crecimiento intrínseco en todos los controles.
- Do mantiene la explicación cerca de la respuesta que contextualiza.
- Do usa iconografía técnica sencilla y coherente con el logo y Tabler Icons existentes.
- Do mantiene una paleta común y diferencia cada materia principalmente mediante su logo y nombre.
- Do implementa todos los tokens adaptativos y estados en conjunto cuando se active el modo claro.
- Don't conviertas el violeta en un gradiente brillante sobre cada componente.
- Don't introduzcas estéticas genéricas de dashboard, glassmorphism intenso o múltiples paneles competidores.
- Don't uses color, confeti, vibración o posición como única señal de estado.
- Don't ocultes preguntas, opciones o acciones esenciales por truncado, overlays o alturas fijas.
- Don't mezcles radios agudos y muy redondeados sin función clara.
- Don't crees paletas completas por lenguaje ni uses el color como único identificador de materia.
- Don't actives un tema claro parcial; implementa y valida conjuntamente superficies, texto, controles, estados, sombras, assets y metadatos.

## Accessibility & Responsive Behavior

El sistema apunta a WCAG 2.2 AA. Estas reglas son requisitos de diseño y deben verificarse en la implementación:

- Contraste mínimo de `4.5:1` para texto normal, `3:1` para texto grande y `3:1` para límites o estados visuales necesarios.
- Navegación completa por teclado con orden lógico y foco visible en radios, botones, enlaces y cualquier selector futuro.
- Tras responder, anunciar el resultado y hacer accesible la explicación sin forzar un salto de foco confuso.
- Tras cambiar de pregunta, finalizar, abrir resultados o reiniciar, situar el foco en el nuevo contexto principal y mantener una jerarquía de encabezados válida.
- Regiones de estado para feedback, progreso y errores; sin anuncios duplicados o excesivamente verbosos.
- En Cronómetro, no anunciar cada segundo: comunicar una vez la entrada en los últimos diez segundos y una vez el agotamiento mediante el feedback resultante.
- Objetivos táctiles mínimos de 24 por 24 CSS px o separación equivalente; preferencia de `44px` para las acciones principales.
- Reflow sin pérdida de contenido a 320 CSS px y al 400 % de zoom; texto funcional al 200 %.
- Soporte para `prefers-reduced-motion: reduce`: sin confeti, vibración, scroll suave ni escalado de botones; transiciones no esenciales instantáneas.
- En `forced-colors`, conservar controles nativos, bordes, foco y estados correct/incorrect/agotado mediante texto, iconos y estilos de borde diferentes; el temporizador muestra su `<progress>` nativo en lugar del perímetro decorativo.
- Validar todos los pares de contraste y estados interactivos tanto en claro como en oscuro, incluido el esquema automático del sistema y cualquier preferencia persistida.
- No bloquear zoom, orientación ni preferencias de tamaño de texto del sistema.
- Preparar textos más largos, localización y RTL. La dirección de flechas de avance puede reflejarse en RTL, pero los iconos con significado propio no se invierten automáticamente.

## Primera versión TypeScript

Se conserva el tema oscuro y la identidad existentes. La variante clara y el modo automático están disponibles desde «Mi Code Quiz».

- La barra de progreso y «Pregunta N de 10» comparten la fila superior de la tarjeta y pueden envolver sin perder su asociación.
- Durante la partida, una banda de feedback exterior a las respuestas identifica con texto e icono la opción elegida y la correcta; en revisión, las etiquetas se apilan dentro de cada opción.
- El foco usa un contorno de 3px con separación de 4px y el token focus-ring; el contorno de la opción acompaña el foco del radio.
- Los botones deshabilitados conservan el contraste del texto, comunican disabled y no aplican hover ni escala.
- La navegación numerada de revisión queda fija al borde inferior, respeta la safe area y la vista reserva espacio suficiente para no cubrir la última tarjeta. Usa primary, text-primary e iconos además del color.
- Con movimiento reducido se omiten confeti, vibración, transiciones y escala; el desplazamiento es inmediato.
- Al ampliar texto, los contenedores pueden reducir su ancho intrínseco, las palabras largas se parten y las métricas permiten wrap. Hasta 30rem, las acciones usan 1rem de padding inline y los iconos conservan tamaño.
- Hasta 30rem, gutters y padding inline de tarjetas, respuestas y explicaciones usan 0.5rem para mantener ancho de lectura con texto ampliado. Al abrir revisión, el foco va al encabezado de la primera pregunta, no al centro de una tarjeta extensa.

## Refinamiento visual aprobado · 2026-09-23

La configuración conserva dos pasos, con indicador compacto horizontal y selección violeta con check decorativo. El amarillo queda reservado al foco y a avisos temporales. El logo mide entre 11rem y 14rem. Se mantiene la columna de 90ch, iconografía existente y tipografía funcional mínima de 1rem.

Hasta 30rem, el conector entre «Materia» y «Partida» se oculta y las etapas pueden pasar a dos filas. Las columnas internas del menú admiten reducción, el botón de avance reduce su padding horizontal y el logo se alinea al inicio para mantenerlo separado del acceso al panel a 320 CSS px con texto ampliado. La autoría del pie puede partirse en varias líneas.

Tokens nuevos: `selection-surface` se compone de info al 45 % sobre canvas; `answer-success-surface` y `answer-error-surface` mezclan success/error al 20 % sobre canvas. Los bordes semánticos son `success-accent` (#75CF8A oscuro / #26753B claro) y `error-accent` (#F28BA0 oscuro / #A72746 claro), definidos mediante light-dark. `control-surface` mezcla option-surface al 72 % sobre canvas. Estas parejas preparan el sistema, sin activar temas de la spec 006.

Button ofrece variantes primary, secondary (borde violeta, fondo transparente) y quiet (sin borde visible). Los controles deshabilitados conservan texto legible y usan superficie neutral. La partida ordena Salir como secundario a la izquierda y Siguiente/Finalizar como primario a la derecha, con igual orden DOM y visual. En móvil se apilan sin alterar el orden de teclado.

Las respuestas mantienen geometría estable con borde de 2px reservado, rellenos semánticos suaves y feedback textual exterior. La explicación se titula «Por qué es correcta», usa separador superior y no lleva un bloque violeta relleno; la revisión comparte esta superficie. El resultado presenta aciertos/total con tamaño moderado (máximo 3.5rem), errores y precisión secundarios, manteniendo Tiempo agotado en cronómetro. Revisar respuestas es la única acción primaria del cierre; las repeticiones son secundarias y Volver al menú es discreta. Se eliminan los anillos y las ilustraciones de métricas.

No hay confeti al acertar preguntas. Al pasar de partida a resultado: por debajo de 80 % no se celebra; de 80 % a menos de 100 % se lanza un disparo breve central; con 100 % se lanzan dos disparos laterales simultáneos. Se calcula sobre el tamaño real de la ronda, también en repetición de fallos. No se dispara al abrir revisión, recargar resultados o con prefers-reduced-motion. No se añaden temporizadores de celebración.
