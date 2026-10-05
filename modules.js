window.M4N_MODULES = {
orientation:{
 id:"orientation", number:0, title:"Orientación en M4N",
 competency:"Orientarse en M4N, elegir la interfaz y el objeto correctos y verificar el contexto operativo.",
 level:"Guiado → Autónomo", duration:"20–30 min",
 learn:["Distinguir cuándo usar SCExpert y cuándo RDT.","Reconocer SKU, LPN, ubicación, tarea, ola, Picklist y Shipment dentro de una situación operativa.","Verificar el Warehouse activo antes de operar.","Usar menú y Go To con criterio."],
 needs:["Acceso a SCExpert y RDT.","Usuario habilitado.","Al menos un Warehouse visible.","Un LPN y un SKU de ejemplo para exploración."],
 result:"Poder recibir una situación operativa y decidir dónde empezar a investigar en M4N.",
 weights:{context:5,concepts:10,setup:5,guided:25,checkpoint:20,scenario:15,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},
  {id:"context",title:"Situación"},
  {id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},
  {id:"guided",title:"Práctica guiada"},
  {id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Semiguiado"},
  {id:"challenge",title:"Desafío"},
  {id:"close",title:"Cierre"}
 ],
 manual:"Capítulos 1, 2 y 3 – Introducción, Conceptos básicos y Navegación",
 setup:["Warehouse activo visible","Usuario con acceso a SCExpert/RDT","LPN de ejemplo","SKU de ejemplo"],
 expected:"El participante identifica la interfaz adecuada, verifica el Warehouse y utiliza menú/Go To sin confundir objetos.",
 critical:["Operar sin confirmar el Warehouse activo.","Confundir SCExpert con RDT para el tipo de acción requerida.","Inventar o asumir una pantalla/código no documentado."],
 allowedHints:["Recordar si la necesidad es de administración/consulta o ejecución en piso.","Orientar hacia menú mientras aprende y Go To cuando conoce el código.","Recordar que LO es una consulta documentada de inventario por LPN."]
},
masterdata:{
 id:"masterdata", number:1, title:"Datos Maestros",
 competency:"Consultar e interpretar los parámetros maestros que condicionan la operación de un SKU.",
 level:"Guiado → Autónomo", duration:"25–35 min",
 learn:["Localizar un SKU desde Datos Maestros / SKUs (ST).","Interpretar la jerarquía de UDM y sus relaciones.","Interpretar SKU Class, VU IN y VU OUT.","Identificar ubicaciones de Picking y parámetros NORMALMINLEVEL/HOTMAXLEVEL."],
 needs:["Acceso de consulta a SCExpert.","Warehouse correcto.","SKU configurado con UDM y parámetros maestros.","Ubicación de Picking asociada cuando aplique."],
 result:"Poder analizar un SKU antes de operarlo y explicar qué configuraciones pueden afectar Recepción, Planning, Picking y Reposición.",
 weights:{context:5,concepts:10,setup:5,guided:25,checkpoint:20,scenario:15,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},
  {id:"context",title:"Situación"},
  {id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},
  {id:"guided",title:"Práctica guiada"},
  {id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Semiguiado"},
  {id:"challenge",title:"Desafío"},
  {id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 4 – Datos Maestros y configuración de SKU",
 setup:["Usuario con acceso de consulta","Warehouse correcto","SKU existente","UDM/clase/VU configurados","Picking location cuando aplique"],
 expected:"El participante localiza el SKU, interpreta UDM, clase, vida útil, Picking y reposición sin modificar la configuración.",
 critical:["Modificar un parámetro maestro durante una práctica de consulta.","Interpretar VU IN como VU OUT o viceversa.","Asumir controles de lote/vencimiento que la SKU Class no exige."],
 allowedHints:["Orientar a Master Data / Datos Maestros → SKUs (ST).","Pedir que siga la jerarquía de UDM de menor a mayor.","Recordar que SKU Class condiciona atributos y que NORMALMINLEVEL/HOTMAXLEVEL pertenecen a la relación con Picking."]
},
inbound:{
 id:"inbound", number:2, title:"Recepción / Inbound",
 competency:"Registrar correctamente mercadería recibida en M4N.",
 level:"Guiado → Autónomo", duration:"25–35 min",
 learn:[
  "Localizar una Orden de Entrada.",
  "Comprender la diferencia entre Orden de Entrada y Recibo.",
  "Crear un Recibo desde la Orden.",
  "Crear y validar un LPN con cantidad, UDM, lote, vencimiento, estado y ubicación correctos.",
  "Resolver correctamente una diferencia según el estado del Recibo."
 ],
 needs:[
  "Acceso a M4N.",
  "Orden de Entrada disponible.",
  "Usuario habilitado.",
  "SKU y atributos maestros configurados.",
  "Ubicación de recepción operable."
 ],
 result:"Poder completar una recepción y explicar qué información quedó registrada en M4N.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},
  {id:"context",title:"Situación"},
  {id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},
  {id:"guided",title:"Práctica guiada"},
  {id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario alternativo"},
  {id:"challenge",title:"Desafío"},
  {id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 6 – Recepción / Inbound",
 setup:[
  "Orden de Entrada disponible.",
  "Usuario habilitado.",
  "SKU y atributos maestros configurados.",
  "Ubicación de recepción operable."
 ],
 expected:"LPN creados con cantidad, UDM, lote/vencimiento/estado correctos; Recibo y Orden cerrados cuando corresponde.",
 critical:[
  "Cerrar el Recibo antes de validar los LPN.",
  "Ignorar una diferencia física conocida.",
  "Aplicar un Ajuste de Inventario sin evaluar si el Recibo abierto permite corregir dentro del flujo de Recepción.",
  "Registrar cantidad, UDM, lote, vencimiento, estado o ubicación que no coinciden con la mercadería física."
 ],
 allowedHints:[
  "Orientar hacia SCExpert para localizar la Orden y crear el Recibo.",
  "Recordar IO / Recepción → Crear LPN.",
  "Indicar que debe comparar físico vs. sistema antes del cierre.",
  "Preguntar primero por el estado del Recibo ante una corrección."
 ]
},
putaway:{
 id:"putaway", number:3, title:"Putaway",
 competency:"Almacenar correctamente un LPN respetando la estrategia de almacenamiento y verificando dónde terminó.",
 level:"Guiado → Autónomo", duration:"20–30 min",
 learn:[
  "Identificar un LPN recibido que requiere almacenamiento.",
  "Utilizar Reacomodar LPN o continuar desde Crear y Acomodar cuando corresponda.",
  "Interpretar la ubicación destino sugerida por M4N.",
  "Coordinar el movimiento físico con la confirmación en el sistema.",
  "Verificar la ubicación final y actuar correctamente si la sugerencia no puede utilizarse."
 ],
 needs:[
  "LPN existente y disponible.",
  "Estrategia de almacenamiento configurada.",
  "Ubicación destino operable.",
  "Usuario con acceso al Capturador / RDT."
 ],
 result:"Poder almacenar un LPN respetando la sugerencia de M4N y verificar que la ubicación registrada coincida con la ubicación física.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario alternativo"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 7 – Guardado / Putaway",
 setup:[
  "LPN existente y disponible.",
  "Estrategia de almacenamiento configurada.",
  "Ubicación destino operable.",
  "Warehouse correcto y usuario habilitado."
 ],
 expected:"LPN trasladado físicamente y confirmado en la ubicación destino registrada en M4N.",
 critical:[
  "Confirmar una ubicación en M4N antes de verificar que el LPN quedó físicamente allí.",
  "Trasladar físicamente el LPN sin registrar el destino en M4N.",
  "Elegir arbitrariamente otra ubicación cuando la sugerida no puede utilizarse.",
  "Operar sobre un LPN incorrecto o confirmar un destino incompatible."
 ],
 allowedHints:[
  "Orientar a RDT → Recepción → Reacomodar LPN, o continuar desde Crear y Acomodar.",
  "Recordar que M4N propone destino según las estrategias de almacenamiento.",
  "Recordar que el movimiento físico debe preceder a la confirmación del destino.",
  "Ante una ubicación no operable, orientar a informar al Supervisor antes de utilizar una alternativa."
 ]
},
inventory:{
 id:"inventory", number:4, title:"Inventario",
 competency:"Investigar la situación real del inventario antes de intentar corregirlo.",
 level:"Guiado → Autónomo", duration:"25–35 min",
 learn:[
  "Consultar inventario por LPN y por SKU utilizando LO.",
  "Interpretar ubicación, cantidad, estado, lote y vencimiento.",
  "Utilizar AH para reconstruir movimientos y acciones históricas.",
  "Distinguir un problema de ubicación, estado, atributo o cantidad.",
  "Definir el siguiente paso sin modificar inventario antes de identificar la causa."
 ],
 needs:[
  "Warehouse correcto.",
  "Identificador disponible, preferentemente LPN.",
  "Acceso de consulta a LO y AH.",
  "Inventario disponible para validación física cuando el ejercicio lo requiera."
 ],
 result:"Poder reconstruir qué ocurrió con un inventario y definir qué tipo de acción correspondería sin modificar datos innecesariamente.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario alternativo"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 8 – Gestión y consulta de Inventario",
 setup:[
  "Warehouse correcto.",
  "LPN de investigación disponible.",
  "Acceso a LO – Inventario por LPN.",
  "Acceso a AH – Historia de Actividad."
 ],
 expected:"Situación del inventario identificada mediante LO + AH + validación física, con el tipo de problema y siguiente acción correctamente determinados.",
 critical:[
  "Modificar inventario antes de investigar la causa.",
  "Confundir ubicación, estado, atributo y cantidad como si fueran el mismo tipo de diferencia.",
  "Asumir qué ocurrió sin revisar AH.",
  "Utilizar un ajuste como primera respuesta ante una diferencia."
 ],
 allowedHints:[
  "Orientar primero a LO para establecer qué cree M4N que existe.",
  "Luego orientar a AH para reconstruir la secuencia de acciones.",
  "Recordar la secuencia LO → AH → físico/conteo → corrección autorizada.",
  "Ayudar a clasificar la diferencia como ubicación, estado, atributo o cantidad sin ejecutar la corrección."
 ]
},
replenishment:{
 id:"replenishment", number:5, title:"Reposición",
 competency:"Comprender por qué se necesita una reposición, ejecutarla correctamente y saber qué revisar si no aparece.",
 level:"Guiado → Autónomo", duration:"25–35 min",
 learn:[
  "Comprender la relación entre ubicación de Picking y stock de reserva.",
  "Interpretar NORMALMINLEVEL y diferenciar reposición automática, urgente y manual según las condiciones documentadas en el Manual.",
  "Comprender por qué M4N utiliza FEFO para seleccionar inventario origen.",
  "Obtener y ejecutar una tarea de reposición mediante RDT.",
  "Validar LPN origen y ubicación de Picking destino.",
  "Investigar por qué una reposición esperada no aparece antes de forzar una alternativa."
 ],
 needs:[
  "Ubicación de Picking configurada.",
  "Stock origen disponible.",
  "Políticas de reposición configuradas.",
  "Usuario con rol de Maquinista para ejecutar tareas."
 ],
 result:"Poder explicar por qué corresponde una reposición, ejecutar la tarea asignada por M4N y diagnosticar por qué no aparece cuando se esperaba.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario alternativo"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 9 – Reposición / Reabastecimiento",
 setup:[
  "Ubicación de Picking configurada.",
  "Stock origen disponible.",
  "Políticas de reposición vigentes.",
  "Usuario Maquinista con acceso a Obtener Tareas."
 ],
 expected:"Inventario trasladado a la ubicación de Picking indicada y criterio correcto para investigar una reposición faltante.",
 critical:[
  "Elegir libremente un LPN origen distinto del asignado por M4N.",
  "Ignorar FEFO al interpretar el inventario origen.",
  "Confirmar una ubicación destino distinta de la indicada.",
  "Forzar una reposición manual sin investigar primero por qué no existe una tarea."
 ],
 allowedHints:[
  "Orientar a RDT → Obtener Tareas para la ejecución operativa.",
  "Recordar que M4N selecciona el origen según FEFO.",
  "Recordar que la asignación de tarea considera rol, área, Warehouse, prioridad y disponibilidad.",
  "Ante una tarea ausente, orientar a revisar stock FEFO, configuración, tarea disponible y rol/área antes de pensar en una manual."
 ]
},
planning:{
 id:"planning", number:6, title:"Planning y Olas",
 competency:"Comprender cómo M4N asigna inventario a una Ola, interpretar excepciones y decidir cuándo corresponde liberar.",
 level:"Guiado → Autónomo", duration:"30–40 min",
 learn:[
  "Comprender qué representa una Ola y qué intenta hacer el Planning.",
  "Trabajar desde Waves (WS) y revisar Staging antes de Planear cuando corresponda.",
  "Diferenciar Planear de Liberar.",
  "Interpretar asignación de inventario y excepciones.",
  "Comprender Wave Mode y sobreasignación según la estrategia.",
  "Investigar por qué una línea no se asigna antes de liberar.",
  "Si una excepción se corrige y la Ola se vuelve a Planear, revisar el nuevo resultado y volver a Liberar cuando se necesiten nuevas tareas."
 ],
 needs:[
  "Órdenes disponibles.",
  "Estrategia de asignación configurada.",
  "Ubicaciones de Picking configuradas.",
  "Inventario y atributos válidos.",
  "Staging definido cuando aplique."
 ],
 result:"Poder analizar el resultado del Planning, explicar una excepción y decidir si una Ola está lista para Liberar.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario alternativo"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 10 – Planning y generación de olas",
 setup:[
  "Órdenes disponibles.",
  "Ola disponible para trabajar según el flujo operativo.",
  "Estrategia de asignación configurada.",
  "Ubicaciones de Picking e inventario/atributos válidos.",
  "Staging definido cuando aplique."
 ],
 expected:"Ola planeada, excepciones interpretadas y tratadas, y Liberación realizada únicamente cuando corresponde.",
 critical:[
  "Liberar una Ola sin revisar el resultado del Planning.",
  "Ignorar líneas no asignadas o excepciones.",
  "Asumir que stock físico equivale siempre a inventario asignable.",
  "Forzar estados, atributos o cantidades para eliminar una excepción."
 ],
 allowedHints:[
  "Orientar a Warehouse → Outbound Process → Waves (WS).",
  "Recordar que, cuando la operación necesita direccionar la preparación hacia un Staging específico, debe asignarlo antes de Planear la Ola.",
  "Recordar que Planear asigna inventario y Liberar genera trabajo ejecutable.",
  "Ante una línea no asignada, revisar stock, Picking, estado, atributos y reposición antes de liberar."
 ]
},
picking:{
 id:"picking", number:7, title:"Picking",
 competency:"Ejecutar correctamente una tarea de Picking, validar lo asignado por M4N y detenerse ante una diferencia física.",
 level:"Guiado → Autónomo", duration:"30–40 min",
 learn:[
  "Comprender que Picking ejecuta físicamente la decisión tomada durante Planning.",
  "Obtener trabajo mediante Obtener Tareas.",
  "Interpretar ubicación origen, SKU, presentación/UDM, cantidad y, cuando corresponda, LPN específico.",
  "Diferenciar Picking estándar de Full Pick.",
  "Confirmar únicamente lo que M4N solicita y lo que físicamente se encuentra.",
  "Usar Conteo ante una diferencia de cantidad y comprender cómo se reconstruye el flujo después."
 ],
 needs:[
  "Ola liberada.",
  "Picklist/tarea disponible.",
  "Rol y área habilitada.",
  "Inventario/reposición disponible."
 ],
 result:"Poder ejecutar una tarea de Picking y reconocer cuándo debe detenerse y registrar una diferencia en lugar de improvisar.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario alternativo"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 11 – Picking / Preparación de pedidos",
 setup:[
  "Ola liberada.",
  "Picklist/tarea disponible.",
  "Rol y área habilitada.",
  "Inventario o reposición requerida disponible.",
  "Staging asociado a la Ola cuando corresponda."
 ],
 expected:"Tarea de Picking ejecutada respetando ubicación, SKU, presentación/UDM, cantidad y LPN cuando aplique; diferencia tratada mediante el flujo documentado.",
 critical:[
  "Confirmar un LPN diferente del indicado en Full Pick.",
  "Forzar una cantidad cuando el físico no coincide con M4N.",
  "Continuar el Picking pese a una inconsistencia de ubicación, SKU, UDM o cantidad.",
  "Elegir otro inventario por conveniencia en lugar de ejecutar lo asignado por M4N.",
  "No validar la presentación/UDM solicitada."
 ],
 allowedHints:[
  "Orientar a RDT → Obtener Tareas.",
  "Recordar que el Picker ejecuta la decisión de Planning y no elige libremente inventario.",
  "Recordar que Picking estándar valida ubicación, presentación, SKU y cantidad.",
  "En Full Pick, orientar a confirmar el LPN completo.",
  "Ante diferencia física de cantidad, orientar a Conteo y no forzar cantidad."
 ]
},
exceptions:{
 id:"exceptions", number:8, title:"Excepciones",
 competency:"Reconocer una excepción, investigar su causa y elegir el siguiente paso sin modificar datos solo para destrabar.",
 level:"Guiado → Autónomo", duration:"35–45 min",
 learn:[
  "Interpretar una excepción como una condición que impide completar una asignación o tarea bajo las reglas configuradas.",
  "Investigar mediante WS, LO, AH y validación física cuando corresponda.",
  "Distinguir falta de stock, stock fuera de Picking, SKU sin Picking, estado no disponible, atributos faltantes y diferencias físicas.",
  "Reconocer cuándo interviene Reposición.",
  "Revisar tareas mediante las herramientas documentadas cuando el trabajo no aparece.",
  "Reconstruir el flujo mediante replaneo y nueva Liberación cuando corresponda."
 ],
 needs:[
  "Acceso a WS, LO, AH, IH, LD, RJ y conteos según el caso.",
  "Validación física cuando corresponda.",
  "Ola/Picklist/tarea o identificador del inventario involucrado."
 ],
 result:"Poder identificar la causa de una excepción y definir la acción siguiente sin corregir síntomas ni perder trazabilidad.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario semiguiado"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 12 – Excepciones de Picking y Olas",
 setup:[
  "Identificador de Ola/Picklist/tarea o inventario afectado.",
  "Acceso a WS, LO y AH para investigación.",
  "Acceso a procesos específicos de corrección solo si el caso y el rol lo requieren.",
  "Posibilidad de validar físicamente cuando corresponda."
 ],
 expected:"Causa identificada, acción correcta definida y flujo reconstruido mediante replaneo/liberación únicamente cuando corresponda.",
 critical:[
  "Corregir antes de investigar la causa.",
  "Cambiar estado, atributos o cantidades solo para hacer desaparecer una excepción.",
  "Asumir que stock físico implica inventario asignable.",
  "Generar o forzar reposición sin validar la causa.",
  "Liberar una Ola sin revisar o tratar las excepciones.",
  "Omitir replaneo o nueva Liberación cuando el caso documentado requiere generar nuevas tareas."
 ],
 allowedHints:[
  "Orientar primero a identificar qué condición no se cumple.",
  "Usar WS para la excepción y LO/AH para investigar inventario e historia.",
  "Separar stock físico de inventario elegible.",
  "Corregir la causa, no el síntoma.",
  "Después de una corrección, reconstruir el flujo: replanear, revisar el resultado y liberar nuevamente cuando se necesiten nuevas tareas."
 ]
},
consolidation:{
 id:"consolidation", number:9, title:"Consolidación",
 competency:"Consolidar correctamente contenedores relacionados, respetando origen, destino informado por M4N y trazabilidad.",
 level:"Guiado → Autónomo", duration:"20–30 min",
 learn:[
  "Comprender cuándo se utiliza la Consolidación después del Picking.",
  "Identificar contenedor origen y contenedor destino.",
  "Validar el destino informado por M4N antes de consolidar.",
  "Utilizar referencia de LPN cuando corresponda.",
  "Ejecutar Consolidate sin inventar una relación alternativa.",
  "Verificar la relación resultante porque M4N no muestra un mensaje adicional de confirmación."
 ],
 needs:["Contenedores identificados.","Relación de consolidación definida por el proceso operativo.","Acceso a RDT → Picking → Consolidación."],
 result:"Poder consolidar contenedores relacionados y comprobar que el origen quedó actualizado dentro del destino correcto.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[{id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},{id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},{id:"scenario",title:"Escenario alternativo"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}],
 manual:"Capítulo 14 – Consolidación de Contenedores",
 setup:["Contenedor origen identificado.","Contenedor destino informado por M4N.","Acceso al menú Picking en RDT.","Referencia de LPN disponible cuando corresponda."],
 expected:"Relación entre contenedor origen y destino actualizada y verificada.",
 critical:["Escanear un contenedor origen incorrecto.","No validar el contenedor destino informado por M4N.","Ejecutar Consolidate con identificadores incorrectos.","Asumir que la operación terminó correctamente sin verificar la relación resultante."],
 allowedHints:["Orientar a RDT → Picking → Consolidación.","Recordar que el origen se informa en De contenedor.","Recordar que el destino debe validarse en A contenedor.","No asumir un destino alternativo ni inventar un override.","Después de Consolidate, verificar la relación porque no aparece un mensaje adicional de confirmación."]
},
dispatch:{
 id:"dispatch", number:10, title:"Despacho / Shipping",
 competency:"Controlar y ejecutar correctamente la carga de un Shipment, validar cada LPN/Contenedor y cerrar únicamente cuando esté listo.",
 level:"Guiado → Autónomo", duration:"30–40 min",
 learn:["Comprender la relación entre viaje, Shipment, Dock y carga.","Diferenciar Dock informado automáticamente de asignación manual de Dock.","Utilizar OLS y Dashboard de Carga como herramientas de control.","Ejecutar RDT → Picking → Carga Camión.","Validar cada LPN/Contenedor contra el Shipment antes de cargarlo físicamente.","Detener un elemento rechazado por M4N.","Ejecutar Salida de Envíos únicamente cuando no haya pendientes y el Shipment esté CARGADO."],
 needs:["Viaje en condición En muelle.","Shipment creado/habilitado.","Dock asignado.","Pedido ruteado y en viaje.","LPN/Contenedores preparados y estado habilitado para carga."],
 result:"Poder controlar la carga elemento por elemento y determinar correctamente cuándo corresponde cerrar el Shipment.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[{id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},{id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},{id:"scenario",title:"Escenario alternativo"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}],
 manual:"Capítulo 15 – Despacho / Shipping",
 setup:["Shipment creado/habilitado.","Dock asignado o condición para asignarlo según el flujo documentado.","LPN/Contenedores asociados al Shipment.","Acceso a DDC, OLS y RDT → Picking → Carga Camión."],
 expected:"Todos los LPN/Contenedores cargados, Shipment en CARGADO y salida confirmada por Supervisor.",
 critical:["Cargar físicamente un LPN/Contenedor rechazado por M4N.","Cargar un elemento perteneciente a otro Shipment.","Ignorar pendientes del Dashboard de Carga.","Ejecutar Salida de Envíos antes de que el Shipment esté CARGADO.","Confundir la asignación de Dock con el cierre de carga."],
 allowedHints:["Orientar a SE para estado de Shipment y a DDC/OLS para control de carga.","Recordar que cada elemento se escanea físicamente y se valida contra el Shipment.","Si M4N rechaza un código, detener ese elemento y revisar su asociación antes de subirlo al camión.","Recordar que Dock informado y Dock no informado siguen tratamientos diferentes.","Salida de Envíos solo corresponde con Shipment CARGADO y sin pendientes."]
},
counts:{
 id:"counts", number:11, title:"Inventarios y Conteos",
 competency:"Ejecutar correctamente un conteo, interpretar una diferencia y comprender qué debe ocurrir antes de convertirla en un ajuste.",
 level:"Guiado → Autónomo", duration:"35–45 min",
 learn:[
  "Diferenciar inventario planificado de conteo libre de ubicación.",
  "Comprender que los conteos son ciegos y deben reflejar lo que existe físicamente.",
  "Ejecutar un Conteo de ubicación completo antes de seleccionar Fin Conteo.",
  "Interpretar LIMBO como instancia de investigación y no como pérdida definitiva.",
  "Diferenciar IJ, LD, IH e IV según el tipo de corrección.",
  "Aplicar la secuencia LO → AH → físico/conteo → causa → ajuste.",
  "Comprender la obligatoriedad de Razón de Ajuste y Notas sin asumir un catálogo universal."
 ],
 needs:[
  "Usuario habilitado.",
  "Ubicación definida.",
  "Reglas de conteo.",
  "Acceso de Analista de Inventarios para tratar LIMBO/ajustes cuando corresponda."
 ],
 result:"Saber realizar un conteo completo y entender cómo investigar una diferencia antes de ajustar.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario alternativo"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 16 – Inventarios, Conteos y Ajustes",
 setup:[
  "Usuario habilitado.",
  "Ubicación definida.",
  "Acceso a Capturador → Conteo → Conteo de ubicación.",
  "Acceso a LO/AH y herramientas de corrección según rol y caso."
 ],
 expected:"Conteo completo; diferencias aisladas e investigadas; ajuste trazable solo cuando corresponde.",
 critical:[
  "Cerrar un conteo sin informar todo el contenido físico.",
  "Ajustar sin investigar.",
  "Utilizar IJ para corregir atributos o estados.",
  "Interpretar LIMBO como pérdida definitiva.",
  "Cerrar una diferencia sin revisar LIMBO.",
  "Omitir Razón de Ajuste.",
  "Omitir Notas.",
  "Modificar datos únicamente para hacer coincidir sistema y físico."
 ],
 allowedHints:[
  "Recordar que un conteo no equivale a un ajuste.",
  "Orientar a Capturador → Conteo → Conteo de ubicación.",
  "Antes de Fin Conteo, revisar que se haya informado todo el contenido físico.",
  "Ante diferencia, orientar a LIMBO + LO/AH + validación física antes de decidir corrección.",
  "Recordar: IJ cantidades/estructura; LD atributos; IH estado; IV movimiento."
 ]
},
returns:{
 id:"returns", number:12, title:"Devoluciones y Redespachos",
 competency:"Distinguir una devolución que vuelve a stock de un redespacho y preservar correctamente el inventario según la decisión del cliente.",
 level:"Guiado → Autónomo", duration:"35–45 min",
 learn:[
  "Comprender que una devolución no vuelve automáticamente a stock.",
  "Identificar la decisión del cliente antes de mover o modificar inventario.",
  "Ejecutar el flujo documentado para una devolución que vuelve a stock.",
  "Usar la ubicación de devoluciones definida por cada CD sin hardcodear DEV01.",
  "Validar condición física antes de reincorporar producto a Picking.",
  "Preservar el inventario preparado en un redespacho.",
  "Comprender que Devolución recibida = Sí no habilita inmediatamente el reruteo.",
  "Esperar Orden cerrada = Sí antes de que la orden vuelva a estar disponible en Unigis."
 ],
 needs:[
  "Definición del cliente sobre destino.",
  "Orden de Entrada de devolución.",
  "Ubicación de devolución definida por el CD.",
  "Equipo de Devoluciones."
 ],
 result:"Saber distinguir devolución a stock de redespacho y aplicar el tratamiento documentado sin perder trazabilidad.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario semiguiado"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 18 – Devoluciones y Redespachos",
 setup:[
  "Orden de Entrada de devolución disponible.",
  "Definición del cliente: vuelve a stock o redespacho.",
  "Ubicación de devoluciones definida por el CD.",
  "LPN/inventario identificado."
 ],
 expected:"Producto apto reincorporado a Picking o inventario preparado preservado correctamente para redespacho.",
 critical:[
  "Reincorporar producto a stock sin validar condición física.",
  "Asumir que toda devolución vuelve a stock.",
  "Utilizar DEV01 como ubicación universal.",
  "Desarmar inventario destinado a redespacho.",
  "No registrar Devolución recibida cuando corresponde.",
  "Asumir que Devolución recibida = Sí habilita inmediatamente el reruteo.",
  "Perder identificación del inventario preparado.",
  "Crear nuevamente una preparación que debía conservarse."
 ],
 allowedHints:[
  "Primero confirmar la decisión del cliente.",
  "Para vuelta a stock: IO → Recibo → recepción → ubicación de devoluciones del CD → validación física → Acomodar LPN si está apto.",
  "Para redespacho: conservar el inventario preparado y registrar Devolución recibida = Sí cuando corresponde.",
  "Recordar que el reruteo depende de Orden cerrada = Sí después del proceso de Liquidaciones.",
  "DEV01 es solo un ejemplo, no una ubicación universal."
 ]
},
rolesTasks:{
 id:"rolesTasks", number:13, title:"Roles y Administración de Tareas",
 competency:"Comprender por qué un usuario recibe determinadas tareas e investigar o administrar su asignación sin romper el proceso origen.",
 level:"Guiado → Autónomo", duration:"30–40 min",
 learn:[
  "Comprender la regla de asignación de Obtener Tareas.",
  "Diferenciar Rol, Área habilitada y Warehouse.",
  "Utilizar UP Role Assignment / Users, TS Tasks y RDT Obtener Tareas según el objetivo.",
  "Consultar en TS ID, tipo, estado, tipo de asignación, usuario, prioridad, propietario, Picklist y SKU.",
  "Diferenciar Asignar, Desasignar y Cancelar.",
  "Comprender que la prioridad 200 puede aparecer como valor por defecto pero no es una regla universal.",
  "Comprender que cancelar una tarea no elimina necesariamente la necesidad del proceso origen."
 ],
 needs:[
  "Usuario creado.",
  "Rol/policy definido.",
  "Warehouse y áreas habilitadas.",
  "Acceso a TS y UP según permisos.",
  "Supervisor para administración manual."
 ],
 result:"Entender por qué un usuario recibe una tarea, investigar cuando no aparece y diferenciar asignar, desasignar y cancelar.",
 weights:{context:5,concepts:10,setup:5,guided:30,checkpoint:20,scenario:10,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Conceptos"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Práctica guiada"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Escenario semiguiado"},{id:"challenge",title:"Desafío"},{id:"close",title:"Cierre"}
 ],
 manual:"Capítulo 19 – Roles y Administración de Tareas",
 setup:[
  "Usuario identificado.",
  "Warehouse correcto.",
  "Rol/policy y área habilitada disponibles para revisión.",
  "Tarea o necesidad operativa identificada."
 ],
 expected:"Causa de asignación/no asignación identificada y acción correcta definida sin utilizar asignación manual como mecanismo habitual.",
 critical:[
  "Asignar manualmente sin investigar por qué Obtener Tareas no funcionó.",
  "Confundir Rol con Área.",
  "Asumir prioridad 200 como regla universal.",
  "Cancelar una tarea creyendo que desaparece el requerimiento origen.",
  "Utilizar Cancelar cuando solamente corresponde Desasignar.",
  "Modificar roles/policies sin autorización.",
  "Utilizar asignación manual como mecanismo operativo habitual."
 ],
 allowedHints:[
  "Revisar Rol + Área habilitada + Warehouse + tipo de tarea + prioridad + disponibilidad.",
  "Usar TS para interpretar estado, asignación, usuario y prioridad.",
  "Preferir Obtener Tareas como mecanismo normal de distribución.",
  "Desasignar devuelve la tarea al pool; Cancelar cancela esa instancia.",
  "Si el proceso origen sigue necesitando el trabajo, puede generarse una tarea equivalente."
 ]
},
integratedCase:{
 id:"integratedCase", number:14, title:"Caso Integrador",
 competency:"Resolver una incidencia operativa identificando evidencia, diagnosticando la causa, aplicando el proceso correcto y verificando el resultado sin que se indique qué módulo usar.",
 level:"Semiguiado → Autónomo", duration:"45–60 min",
 learn:[
  "Separar síntoma de causa.",
  "Elegir qué evidencia obtener antes de decidir.",
  "Seleccionar consultas y procesos ya aprendidos sin una ruta prefijada.",
  "Diagnosticar una causa principal con evidencia.",
  "Aplicar el proceso correcto sin forzar datos.",
  "Reconstruir el flujo únicamente cuando corresponda.",
  "Verificar el resultado con la consulta o control adecuado.",
  "Explicar por escrito el criterio utilizado."
 ],
 needs:[
  "Acceso a los módulos y consultas ya utilizados en la Academia.",
  "Warehouse correcto.",
  "Identificadores del caso principal.",
  "Capacidad de registrar evidencia, diagnóstico, acción y verificación."
 ],
 result:"Ante una incidencia operativa, identificar qué evidencia se necesita, diagnosticar la causa, aplicar el proceso correcto y verificar el resultado sin que indiquen qué módulo usar.",
 weights:{context:5,concepts:10,setup:5,guided:25,checkpoint:20,scenario:15,challenge:20},
 stages:[
  {id:"overview",title:"Inicio"},{id:"context",title:"Situación"},{id:"concepts",title:"Marco"},
  {id:"setup",title:"Setup"},{id:"guided",title:"Investigación inicial"},{id:"checkpoint",title:"Checkpoint"},
  {id:"scenario",title:"Casos secundarios"},{id:"challenge",title:"Caso autónomo"},{id:"close",title:"Cierre"}
 ],
 manual:"Referencias transversales del Manual Operativo M4N v1.5 – capítulos aplicables según el caso",
 setup:[
  "Warehouse correcto.",
  "Pedido identificado.",
  "Ola identificada.",
  "SKU/LPN del caso cuando corresponda.",
  "Tarea identificada solo si interviene en la investigación."
 ],
 expected:"Evidencia suficiente, diagnóstico justificado, acción correcta, flujo reconstruido cuando corresponde y verificación final documentada.",
 critical:[
  "Operar en Warehouse incorrecto.",
  "Corregir inventario antes de investigar.",
  "Forzar cantidad, estado o atributo para destrabar.",
  "Ignorar una excepción de Planning.",
  "Seleccionar inventario diferente al asignado.",
  "Cerrar un conteo incompleto.",
  "Cargar un elemento rechazado por M4N.",
  "Cerrar un Shipment con pendientes.",
  "Reincorporar una devolución sin validar.",
  "Cancelar una tarea creyendo que desaparece la necesidad origen."
 ],
 allowedHints:[
  "Separar primero si el problema está en inventario, asignación o tarea.",
  "WS explica Planning; LO/AH explican inventario; TS explica tareas.",
  "No corregir hasta tener evidencia suficiente de la causa.",
  "Después de resolver, reconstruir solo los pasos que el caso realmente necesita.",
  "La verificación final debe corresponder al proceso utilizado."
 ]
}
};