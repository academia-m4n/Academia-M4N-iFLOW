# Academia M4N – iFLOW · Ruta M0–M14 completa

## Versión vigente
- **Versión:** `2.8-tanda7-final`
- **Fuente funcional:** Manual Operativo M4N v1.5 y contenidos funcionales ya aprobados en M0–M13.
- **Arquitectura:** aprobada y congelada.
- **Persistencia:** LocalStorage por módulo.
- **Ruta:** 15 módulos, M0 a M14.

## Módulos implementados
- M0 – Orientación
- M1 – Datos Maestros
- M2 – Recepción / Inbound
- M3 – Putaway
- M4 – Inventario
- M5 – Reposición
- M6 – Planning y Olas
- M7 – Picking
- M8 – Excepciones
- M9 – Consolidación
- M10 – Despacho / Shipping
- M11 – Inventarios y Conteos
- M12 – Devoluciones y Redespachos
- M13 – Roles y Administración de Tareas
- M14 – Caso Integrador

La ruta actual queda completa. Esto no significa que todos los capítulos pendientes del Manual hayan sido resueltos.

## Principios pedagógicos
Estructura común:
`overview → context → concepts → setup → guided → checkpoint → scenario → challenge → close`

Principio transversal final:
`observar → interpretar → investigar → operar → verificar → decidir`

La Academia avanza desde práctica guiada hacia autonomía. El uso de pistas, procedimiento completo, intentos y desafío se registra para la Vista Instructor.

## M13 – Roles y Administración de Tareas
Fuente: Manual Operativo M4N v1.5, capítulo 19.

### Regla de asignación
`Obtener Tareas` considera:
**Rol + Área habilitada + Warehouse + tipo de tarea + prioridad + disponibilidad**

Las áreas pueden segregar sectores dentro de un mismo Warehouse y no equivalen al Rol.

### Accesos documentados
- UP Role Assignment / Users
- TS – Tasks
- RDT – Obtener Tareas

### Roles activos documentados
- ROL_EXC_ENTRADAS
- ROL_EXC_REPOSICION
- ROL_EXC_SALIDAS_COM
- ROL_EXC_SALIDAS_PIC
- ROL_MAQUINISTA
- ROL_PREPARADOR
- ROL_REPO_INGRESOS

No se deducen funciones adicionales únicamente por el nombre del rol.

### Prioridad
La prioridad se define por política/estrategia.
`200` puede aparecer como valor por defecto, pero **no es una regla universal**.

### TS
Permite consultar:
- ID de tarea
- tipo
- estado
- tipo de asignación
- usuario
- prioridad
- propietario
- Picklist
- SKU

### Administración
- **Asignar:** Supervisor selecciona tarea disponible, usuario y prioridad cuando corresponde.
- **Desasignar:** libera la tarea para que vuelva a ser tomada o reasignada.
- **Cancelar:** cancela esa instancia, pasa a `CANCELED` y libera la asignación.

Cancelar una tarea no elimina necesariamente la necesidad del proceso origen. Si el proceso continúa requiriendo el trabajo, M4N puede generar una tarea equivalente.

La buena práctica es preferir `Obtener Tareas`; la asignación manual es intervención de Supervisor.

### Setup
- warehouse
- user
- role
- area
- taskId
- taskType

### Persistencia
`iflow_m4n_academy_rolesTasks_v1`

## M14 – Caso Integrador

M14 **no introduce funcionalidad nueva de M4N** y no existe un capítulo ficticio para el Caso Integrador.

Utiliza referencias transversales de los capítulos aplicables del Manual y procesos ya aprobados en M0–M13.

### Marco
**síntoma ≠ causa**

`evidencia → diagnóstico → acción → reconstrucción cuando corresponda → verificación`

### Caso principal
Pedido incluido en una Ola que no logra continuar su preparación.

La causa principal seleccionada para el ejercicio es una situación ya documentada:
**inventario existente pero fuera de Picking / reposición requerida**.

El participante debe:
1. observar el síntoma;
2. elegir evidencia;
3. utilizar WS/LO según corresponda;
4. demostrar la causa;
5. aplicar el flujo de reposición documentado;
6. replanear/liberar solo cuando corresponda;
7. verificar que vuelva a existir trabajo de Picking;
8. documentar evidencia, diagnóstico, acción, verificación y criterio.

No se obliga a pasar por todos los procesos de la Academia.

### Casos secundarios
1. diferencia física de inventario;
2. devolución sin definición inicial de vuelta a stock o redespacho.

### Ayudas
- Pista 1 orienta al tipo de evidencia.
- Pista 2 puede sugerir familias de consultas.
- Procedimiento completo queda como última ayuda.

### Evaluación
Se reutiliza el motor existente:
- Aprobado autónomamente
- Aprobado con ayuda
- Requiere refuerzo

M14 exige una explicación escrita más extensa en el desafío final. La Vista Instructor muestra esa nota como registro integrador para revisar:
- evidencia;
- diagnóstico;
- acción;
- verificación;
- criterio.

### Setup
- warehouse
- order
- wave
- sku
- lpn
- task

No se exigen objetos que no intervienen en el caso principal.

### Persistencia
`iflow_m4n_academy_integratedCase_v1`

## Vista Instructor
Para todos los módulos conserva:
- progreso;
- checkpoints;
- intentos;
- respuestas;
- pistas;
- procedimiento;
- setup;
- desafío;
- resultado esperado;
- errores críticos;
- clasificación;
- reset.

Para M14 agrega la lectura del registro escrito del Caso Integrador reutilizando `challengeNotes`.

## Home y ruta
Los módulos activos continúan calculándose dinámicamente desde `M4N_MODULES`.

Con esta versión existen M0 a M14, por lo que las 15 etapas de la ruta quedan disponibles y ya no existen módulos de la ruta marcados como “Próximamente”.

## Limpieza técnica final limitada
Se eliminaron claves duplicadas de `inboundOrder` y `receipt` en `label()`.

No se realizó refactor estructural ni cambio de estilos.

## Limitaciones y procesos pendientes
La ruta M0–M14 está completa, pero continúan fuera de alcance o pendientes en el Manual:
- REX/Milonga como procedimiento operativo específico;
- Packing / Ecommerce-Fulfillment;
- Capture Weight hasta implementación/UAT;
- futuras ampliaciones de variantes de Conteo;
- estandarización transversal de motivos de ajuste;
- variantes locales por CD/cliente no consolidadas.

No se incorporaron esos procedimientos como si estuvieran resueltos.

## Historial
- Tanda 1: M0–M2.
- Tanda 2: M3–M4.
- Tanda 3: M5–M6.
- Tanda 4: M7–M8.
- Revisión preventiva: fallbacks neutros.
- Tanda 5: M9–M10.
- Tanda 6: M11–M12.
- Tanda 7 Final: M13–M14 y cierre de ruta M0–M14.

## Ejecución local
1. Descomprimir el ZIP.
2. Mantener intacta la estructura de carpetas.
3. Abrir `index.html` en un navegador compatible.
4. La información del alumno se guarda localmente mediante LocalStorage del navegador.
