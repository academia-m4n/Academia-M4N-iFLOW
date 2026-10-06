window.TRAINING_CONFIG = {
  app: {
    name: "Academia M4N – iFLOW",
    version: "2.9-visual",
    manual: { title: "Manual Operativo M4N v1.5", url: "" }
  },
  modules: {
    orientation: {
      id:"orientation", moduleNumber:0, routePosition:1, title:"Orientación en M4N",
      competency:"Orientarse en M4N, elegir la interfaz y el objeto correctos y verificar el contexto operativo.",
      level:"Guiado → Autónomo", estimatedDuration:"20–30 min",
      environment:{warehouse:"",user:"",sampleLpn:"",sampleSku:"",sampleOrder:""}
    },
    masterdata: {
      id:"masterdata", moduleNumber:1, routePosition:2, title:"Datos Maestros",
      competency:"Consultar e interpretar los parámetros maestros que condicionan la operación de un SKU.",
      level:"Guiado → Autónomo", estimatedDuration:"25–35 min",
      environment:{warehouse:"",user:"",sku:"",owner:"",pickingLocation:""}
    },
    inbound: {
      id:"inbound", moduleNumber:2, routePosition:3, title:"Recepción / Inbound",
      competency:"Registrar correctamente mercadería recibida en M4N.",
      level:"Guiado → Autónomo", estimatedDuration:"25–35 min",
      environment:{
        warehouse:"",
        user:"",
        inboundOrder:"",
        receipt:"",
        sku:"",
        lpn:"",
        receivingLocation:""
      }
    },
    putaway: {
      id:"putaway", moduleNumber:3, routePosition:4, title:"Putaway",
      competency:"Almacenar correctamente un LPN respetando la estrategia y verificando su ubicación final.",
      level:"Guiado → Autónomo", estimatedDuration:"20–30 min",
      environment:{
        warehouse:"",
        user:"",
        lpn:"",
        originLocation:"",
        suggestedLocation:""
      }
    },
    inventory: {
      id:"inventory", moduleNumber:4, routePosition:5, title:"Inventario",
      competency:"Investigar la situación real del inventario antes de intentar corregirlo.",
      level:"Guiado → Autónomo", estimatedDuration:"25–35 min",
      environment:{
        warehouse:"",
        user:"",
        lpn:"",
        sku:"",
        physicalLocation:""
      }
    },
    replenishment: {
      id:"replenishment", moduleNumber:5, routePosition:6, title:"Reposición",
      competency:"Comprender por qué se genera una reposición, ejecutarla correctamente y diagnosticar por qué no aparece.",
      level:"Guiado → Autónomo", estimatedDuration:"25–35 min",
      environment:{warehouse:"",user:"",sku:"",sourceLpn:"",sourceLocation:"",pickingLocation:""}
    },
    planning: {
      id:"planning", moduleNumber:6, routePosition:7, title:"Planning y Olas",
      competency:"Interpretar el Planning, resolver excepciones y decidir cuándo una Ola está lista para liberar.",
      level:"Guiado → Autónomo", estimatedDuration:"30–40 min",
      environment:{warehouse:"",user:"",order:"",wave:"",stagingLocation:"",sku:""}
    },
    picking: {
      id:"picking", moduleNumber:7, routePosition:8, title:"Picking",
      competency:"Ejecutar correctamente una tarea de Picking y detenerse cuando el físico no coincide con lo asignado.",
      level:"Guiado → Autónomo", estimatedDuration:"30–40 min",
      environment:{
        warehouse:"",
        user:"",
        wave:"",
        picklist:"",
        task:"",
        sku:"",
        lpn:"",
        sourceLocation:""
      }
    },
    exceptions: {
      id:"exceptions", moduleNumber:8, routePosition:9, title:"Excepciones",
      competency:"Investigar por qué Planning o Picking no puede continuar y elegir el siguiente paso documentado.",
      level:"Guiado → Autónomo", estimatedDuration:"35–45 min",
      environment:{
        warehouse:"",
        user:"",
        wave:"",
        picklist:"",
        task:"",
        sku:"",
        lpn:""
      }
    },
    consolidation: {
      id:"consolidation", moduleNumber:9, routePosition:10, title:"Consolidación",
      competency:"Consolidar correctamente contenedores relacionados, validando origen, destino y relación resultante.",
      level:"Guiado → Autónomo", estimatedDuration:"20–30 min",
      environment:{warehouse:"",user:"",sourceContainer:"",destinationContainer:"",lpn:""}
    },
    dispatch: {
      id:"dispatch", moduleNumber:10, routePosition:11, title:"Despacho / Shipping",
      competency:"Controlar y ejecutar la carga de un Shipment y cerrar el flujo únicamente cuando esté realmente listo.",
      level:"Guiado → Autónomo", estimatedDuration:"30–40 min",
      environment:{warehouse:"",user:"",shipment:"",dock:"",lpn:"",container:""}
    },
    counts: {
      id:"counts", moduleNumber:11, routePosition:12, title:"Inventarios y Conteos",
      competency:"Ejecutar un conteo completo, interpretar diferencias y comprender qué debe ocurrir antes de ajustar.",
      level:"Guiado → Autónomo", estimatedDuration:"35–45 min",
      environment:{warehouse:"",user:"",location:"",sku:"",lpn:"",uom:""}
    },
    returns: {
      id:"returns", moduleNumber:12, routePosition:13, title:"Devoluciones y Redespachos",
      competency:"Distinguir devolución a stock de redespacho y preservar correctamente el inventario según la decisión del cliente.",
      level:"Guiado → Autónomo", estimatedDuration:"35–45 min",
      environment:{warehouse:"",user:"",inboundOrder:"",receipt:"",lpn:"",returnLocation:"",disposition:""}
    },
    rolesTasks: {
      id:"rolesTasks", moduleNumber:13, routePosition:14, title:"Roles y Administración de Tareas",
      competency:"Comprender por qué un usuario recibe determinadas tareas e investigar o administrar su asignación sin romper el proceso origen.",
      level:"Guiado → Autónomo", estimatedDuration:"30–40 min",
      environment:{warehouse:"",user:"",role:"",area:"",taskId:"",taskType:""}
    },
    integratedCase: {
      id:"integratedCase", moduleNumber:14, routePosition:15, title:"Caso Integrador",
      competency:"Resolver una incidencia operativa identificando evidencia, diagnosticando la causa, aplicando el proceso correcto y verificando el resultado.",
      level:"Semiguiado → Autónomo", estimatedDuration:"45–60 min",
      environment:{warehouse:"",order:"",wave:"",sku:"",lpn:"",task:""}
    }
  }
};