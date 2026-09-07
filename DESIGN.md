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
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  question-heading:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.heading-md}"
  answer-option:
    backgroundColor: "{colors.option-surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.option-label}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
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
  progress-badge:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.text-on-accent}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.sm}"
  score-heading:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.heading-lg}"
  score-metric:
    backgroundColor: "{colors.info}"
    textColor: "{colors.text-primary}"
    typography: "{typography.metric}"
    rounded: "{rounded.full}"
    size: 5rem
  inline-code:
    backgroundColor: "{colors.option-surface}"
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
    backgroundColor: "{colors.primary-light}"
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
  score-metric-light:
    backgroundColor: "{colors.info-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.metric}"
    rounded: "{rounded.full}"
    size: 5rem
  inline-code-light:
    backgroundColor: "{colors.option-surface-light}"
    textColor: "{colors.text-primary-light}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
---

# Code Quiz Design System

## Overview

Code Quiz es una experiencia educativa concentrada y ligeramente lúdica. Su identidad actual combina un lienzo casi negro, profundidad violeta, una tarjeta central y feedback inmediato. Debe sentirse técnica y accesible, no infantil ni competitiva en exceso.

La interfaz prioriza una sola decisión por vez: leer la pregunta, comparar respuestas, recibir una explicación y avanzar. La densidad es media y el contenido debe seguir siendo el protagonista cuando se incorporen menú, filtros, niveles, progreso y resúmenes por categoría.

La paleta oscura implementada es la referencia de marca y debe conservarse. El sistema prepara una variante clara mediante tokens adaptativos, pero no considera implementado el modo claro hasta que se incorporen el control, la persistencia y la verificación visual completa.

HTML, CSS y futuras materias comparten la misma paleta. Se distinguen mediante el logo, el nombre visible y apoyos gráficos mínimos; cambiar de materia no debe hacer que parezca otra aplicación.

La base documentada procede de la aplicación, sus capturas actuales y esta decisión de producto. Las reglas de foco, movimiento reducido, reflow y estados no cromáticos son requisitos normativos aunque todavía necesiten implementarse o verificarse en todas las vistas.

La cascada se organiza mediante las capas `reset`, `tokens`, `base`, `components` y `utilities`, declaradas en ese orden antes de cargar los componentes. Cada hoja de componente vive en `components` y usa `@scope` con una raíz propia; los estilos globales se limitan a responsabilidades compartidas. La proximidad de scope forma parte del contrato al combinar variantes o componentes anidados.

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
}
```

- **Primary:** `#FFFFFF` / `#16074E`. Superficie principal de tarjetas y contenedores de máxima concentración.
- **Secondary:** `#462A8C` en ambos esquemas. Botones, badges y acentos interactivos; mantiene el violeta como firma común.
- **Canvas:** `#F7F5FC` / `#121212`. Fondo base de página.
- **Canvas accent:** `#E8DFF6` / `#462A8C`. Extremo del halo o degradado, separado de secondary para que el tema claro no oscurezca toda la página.
- **Option surface:** `#ECE9F2` / `#434343`. Respuestas neutrales y bloques de código.
- **Info:** `#E9E2F5` / `#5E458E`. Explicaciones, contexto y métricas secundarias.
- **Success:** `#D9F2DE` / `#007500`; **error:** `#F8E0E6` / `#750019`. Feedback semántico, siempre acompañado de texto, icono o estado anunciado.
- **Text primary:** `#1D1533` / `#EFEEEE`. Texto sobre superficies de contenido.
- **Text on accent:** `#FFFFFF` / `#EFEEEE`. Texto sobre secondary; no usarlo sobre superficies claras.
- **Focus ring:** `#5A2CA0` / `#F2C94C`. Indicador de foco, no color decorativo ni identificador de materia.

Las combinaciones normativas superan WCAG AA para texto normal en ambos esquemas. El par con menor contraste es text-primary sobre success en oscuro, con `5.12:1`. Los estados con opacidad y cualquier gradiente deben validarse sobre el fondo compuesto real.

La implementación futura debe declarar `color-scheme: light dark` en `:root`; `light-dark()` elige el primer valor en claro y el segundo en oscuro. Incluye también `<meta name="color-scheme" content="light dark">` antes de los estilos para que los controles nativos y el primer render compartan la preferencia. Un selector manual debe cambiar `color-scheme` en el elemento raíz y contemplar `auto`, `light` y `dark` sin duplicar variables.

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

La página usa tres bandas intrínsecas: cabecera, contenido flexible y pie. El quiz vive en una única columna centrada con un ancho máximo de `43.75rem` y gutters de `1rem`.

La escala espacial se basa en múltiplos de `0.5rem`, con un cuarto de rem para ajustes pequeños. Los grupos internos usan `1rem`; la tarjeta usa `2rem` en el eje de bloque y `1.5rem` en el eje inline. En anchos estrechos puede reducirse el padding, nunca el tamaño de texto esencial.

El diseño es mobile-first y cambia cuando el contenido lo requiere:

