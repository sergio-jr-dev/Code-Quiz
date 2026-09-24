# Vídeo de presentación de Code Quiz

Estado: vídeo aprobado y publicado por el autor. El repositorio conserva la composición editable, los recursos musicales y las instrucciones para reproducirla.

## Objetivo y formato

Presentar Code Quiz como un juego breve para practicar y aprender HTML, CSS y JavaScript. Preparado para LinkedIn y X, con música y textos, sin voz en off. El vídeo debe entenderse completamente en silencio.

- Duración total: 49,5 segundos, incluido el cierre. Máximo absoluto: 60 segundos.
- Composición: 1080 × 1350 px (4:5), a 30 fps; 1485 fotogramas.
- Identidad: violeta, fondos y logos del proyecto, según `DESIGN.md`.
- Texto editorial grande, con una idea principal por escena. La interfaz se muestra mediante encuadres cercanos que permitan leer la acción relevante.
- Márgenes de composición: al menos 80 px para titulares y elementos esenciales.
- Salida: MP4. Los archivos exportados no se versionan.

## Guion y escenas

Los intervalos incluyen la entrada y salida de cada escena. Las transiciones no deben ampliar los 49,5 segundos totales.

| Tiempo      | Texto principal                           | Acción visual                                                                                                                                                    |
| ----------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0–4 s       | ¿Cuánto sabes de desarrollo web?          | Entrada del titular y acercamiento a la pregunta. Las cuatro respuestas aparecen en cascada de A a D, manteniendo su espacio reservado.                          |
| 4–7,5 s     | HTML · CSS · JavaScript                   | Logo de Code Quiz y entrada escalonada de las materias. Se reduce la pausa final.                                                                                |
| 7,5–13,5 s  | 180 preguntas / 60 por lenguaje           | Primero sube el total hasta 180. Después, los contadores de HTML, CSS y JavaScript suben de 0 a 60 por turnos, en ese orden. Las cifras quedan quietas al final. |
| 13,5–18 s   | Tres niveles por materia                  | Básico, Intermedio y Avanzado. Se conserva el recorrido y se acorta la espera tras seleccionar Avanzado.                                                         |
| 18–26 s     | A tu ritmo… / …o contrarreloj             | Normal seguido de Cronómetro, con demostración del temporizador perimetral.                                                                                      |
| 26–31,5 s   | Cada respuesta te enseña algo             | Selección correcta a los 1,4 segundos. Feedback y explicación visibles durante los 4,1 segundos restantes.                                                       |
| 31,5–37,5 s | Claro u oscuro. Tú eliges.                | Barrido entre los temas sobre la misma pregunta.                                                                                                                 |
| 37,5–43,5 s | Supera tu marca. / Aprende de tus fallos. | 10/10 con confeti, seguido de una revisión independiente con un fallo.                                                                                           |
| 43,5–49,5 s | Tu próxima partida empieza aquí.          | «Juega gratis» sin icono, entrada con rebote suave y brillo breve. El enlace aparece y se subraya. Últimos cuatro segundos estables y crédito musical discreto.  |

## Ritmo, movimiento y sonido

Música: «Cipher», de Kevin MacLeod, instrumental electrónica a 150 BPM según la ficha del autor. Se utilizan los primeros 49,5 segundos al 55 % de volumen, con entrada de 0,6 segundos y salida de 2,5 segundos. Sin voz ni efectos adicionales. La procedencia, licencia CC BY 4.0 y crédito para LinkedIn/X están en `../video/public/audio/CREDITS.md`. La pista se reproduce en la composición completa; las escenas individuales permiten revisar la imagen sin música.

El arranque debe captar atención desde el primer segundo. Las escenas de cifras, materias y niveles pueden usar entradas escalonadas; las de pregunta y explicación necesitan un ritmo más calmado. La llegada al resultado constituye el punto de mayor energía y la música se desvanece en el cierre.

Usar desplazamientos cortos, acercamientos suaves y cambios de encuadre. Evitar giros de la interfaz, flashes, texto que no termine de asentarse y movimiento permanente. Los efectos sonoros, si se incorporan, serán discretos y secundarios respecto a la música.

## Fidelidad al producto

- El catálogo tiene 180 preguntas: 60 por materia y 20 por cada combinación de materia y nivel.
- Las partidas iniciales tienen diez preguntas. El modo mixto puede verse en el menú, sin añadir una escena dedicada.
- El modo de tiempo se llama «Cronómetro» en la interfaz; «contrarreloj» se usa como texto promocional.
- El confeti se muestra al finalizar, desde el 80 % de aciertos. Un 10/10 permite mostrar la celebración especial de partida perfecta.
- La escena de revisión debe conservar respuestas, feedback y explicaciones coherentes con la partida mostrada.
- Las materias comparten la paleta del producto y se distinguen por logo y nombre.
- No mostrar funciones futuras ni interfaces que sugieran que existen en el producto.

## Flujo para futuras ediciones

1. Preparar los recursos reales: logo, materias, pregunta breve, explicación, menú, temas y resultados.
2. Crear una composición independiente de Remotion y montar las nueve escenas con estos tiempos.
3. Revisar la previsualización: legibilidad en móvil, ritmo, fidelidad a la aplicación y duración.
4. Revisar música, fundidos y ritmo de la composición completa.
5. Exportar y comprobar el archivo completo, incluido audio y cierre.

El proyecto del vídeo debe mantener sus dependencias separadas de las de la aplicación Vite.
