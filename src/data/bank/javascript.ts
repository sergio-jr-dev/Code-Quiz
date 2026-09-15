import type { BankQuestion } from '../../types/questionBank';
import { question, text, code } from '../questionFactory';

export const javascriptQuestions = [
  // basic
  question(
    'javascript-variables-101',
    'javascript',
    'basic',
    'variables',
    '¿Qué declaración permite reasignar una variable con alcance de bloque?',
    [
      code('javascript', 'const total = 1;'),
      code('javascript', 'let total = 1;'),
      code('javascript', 'var total = 1;'),
      code('javascript', 'total === 1;'),
    ],
    'b',
    text(
      'let crea una variable con alcance de bloque que puede reasignarse. const impide reasignar el enlace y var tiene alcance de función o global, no de bloque.',
    ),
  ),
  question(
    'javascript-constants-101',
    'javascript',
    'basic',
    'constants',
    '¿Qué impide const al declarar una variable?',
    [
      text('Leer el valor de la variable'),
      text('Modificar cualquier objeto referenciado'),
      text('Usar la variable dentro de una función'),
      text('Reasignar la variable a otro valor'),
    ],
    'd',
    text(
      'const protege el enlace de la variable, no vuelve inmutable al objeto que puede referenciar. Las propiedades de ese objeto pueden seguir cambiando.',
    ),
  ),
  question(
    'javascript-strings-101',
    'javascript',
    'basic',
    'strings',
    '¿Cuál de estos valores es una cadena de texto?',
    [
      code('javascript', '"42"'),
      code('javascript', '42'),
      code('javascript', 'true'),
      code('javascript', 'null'),
    ],
    'a',
    text(
      'Las comillas delimitan una cadena. 42 sin comillas es un número; true es un booleano y null representa un valor nulo.',
    ),
  ),
  question(
    'javascript-booleans-101',
    'javascript',
    'basic',
    'booleans',
    '¿Qué par contiene únicamente valores booleanos?',
    [
      code('javascript', '0, 1'),
      code('javascript', '"true", "false"'),
      code('javascript', 'true, false'),
      code('javascript', 'null, undefined'),
    ],
    'c',
    text(
      'El tipo booleano tiene los valores true y false. Las cadenas con esos nombres siguen siendo cadenas, aunque algunos valores se conviertan a booleano en condiciones.',
    ),
  ),
  question(
    'javascript-addition-101',
    'javascript',
    'basic',
    'addition',
    [
      { type: 'text', text: '¿Qué valor produce esta expresión?' },
      { type: 'code', language: 'javascript', code: '2 + 3' },
    ],
    [
      code('javascript', '"23"'),
      code('javascript', '5'),
      code('javascript', '6'),
      code('javascript', '23'),
    ],
    'b',
    text(
      'Con dos operandos numéricos, + realiza una suma. La concatenación se produce cuando la operación recibe una cadena tras la conversión correspondiente.',
    ),
  ),
  question(
    'javascript-concatenation-101',
    'javascript',
    'basic',
    'concatenation',
    [
      { type: 'text', text: '¿Qué valor produce esta expresión?' },
      { type: 'code', language: 'javascript', code: '"2" + 3' },
    ],
    [
      code('javascript', '5'),
      code('javascript', '6'),
      code('javascript', '"5"'),
      code('javascript', '"23"'),
    ],
    'd',
    text(
      'Al intervenir una cadena, + concatena las representaciones textuales. No suma numéricamente el contenido de "2" de forma automática.',
    ),
  ),
  question(
    'javascript-strict-equality-101',
    'javascript',
    'basic',
    'strict-equality',
    '¿Qué operador compara igualdad sin convertir primero los tipos de los operandos?',
    [
      code('javascript', '==='),
      code('javascript', '=='),
      code('javascript', '='),
      code('javascript', '!='),
    ],
    'a',
    text(
      '=== realiza una comparación estricta. == aplica reglas de conversión entre determinados tipos y = es una asignación.',
    ),
  ),
  question(
    'javascript-conditionals-101',
    'javascript',
    'basic',
    'conditionals',
    '¿Qué estructura ejecuta una rama según una condición?',
    [
      code('javascript', 'for...of'),
      code('javascript', 'try...finally'),
      code('javascript', 'if...else'),
      code('javascript', 'function...return'),
    ],
    'c',
    text(
      'if evalúa una condición y else permite una rama alternativa. Los bucles repiten trabajo y try/finally controla ejecución y limpieza ante salidas.',
      ['if', 'else', 'try/finally'],
    ),
  ),
  question(
    'javascript-array-index-101',
    'javascript',
    'basic',
    'array-index',
    [
      { type: 'text', text: '¿Qué valor devuelve este acceso?' },
      { type: 'code', language: 'javascript', code: '["HTML", "CSS", "JS"][1]' },
    ],
    [
      code('javascript', '"HTML"'),
      code('javascript', '"CSS"'),
      code('javascript', '"JS"'),
      code('javascript', 'undefined'),
    ],
    'b',
    text(
      'Los arrays se indexan desde cero. El índice 1 corresponde al segundo elemento, que aquí es "CSS".',
    ),
  ),
  question(
    'javascript-array-length-101',
    'javascript',
    'basic',
    'array-length',
    [
      { type: 'text', text: '¿Cuál es el valor de esta expresión?' },
      { type: 'code', language: 'javascript', code: '[10, 20, 30].length' },
    ],
    [
      code('javascript', '0'),
      code('javascript', '2'),
      code('javascript', '30'),
      code('javascript', '3'),
    ],
    'd',
    text(
      'En este array denso, length vale tres. El último índice es dos, pero length no es el índice del último elemento.',
    ),
  ),
  question(
    'javascript-array-push-101',
    'javascript',
    'basic',
    'array-push',
    '¿Qué método añade un elemento al final de un array modificándolo?',
    [
      code('javascript', 'push()'),
      code('javascript', 'pop()'),
      code('javascript', 'shift()'),
      code('javascript', 'slice()'),
    ],
    'a',
    text(
      'push añade elementos al final y devuelve la nueva longitud. pop elimina el último, shift elimina el primero y slice crea una copia de un tramo.',
    ),
  ),
  question(
    'javascript-object-access-101',
    'javascript',
    'basic',
    'object-access',
    [
      { type: 'text', text: '¿Qué valor devuelve este acceso?' },
      { type: 'code', language: 'javascript', code: '({ nombre: "Ada", edad: 30 }).nombre' },
    ],
    [
      code('javascript', '30'),
      code('javascript', 'undefined'),
      code('javascript', '"Ada"'),
      code('javascript', '"nombre"'),
    ],
    'c',
    text(
      'La notación de punto accede a una propiedad por su nombre. Aquí nombre contiene la cadena "Ada", no el texto de la clave.',
    ),
  ),
  question(
    'javascript-return-101',
    'javascript',
    'basic',
    'return',
    '¿Qué hace return dentro de una función ordinaria?',
    [
      text('Repite la función desde el principio'),
      text('Termina la llamada y entrega un valor'),
      text('Declara otra función con el mismo nombre'),
      text('Detiene todas las funciones del programa'),
    ],
    'b',
    text(
      'return finaliza esa llamada y puede entregar un valor al llamador. Sin expresión, el valor devuelto es undefined.',
    ),
  ),
  question(
    'javascript-function-call-101',
    'javascript',
    'basic',
    'function-call',
    [
      { type: 'text', text: '¿Qué resultado devuelve esta llamada?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'function doble(n) { return n * 2; }\ndoble(4);',
      },
    ],
    [
      code('javascript', '2'),
      code('javascript', '4'),
      code('javascript', '6'),
      code('javascript', '8'),
    ],
    'd',
    text('El argumento 4 se asigna al parámetro n y se multiplica por dos. La función devuelve 8.'),
  ),
  question(
    'javascript-line-comments-101',
    'javascript',
    'basic',
    'line-comments',
    '¿Qué sintaxis inicia un comentario de una línea en JavaScript?',
    [
      code('javascript', '// Nota'),
      code('javascript', '<!-- Nota -->'),
      code('javascript', '# Nota'),
      code('javascript', '** Nota'),
    ],
    'a',
    text(
      '// inicia un comentario hasta el final de la línea. Para comentarios de bloque JavaScript utiliza /* y */.',
    ),
  ),
  question(
    'javascript-typeof-101',
    'javascript',
    'basic',
    'typeof',
    [
      { type: 'text', text: '¿Qué cadena devuelve esta expresión?' },
      { type: 'code', language: 'javascript', code: 'typeof 42' },
    ],
    [
      code('javascript', '"integer"'),
      code('javascript', '"float"'),
      code('javascript', '"number"'),
      code('javascript', '"numeric"'),
    ],
    'c',
    text(
      'typeof devuelve "number" para los valores del tipo Number, tanto si representan enteros como si contienen parte decimal.',
    ),
  ),
  question(
    'javascript-undefined-101',
    'javascript',
    'basic',
    'undefined',
    '¿Qué valor tiene una variable let declarada sin inicializador después de su declaración?',
    [
      code('javascript', 'null'),
      code('javascript', 'undefined'),
      code('javascript', '0'),
      code('javascript', 'false'),
    ],
    'b',
    text(
      'Tras ejecutar let sin inicializador, la variable contiene undefined. Esto es distinto de acceder a ella antes de su declaración.',
    ),
  ),
  question(
    'javascript-remainder-101',
    'javascript',
    'basic',
    'remainder',
    [
      { type: 'text', text: '¿Qué valor produce esta expresión con operandos positivos?' },
      { type: 'code', language: 'javascript', code: '7 % 3' },
    ],
    [
      code('javascript', '3'),
      code('javascript', '2'),
      code('javascript', '0'),
      code('javascript', '1'),
    ],
    'd',
    text(
      '% calcula el resto de la división. Siete contiene dos grupos completos de tres y deja un resto de uno.',
    ),
  ),
  question(
    'javascript-logical-not-101',
    'javascript',
    'basic',
    'logical-not',
    [
      { type: 'text', text: '¿Qué valor produce esta expresión?' },
      { type: 'code', language: 'javascript', code: '!true' },
    ],
    [
      code('javascript', 'false'),
      code('javascript', 'true'),
      code('javascript', 'null'),
      code('javascript', 'undefined'),
    ],
    'a',
    text(
      'El operador ! convierte su operando a booleano y lo niega. La negación de true es false.',
    ),
  ),
  question(
    'javascript-for-of-101',
    'javascript',
    'basic',
    'for-of',
    '¿Qué recorre for...of al aplicarlo a un array ordinario?',
    [
      text('Los nombres de todas sus propiedades'),
      text('Solo los índices pares del array'),
      text('Los valores producidos por su iterador'),
      text('Las claves heredadas de su prototipo'),
    ],
    'c',
    text(
      'for...of consume el iterador del array y obtiene sus valores. for...in tiene un contrato distinto: recorre claves enumerables de propiedades.',
    ),
  ),
  // intermediate
  question(
    'javascript-array-map-101',
    'javascript',
    'intermediate',
    'array-map',
    [
      { type: 'text', text: '¿Qué devuelve esta expresión?' },
      { type: 'code', language: 'javascript', code: '[1, 2, 3].map(n => n * 2)' },
    ],
    [
      code('javascript', '[1, 2, 3]'),
      code('javascript', '[2, 4, 6]'),
      code('javascript', '[2, 3, 4]'),
      code('javascript', '6'),
    ],
    'b',
    text(
      'map crea un nuevo array con el resultado de aplicar la función a cada elemento presente. Esta función multiplica cada número por dos.',
    ),
  ),
  question(
    'javascript-array-filter-101',
    'javascript',
    'intermediate',
    'array-filter',
    [
      { type: 'text', text: '¿Qué devuelve esta expresión?' },
      { type: 'code', language: 'javascript', code: '[1, 2, 3, 4].filter(n => n > 2)' },
    ],
    [
      code('javascript', '[false, false, true, true]'),
      code('javascript', '[1, 2]'),
      code('javascript', '[2, 3, 4]'),
      code('javascript', '[3, 4]'),
    ],
    'd',
    text(
      'filter conserva los elementos cuya evaluación cumple la condición. No devuelve los booleanos de la condición ni transforma los valores seleccionados.',
    ),
  ),
  question(
    'javascript-array-find-101',
    'javascript',
    'intermediate',
    'array-find',
    '¿Qué devuelve find cuando ningún elemento cumple su condición?',
    [
      code('javascript', 'undefined'),
      code('javascript', 'null'),
      code('javascript', '-1'),
      code('javascript', 'false'),
    ],
    'a',
    text(
      'find devuelve el primer valor que satisface la condición o undefined si no encuentra ninguno. findIndex devuelve un índice y usa -1 cuando no encuentra coincidencias.',
    ),
  ),
  question(
    'javascript-array-reduce-101',
    'javascript',
    'intermediate',
    'array-reduce',
    [
      { type: 'text', text: '¿Qué valor produce esta expresión?' },
      { type: 'code', language: 'javascript', code: '[1, 2, 3].reduce((suma, n) => suma + n, 0)' },
    ],
    [
      code('javascript', '0'),
      code('javascript', '3'),
      code('javascript', '6'),
      code('javascript', '123'),
    ],
    'c',
    text(
      'El acumulador empieza en cero y suma los tres números. El valor inicial también define el resultado cuando el array está vacío.',
    ),
  ),
  question(
    'javascript-destructuring-101',
    'javascript',
    'intermediate',
    'destructuring',
    [
      { type: 'text', text: '¿Qué valor toma b?' },
      { type: 'code', language: 'javascript', code: 'const [a, b] = [10, 20];' },
    ],
    [
      code('javascript', '10'),
      code('javascript', '20'),
      code('javascript', 'undefined'),
      code('javascript', '[10, 20]'),
    ],
    'b',
    text(
      'La desestructuración de array asigna valores según su posición en el iterable. b recibe el segundo valor.',
    ),
  ),
  question(
    'javascript-default-parameters-101',
    'javascript',
    'intermediate',
    'default-parameters',
    [
      { type: 'text', text: '¿Qué devuelve esta llamada?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'function saludo(nombre = "Ana") { return nombre; }\nsaludo(null);',
      },
    ],
    [
      code('javascript', '"Ana"'),
      code('javascript', 'undefined'),
      code('javascript', '"null"'),
      code('javascript', 'null'),
    ],
    'd',
    text(
      'Un parámetro predeterminado se usa si el argumento falta o es undefined. null es un valor explícito y no activa ese predeterminado.',
    ),
  ),
  question(
    'javascript-rest-parameters-101',
    'javascript',
    'intermediate',
    'rest-parameters',
    [
      { type: 'text', text: '¿Qué contiene resto?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'function recoger(primero, ...resto) { return resto; }\nrecoger(1, 2, 3);',
      },
    ],
    [
      code('javascript', '[2, 3]'),
      code('javascript', '[1, 2, 3]'),
      code('javascript', '3'),
      code('javascript', '2'),
    ],
    'a',
    text(
      'Un parámetro rest reúne los argumentos restantes en un array. El primer argumento ya queda asignado a primero.',
    ),
  ),
  question(
    'javascript-spread-copy-101',
    'javascript',
    'intermediate',
    'spread-copy',
    [
      { type: 'text', text: '¿Qué muestra esta comparación?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'const a = { interno: {} };\nconst b = { ...a };\na.interno === b.interno;',
      },
    ],
    [
      code('javascript', 'false'),
      code('javascript', 'undefined'),
      code('javascript', 'true'),
      code('javascript', 'null'),
    ],
    'c',
    text(
      'El spread de objeto hace una copia superficial de propiedades. El objeto interno sigue siendo la misma referencia en las dos copias.',
    ),
  ),
  question(
    'javascript-optional-chaining-101',
    'javascript',
    'intermediate',
    'optional-chaining',
    [
      { type: 'text', text: '¿Qué produce esta expresión?' },
      { type: 'code', language: 'javascript', code: 'const usuario = null;\nusuario?.nombre;' },
    ],
    [
      code('javascript', 'null'),
      code('javascript', 'undefined'),
      code('javascript', 'false'),
      code('javascript', '""'),
    ],
    'b',
    text(
      'El encadenamiento opcional corta el acceso si la base es null o undefined y produce undefined. No convierte la ausencia en una cadena vacía.',
    ),
  ),
  question(
    'javascript-nullish-coalescing-101',
    'javascript',
    'intermediate',
    'nullish-coalescing',
    [
      { type: 'text', text: '¿Qué valor produce esta expresión?' },
      { type: 'code', language: 'javascript', code: '0 ?? 10' },
    ],
    [
      code('javascript', '10'),
      code('javascript', 'null'),
      code('javascript', 'undefined'),
      code('javascript', '0'),
    ],
    'd',
    text(
      '?? utiliza la alternativa solo cuando el operando izquierdo es null o undefined. Conserva cero, false y las cadenas vacías.',
    ),
  ),
  question(
    'javascript-closures-101',
    'javascript',
    'intermediate',
    'closures',
    '¿Qué permite un cierre léxico en JavaScript?',
    [
      text('Acceder al entorno léxico donde se creó la función'),
      text('Copiar siempre por valor todos los objetos externos'),
      text('Eliminar las variables al devolver una función'),
      text('Convertir variables locales en propiedades globales'),
    ],
    'a',
    text(
      'Una función puede conservar acceso a variables de su entorno de creación. Ese acceso se mantiene aunque la llamada que creó el entorno haya terminado.',
    ),
  ),
  question(
    'javascript-block-scope-101',
    'javascript',
    'intermediate',
    'block-scope',
    [
      { type: 'text', text: '¿Qué ocurre al ejecutar la última línea?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'if (true) { let valor = 3; }\nconsole.log(valor);',
      },
    ],
    [
      text('Imprime 3'),
      text('Imprime undefined'),
      text('Lanza ReferenceError'),
      text('Imprime null'),
    ],
    'c',
    text(
      'let tiene alcance de bloque. La variable declarada dentro del if no está disponible fuera de ese bloque.',
    ),
  ),
  question(
    'javascript-json-parse-101',
    'javascript',
    'intermediate',
    'json-parse',
    '¿Qué hace JSON.parse con una cadena JSON válida?',
    [
      text('Convierte un objeto en texto JSON'),
      text('Construye el valor representado por el texto'),
      text('Ejecuta el texto como una función JavaScript'),
      text('Añade métodos automáticamente a cada objeto'),
    ],
    'b',
    text(
      'JSON.parse interpreta la sintaxis JSON y construye su valor. JSON.stringify realiza la conversión en sentido contrario; parse no es eval.',
    ),
  ),
  question(
    'javascript-set-101',
    'javascript',
    'intermediate',
    'set',
    [
      { type: 'text', text: '¿Qué valor tiene size?' },
      { type: 'code', language: 'javascript', code: 'new Set([1, 1, 2]).size' },
    ],
    [
      code('javascript', '1'),
      code('javascript', '3'),
      code('javascript', '4'),
      code('javascript', '2'),
    ],
    'd',
    text(
      'Set conserva valores únicos. La segunda aparición del número 1 no crea otra entrada, así que quedan dos valores.',
    ),
  ),
  question(
    'javascript-map-keys-101',
    'javascript',
    'intermediate',
    'map-keys',
    '¿Qué ventaja distingue a Map de un objeto usado como diccionario de claves de cadena?',
    [
      text('Puede usar objetos como claves sin convertirlos en cadenas'),
      text('Convierte todas sus claves en nombres CSS válidos'),
      text('Ordena automáticamente las claves de menor a mayor'),
      text('Impide guardar valores undefined como entradas'),
    ],
    'a',
    text(
      'Map admite claves de cualquier tipo, incluidos objetos identificados por referencia. No ordena automáticamente las claves por su valor.',
    ),
  ),
  question(
    'javascript-async-return-101',
    'javascript',
    'intermediate',
    'async-return',
    '¿Qué devuelve una función async que ejecuta return 5?',
    [
      text('El número 5 directamente'),
      text('Una función que devuelve 5'),
      text('Una promesa que se cumple con 5'),
      text('Un iterable con cinco elementos'),
    ],
    'c',
    text(
      'Toda llamada a una función async devuelve una promesa. Un valor ordinario devuelto pasa a ser su resultado de cumplimiento.',
    ),
  ),
  question(
    'javascript-promise-catch-101',
    'javascript',
    'intermediate',
    'promise-catch',
    '¿Qué papel cumple catch en una cadena de promesas?',
    [
      text('Ejecuta el callback solo si todo se cumple'),
      text('Permite manejar un rechazo de la cadena'),
      text('Detiene automáticamente solicitudes de red'),
      text('Convierte cualquier resultado en un array'),
    ],
    'b',
    text(
      'catch registra un manejador de rechazo. Si este devuelve un valor normal, la promesa resultante puede cumplirse con ese valor y continuar la cadena.',
    ),
  ),
  question(
    'javascript-try-finally-101',
    'javascript',
    'intermediate',
    'try-finally',
    [
      {
        type: 'text',
        text: '¿Cuándo se ejecuta finally en un try ordinario que puede lanzar una excepción?',
        inlineCode: ['finally', 'try'],
      },
    ],
    [
      text('Solo cuando el try termina sin errores', ['try']),
      text('Solo cuando existe una cláusula catch', ['catch']),
      text('Solo si se llama a finally manualmente', ['finally']),
      text('Al salir del try, también si hay una excepción', ['try']),
    ],
    'd',
    text(
      'finally se ejecuta al abandonar try o catch, incluso ante una excepción o un return. Resulta útil para limpieza; un nuevo return o throw dentro de finally puede reemplazar la salida previa.',
      ['finally', 'try', 'catch', 'return', 'throw'],
    ),
  ),
  question(
    'javascript-array-slice-101',
    'javascript',
    'intermediate',
    'array-slice',
    '¿Qué diferencia slice de splice en un array?',
    [
      text('slice copia un tramo; splice modifica el array'),
      text('slice modifica el array; splice copia un tramo'),
      text('Ambos ordenan el array numéricamente'),
      text('Ambos convierten el array en una cadena'),
    ],
    'a',
    text(
      'slice devuelve una copia superficial de un tramo sin eliminarlo. splice puede insertar o eliminar elementos en el array original.',
    ),
  ),
  question(
    'javascript-module-export-101',
    'javascript',
    'intermediate',
    'module-export',
    '¿Qué import corresponde a export const total = 3 en ./datos.js?',
    [
      code('javascript', 'import total from "./datos.js";'),
      code('javascript', 'import "total" from "./datos.js";'),
      code('javascript', 'import { total } from "./datos.js";'),
      code('javascript', 'import (total) from "./datos.js";'),
    ],
    'c',
    text(
      'Una exportación con nombre se importa con ese nombre entre llaves. La importación sin llaves corresponde a una exportación default.',
    ),
  ),
  // advanced
  question(
    'javascript-microtasks-101',
    'javascript',
    'advanced',
    'microtasks',
    [
      { type: 'text', text: '¿En qué orden se registran los mensajes, sin más código pendiente?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'console.log("A");\nPromise.resolve().then(() => console.log("B"));\nconsole.log("C");',
      },
    ],
    [text('A, B, C'), text('A, C, B'), text('B, A, C'), text('C, B, A')],
    'b',
    text(
      'El callback de then se ejecuta en un trabajo posterior, después de que termine el código síncrono actual. Por ello C aparece antes que B.',
    ),
  ),
  question(
    'javascript-await-order-101',
    'javascript',
    'advanced',
    'await-order',
    [
      { type: 'text', text: '¿Qué orden produce este código?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'async function f() { console.log("A"); await 0; console.log("B"); }\nf();\nconsole.log("C");',
      },
    ],
    [text('A, B, C'), text('C, A, B'), text('B, C, A'), text('A, C, B')],
    'd',
    text(
      'La función ejecuta A de forma síncrona hasta await. Su continuación se programa después, de modo que el código llamador registra C antes de B.',
    ),
  ),
  question(
    'javascript-promise-all-101',
    'javascript',
    'advanced',
    'promise-all',
    [
      {
        type: 'text',
        text: 'Si dos promesas se cumplen en orden inverso al array de Promise.all, ¿en qué orden aparecen sus valores en el resultado?',
        inlineCode: ['Promise.all'],
      },
    ],
    [
      text('En el orden del array de entrada'),
      text('En el orden de cumplimiento'),
      text('Ordenados como cadenas de texto'),
      text('En un orden definido al azar'),
    ],
    'a',
    text(
      'Promise.all conserva la correspondencia con las posiciones de entrada, independientemente del momento en que se cumpla cada promesa.',
      ['Promise.all'],
    ),
  ),
  question(
    'javascript-promise-all-rejection-101',
    'javascript',
    'advanced',
    'promise-all-rejection',
    [
      {
        type: 'text',
        text: 'Una promesa de Promise.all rechaza mientras otras siguen pendientes. ¿Qué sucede?',
        inlineCode: ['Promise.all'],
      },
    ],
    [
      text('Espera a que todas rechacen para rechazar'),
      text('Cancela automáticamente las otras operaciones'),
      text('La promesa agregada rechaza sin cancelar las otras'),
      text('Convierte el rechazo en un resultado undefined', ['undefined']),
    ],
    'c',
    text(
      'Promise.all rechaza cuando recibe un rechazo, pero no cancela el trabajo subyacente de las demás promesas. La cancelación requiere un mecanismo independiente.',
      ['Promise.all'],
    ),
  ),
  question(
    'javascript-promise-executor-101',
    'javascript',
    'advanced',
    'promise-executor',
    [
      { type: 'text', text: '¿Qué orden produce este código?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'console.log("A");\nnew Promise(resolve => { console.log("B"); resolve(); });\nconsole.log("C");',
      },
    ],
    [text('B, A, C'), text('A, B, C'), text('A, C, B'), text('C, A, B')],
    'b',
    text(
      'El ejecutor pasado al constructor Promise se llama de forma síncrona. Los callbacks registrados con then tienen un comportamiento posterior diferente.',
    ),
  ),
  question(
    'javascript-then-return-101',
    'javascript',
    'advanced',
    'then-return',
    [
      { type: 'text', text: '¿Con qué valor se cumple la promesa final?' },
      { type: 'code', language: 'javascript', code: 'Promise.resolve(2).then(n => { n * 3; });' },
    ],
    [
      code('javascript', '6'),
      code('javascript', '2'),
      code('javascript', 'null'),
      code('javascript', 'undefined'),
    ],
    'd',
    text(
      'Un cuerpo de función con llaves necesita return para devolver el producto. Sin return, el callback devuelve undefined y la promesa resultante se cumple con ese valor.',
    ),
  ),
  question(
    'javascript-finally-promise-101',
    'javascript',
    'advanced',
    'finally-promise',
    [
      { type: 'text', text: '¿Con qué valor se cumple esta promesa?' },
      { type: 'code', language: 'javascript', code: 'Promise.resolve(2).finally(() => 9);' },
    ],
    [
      code('javascript', '2'),
      code('javascript', '9'),
      code('javascript', 'undefined'),
      code('javascript', '[2, 9]'),
    ],
    'a',
    text(
      'Un finally que termina normalmente preserva el resultado original. Su valor de retorno ordinario no sustituye al de cumplimiento; un throw o rechazo sí puede cambiar la salida.',
      ['finally', 'throw'],
    ),
  ),
  question(
    'javascript-lexical-this-101',
    'javascript',
    'advanced',
    'lexical-this',
    '¿Qué determina this dentro de una función flecha?',
    [
      text('El objeto usado después con call'),
      text('El primer argumento de la flecha'),
      text('El this del entorno léxico de creación'),
      text('El último objeto que almacene la flecha'),
    ],
    'c',
    text(
      'Las flechas no crean su propio enlace this. call, apply y bind no pueden sustituir el this capturado desde su entorno.',
    ),
  ),
  question(
    'javascript-detached-method-101',
    'javascript',
    'advanced',
    'detached-method',
    [
      { type: 'text', text: 'En modo estricto, ¿qué ocurre en la última línea?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'const objeto = { x: 1, leer() { return this.x; } };\nconst leer = objeto.leer;\nleer();',
      },
    ],
    [
      text('Devuelve 1'),
      text('Lanza TypeError'),
      text('Devuelve null'),
      text('Devuelve el objeto'),
    ],
    'b',
    text(
      'La llamada separada no tiene un receptor y this es undefined en modo estricto. Intentar acceder a this.x lanza TypeError.',
    ),
  ),
  question(
    'javascript-temporal-dead-zone-101',
    'javascript',
    'advanced',
    'temporal-dead-zone',
    [
      { type: 'text', text: '¿Qué ocurre dentro de este bloque?' },
      { type: 'code', language: 'javascript', code: '{ console.log(typeof dato); let dato = 1; }' },
    ],
    [
      text('Imprime "undefined"'),
      text('Imprime "number"'),
      text('Imprime "object"'),
      text('Lanza ReferenceError'),
    ],
    'd',
    text(
      'La variable léxica existe pero aún no está inicializada. Incluso typeof lanza ReferenceError al acceder a un enlace en su zona muerta temporal.',
    ),
  ),
  question(
    'javascript-loop-closures-101',
    'javascript',
    'advanced',
    'loop-closures',
    [
      { type: 'text', text: '¿Qué array devuelve la última línea?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'const funciones = [];\nfor (let i = 0; i < 3; i++) funciones.push(() => i);\nfunciones.map(f => f());',
      },
    ],
    [
      code('javascript', '[0, 1, 2]'),
      code('javascript', '[3, 3, 3]'),
      code('javascript', '[2, 2, 2]'),
      code('javascript', '[1, 2, 3]'),
    ],
    'a',
    text(
      'El let del bucle crea enlaces por iteración. Cada cierre conserva el i correspondiente, a diferencia del enlace compartido que produciría var.',
    ),
  ),
  question(
    'javascript-object-is-101',
    'javascript',
    'advanced',
    'object-is',
    [
      { type: 'text', text: '¿Qué valor produce esta comparación?' },
      { type: 'code', language: 'javascript', code: 'Object.is(NaN, NaN)' },
    ],
    [
      code('javascript', 'undefined'),
      code('javascript', 'false'),
      code('javascript', 'true'),
      code('javascript', 'null'),
    ],
    'c',
    text(
      'Object.is usa SameValue y considera iguales dos NaN. La igualdad estricta === devuelve false al comparar NaN consigo mismo.',
    ),
  ),
  question(
    'javascript-same-value-zero-101',
    'javascript',
    'advanced',
    'same-value-zero',
    [
      { type: 'text', text: '¿Cuántas entradas contiene este Set?' },
      { type: 'code', language: 'javascript', code: 'new Set([NaN, NaN, 0, -0]).size' },
    ],
    [
      code('javascript', '4'),
      code('javascript', '2'),
      code('javascript', '3'),
      code('javascript', '1'),
    ],
    'b',
    text(
      'Set compara mediante SameValueZero: considera iguales los NaN y también 0 y -0. Quedan una entrada NaN y una entrada cero.',
    ),
  ),
  question(
    'javascript-property-order-101',
    'javascript',
    'advanced',
    'property-order',
    [
      { type: 'text', text: '¿Qué array devuelve Object.keys?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'Object.keys({ 2: "b", 1: "a", z: "c", a: "d" });',
      },
    ],
    [
      code('javascript', '["2", "1", "z", "a"]'),
      code('javascript', '["a", "z", "1", "2"]'),
      code('javascript', '["1", "2", "a", "z"]'),
      code('javascript', '["1", "2", "z", "a"]'),
    ],
    'd',
    text(
      'Las claves que son índices de array se enumeran primero en orden numérico ascendente. Las otras claves de cadena siguen su orden de creación en este objeto ordinario.',
    ),
  ),
  question(
    'javascript-shallow-freeze-101',
    'javascript',
    'advanced',
    'shallow-freeze',
    [
      { type: 'text', text: '¿Qué ocurre con esta asignación?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'const o = Object.freeze({ interno: { n: 1 } });\no.interno.n = 2;',
      },
    ],
    [
      text('El objeto interno cambia su n a 2'),
      text('El objeto interno permanece con n igual a 1'),
      text('Siempre se lanza TypeError por freeze'),
      text('Se crea una copia automática de interno'),
    ],
    'a',
    text(
      'Object.freeze es superficial: congela las propiedades del objeto recibido. El objeto anidado no queda congelado automáticamente y su n puede modificarse.',
    ),
  ),
  question(
    'javascript-prototype-own-101',
    'javascript',
    'advanced',
    'prototype-own',
    [
      { type: 'text', text: '¿Qué devuelve la última expresión?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'const base = { x: 1 };\nconst objeto = Object.create(base);\nObject.hasOwn(objeto, "x");',
      },
    ],
    [
      code('javascript', 'true'),
      code('javascript', 'undefined'),
      code('javascript', 'false'),
      code('javascript', 'null'),
    ],
    'c',
    text(
      'x se hereda del prototipo, pero no es una propiedad propia de objeto. Object.hasOwn distingue esas propiedades de las heredadas.',
    ),
  ),
  question(
    'javascript-generator-laziness-101',
    'javascript',
    'advanced',
    'generator-laziness',
    '¿Cuándo empieza a ejecutarse el cuerpo de una función generadora al usarla normalmente?',
    [
      text('Al evaluar su declaración'),
      text('Al llamar por primera vez a next()', ['next()']),
      text('Al obtener el objeto generador mediante la llamada'),
      text('Al consultar su propiedad Symbol.iterator'),
    ],
    'b',
    text(
      'Llamar a una función generadora crea un objeto generador suspendido. El cuerpo comienza al reanudarlo con next().',
      ['next()'],
    ),
  ),
  question(
    'javascript-iterator-completion-101',
    'javascript',
    'advanced',
    'iterator-completion',
    [
      { type: 'text', text: '¿Qué resultado devuelve la segunda llamada a next()?' },
      {
        type: 'code',
        language: 'javascript',
        code: 'function* g() { yield 1; return 2; }\nconst it = g();\nit.next();\nit.next();',
      },
    ],
    [
      code('javascript', '{ value: 1, done: false }'),
      code('javascript', '{ value: 2, done: false }'),
      code('javascript', '{ value: undefined, done: true }'),
      code('javascript', '{ value: 2, done: true }'),
    ],
    'd',
    text(
      'La primera llamada entrega el yield. La segunda alcanza return, que termina el generador y entrega su valor con done: true.',
    ),
  ),
  question(
    'javascript-numeric-sort-101',
    'javascript',
    'advanced',
    'numeric-sort',
    [
      {
        type: 'text',
        text: '¿Qué resultado produce este sort sin comparador?',
        inlineCode: ['sort'],
      },
      { type: 'code', language: 'javascript', code: '[2, 10, 1].sort();' },
    ],
    [
      code('javascript', '[1, 10, 2]'),
      code('javascript', '[1, 2, 10]'),
      code('javascript', '[10, 2, 1]'),
      code('javascript', '[2, 10, 1]'),
    ],
    'a',
    text(
      'Sin comparador, sort ordena según representaciones de cadena. Para ordenar estos números de menor a mayor puede usarse (a, b) => a - b; sort modifica el array.',
      ['sort', '(a, b) => a - b'],
    ),
  ),
  question(
    'javascript-bigint-mixing-101',
    'javascript',
    'advanced',
    'bigint-mixing',
    [
      { type: 'text', text: '¿Qué ocurre al evaluar esta suma?' },
      { type: 'code', language: 'javascript', code: '1n + 1' },
    ],
    [text('Devuelve 2n'), text('Devuelve 2'), text('Lanza TypeError'), text('Devuelve NaN')],
    'c',
    text(
      'La suma no mezcla directamente BigInt y Number. Hay que convertir explícitamente a un tipo común teniendo en cuenta los límites de precisión.',
    ),
  ),
] as const satisfies readonly BankQuestion[];