- Desde 320 CSS px, todo el flujo principal se presenta en una columna sin scroll horizontal de página.
- Preguntas, respuestas y botones crecen en altura y permiten wrap.
- El badge de progreso no debe superponerse con preguntas largas; si falta espacio, pasa al flujo normal o reserva espacio suficiente según el contenido.
- Los grupos de acciones pueden envolver o apilarse. La acción primaria mantiene un objetivo táctil preferente de al menos `2.75rem` por eje.
- Los indicadores flotantes de revisión deben respetar safe areas, no ocultar contenido o foco y convertirse en contenido normal si el viewport o el zoom no permiten fijarlos.
- En escritorio se mantiene una columna contenida; no se estira la tarjeta para llenar el viewport.

Evita alturas fijas y dependencias de `100vh`. Usa `min-height: 100dvh` solo como base de página y conserva crecimiento y scroll naturales.

## Elevation & Depth

La profundidad procede principalmente de capas tonales: canvas casi negro, halo violeta de fondo y tarjeta primary. La sombra de tarjeta implementada es compacta, `2px 2px 3px` en secondary; no debe convertirse en una sombra difusa o realista.

El título usa una sombra breve en info para mantener la firma visual. Limita este tratamiento al lockup principal; no apliques glow a párrafos, respuestas o todos los encabezados.

Paneles superpuestos pueden usar fondo primary con transparencia y blur únicamente cuando haya suficiente contraste con cualquier contenido situado detrás. Deben contar también con borde perceptible y alternativa válida en `forced-colors`.

## Shapes

El radio dominante es `1rem`: tarjetas, respuestas, botones, badges y paneles forman una familia suave y consistente. El radio `0.25rem` se reserva para código inline y superficies técnicas pequeñas.

Los círculos completos se usan solo para métricas compactas e indicadores de revisión. No conviertas controles de texto o tarjetas de selección en píldoras sin una razón funcional.

Las formas deben crecer con el texto. No fijes alturas en botones, respuestas, badges o paneles informativos.

## Components

### Page shell and header

El fondo radial parte de canvas y se abre hacia canvas-accent, con el contenido centrado encima. En oscuro conserva exactamente el recorrido actual de `#121212` a `#462A8C`; en claro usa una transición suave de `#F7F5FC` a `#E8DFF6`. El lockup combina el logo de la materia y el nombre del producto en columna, con `0.5rem` entre ambos. El logo se escala de forma fluida aproximadamente entre `11.25rem` y `14rem` sin distorsión.

La cabecera de Code Quiz usa el lockup horizontal 3D con el cubo `< >`, `{ }` y `JS` y la marca «CODE QUIZ». El WebP transparente mide 960 × 448 y se presenta a un ancho máximo de `24rem`, limitado por el contenedor y con altura automática. El encabezado obtiene su nombre accesible del `alt="Code Quiz"` de la imagen, sin repetir texto.

`code-quiz-logo-dark.webp` usa letras claras y violeta sobre fondos oscuros; `code-quiz-logo-light.webp` conserva letras violetas sobre fondos claros. El símbolo compacto mide 256 × 256, el favicon 48 × 48 y Open Graph 1200 × 630 con fondo canvas oscuro. Las variantes son assets de marca: no crean paletas distintas por materia. El CSS y el metadato fijan `color-scheme: dark` hasta implementar el modo claro completo.

### Quiz card

La tarjeta primary contiene badge, pregunta, opciones, explicación y acciones con separación vertical de `1rem`. Mantén un solo foco narrativo y evita subdividirla en paneles decorativos innecesarios.

Cuando aparezcan menú y selección de partida, reutiliza la misma familia de superficie, radio y ancho; no construyas una home visualmente ajena al quiz.

### Progress

El progreso se expresa como texto comprensible, por ejemplo, “Pregunta 3 de 10”. El formato compacto `3 / 10` puede mantenerse como apoyo visual si existe un nombre accesible equivalente. Una futura barra debe incluir valor textual y no depender solo de longitud o color.

### Answer option

La opción completa es el objetivo interactivo, pero conserva el control radio nativo y su semántica. Usa option-surface en reposo, un aumento prudente de luminosidad en hover y un anillo focus-ring de al menos `0.1875rem`, separado por `0.125rem`, en `:focus-visible`.

Tras responder:

- la correcta usa success más una marca y texto accesible;
- la selección incorrecta usa error más una marca y texto accesible;
- las demás opciones permanecen legibles y no desaparecen;
- el estado no cambia el tamaño o la posición de la tarjeta de forma inesperada.

La vibración de error es decorativa, dura como máximo `300ms` y se desactiva con `prefers-reduced-motion: reduce`.

### Information panel

El panel info aparece después de responder e incluye un encabezado con icono, texto explicativo y código cuando proceda. El código usa option-surface, radio pequeño y scroll horizontal propio solo si una línea técnica no puede envolver de manera segura.

Pregunta, respuestas y explicación comparten bloques de contenido. El primer bloque de una pregunta es texto y conserva el encabezado `h2`; los bloques posteriores viven debajo sin introducir `pre` dentro del encabezado. Cada fragmento técnico se representa como texto literal en `pre > code`, declara su lenguaje mediante `data-language`, conserva espacios y saltos y usa tipografía monoespaciada. Las opciones completas mantienen su radio nativo y pueden crecer o desplazar horizontalmente solo el bloque de código.

La entrada puede animar opacidad y tamaño durante `300ms`. Con movimiento reducido aparece de inmediato. La animación nunca retrasa el acceso al contenido ni mueve el foco sin intención.

### Buttons

El botón primario usa secondary, text-on-accent, radio grande y padding mínimo de `1rem` en bloque y `2rem` inline en vistas amplias. En móvil puede reducir el padding inline, no el objetivo táctil ni la legibilidad.

- **Hover:** aumento moderado de luminosidad, sin ser la única indicación de interactividad.
- **Active:** escala máxima hasta `0.9` solo cuando no se solicita movimiento reducido.
- **Focus-visible:** anillo focus-ring de alto contraste, distinguible de hover y selección.
- **Disabled:** conserva el texto legible, elimina el cursor de acción y comunica `disabled` semánticamente. No depende solo de opacidad o escala de grises.
- **Loading, si se incorpora:** mantiene etiqueta o nombre accesible, evita cambios bruscos de ancho y bloquea activaciones duplicadas.

Los botones con icono y texto mantienen al menos `0.5rem` entre ambos. Los iconos decorativos usan `aria-hidden="true"` y no repiten la etiqueta.

Los grupos de acciones permiten wrap y respetan el ancho disponible. Hasta `30rem` de viewport, cada botón ocupa una fila completa para evitar desbordamientos en resultados. Esa media query vive anidada dentro del selector de botón del grupo.

### Results and review

El resultado presenta mensaje, puntuación, porcentaje y explicación textual. Los círculos de `5rem` son apropiados para métricas breves; deben crecer o abandonar la forma circular si el contenido se amplía.

La revisión conserva las preguntas en orden de partida y muestra respuesta elegida, respuesta correcta y explicación. Los dots son navegación secundaria: cada enlace necesita nombre accesible con número y estado, objetivo táctil suficiente y foco visible. En reflow estrecho o zoom alto, la navegación no debe cubrir la última tarjeta.

### Empty, error and persistence states

Si una combinación no alcanza las veinte preguntas aprobadas necesarias para partidas de diez, no la presentes como jugable: muestra un mensaje accionable y permite cambiar materia o nivel. Si `localStorage` contiene datos inválidos, ignóralos de forma segura y continúa con valores predeterminados; no expongas errores técnicos al usuario.

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
- Objetivos táctiles mínimos de 24 por 24 CSS px o separación equivalente; preferencia de `44px` para las acciones principales.
- Reflow sin pérdida de contenido a 320 CSS px y al 400 % de zoom; texto funcional al 200 %.
- Soporte para `prefers-reduced-motion: reduce`: sin confeti, vibración, scroll suave ni escalado de botones; transiciones no esenciales instantáneas.
- En `forced-colors`, conservar controles nativos, bordes, foco y estados correct/incorrect mediante texto o iconos visibles.
- Validar todos los pares de contraste y estados interactivos tanto en claro como en oscuro, incluido el esquema automático del sistema y cualquier preferencia persistida.
- No bloquear zoom, orientación ni preferencias de tamaño de texto del sistema.
- Preparar textos más largos, localización y RTL. La dirección de flechas de avance puede reflejarse en RTL, pero los iconos con significado propio no se invierten automáticamente.

## Primera versión TypeScript

Se conserva el tema oscuro y la identidad existentes. La variante clara continúa planificada.

- El badge de progreso vive en el flujo normal, alineado al final, para tolerar preguntas largas y texto al 200 %.
- Las respuestas muestran etiquetas textuales de correcta y elegida además del color; en revisión se apilan dentro de cada opción.
- El foco usa un contorno de 3px con separación de 4px y el token focus-ring; el contorno de la opción acompaña el foco del radio.
- Los botones deshabilitados conservan el contraste del texto, comunican disabled y no aplican hover ni escala.
- La navegación numerada de revisión vive en el flujo después de las tarjetas, sin cubrir el contenido ni el pie. Usa primary y text-primary.
- Con movimiento reducido se omiten confeti, vibración, transiciones y escala; el desplazamiento es inmediato.
- Al ampliar texto, los contenedores pueden reducir su ancho intrínseco, las palabras largas se parten y las métricas permiten wrap. Hasta 30rem, las acciones usan 1rem de padding inline y los iconos conservan tamaño.
- Hasta 30rem, gutters y padding inline de tarjetas, respuestas y explicaciones usan 0.5rem para mantener ancho de lectura con texto ampliado. Al abrir revisión, el foco va al encabezado de la primera pregunta, no al centro de una tarjeta extensa.
