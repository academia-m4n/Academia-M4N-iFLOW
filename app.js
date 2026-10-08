
const CFG=window.TRAINING_CONFIG, MODS=window.M4N_MODULES;
let currentModule=null, currentStage="overview", state=null;
const key=id=>`iflow_m4n_academy_${id}_v1`;

// v2.9 Visual: referencias de pantalla tomadas exclusivamente del Manual Operativo M4N v1.5.
// Este bloque no modifica lógica pedagógica, evaluación, progreso ni persistencia.
const VISUAL_GUIDES={
  orientation:{context:[
    {src:"assets/screens/orientation/m0_rdt_login.png",title:"Acceso al Capturador / RDT",caption:"Referencia visual para reconocer el acceso operativo.",look:["Usuario y credenciales","Warehouse / ubicación de trabajo","Acceso al entorno correcto"]},
    {src:"assets/screens/orientation/m0_rdt_menu.png",title:"Menú principal del RDT",caption:"Las opciones visibles dependen del rol, Warehouse y área habilitada.",look:["Familias de procesos","Obtener Tareas","Diferencia entre consulta y ejecución"]}
  ]},
  masterdata:{guided:[
    {src:"assets/screens/masterdata/m1_sku_parameters.png",title:"Parámetros operativos del SKU",caption:"Usá esta pantalla para reconocer dónde consultar configuración sin modificarla.",look:["SKU Class","Estado / UDM","Parámetros operativos"]},
    {src:"assets/screens/masterdata/m1_uom_hierarchy.png",title:"Jerarquía de UDM",caption:"La relación entre presentaciones condiciona validaciones posteriores.",look:["UDM","Unidad inferior","Cantidad de UDM","EAN / DUN"]},
    {src:"assets/screens/masterdata/m1_picking_location.png",title:"Ubicación de Picking",caption:"Referencia de la relación SKU ↔ Picking y parámetros de reposición.",look:["Ubicación","NORMALMINLEVEL","HOTMAXLEVEL"]}
  ]},
  inbound:{guided:[
    {src:"assets/screens/inbound/m2_receipt_creation.png",title:"Creación del Recibo",caption:"El Recibo se crea desde la Orden de Entrada antes de registrar los LPN.",look:["Orden de Entrada","Acción de creación","Recibo asociado"]},
    {src:"assets/screens/inbound/m2_lpn_fields.png",title:"Campos operativos del LPN",caption:"Antes de confirmar, contrastá la pantalla con la mercadería y documentación física.",look:["SKU y UDM","Cantidad","Lote y vencimiento","Estado y ubicación","Número de LPN"]},
    {src:"assets/screens/inbound/m2_receipt_close.png",title:"Cierre del Recibo",caption:"El cierre corresponde después de validar los LPN generados.",look:["Recibo correcto","LPN registrados","Acción de cierre"]}
  ]},
  putaway:{guided:[
    {src:"assets/screens/putaway/m3_reacomodar_lpn.png",title:"Reacomodar LPN",caption:"Punto de entrada operativo para iniciar el Putaway desde RDT.",look:["Proceso Recepción","Reacomodar LPN"]},
    {src:"assets/screens/putaway/m3_lpn_suggested_location.png",title:"LPN y ubicación sugerida",caption:"M4N calcula el destino según la estrategia configurada.",look:["LPN correcto","Ubicación sugerida","Secuencia antes de mover"]},
    {src:"assets/screens/putaway/m3_confirm_destination.png",title:"Confirmación de destino",caption:"La confirmación debe coincidir con la posición física donde quedó el LPN.",look:["Ubicación destino","Lectura física de la etiqueta","Confirmación final"]}
  ]},
  replenishment:{guided:[
    {src:"assets/screens/replenishment/m5_obtener_tareas.png",title:"Obtener Tareas",caption:"La reposición operativa comienza con el trabajo asignado por M4N.",look:["Obtener Tareas","Rol operativo","Proceso Reabastecer"]},
    {src:"assets/screens/replenishment/m5_fullrepl_task.png",title:"Tarea de Reposición",caption:"Ejemplo real de una tarea FULLREPL. La imagen no agrega reglas funcionales nuevas.",look:["ID de tarea","Tipo de tarea","SKU / referencia"]},
    {src:"assets/screens/replenishment/m5_confirm_destination.png",title:"Destino de Reposición",caption:"Antes de confirmar, verificá el LPN origen y la ubicación de Picking destino indicada.",look:["LPN origen","Ubicación destino","Confirmación física"]}
  ]},
  planning:{guided:[
    {src:"assets/screens/planning/m6_wave_staging.png",title:"Ola y Staging",caption:"Referencia de la Ola antes del Planning cuando el flujo requiere Staging.",look:["Ola seleccionada","Órdenes incluidas","Staging"]},
    {src:"assets/screens/planning/m6_staging_selection.png",title:"Selección de Staging",caption:"El Staging debe quedar definido antes de Planear cuando corresponda.",look:["Staging elegido","Órdenes afectadas","Área asociada"]},
    {src:"assets/screens/planning/m6_wave_planning.png",title:"Resultado de Planning",caption:"La pantalla de WS permite revisar asignación y excepciones antes de Liberar.",look:["Inventario asignado","Líneas con excepción","Resultado antes de Liberar"]}
  ]},
  picking:{guided:[
    {src:"assets/screens/picking/m7_picking_standard.png",title:"Picking estándar",caption:"Leé la pantalla completa antes de confirmar el movimiento.",look:["SKU","UDM / presentación","Ubicación origen","Cantidad","Acción disponible"]},
    {src:"assets/screens/picking/m7_partial_picking.png",title:"Picking parcial",caption:"La pantalla indica qué preparar y desde dónde.",look:["SKU","UDM","Ubicación","Cantidad a pickear"]},
    {src:"assets/screens/picking/m7_full_pick.png",title:"Full Pick",caption:"En Full Pick se confirma el LPN completo indicado por M4N.",look:["LPN","SKU","Cantidad","Ubicación origen"]},
    {src:"assets/screens/picking/m7_staging_delivery.png",title:"Entrega a Staging",caption:"El Picking termina cuando el contenedor queda físicamente entregado y confirmado en el Staging indicado.",look:["Contenedor / LPN","Staging","Confirmación de ubicación"]}
  ]},
  exceptions:{guided:[
    {src:"assets/screens/exceptions/m8_ws_investigation.png",title:"WS como evidencia",caption:"Usá la Ola para observar el resultado del Planning antes de decidir una corrección.",look:["Línea afectada","Asignación","Excepción visible","Evidencia antes de corregir"]}
  ]},
  consolidation:{guided:[
    {src:"assets/screens/consolidation/m9_consolidation_menu.png",title:"Acceso a Consolidación",caption:"Referencia del menú operativo en RDT.",look:["Picking","Consolidación"]},
    {src:"assets/screens/consolidation/m9_consolidation_screen.png",title:"Pantalla de Consolidación",caption:"Identificá origen y destino antes de ejecutar Consolidate.",look:["De contenedor","A contenedor","LPN"]},
    {src:"assets/screens/consolidation/m9_destination_container.png",title:"Destino informado por M4N",caption:"El destino debe validarse; no se inventa una relación alternativa.",look:["Contenedor origen","Contenedor destino","Relación resultante"]}
  ]},
  dispatch:{guided:[
    {src:"assets/screens/dispatch/m10_shipments.png",title:"Shipments / Envíos",caption:"Referencia para reconocer el Shipment y su contexto antes de cargar.",look:["Shipment","Dock","Estado"]},
    {src:"assets/screens/dispatch/m10_loading_dashboard.png",title:"Dashboard de Carga",caption:"Control visual del avance por Envío, pedidos y LPN / contenedores.",look:["Envío","Pendientes","Avance de carga"]},
    {src:"assets/screens/dispatch/m10_truck_loading.png",title:"Carga Camión",caption:"Cada elemento debe validarse contra el Shipment antes de cargarlo físicamente.",look:["Dock","LPN / contenedor","Validación antes de continuar"]}
  ]},
  counts:{guided:[
    {src:"assets/screens/counts/m11_count_location_menu.png",title:"Conteo de Ubicación",caption:"Acceso al conteo operativo desde el Capturador.",look:["Menú Conteo","Conteo de ubicación"]},
    {src:"assets/screens/counts/m11_count_capture.png",title:"Captura del conteo",caption:"El conteo debe reflejar todo lo que existe físicamente, no lo que el sistema espera.",look:["SKU / UDM","Cantidad física","Lote / vencimiento cuando aplique","Fin Conteo solo al completar"]},
    {src:"assets/screens/counts/m11_inventory_adjustment.png",title:"Ajuste de Inventario",caption:"Contar no equivale a ajustar. Esta pantalla corresponde a una etapa posterior y autorizada.",look:["Razón de Ajuste","Notas","Datos a corregir","Trazabilidad"]}
  ]},
  returns:{guided:[
    {src:"assets/screens/returns/m12_return_to_stock.png",title:"Devolución que vuelve a stock",caption:"La devolución requiere definición del cliente y validación física antes de reincorporarse.",look:["Orden de Entrada","Recepción","Ubicación de devolución"]},
    {src:"assets/screens/returns/m12_return_received_action.png",title:"Registrar Devolución recibida",caption:"Para redespacho, esta acción registra la recepción pero no habilita por sí sola el reruteo.",look:["Orden de Rechazo Total","Devolución recibida","Acción aplicada"]},
    {src:"assets/screens/returns/m12_return_closed.png",title:"Devolución recibida y Orden cerrada",caption:"El reruteo depende de que la orden quede cerrada según el proceso documentado.",look:["Devolución recibida = Sí","Orden cerrada = Sí"]}
  ]},
  rolesTasks:{guided:[
    {src:"assets/screens/rolesTasks/m13_task_assignment_reference.png",title:"Referencia de asignación manual",caption:"La asignación manual es una intervención de Supervisor, no el mecanismo normal de distribución.",look:["Tarea","Usuario","Prioridad"]},
    {src:"assets/screens/rolesTasks/m13_tasks_ts.png",title:"TS / Tasks",caption:"TS permite investigar por qué una tarea está disponible, asignada o detenida.",look:["Tipo y estado","Usuario","Prioridad","Propietario","Picklist / SKU"]},
    {src:"assets/screens/rolesTasks/m13_cancel_task.png",title:"Cancelar tarea",caption:"Cancelar actúa sobre esa instancia de tarea y no necesariamente elimina la necesidad origen.",look:["Tarea seleccionada","Acción Cancelar tarea"]},
    {src:"assets/screens/rolesTasks/m13_task_canceled.png",title:"Tarea CANCELED",caption:"Verificá el estado y que la asignación al usuario haya sido liberada.",look:["Estado CANCELED","Usuario sin asignación","Proceso origen"]}
  ]}
};

function visualGuideHTML(items){
  if(!items||!items.length)return "";
  return `<section class="visual-guide" data-visual-guide><div class="visual-guide-head"><span class="eyebrow">REFERENCIA VISUAL</span><h3>Reconocé la pantalla antes de operar</h3><p>Capturas reales del Manual Operativo M4N v1.5. Hacé click para ampliar.</p></div><div class="visual-grid">${items.map((v,i)=>`<figure class="visual-card"><button class="visual-image-btn" type="button" data-visual-src="${v.src}" data-visual-title="${v.title}"><img src="${v.src}" alt="${v.title}" loading="lazy"></button><figcaption><strong>${v.title}</strong><p>${v.caption}</p>${v.look?.length?`<div class="what-look"><span>Qué mirar</span><ul>${v.look.map(x=>`<li>${x}</li>`).join("")}</ul></div>`:""}</figcaption></figure>`).join("")}</div></section>`;
}
function ensureVisualModal(){
  let modal=document.getElementById("visualModal");
  if(modal)return modal;
  modal=document.createElement("div");modal.id="visualModal";modal.className="visual-modal";modal.setAttribute("aria-hidden","true");
  modal.innerHTML=`<div class="visual-modal-backdrop" data-close-visual></div><div class="visual-modal-dialog" role="dialog" aria-modal="true"><div class="visual-modal-bar"><strong id="visualModalTitle"></strong><button type="button" class="visual-modal-close" data-close-visual aria-label="Cerrar">×</button></div><img id="visualModalImage" alt=""></div>`;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close-visual]").forEach(x=>x.onclick=()=>{modal.classList.remove("show");modal.setAttribute("aria-hidden","true");});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("show")){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");}});
  return modal;
}
function injectVisualGuide(stageId){
  const section=document.querySelector(`.module-stage[data-stage="${stageId}"]`);
  const items=VISUAL_GUIDES[currentModule]?.[stageId];
  if(!section||!items?.length||section.querySelector("[data-visual-guide]"))return;
  const head=section.querySelector(".stage-header");
  if(!head)return;
  head.insertAdjacentHTML("afterend",visualGuideHTML(items));
  section.querySelectorAll("[data-visual-src]").forEach(btn=>btn.onclick=()=>{
    const modal=ensureVisualModal(),img=modal.querySelector("#visualModalImage"),title=modal.querySelector("#visualModalTitle");
    img.src=btn.dataset.visualSrc;img.alt=btn.dataset.visualTitle||"Captura M4N";title.textContent=btn.dataset.visualTitle||"Captura M4N";
    modal.classList.add("show");modal.setAttribute("aria-hidden","false");
  });
}


const defaultState=id=>({
  started:false,
  currentStage:"overview",
  visited:{},
  milestones:{},
  tasks:{},
  config:{...CFG.modules[id].environment},
  quizzes:{},
  hints:{},
  challengeNotes:"",
  challengeComplete:false
});

function loadState(id){
  try{
    const raw=JSON.parse(localStorage.getItem(key(id))||"{}");
    return {
      ...defaultState(id),
      ...raw,
      visited:{...defaultState(id).visited,...(raw.visited||{})},
      milestones:{...defaultState(id).milestones,...(raw.milestones||{})},
      tasks:{...defaultState(id).tasks,...(raw.tasks||{})},
      config:{...defaultState(id).config,...(raw.config||{})},
      quizzes:{...defaultState(id).quizzes,...(raw.quizzes||{})},
      hints:{...defaultState(id).hints,...(raw.hints||{})}
    };
  }catch(e){ return defaultState(id); }
}
function save(){
  if(!currentModule||!state)return;
  localStorage.setItem(key(currentModule),JSON.stringify(state));
  renderProgress();
}
function syncSidebarActive(view){
  document.querySelectorAll(".main-nav .nav-item").forEach(item=>item.classList.remove("active"));
  if(view==="module" && currentModule){
    const moduleItem=document.querySelector(`.main-nav [data-open-module="${currentModule}"]`);
    if(moduleItem)moduleItem.classList.add("active");
    return;
  }
  const viewItem=document.querySelector(`.main-nav [data-view="${view}"]`);
  if(viewItem)viewItem.classList.add("active");
}
function showView(v){
  document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));
  document.getElementById(v+"View").classList.add("active");
  document.getElementById("moduleNavWrap").style.display=v==="module"?"block":"none";
  document.getElementById("sidebar").classList.remove("open");
  syncSidebarActive(v);
  if(v==="home")renderHome();
  if(v==="instructor")renderInstructor();
}
function calcProgress(){
  if(!state||!currentModule)return 0;
  const w=MODS[currentModule].weights;
  let n=0;
  if(state.milestones.context)n+=w.context;
  if(state.milestones.concepts)n+=w.concepts;
  if(state.milestones.setup)n+=w.setup;
  if(state.milestones.guided)n+=w.guided;
  if(state.milestones.checkpoint)n+=w.checkpoint;
  if(state.milestones.scenario)n+=w.scenario;
  if(state.challengeComplete)n+=w.challenge;
  return Math.min(100,n);
}
function minimumCriteriaMet(){
  return !!(state?.milestones.context &&
            state?.milestones.concepts &&
            state?.milestones.setup &&
            state?.milestones.guided &&
            state?.milestones.checkpoint &&
            state?.milestones.scenario &&
            state?.challengeComplete);
}
function status(){
  if(!state||!state.started)return "No iniciado";
  return minimumCriteriaMet()?"Completado":"En progreso";
}
function hintStats(){
  const a=Object.values(state?.hints||{});
  return {
    count:a.reduce((s,x)=>s+(x.count||0),0),
    used:a.filter(x=>(x.count||0)>0).length,
    procedure:a.some(x=>x.level==="procedure"&&(x.count||0)>0)
  };
}
function approval(){
  if(status()!=="Completado")return "Requiere refuerzo";
  const h=hintStats();
  const wrong=Object.values(state.quizzes||{}).reduce((s,q)=>s+(q.wrong||0),0);
  return (!h.procedure && h.used<=2 && wrong<=2)?"Aprobado autónomamente":"Aprobado con ayuda";
}

const route=[
[0,"Orientación en M4N"],[1,"Datos Maestros"],[2,"Recepción / Inbound"],[3,"Putaway"],[4,"Inventario"],
[5,"Reposición"],[6,"Planning y Olas"],[7,"Picking"],[8,"Excepciones"],[9,"Consolidación"],
[10,"Despacho"],[11,"Inventarios y Conteos"],[12,"Devoluciones"],[13,"Roles y Tareas"],[14,"Caso Integrador"]
];

function activeModuleIds(){
  return Object.values(MODS).sort((a,b)=>a.number-b.number).map(m=>m.id);
}

function moduleSummary(id){
  const oldM=currentModule, oldS=state;
  currentModule=id; state=loadState(id);
  const progress=calcProgress(), moduleStatus=status();
  const result={progress,status:moduleStatus,approval:moduleStatus==="Completado"?approval():""};
  currentModule=oldM; state=oldS;
  return result;
}
function homeApprovalLabel(value){
  return value==="Aprobado autónomamente"?"Autónomo":value==="Aprobado con ayuda"?"Con ayuda":value==="Requiere refuerzo"?"Requiere refuerzo":"";
}
function homeStatusText(summary){
  const classification=summary.progress===100?homeApprovalLabel(summary.approval):"";
  return classification?`${summary.status} · ${classification}`:summary.status;
}
function renderHome(){
  const ids=activeModuleIds();
  const availableText=document.getElementById("availableModulesText");
  if(availableText){
    const nums=ids.map(id=>MODS[id].number).sort((x,y)=>x-y);
    availableText.textContent=nums.length?`Módulos ${nums[0]} a ${nums[nums.length-1]}`:"Sin módulos activos";
  }

  document.getElementById("learningPath").innerHTML=route.map((r,i)=>{
    let stateClass="",stateText="Próximamente";
    const id=ids.find(mid=>MODS[mid].number===r[0]);
    if(id){
      const s=moduleSummary(id);
      stateClass=s.status==="Completado"?"completed":s.status==="En progreso"?"progress":"current";
      stateText=homeStatusText(s);
      return `<div class="path-item ${stateClass}"><span class="route-index">Ruta ${i+1} de 15</span><strong>${r[1]}</strong><div class="home-progress-summary"><span class="home-progress-percent">${s.progress}%</span><small>${stateText}</small></div><div class="home-progress-bar" role="progressbar" aria-label="Progreso de ${r[1]}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${s.progress}"><span style="width:${s.progress}%"></span></div></div>`;
    }
    return `<div class="path-item ${stateClass}"><span class="route-index">Ruta ${i+1} de 15</span><strong>${r[1]}</strong><div class="home-progress-summary"><span class="home-progress-percent">0%</span><small>${stateText}</small></div><div class="home-progress-bar" aria-hidden="true"><span style="width:0%"></span></div></div>`;
  }).join("");

  document.getElementById("moduleCards").innerHTML=ids.map(id=>{
    const m=MODS[id],s=moduleSummary(id);
    return `<article class="module-card available-card">
      <div class="module-card-head"><span class="module-card-num">Módulo ${m.number}</span>
      <span class="status-chip">${homeStatusText(s)}</span></div>
      <h3>${m.title}</h3><p>${m.competency}</p>
      <div class="module-card-progress"><div class="home-progress-summary"><span class="home-progress-percent">${s.progress}%</span><small>${homeStatusText(s)}</small></div><div class="home-progress-bar" role="progressbar" aria-label="Progreso de ${m.title}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${s.progress}"><span style="width:${s.progress}%"></span></div></div>
      <div class="module-meta"><span>Nivel <strong>${m.level}</strong></span><span>Duración <strong>${m.duration}</strong></span></div>
      <button class="primary" data-open-module="${id}">${s.status==="No iniciado"?"Comenzar":"Continuar"}</button>
    </article>`;
  }).join("");
  bindOpeners();
}

function bindOpeners(){
  document.querySelectorAll("[data-open-module]").forEach(b=>b.onclick=()=>openModule(b.dataset.openModule));
}
function openModule(id){
  currentModule=id;
  state=loadState(id);
  state.started=true;
  currentStage=state.currentStage||"overview";
  renderModule();
  showView("module");
  showStage(currentStage);
  save();
}
function renderProgress(){
  const p=document.getElementById("progressText");
  if(p)p.textContent=calcProgress()+"%";
  const f=document.getElementById("progressFill");
  if(f)f.style.width=calcProgress()+"%";
  const s=document.getElementById("moduleStatusText");
  if(s)s.textContent=status();
  const c=document.getElementById("completionText");
  if(c)c.textContent=status();
}
function moduleHeader(m){
  return `<div class="module-topbar"><button class="back-home" id="backHome">← Volver a Academia</button>
    <div class="module-progress-wrap"><div class="progress-meta"><span id="moduleStatusText">${status()}</span>
    <strong id="progressText">${calcProgress()}%</strong></div>
    <div class="progress-bar"><div id="progressFill" style="width:${calcProgress()}%"></div></div></div></div>`;
}
function renderModule(){
  const m=MODS[currentModule];
  const nav=m.stages.map(s=>`<button class="stage-pill" data-stage-nav="${s.id}">${s.title}</button>`).join("");
  document.getElementById("moduleNav").innerHTML=m.stages.map(s=>`<button class="nav-item" data-stage-nav="${s.id}">${s.title}</button>`).join("");
  document.getElementById("moduleRoot").innerHTML=`<div class="module-shell">${moduleHeader(m)}<div class="stage-nav">${nav}</div>${m.stages.map(s=>stageHTML(m,s.id)).join("")}</div>`;
  document.getElementById("backHome").onclick=()=>showView("home");
  document.querySelectorAll("[data-stage-nav]").forEach(b=>b.onclick=()=>showStage(b.dataset.stageNav));
  bindStageActions();
  syncInputs();
  renderProgress();
}
function ref(m,detail=null){
  return `<div class="ref-manual"><strong>Consultar Manual Operativo M4N</strong><span>${detail||m.manual}</span></div>`;
}
function stageHTML(m,id){
  if(id==="overview")return overviewHTML(m);
  if(id==="context")return contextHTML(m);
  if(id==="concepts")return conceptsHTML(m);
  if(id==="setup")return setupHTML(m);
  if(id==="guided")return guidedHTML(m);
  if(id==="checkpoint")return checkpointHTML(m);
  if(id==="scenario")return scenarioHTML(m);
  if(id==="challenge")return challengeHTML(m);
  return closeHTML(m);
}
function overviewHTML(m){
  return `<section class="module-stage" data-stage="overview">
    <div class="module-intro"><div><div class="eyebrow">MÓDULO ${m.number}</div><h1>${m.title}</h1><p class="lead">${m.competency}</p></div><div class="module-number">${String(m.number).padStart(2,"0")}</div></div>
    <div class="intro-grid"><article class="info-card"><span class="card-label">COMPETENCIA</span><h3>${m.competency}</h3></article>
    <article class="info-card"><span class="card-label">NIVEL</span><h3>${m.level}</h3></article>
    <article class="info-card"><span class="card-label">DURACIÓN</span><h3>${m.duration}</h3></article></div>
    <div class="content-card split"><div><h3>Vas a aprender a</h3><ul class="clean-list">${m.learn.map(x=>`<li>${x}</li>`).join("")}</ul></div>
    <div><h3>Necesitás</h3><ul class="clean-list">${m.needs.map(x=>`<li>${x}</li>`).join("")}</ul></div></div>
    <div class="result-banner"><span>RESULTADO FINAL</span><strong>${m.result}</strong></div>${ref(m)}
    <div class="stage-actions"><button class="primary large" data-next="context">Comenzar módulo</button></div></section>`;
}
function stageHead(level,ey,title,txt){
  return `<div class="stage-header"><div class="level-badge level-${level}">Nivel ${level} · ${level===1?"Guiado":level===2?"Semiguiado":"Autónomo"}</div><span class="eyebrow">${ey}</span><h2>${title}</h2><p>${txt}</p></div>`;
}
function contextHTML(m){
  let body="",intro="Primero entendé el problema. Después elegí dónde mirar.";
  if(currentModule==="orientation"){
    body=`<div class="mission-grid"><article><span>Situación</span><p>Te informan un LPN y necesitás saber dónde está y en qué contexto operativo estás trabajando.</p></article><article><span>Objetivo</span><p>Elegir la interfaz y la consulta adecuadas sin empezar a modificar nada.</p></article><article><span>Condición inicial</span><p>Acceso a M4N y Warehouse visible.</p></article><article><span>Resultado esperado</span><p>Sabés dónde investigar y verificás el Warehouse antes de operar.</p></article></div>`;
  }else if(currentModule==="masterdata"){
    body=`<div class="mission-grid"><article><span>Situación</span><p>Antes de recibir o preparar un SKU necesitás entender cómo está configurado.</p></article><article><span>Objetivo</span><p>Consultar el maestro y detectar qué condiciones impactarán la operación.</p></article><article><span>Condición inicial</span><p>SKU existente y acceso de consulta.</p></article><article><span>Resultado esperado</span><p>Interpretás UDM, clase, vida útil, Picking y reposición sin modificar parámetros.</p></article></div>`;
  }else if(currentModule==="inbound"){
    intro="Llegó mercadería correspondiente a una Orden de Entrada. Tu objetivo es dejarla correctamente registrada para que el flujo pueda continuar.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Existe una Orden de Entrada disponible y la mercadería llegó físicamente al Warehouse.</p></article><article><span>Objetivo</span><p>Crear el Recibo, registrar los LPN y verificar que el inventario refleje lo recibido.</p></article><article><span>Condición inicial</span><p>Orden disponible, usuario habilitado, SKU configurado y ubicación de recepción operable.</p></article><article><span>Resultado esperado</span><p>LPN correctos y documentos cerrados únicamente cuando corresponda.</p></article></div>`;
  }else if(currentModule==="putaway"){
    intro="La recepción terminó y el LPN debe abandonar el área de Recepción para quedar almacenado de forma correcta.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Un LPN recibido está disponible en Recepción y necesita ser almacenado.</p></article><article><span>Objetivo</span><p>Ejecutar Putaway respetando la ubicación sugerida por M4N.</p></article><article><span>Condición inicial</span><p>LPN disponible, estrategia configurada y ubicación destino operable.</p></article><article><span>Resultado esperado</span><p>La ubicación física del LPN coincide con la ubicación registrada en M4N.</p></article></div>`;
  }else if(currentModule==="inventory"){
    intro="Te informan un LPN y necesitás reconstruir su situación antes de decidir cualquier corrección.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Existe una duda sobre dónde está un LPN, qué contiene o qué ocurrió con él.</p></article><article><span>Objetivo</span><p>Investigar mediante LO y AH antes de modificar inventario.</p></article><article><span>Condición inicial</span><p>Warehouse correcto e identificador disponible, preferentemente LPN.</p></article><article><span>Resultado esperado</span><p>Clasificás la diferencia y definís el siguiente paso sin alterar datos innecesariamente.</p></article></div>`;
  }else if(currentModule==="replenishment"){
    intro="Una ubicación de Picking necesita stock para que la preparación pueda continuar.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Picking necesita abastecimiento y existe inventario origen disponible.</p></article><article><span>Objetivo</span><p>Comprender por qué existe la necesidad y ejecutar la tarea asignada por M4N.</p></article><article><span>Condición inicial</span><p>Ubicación de Picking configurada, stock origen y usuario Maquinista habilitado.</p></article><article><span>Resultado esperado</span><p>Inventario trasladado a Picking y criterio claro para investigar si la reposición no aparece.</p></article></div>`;
  }else if(currentModule==="planning"){
    intro="Hay pedidos disponibles y necesitás convertirlos en trabajo ejecutable por Picking.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Una Ola debe ser planeada y revisada antes de generar trabajo de Picking.</p></article><article><span>Objetivo</span><p>Asignar inventario, interpretar excepciones y decidir si corresponde Liberar.</p></article><article><span>Condición inicial</span><p>Órdenes, estrategia, ubicaciones de Picking e inventario/atributos válidos; Staging cuando aplique.</p></article><article><span>Resultado esperado</span><p>La Ola queda planeada y solo se libera después de revisar su resultado.</p></article></div>`;
  }else if(currentModule==="picking"){
    intro="Una Ola ya fue liberada y M4N generó trabajo de Picking.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Existe una Picklist/tarea disponible y el operador debe ejecutar exactamente lo asignado por M4N.</p></article><article><span>Objetivo</span><p>Validar ubicación, SKU, presentación/UDM, cantidad y LPN cuando corresponda antes de confirmar.</p></article><article><span>Condición inicial</span><p>Ola liberada, rol/área habilitada e inventario/reposición disponible.</p></article><article><span>Resultado esperado</span><p>Picking confirmado correctamente o detenido mediante el flujo de excepción cuando el físico no coincide.</p></article></div>`;
  }else if(currentModule==="exceptions"){
    intro="El flujo de Planning o Picking no puede continuar y necesitás identificar la causa antes de corregir.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Existe una excepción, una tarea cortada o inventario que no cumple las condiciones del proceso.</p></article><article><span>Objetivo</span><p>Investigar qué condición no se cumple y definir la acción correcta.</p></article><article><span>Condición inicial</span><p>Identificador del caso y acceso a WS, LO, AH y validación física cuando corresponda.</p></article><article><span>Resultado esperado</span><p>Causa identificada, acción correcta definida y flujo reconstruido solo cuando corresponda.</p></article></div>`;
  }else if(currentModule==="consolidation"){
    intro="El Picking terminó y la operación necesita agrupar contenedores relacionados sin perder trazabilidad.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Existe un contenedor origen y M4N informa el contenedor destino con el que debe relacionarse.</p></article><article><span>Objetivo</span><p>Validar origen y destino, ejecutar Consolidate y comprobar la relación resultante.</p></article><article><span>Condición inicial</span><p>Contenedores identificados y acceso a RDT → Picking → Consolidación.</p></article><article><span>Resultado esperado</span><p>El contenedor origen queda actualizado dentro del destino correcto y la relación se verifica.</p></article></div>`;
  }else if(currentModule==="dispatch"){
    intro="La preparación terminó y un Shipment debe cargarse contra el viaje correcto antes de poder despacharse.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>El viaje está En muelle, existe Shipment y la mercadería preparada está disponible para carga.</p></article><article><span>Objetivo</span><p>Controlar Dock y Shipment, validar cada LPN/Contenedor y cerrar solo cuando no existan pendientes.</p></article><article><span>Condición inicial</span><p>Shipment creado, Dock asignado, pedido ruteado/en viaje y estado habilitado para carga.</p></article><article><span>Resultado esperado</span><p>Todos los elementos quedan cargados, el Shipment llega a CARGADO y el Supervisor ejecuta Salida de Envíos.</p></article></div>`;
  }else if(currentModule==="counts"){
    intro="Necesitás validar físicamente una ubicación y entender qué hacer si el resultado no coincide con M4N.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Se requiere un conteo físico sobre una ubicación sin intentar reproducir el dato esperado por el sistema.</p></article><article><span>Objetivo</span><p>Contar todo el contenido, interpretar diferencias y evitar ajustar sin investigación.</p></article><article><span>Condición inicial</span><p>Usuario habilitado, ubicación definida y reglas de conteo vigentes.</p></article><article><span>Resultado esperado</span><p>Conteo completo, diferencia investigada y corrección trazable solo si corresponde.</p></article></div>`;
  }else if(currentModule==="returns"){
    intro="Mercadería previamente despachada volvió al Warehouse y necesitás definir su tratamiento correcto.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Existe una devolución y la decisión del cliente determina si vuelve a stock o queda para redespacho.</p></article><article><span>Objetivo</span><p>Distinguir ambos caminos y preservar el inventario sin mezclar procesos.</p></article><article><span>Condición inicial</span><p>Orden de devolución, ubicación definida por CD y decisión del cliente.</p></article><article><span>Resultado esperado</span><p>Producto apto vuelve a Picking o el inventario preparado queda preservado para un nuevo Shipment.</p></article></div>`;
  }else if(currentModule==="rolesTasks"){
    intro="Un operador informa que Obtener Tareas no le entrega el trabajo esperado.";
    body=`<div class="mission-grid"><article><span>Situación</span><p>Existe una necesidad operativa y posiblemente una tarea, pero el usuario no recibe el trabajo.</p></article><article><span>Objetivo</span><p>Investigar usuario, Warehouse, rol, área, tipo de tarea, prioridad, disponibilidad y estado/asignación antes de intervenir.</p></article><article><span>Condición inicial</span><p>Usuario identificado y acceso de consulta a las herramientas documentadas.</p></article><article><span>Resultado esperado</span><p>Causa identificada y acción correcta elegida sin recurrir automáticamente a asignación manual.</p></article></div>`;
  }else if(currentModule==="integratedCase"){
    intro="Esta etapa evalúa criterio operativo. No se indica qué módulo, consulta ni acción utilizar.";
    body=`<div class="mission-grid"><article><span>Síntoma inicial</span><p>Un operador informa que un pedido incluido en una Ola no puede continuar con su preparación.</p></article><article><span>Objetivo</span><p>Decidir qué evidencia obtener, diagnosticar una causa principal, resolverla y verificar el resultado.</p></article><article><span>Regla</span><p>No modificar datos para destrabar. Primero demostrar la causa con evidencia.</p></article><article><span>Resultado esperado</span><p>Flujo recuperado con diagnóstico y verificación documentados, sin pasos innecesarios.</p></article></div>`;
  }else{
    intro="Módulo todavía no implementado.";
    body=`<div class="content-card"><h3>Módulo todavía no implementado.</h3><p>Este contenido se incorporará cuando el módulo tenga definición funcional validada.</p></div>`;
  }
  return `<section class="module-stage" data-stage="context">${stageHead(1,"ETAPA 1","Situación operativa",intro)}${body}
    <div class="learning-confirm"><button class="milestone-btn" data-milestone="context">Comprendí la situación</button></div>${ref(m)}${navBtns("overview","concepts")}</section>`;
}

function conceptsHTML(m){
  let body="",intro="Solo lo necesario para poder investigar con criterio.";
  if(currentModule==="orientation"){
    body=`<div class="object-grid"><article class="object-card"><b>SCExpert</b>Administración, configuración, planificación, consultas y supervisión desde computadora.</article><article class="object-card"><b>RDT</b>Interfaz operativa para ejecutar tareas en piso.</article><article class="object-card"><b>Warehouse</b>Contexto que debe confirmarse antes de operar.</article><article class="object-card"><b>LPN</b>Identificador único de una unidad logística o carga.</article><article class="object-card"><b>Tarea</b>Trabajo operativo generado por M4N para un usuario compatible.</article><article class="object-card"><b>Ola / Picklist / Shipment</b>Objetos sucesivos de planificación, preparación y despacho.</article></div><div class="content-card"><h3>Principio de navegación</h3><p>Usá el menú mientras aprendés el proceso. Usá Go To cuando ya conocés el código de la pantalla. Confirmá siempre el Warehouse activo.</p></div>`;
  }else if(currentModule==="masterdata"){
    body=`<div class="object-grid"><article class="object-card"><b>UDM</b>Jerarquía de presentaciones: unidad, caja, bulto, pallet, etc.</article><article class="object-card"><b>SKU Class</b>Define atributos requeridos y condiciona Ingreso, Planning, Picking y Conteos.</article><article class="object-card"><b>VU IN</b>Vida útil mínima admitida al ingreso.</article><article class="object-card"><b>VU OUT</b>Umbral de frescura que lleva al LPN a condición crítica según configuración.</article><article class="object-card"><b>NORMALMINLEVEL</b>Umbral que dispara la reposición normal.</article><article class="object-card"><b>HOTMAXLEVEL</b>Capacidad máxima de la ubicación de Picking expresada en la unidad menor.</article></div><div class="content-card"><h3>Regla de este módulo</h3><p>Consultar e interpretar. Los cambios sobre maestros operativos deben quedar en manos de responsables autorizados.</p></div>`;
  }else if(currentModule==="inbound"){
    intro="Antes de operar, diferenciá los objetos que intervienen en la recepción.";
    body=`<div class="object-grid"><article class="object-card"><b>Orden de Entrada</b>Representa lo que M4N espera recibir.</article><article class="object-card"><b>Recibo</b>Documento operativo que habilita a registrar qué mercadería llegó realmente.</article><article class="object-card"><b>LPN</b>Identificador de la unidad logística utilizado para trazabilidad del inventario.</article></div><div class="content-card"><h3>Qué queda registrado</h3><p>Al crear un LPN, M4N vincula el inventario con cliente, SKU, UDM, lote, vencimiento, estado y ubicación. Esa información condiciona procesos posteriores como FEFO, Reposición, Planning y Picking.</p></div>`;
  }else if(currentModule==="putaway"){
    intro="Putaway coordina una decisión de almacenamiento con un movimiento físico real.";
    body=`<div class="object-grid"><article class="object-card"><b>Reacomodar LPN</b>Proceso documentado en RDT → Recepción para almacenar o reubicar un LPN.</article><article class="object-card"><b>Ubicación sugerida</b>Destino propuesto por M4N según las estrategias de almacenamiento del cliente.</article><article class="object-card"><b>Confirmación de destino</b>El escaneo confirma que el operador está frente a la posición física correcta y registra ese destino en M4N.</article></div><div class="content-card"><h3>Regla central</h3><p>Movimiento físico y movimiento en M4N deben ocurrir de forma coordinada. La ubicación sugerida es el flujo normal; una alternativa requiere validar la incidencia y escalar al Supervisor.</p></div>`;
  }else if(currentModule==="inventory"){
    intro="Antes de corregir, clasificá qué tipo de diferencia estás observando.";
    body=`<div class="object-grid"><article class="object-card"><b>LO</b>Inventario por LPN. Consulta estándar para entender qué cree M4N que existe, dónde está, en qué estado y con qué atributos.</article><article class="object-card"><b>AH</b>Historia de Actividad. Permite reconstruir movimientos y acciones históricas.</article><article class="object-card"><b>IV</b>Movimiento de LPN entre ubicaciones.</article><article class="object-card"><b>IH</b>Cambio de estado lógico.</article><article class="object-card"><b>LD</b>Corrección de lote, vencimiento u otros atributos.</article><article class="object-card"><b>IJ</b>Ajustes de cantidades o estructura del LPN.</article></div><div class="content-card"><h3>Secuencia base</h3><p><strong>LO → AH → validación física/conteo → corrección autorizada.</strong> Este módulo llega hasta investigar, clasificar y decidir. No ejecuta ajustes.</p></div>`;
  }else if(currentModule==="replenishment"){
    intro="La reposición abastece Picking desde inventario origen seleccionado según reglas operativas.";
    body=`<div class="object-grid"><article class="object-card"><b>NORMALMINLEVEL</b>Umbral que genera la reposición automática normal y busca reponer hasta el nivel configurado.</article><article class="object-card"><b>FEFO</b>M4N selecciona el inventario origen según vencimiento; el operador no elige libremente otro pallet.</article><article class="object-card"><b>Automática</b>Se genera al alcanzar NormalMinLevel.</article><article class="object-card"><b>Urgente</b>Aparece cuando Planning utiliza una estrategia con sobreasignación y una tarea de Picking necesita inventario que todavía no está disponible en la ubicación de Picking.</article><article class="object-card"><b>Manual</b>La genera el Supervisor Operativo desde RT ante una necesidad puntual.</article><article class="object-card"><b>FULLREPL</b>En el flujo documentado, M4N muestra una tarea FULLREPL asignada al Maquinista.</article></div><div class="content-card"><h3>Principio operativo</h3><p>El Maquinista usa Obtener Tareas. M4N decide qué reposición compatible asignar considerando rol, área, Warehouse, prioridad y disponibilidad.</p></div>`;
  }else if(currentModule==="planning"){
    intro="Planning convierte cantidades de pedido en inventario específico y, después de la revisión, en trabajo ejecutable.";
    body=`<div class="object-grid"><article class="object-card"><b>Ola</b>Agrupa pedidos bajo una misma lógica de preparación.</article><article class="object-card"><b>Planear</b>M4N analiza pedidos, stock, estados, atributos, ubicaciones de Picking y reglas de estrategia para asignar inventario.</article><article class="object-card"><b>Liberar</b>Convierte la decisión del Planning en tareas de Picking asociadas a Picklists.</article><article class="object-card"><b>Staging</b>Cuando la operación necesita direccionar la preparación hacia un Staging específico, debe asignarlo antes de Planear la Ola.</article><article class="object-card"><b>Wave Mode</b>Se usa cuando una estrategia necesita un identificador que no puede determinarse automáticamente desde atributos visibles de la Orden.</article><article class="object-card"><b>Sobreasignación</b>Cuando la estrategia la permite, M4N puede asignar inventario que todavía no está físicamente en Picking y generar una Reposición Urgente; la Picklist dependiente no queda operativa hasta completar esa reposición.</article></div><div class="content-card"><h3>Secuencia base</h3><p><strong>Revisar/configurar Ola → Planear → analizar resultado → resolver/aceptar excepciones → Liberar.</strong></p></div>`;
  }else if(currentModule==="picking"){
    intro="Picking ejecuta físicamente la decisión tomada durante Planning.";
    body=`<div class="object-grid"><article class="object-card"><b>Obtener Tareas</b>Mecanismo normal para recibir trabajo compatible con rol, área, Warehouse, prioridad y disponibilidad.</article><article class="object-card"><b>Picklist</b>Listado de pickeos cuyo trabajo fue generado al liberar la Ola.</article><article class="object-card"><b>Picking estándar</b>El operador valida ubicación origen, presentación/UDM, SKU y cantidad antes de confirmar.</article><article class="object-card"><b>FULLPICK</b>M4N indica un LPN completo; el operador confirma mediante ese LPN sin informar cantidad manualmente.</article><article class="object-card"><b>Conteo</b>Ante diferencia física de cantidad, registra la discrepancia y corta la tarea afectada.</article><article class="object-card"><b>Staging</b>Al finalizar la Picklist, el pallet/contenedor debe quedar físicamente entregado y confirmado en el Staging indicado.</article></div><div class="content-card"><h3>Regla central</h3><p>El Picker confirma lo asignado por M4N y lo que encuentra físicamente. Si algún dato no coincide, no continúa como si el Picking fuera correcto.</p></div>`;
  }else if(currentModule==="exceptions"){
    intro="Una excepción informa que M4N no puede completar una asignación o tarea bajo las reglas configuradas.";
    body=`<div class="object-grid"><article class="object-card"><b>WS</b>Consulta de la excepción y del resultado de Planning.</article><article class="object-card"><b>LO</b>Permite establecer qué inventario existe, dónde está y en qué condición.</article><article class="object-card"><b>AH</b>Permite reconstruir acciones y movimientos previos.</article><article class="object-card"><b>Validación física</b>Contrasta lo registrado con lo que realmente existe en la operación.</article><article class="object-card"><b>Reposición</b>Puede intervenir cuando el stock existe pero no está disponible en Picking.</article><article class="object-card"><b>Replaneo/Liberación</b>Después de corregir la causa, se reconstruye el flujo y se generan nuevas tareas cuando corresponde.</article></div><div class="content-card"><h3>Secuencia general</h3><p><strong>Identificar excepción → consultar inventario → validar físico → corregir causa → volver a Planear → revisar excepciones → Liberar nuevamente cuando corresponda.</strong></p></div>`;
  }else if(currentModule==="consolidation"){
    intro="Consolidar significa actualizar la relación entre contenedores identificados, no elegir libremente cómo agruparlos.";
    body=`<div class="object-grid"><article class="object-card"><b>De contenedor</b>Campo donde se escanea el contenedor origen.</article><article class="object-card"><b>A contenedor</b>Contenedor destino informado por M4N que debe validarse antes de consolidar.</article><article class="object-card"><b>LPN</b>Puede utilizarse como referencia cuando corresponda.</article><article class="object-card"><b>Consolidate</b>Acción que actualiza la relación entre ambos contenedores.</article><article class="object-card"><b>Trazabilidad</b>La relación origen-destino debe mantenerse identificable y verificable.</article></div><div class="content-card"><h3>Regla central</h3><p>M4N no muestra un mensaje adicional de confirmación. El resultado se valida comprobando que el origen quedó actualizado dentro del destino.</p></div>`;
  }else if(currentModule==="dispatch"){
    intro="Despacho conecta la preparación terminada con el viaje físico mediante Shipment, Dock y control de carga.";
    body=`<div class="object-grid"><article class="object-card"><b>Shipment / Envío</b>Unidad de control con la que M4N valida qué pedidos, LPN y contenedores pueden cargarse en un vehículo.</article><article class="object-card"><b>En muelle</b>Condición del viaje en Unigis que, vía Milonga, genera o habilita el Shipment en M4N.</article><article class="object-card"><b>Dock</b>Puerta de carga. Puede llegar informada por el activador o requerir asignación manual.</article><article class="object-card"><b>En Dock de carga</b>Condición que toma el Shipment cuando M4N asigna el Dock informado.</article><article class="object-card"><b>OLS</b>Planilla de Carga utilizada como herramienta de control.</article><article class="object-card"><b>DDC</b>Dashboard de Carga con avance por Envío, pedidos, LPN/Contenedores y porcentaje.</article><article class="object-card"><b>CARGADO</b>Estado requerido antes de que el Supervisor ejecute Salida de Envíos.</article></div><div class="content-card"><h3>Secuencia conceptual</h3><p><strong>Viaje En muelle → Shipment → Dock → carga/validación → CARGADO → Salida de Envíos → Milonga/Unigis → Despachado.</strong></p></div>`;
  }else if(currentModule==="counts"){
    intro="Contar no es ajustar: primero se obtiene una lectura física independiente y después se analiza cualquier diferencia.";
    body=`<div class="object-grid"><article class="object-card"><b>Inventario planificado</b>Se programa desde SCExpert mediante trabajos/tareas de conteo; adecuado para inventarios generales o sectoriales.</article><article class="object-card"><b>Conteo libre</b>Se ejecuta desde el Capturador para controles puntuales, diferencias y operación activa.</article><article class="object-card"><b>Conteo ciego</b>El usuario informa lo que realmente encuentra, sin intentar reproducir el valor esperado.</article><article class="object-card"><b>LIMBO</b>Separa stock dudoso para análisis cuando físico y sistema difieren.</article><article class="object-card"><b>IJ / LD / IH / IV</b>IJ cantidades/estructura; LD atributos; IH estado; IV movimiento de LPN.</article></div><div class="content-card"><h3>Secuencia base</h3><p><strong>Conteo → diferencia → LIMBO → investigación → causa → corrección autorizada.</strong></p></div>`;
  }else if(currentModule==="returns"){
    intro="Una devolución tiene dos tratamientos distintos y la decisión del cliente debe conocerse antes de mover o modificar inventario.";
    body=`<div class="object-grid"><article class="object-card"><b>Vuelve a stock</b>Se crea Recibo, se recibe en la ubicación de devoluciones del CD y el equipo de Devoluciones valida condición física.</article><article class="object-card"><b>Redespacho</b>No vuelve al stock general; se conserva identificado el inventario ya preparado.</article><article class="object-card"><b>Devolución recibida</b>Para redespacho se registra en IO cuando corresponde.</article><article class="object-card"><b>Orden cerrada</b>El reruteo vuelve a habilitarse en Unigis cuando la orden queda con Orden cerrada = Sí.</article><article class="object-card"><b>Ubicación de devoluciones</b>Es específica por CD; DEV01 es solo un ejemplo.</article></div><div class="content-card"><h3>Regla central</h3><p><strong>Devolución recibida ≠ stock disponible</strong> y <strong>Devolución recibida = Sí ≠ reruteo inmediato.</strong></p></div>`;
  }else if(currentModule==="rolesTasks"){
    intro="Que una tarea exista no significa que cualquier usuario pueda recibirla.";
    body=`<div class="object-grid"><article class="object-card"><b>Obtener Tareas</b>Considera Rol + Área habilitada + Warehouse + tipo de tarea + prioridad + disponibilidad.</article><article class="object-card"><b>Área</b>Puede segregar sectores dentro de un mismo Warehouse; no equivale al Rol.</article><article class="object-card"><b>TS</b>Consulta ID, tipo, estado, tipo de asignación, usuario, prioridad, propietario, Picklist y SKU.</article><article class="object-card"><b>Asignar</b>Intervención manual de Supervisor sobre una tarea disponible.</article><article class="object-card"><b>Desasignar</b>Libera la tarea para que vuelva a ser tomada o reasignada.</article><article class="object-card"><b>Cancelar</b>Cancela esa instancia; el proceso origen puede generar otra equivalente si sigue necesitándola.</article><article class="object-card"><b>Prioridad</b>Se define por política/estrategia; 200 puede aparecer por defecto pero no es universal.</article></div>
    <div class="content-card"><h3>Roles / Policies activos documentados</h3><ul><li>ROL_EXC_ENTRADAS</li><li>ROL_EXC_REPOSICION</li><li>ROL_EXC_SALIDAS_COM</li><li>ROL_EXC_SALIDAS_PIC</li><li>ROL_MAQUINISTA</li><li>ROL_PREPARADOR</li><li>ROL_REPO_INGRESOS</li></ul><p>Los nombres anteriores corresponden a roles activos documentados para la operación. No deben inferirse permisos o responsabilidades adicionales únicamente a partir de su nombre.</p></div>`;
  }else if(currentModule==="integratedCase"){
    intro="No hay teoría nueva. El marco es usar evidencia antes de decidir.";
    body=`<div class="content-card"><h3>Síntoma ≠ causa</h3><p>Un síntoma solo indica dónde empezar a investigar. La acción correcta depende de la evidencia obtenida.</p></div><div class="content-card"><h3>Marco de resolución</h3><p><strong>Evidencia → diagnóstico → acción → reconstrucción del flujo cuando corresponda → verificación.</strong></p><p>Las consultas se eligen según el caso: WS para Ola/Planning; LO/AH para inventario; TS para tareas; SE/DDC/OLS si el caso alcanza Despacho.</p></div>`;
  }else{
    intro="Módulo todavía no implementado.";
    body=`<div class="content-card"><h3>Módulo todavía no implementado.</h3><p>No hay conceptos funcionales cargados para este módulo.</p></div>`;
  }
  return `<section class="module-stage" data-stage="concepts">${stageHead(1,"ETAPA 2","Conceptos mínimos",intro)}${body}
    <div class="learning-confirm"><button class="milestone-btn" data-milestone="concepts">Conceptos comprendidos</button></div>${ref(m)}${navBtns("context","setup")}</section>`;
}

function setupHTML(m){
  const fields=Object.keys(CFG.modules[currentModule].environment).map(k=>{
    const generated=currentModule==="inbound"&&(k==="receipt"||k==="lpn");
    return `<label>${label(k)}<input data-config="${k}" placeholder="${generated?"Se completa durante la práctica":"A completar"}" ${generated?"disabled":""}></label>`;
  }).join("");
  const note=currentModule==="inbound"?`<div class="note"><strong>Importante:</strong> el Recibo no debe existir al iniciar este ejercicio base. Lo crea el participante durante la práctica. El LPN también se registra después de generarlo.</div>`:"";
  return `<section class="module-stage" data-stage="setup">${stageHead(1,"ETAPA 3","Condiciones del ambiente","Cargá referencias del ejercicio. No uses datos productivos por defecto.")}
    <div class="content-card"><h3>Setup requerido</h3><ul class="clean-list">${m.setup.map(x=>`<li>${x}</li>`).join("")}</ul>${note}<div class="config-grid">${fields}</div><button class="primary" data-save-setup>Guardar setup</button><div class="setup-save-feedback" data-setup-save-feedback role="status" aria-live="polite" hidden>✓ Datos del ejercicio guardados correctamente.</div></div>${navBtns("concepts","guided")}</section>`;
}
function guidedHTML(m){
  if(currentModule==="orientation"){
    return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Explorá el sistema con objetivos concretos.")}
    ${task("g1","Necesitás conocer ubicación, estado y atributos de un LPN.","Primero decidí si esto es ejecución en piso o consulta.","El Manual identifica LO como consulta estándar de inventario por LPN.","Ingresá a LO desde el menú o mediante Go To y consultá el LPN configurado.")}
    ${task("g2","Antes de operar, verificá qué Warehouse está activo.","Buscá el contexto operativo visible antes de continuar.","No asumas que todos los CD tienen las mismas opciones.","Confirmá el Warehouse activo antes de realizar cualquier acción.")}
    ${quiz("q_interface","Te piden ejecutar una tarea operativa en piso. ¿Qué interfaz corresponde como punto de partida?",[["a","SCExpert"],["b","RDT / Capturador"],["c","Milonga"]],"b","Correcto. El RDT es la interfaz operativa para ejecutar tareas en piso.","Pensá si la necesidad es administrar/consultar o ejecutar físicamente una tarea.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${navBtns("setup","checkpoint")}</section>`;
  }
  if(currentModule==="masterdata"){
    return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Analizá un SKU sin modificar su configuración.")}
    ${task("g1","Localizá el SKU configurado para el ejercicio.","La consulta comienza en Datos Maestros.","El Manual documenta SKUs con código ST.","Ingresá a Master Data / Datos Maestros → SKUs (ST) y localizá el SKU.")}
    ${task("g2","Interpretá la jerarquía de UDM.","Identificá cuál es la UDM inferior y cómo se compone la superior.","La cantidad de UDM indica cuántas unidades inferiores contiene la presentación superior.","Revisá la estructura de UDM y el identificador EAN_UPC_DUN cuando esté configurado.")}
    ${quiz("q_vu","Un SKU tiene VU IN configurada. ¿Qué pregunta operativa responde ese dato?",[["a","Cuándo debe reponerse Picking"],["b","Cuál es la vida útil mínima aceptable al ingreso"],["c","Qué usuario puede editarlo"]],"b","Correcto. VU IN controla la vida útil mínima admitida al ingreso.","Pensá en la diferencia entre una condición de ingreso y una condición de frescura del inventario ya recibido.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${navBtns("setup","checkpoint")}</section>`;
  }
  if(currentModule==="inbound"){
    return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Ejecutá cada misión en M4N. Las pistas se muestran de forma progresiva.")}
    ${task("receipt","Generá el Recibo desde la Orden de Entrada","La creación del Recibo comienza en SCExpert.","Buscá el proceso Inbound y la pantalla Inbound Orders.","Warehouse → Inbound Process → Inbound Orders (IO). Seleccioná la Orden de Entrada y creá manualmente el Recibo.")}
    <label class="quiz-option"><input type="checkbox" data-task-complete="create_receipt"> Creé el Recibo y puedo identificarlo en M4N.</label>
    <div class="config-grid generated-capture"><label>Número de Recibo creado<input data-generated-config="receipt" placeholder="Ingresar identificador"></label></div>
    ${quiz("guided_validation","Antes de crear el LPN, ¿qué conjunto de datos debe validarse?",[["a","Solo SKU y cantidad."],["b","Ubicación de recepción, cantidad, UDM, lote, vencimiento, número de LPN y estado."],["c","Solo lote y vencimiento."]],"b","Correcto. La creación del LPN requiere validar los datos que describen cómo queda constituido el inventario recibido.","Revisá qué información utiliza M4N para identificar la presentación, trazabilidad, estado y ubicación del inventario recibido.")}
    ${task("lpn","Creá el LPN desde el Capturador","La creación del LPN se ejecuta desde el Capturador.","Dentro de Recepción, buscá la opción para crear el LPN.","RDT → Recepción → Crear LPN. Informá Recibo/línea o escaneá EAN/DUN. Confirmá ubicación de recepción, cantidad, UDM, lote, vencimiento, número de LPN y estado.")}
    <label class="quiz-option"><input type="checkbox" data-task-complete="create_lpn"> Creé el LPN y validé los datos contra la mercadería física.</label>
    <div class="config-grid generated-capture"><label>Número de LPN creado<input data-generated-config="lpn" placeholder="Ingresar identificador"></label></div>
    <div class="scenario-box"><h3>Validá antes de cerrar</h3><p>Compará lo registrado en M4N con la mercadería física antes de cerrar el Recibo.</p>
    <label class="quiz-option"><input type="checkbox" data-task-complete="validate_close"> Validé los LPN y cerré el Recibo únicamente cuando correspondía.</label></div>
    <div class="inline-feedback" id="guidedStatus"></div>
    ${ref(m,"Capítulo 6.2 – Paso a paso / 6.3 – Validaciones clave")}${navBtns("setup","checkpoint")}</section>`;
  }
  if(currentModule==="putaway"){
    return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Almacená un LPN coordinando el movimiento físico con el registro en M4N.")}
    ${task("put_lpn","Identificá el LPN que requiere almacenamiento.","El proceso comienza identificando preferentemente el LPN.","Desde el Capturador, el Manual ubica el proceso dentro de Recepción.","Usá RDT → Recepción → Reacomodar LPN, o continuá desde Crear y Acomodar si el flujo de recepción todavía está activo. Identificá el LPN.")}
    ${task("put_suggestion","Interpretá la ubicación propuesta por M4N.","La sugerencia no es una posición elegida al azar por el operador.","M4N calcula el destino según las estrategias de almacenamiento del cliente.","Revisá la ubicación propuesta. Si una ubicación de Picking admite REPO, M4N puede sugerirla antes que una posición de altura.")}
    ${quiz("put_move_order","¿Cuál es la secuencia correcta antes de confirmar el destino?",[["a","Confirmar en M4N y después mover físicamente."],["b","Trasladar físicamente el LPN, verificar la posición y escanear/confirmar el destino."],["c","Elegir cualquier ubicación libre y escribirla manualmente."]],"b","Correcto. El movimiento físico y el registro deben quedar coordinados; el escaneo confirma el destino físico y el destino registrado.","Pensá qué debería ocurrir primero para evitar que M4N indique una ubicación en la que el LPN todavía no está físicamente.")}
    ${task("put_verify","Verificá dónde terminó el LPN.","Después de confirmar, necesitás comprobar el resultado.","El módulo siguiente utiliza LO como consulta estándar de inventario por LPN.","Consultá el LPN en LO y verificá que la ubicación registrada coincida con la ubicación física.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulo 7.1 – Cómo funciona el Guardado")}${navBtns("setup","checkpoint")}</section>`;
  }
  if(currentModule==="inventory"){
    return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Reconstruí la situación del inventario antes de decidir cualquier corrección.")}
    ${task("inv_lo","Localizá el LPN y establecé qué cree M4N que existe.","La consulta principal documentada es LO.","No empieces por una transacción de corrección.","Consultá el LPN en LO – Inventario por LPN. Validá SKU, cantidad, ubicación, estado, lote y vencimiento cuando correspondan.")}
    ${quiz("inv_classify","LO muestra una diferencia. ¿Qué deberías determinar antes de pensar en corregir?",[["a","Si el problema es de ubicación, cantidad, estado o atributos."],["b","Qué ajuste aplicar inmediatamente."],["c","Qué nueva Ola crear."]],"a","Correcto. Clasificar el tipo de diferencia permite elegir después la herramienta adecuada sin corregir solo el síntoma.","Antes de pensar en una herramienta, separá ubicación, cantidad, estado y atributos.")}
    ${task("inv_ah","Reconstruí qué ocurrió antes de la situación actual.","LO muestra el estado actual; necesitás una vista histórica.","El Manual utiliza AH para investigación transversal.","Consultá AH – Historia de Actividad y revisá los movimientos o acciones relevantes que llevaron al estado actual.")}
    ${task("inv_physical","Contrastá el sistema con la realidad física.","La investigación no termina en una pantalla.","La secuencia documentada incluye validación física o conteo antes de corregir.","Verificá físicamente el inventario. Si una modificación fuera necesaria, identificá qué tipo de problema existe y escalá al Responsable autorizado.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulo 8.1 y 8.2 – Interpretación e investigación de diferencias")}${navBtns("setup","checkpoint")}</section>`;
  }
  if(currentModule==="replenishment"){
    return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Ejecutá una reposición asignada por M4N sin elegir arbitrariamente origen ni prioridad.")}
    ${task("rep_need","Identificá por qué existe una necesidad de reposición.","La reposición abastece una ubicación de Picking desde inventario almacenado en otra posición.","Para una reposición automática normal, el Manual vincula la generación con NORMALMINLEVEL.","Revisá la ubicación de Picking y la necesidad de abastecimiento. Si la tarea ya existe, la ejecución comienza desde Obtener Tareas.")}
    ${task("rep_task","Obtené la tarea de reposición.","La ejecución operativa documentada se realiza en RDT.","El usuario Maquinista no elige qué reposición ejecutar.","Seleccioná Obtener Tareas. M4N evalúa rol, área habilitada, Warehouse, prioridad y tareas disponibles y asigna una reposición compatible.")}
    ${quiz("rep_origin","M4N asignó una reposición. ¿Cómo se determina el inventario origen?",[["a","El Maquinista elige el pallet más cercano."],["b","M4N selecciona el inventario origen según FEFO."],["c","Siempre se utiliza el inventario más nuevo."]],"b","Correcto. M4N selecciona el origen según FEFO; el operador no debe reemplazarlo por conveniencia física.","Pensá qué regla utiliza M4N para seleccionar inventario origen y por qué el operador no elige libremente.")}
    ${task("rep_execute","Ejecutá y confirmá la reposición.","Primero validá el LPN origen asignado.","El destino es la ubicación de Picking indicada por la tarea.","Escaneá/confirmá el LPN origen, trasladalo físicamente a la ubicación de Picking indicada, escaneá la ubicación destino y confirmá.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulo 9.3 – Ejecución desde Obtener Tareas")}${navBtns("setup","checkpoint")}</section>`;
  }
  if(currentModule==="planning") return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Planeá una Ola, interpretá el resultado y liberala solo cuando corresponda.")}
    ${task("plan_wave","Localizá la Ola y revisá sus condiciones antes de Planear.","El acceso documentado es Waves (WS).","Si la operación necesita Staging específico, debe quedar asignado antes del Planning.","Ingresá a Warehouse → Outbound Process → Waves (WS). Seleccioná la Ola y, si corresponde, revisá/asigná Staging desde Details antes de Planear.")}
    ${task("plan_execute","Planeá la Ola.","Planear no genera todavía trabajo para el Picker.","M4N intenta convertir cantidades de pedido en inventario específico según las estrategias del cliente.","Ejecutá Planning y revisá el resultado de asignación. No fuerces una condición que aparezca como excepción.")}
    ${quiz("plan_result","Una línea queda sin asignar durante Planning. ¿Qué significa primero?",[["a","Que debe liberarse igual para que M4N la resuelva después."],["b","Que existe una condición que impide la asignación normal y debe investigarse."],["c","Que siempre falta stock físico."]],"b","Correcto. La excepción es información: puede responder a stock, Picking, estado o atributos, entre otras causas documentadas.","No confundas una línea no asignada con una causa única. El Planning informa que alguna condición de asignación no se cumple.")}
    ${task("plan_release","Decidí si corresponde Liberar.","Liberar es distinto de Planear.","Antes de liberar deben revisarse y resolverse o aceptarse las excepciones.","Revisá el resultado. Si la Ola está lista, Liberá. M4N genera tareas de Picking asociadas a cada Picklist.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulo 10.3 a 10.8 – Staging, Planning, excepciones y Liberación")}${navBtns("setup","checkpoint")}</section>`;

  if(currentModule==="picking") return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Ejecutá el flujo normal de Picking y validá cada dato antes de confirmar.")}
    ${task("pick_task","Obtené una tarea de Picking.","La ejecución operativa comienza en el RDT.","El mecanismo documentado es Obtener Tareas.","Seleccioná Obtener Tareas. M4N asigna la Picklist/tarea compatible según rol, área habilitada, Warehouse, prioridad y disponibilidad.")}
    ${task("pick_read","Interpretá la tarea antes de extraer.","No confirmes mirando solo el SKU.","En Picking estándar, el Manual exige leer ubicación origen, SKU, UDM y cantidad.","Dirigite a la ubicación indicada y validá la presentación/UDM solicitada, el SKU y la cantidad. Si M4N indica FULLPICK, confirmá el LPN completo según ese flujo.")}
    ${quiz("pick_confirm","En Picking estándar, ¿qué conjunto debe validarse antes de confirmar?",[["a","Ubicación origen, presentación/UDM, SKU y cantidad."],["b","Solo SKU."],["c","Solo LPN y Staging."]],"a","Correcto. La confirmación representa que ese inventario fue retirado físicamente de la posición indicada.","Leé la tarea completa: ubicación, presentación, producto y cantidad forman parte de la validación.")}
    ${task("pick_finish","Confirmá y continuá el Picklist.","La confirmación debe reflejar lo efectivamente retirado.","Si el Picklist tiene más líneas, M4N continúa con la siguiente; si era la última, avanza al cierre, etiqueta y Staging.","Confirmá correctamente el Picking. Al finalizar la Picklist, identificá el pallet/contenedor, trasladalo al Staging indicado, escaneá la ubicación y confirmá.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulos 11.1 a 11.6 y 11.8 a 11.10 – Picking")}${navBtns("setup","checkpoint")}</section>`;

  if(currentModule==="exceptions") return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Investigá una excepción antes de elegir una corrección.")}
    ${task("exc_observe","Identificá qué se detuvo.","Una excepción no es un error genérico.","Primero determiná si el problema está en Planning, una tarea o las condiciones del inventario.","Localizá la Ola/tarea afectada y describí qué condición M4N no pudo completar.")}
    ${task("exc_investigate","Investigá inventario e historia.","La existencia física por sí sola no demuestra elegibilidad.","El Manual combina WS, LO, AH y validación física.","Revisá WS, consultá LO y AH cuando corresponda y contrastá el resultado con el físico.")}
    ${quiz("exc_first","Existe stock físico pero Planning no asigna. ¿Cuál es la conclusión correcta?",[["a","El inventario puede existir y aun así no ser asignable; hay que investigar estado, Picking, atributos y otras condiciones."],["b","Siempre falta una liberación."],["c","Debe cambiarse el estado a Disponible sin más análisis."]],"a","Correcto. Stock físico y stock elegible no son equivalentes.","Antes de corregir, investigá por qué el inventario no cumple las condiciones de asignación.")}
    ${task("exc_resolve","Definí la acción sobre la causa.","La corrección depende del tipo de excepción.","El Manual documenta stock real, stock fuera de Picking, SKU sin Picking, estado, atributos, diferencia física y repo ejecutada sin tarea.","Elegí la acción principal documentada para la causa encontrada y, después, reconstruí el flujo mediante replaneo/liberación solo cuando corresponda.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulo 12.1 – Cómo interpretar una Excepción")}${navBtns("setup","checkpoint")}</section>`;
  if(currentModule==="consolidation") return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Consolidá contenedores siguiendo exactamente la relación indicada por M4N.")}
    ${task("cons_access","Ingresá al proceso documentado.","La Consolidación se ejecuta desde el Capturador.","El acceso documentado se encuentra dentro del menú Picking.","Ingresá a RDT → Picking → Consolidación.")}
    ${task("cons_source","Identificá el contenedor origen.","El origen se registra en un campo específico.","El Manual lo denomina De contenedor.","Escaneá el contenedor origen en De contenedor.")}
    ${task("cons_destination","Validá el destino antes de consolidar.","No elijas libremente un contenedor destino.","M4N informa el destino en A contenedor; cuando corresponde puede utilizarse referencia de LPN.","Comprobá físicamente que el destino mostrado en A contenedor corresponde al caso antes de continuar.")}
    ${quiz("cons_before","¿Qué deberías confirmar antes de seleccionar Consolidate?",[["a","Que origen y destino identificados coincidan con la relación informada por M4N."],["b","Solo que el origen exista."],["c","Que aparezca previamente un mensaje de éxito."]],"a","Correcto. La buena práctica documentada es confirmar físicamente origen y destino antes de Consolidate.","La Consolidación actualiza una relación; ambos identificadores importan.")}
    ${task("cons_execute","Ejecutá y verificá la Consolidación.","Seleccioná Consolidate para actualizar la relación.","No esperes un mensaje adicional de confirmación.","Después de Consolidate, verificá que el contenedor origen haya quedado actualizado dentro del contenedor destino.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulos 14.1 y 14.2 – Paso a paso y resultado esperado")}${navBtns("setup","checkpoint")}</section>`;

  if(currentModule==="dispatch") return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Controlá y ejecutá la carga validando cada elemento antes de subirlo al vehículo.")}
    ${task("disp_context","Verificá Shipment y Dock.","La carga requiere Shipment creado y Dock asignado.","Si el activador informó Dock, M4N asigna la puerta; si no, Operación debe asignarla y pasar el Envío a Al Dock.","Validá el Shipment en SE y confirmá que el Dock esté correctamente resuelto antes de iniciar carga.")}
    ${task("disp_control","Revisá el control previo de carga.","OLS y DDC sirven para controlar el avance.","DDC muestra Envío, pedidos, LPN/Contenedores y porcentaje de carga.","Revisá OLS/DDC para conocer los elementos asociados y los pendientes.")}
    ${task("disp_load","Iniciá Carga Camión.","La secuencia operativa se ejecuta desde el RDT.","El Manual documenta Picking → Carga Camión.","Ingresá a RDT → Picking → Carga Camión, confirmá/escaneá Dock cuando corresponda e informá el Envío.")}
    ${quiz("disp_reject","Escaneás un LPN/Contenedor y M4N rechaza el código. ¿Qué hacés?",[["a","Detener la carga de ese elemento y revisar su asociación antes de subirlo al camión."],["b","Subirlo físicamente y resolverlo después."],["c","Cambiar de Shipment hasta que sea aceptado."]],"a","Correcto. La validación ocurre antes de cargar físicamente el elemento.","Un rechazo evita cargar inventario de otro viaje.")}
    ${task("disp_complete","Completá y cerrá la carga.","Cada LPN/Contenedor debe ser escaneado contra el Shipment.","El Supervisor no debe ejecutar Salida de Envíos con pendientes ni antes de CARGADO.","Escaneá todos los elementos asociados, confirmá nuevamente Dock al finalizar, verificá DDC sin pendientes y solo entonces evaluá el cierre.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulos 15.3 a 15.6 – Dock, control, carga y cierre")}${navBtns("setup","checkpoint")}</section>`;

  if(currentModule==="counts") return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Ejecutá un Conteo de ubicación completo sin intentar hacer coincidir el físico con el sistema.")}
    ${task("cnt_access","Ingresá al proceso de conteo.","El flujo documentado se ejecuta desde el Capturador.","El menú es Conteo → Conteo de ubicación.","Ingresá a Capturador → Conteo → Conteo de ubicación.")}
    ${task("cnt_location","Identificá la ubicación.","El conteo se realiza sobre una ubicación definida.","La ubicación debe informarse o escanearse.","Escaneá/informá la ubicación y comenzá a registrar todo lo que encontrás físicamente.")}
    ${task("cnt_content","Registrá todo el contenido físico.","No trabajes contra una cantidad esperada.","El Manual exige SKU, UDM, cantidad y lote/vencimiento cuando corresponda.","Escaneá cada SKU, informá UDM y cantidad física, y completá lote/vencimiento o atributos requeridos cuando corresponda. Repetí para todo el contenido.")}
    ${quiz("cnt_finish","Contaste solo parte de la ubicación. ¿Podés seleccionar Fin Conteo?",[["a","No. Debe registrarse todo el contenido físico antes de finalizar."],["b","Sí, porque M4N completa lo faltante."],["c","Sí, si la diferencia parece pequeña."]],"a","Correcto. Finalizar un conteo incompleto puede generar una diferencia artificial y enviar stock a LIMBO.","Fin Conteo se utiliza recién después de registrar todo el contenido físico.")}
    ${task("cnt_finish_task","Finalizá y analizá el resultado.","Fin Conteo cierra la captura física.","Una diferencia no se convierte automáticamente en ajuste.","Seleccioná Fin Conteo solo después de revisar que todo quedó informado. Si aparece una diferencia, tratala como objeto de investigación antes de cualquier corrección.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulos 16.2 a 16.5 – Modalidades, LIMBO, Conteo de ubicación y Ajustes")}${navBtns("setup","checkpoint")}</section>`;

  if(currentModule==="returns") return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Diferenciá devolución a stock de redespacho antes de mover o modificar inventario.")}
    ${task("ret_decision","Confirmá la decisión del cliente.","La devolución no vuelve automáticamente a stock.","El cliente define si corresponde reincorporación o redespacho.","Antes de desarmar, mover o modificar, confirmá el tratamiento definido para el caso.")}
    ${task("ret_stock","Si vuelve a stock, ejecutá el flujo documentado.","El flujo comienza desde IO.","La ubicación de devoluciones depende del CD.","IO → seleccionar devolución → crear nuevo Recibo → recibir desde Capturador como recepción normal → utilizar ubicación de devoluciones definida por el CD → validar condición física. Si está apto, utilizar Acomodar LPN para llevarlo a Picking.")}
    ${quiz("ret_auto_stock","Una devolución fue recibida en el CD. ¿Eso significa que ya está disponible para venta/preparación?",[["a","No. Debe respetarse la decisión del cliente y, si vuelve a stock, validarse físicamente antes de reincorporarla."],["b","Sí, toda devolución recibida vuelve a Disponible."],["c","Sí, siempre que tenga LPN."]],"a","Correcto. El retorno físico no conserva automáticamente condición vendible.","La validación física precede a la reincorporación a Picking.")}
    ${task("ret_redispatch","Si es redespacho, preservá el inventario preparado.","El objetivo es mantener la continuidad del inventario ya preparado.","Devolución recibida = Sí no habilita inmediatamente el reruteo.","IO → localizar devolución → registrar Devolución recibida = Sí cuando corresponde → mantener identificado el mismo inventario → esperar Orden cerrada = Sí → cuando vuelva a rutearse, asociar al nuevo Shipment y ejecutar carga/despacho.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulos 18.1 a 18.5 – Tratamiento, devolución a stock y redespacho")}${navBtns("setup","checkpoint")}</section>`;

  if(currentModule==="rolesTasks") return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Práctica guiada","Investigá por qué Obtener Tareas no entrega el trabajo esperado antes de decidir una intervención manual.")}
    ${task("rt_identity","Identificá usuario y Warehouse.","Empezá por contexto, no por asignación manual.","Un usuario compatible depende también del Warehouse y del área habilitada.","Confirmá usuario y Warehouse activo antes de revisar la tarea.")}
    ${task("rt_role_area","Revisá Rol/Policy y Área.","Rol y Área no son equivalentes.","Las áreas pueden segregar sectores dentro del mismo WH.","Revisá UP Role Assignment / Users según permisos y confirmá que el Rol/Policy y el Área correspondan al trabajo esperado.")}
    ${task("rt_ts","Investigá la tarea en TS.","TS permite ver más que el ID.","Revisá tipo, estado, asignación, usuario y prioridad; Picklist/SKU cuando corresponda.","Localizá la tarea en TS y registrá qué condición puede explicar que Obtener Tareas no la entregue.")}
    ${quiz("rt_rule","¿Qué combinación utiliza Obtener Tareas para asignar trabajo?",[["a","Rol + Área habilitada + Warehouse + tipo de tarea + prioridad + disponibilidad."],["b","Solo Rol y prioridad."],["c","Solo Warehouse y usuario."]],"a","Correcto. La existencia de una tarea por sí sola no alcanza.","Revisá todas las condiciones documentadas de asignación.")}
    ${task("rt_decide","Definí la acción final.","La acción depende del caso investigado.","Preferir Obtener Tareas; la administración manual corresponde al Supervisor.","Determiná si la tarea debe quedar disponible, desasignarse, asignarse manualmente o cancelarse según la causa real.")}
    <button class="milestone-btn" data-milestone="guided">Práctica guiada completada</button>${ref(m,"Capítulos 19.2 a 19.4 – Regla de asignación y administración")}${navBtns("setup","checkpoint")}</section>`;

  if(currentModule==="integratedCase") return `<section class="module-stage" data-stage="guided">${stageHead(2,"ETAPA 4","Investigación inicial","Practicá el método con un caso distinto del desafío autónomo.")}
    ${task("int_observe","Síntoma: existe trabajo operativo, pero el usuario no recibe la tarea esperada.","No empieces asignando manualmente.","Separá existencia de tarea de compatibilidad del usuario.","Identificá usuario y Warehouse y definí qué evidencia necesitás antes de intervenir.")}
    ${quiz("int_evidence","¿Qué evidencia deberías revisar primero para explicar por qué el usuario no recibe la tarea?",[["a","TS y las condiciones de usuario: Warehouse, Rol, Área, prioridad y disponibilidad."],["b","Cambiar la prioridad a 200."],["c","Cancelar la tarea y esperar otra."]],"a","Correcto. Primero hay que demostrar si la tarea existe y si el usuario cumple las condiciones documentadas de asignación.","La existencia de trabajo no demuestra que ese usuario sea compatible para recibirlo.")}
    ${task("int_diagnose","Diagnosticá el caso guiado.","La evidencia debe sostener una causa concreta.","TS muestra la tarea disponible, pero el usuario no cumple una condición documentada de Rol/Área para ese trabajo.","Explicá qué dato de TS y qué condición de usuario demuestran la incompatibilidad.")}
    ${task("int_resolve","Definí acción y verificación.","No conviertas la asignación manual en respuesta automática.","La intervención sobre Rol/Área o asignación debe respetar permisos; Obtener Tareas continúa siendo el mecanismo normal.","Definí la acción autorizada que corresponde al caso y verificá después si el usuario compatible puede recibir trabajo mediante Obtener Tareas.")}
    <button class="milestone-btn" data-milestone="guided">Investigación inicial completada</button>${ref(m,"Referencias transversales: capítulos 19 y 22")}${navBtns("setup","checkpoint")}</section>`;

  return `<section class="module-stage" data-stage="guided">${stageHead(1,"ETAPA 4","Módulo todavía no implementado.","No hay práctica guiada disponible para este módulo.")}${navBtns("setup","checkpoint")}</section>`;
}

function checkpointHTML(m){
  let qs="",detail=m.manual,occurred="";
  if(currentModule==="orientation"){
    qs=quiz("q_cp","Te dan un LPN y necesitás conocer dónde está y su estado. ¿Qué harías primero?",[["a","Ir a RDT y ejecutar una tarea"],["b","Consultar el LPN en LO y confirmar Warehouse"],["c","Crear una Ola"]],"b","Correcto. Primero investigás el LPN en LO y confirmás el contexto de Warehouse.","Separá investigación de ejecución: todavía no necesitás mover ni asignar nada.")+
       quiz("q_obj","¿Qué objeto representa trabajo operativo generado por M4N para un usuario compatible?",[["a","Tarea"],["b","Shipment"],["c","SKU"]],"a","Correcto. La Tarea representa trabajo operativo asignable/ejecutable.","Pensá en el objeto que describe trabajo, no inventario ni despacho.");
  }else if(currentModule==="masterdata"){
    qs=quiz("q_cp","Antes de operar un SKU querés saber qué atributos puede exigir el flujo. ¿Qué revisarías?",[["a","SKU Class"],["b","Shipment"],["c","Dock"]],"a","Correcto. La SKU Class define atributos requeridos y condiciona varios procesos.","Buscá el parámetro maestro que define atributos requeridos por el cliente.")+
       quiz("q_pick","¿Qué combinación describe correctamente los parámetros de reposición documentados?",[["a","NORMALMINLEVEL dispara reposición normal; HOTMAXLEVEL representa capacidad máxima"],["b","HOTMAXLEVEL dispara la recepción; NORMALMINLEVEL define lote"],["c","Ambos son estados del inventario"]],"a","Correcto. Ambos pertenecen a la relación SKU ↔ ubicación de Picking.","Ubicalos en el contexto de Picking y reposición, no en atributos del LPN.");
  }else if(currentModule==="inbound"){
    detail="Capítulo 6.2, 6.3 y 6.4 – Recepción / Inbound";
    qs=quiz("checkpoint_lookup","Después de crear el LPN, ¿dónde verificarías su ubicación y estado?",[["a","LO – Inventario por LPN."],["b","WS – Waves."],["c","RT – Planificar Reposiciones."]],"a","Correcto. LO – Inventario por LPN es la consulta estándar para verificar el inventario asociado a un LPN.","Buscá una consulta orientada al inventario identificado por LPN, no a olas ni reposiciones.")+
       quiz("checkpoint_attributes","¿Qué deberías contrastar entre M4N y la mercadería física antes del cierre?",[["a","Solo la cantidad total recibida."],["b","SKU, cantidad, UDM y, cuando corresponda, lote/vencimiento, además del estado y el LPN registrado."],["c","Solo el número de Orden y el proveedor."]],"b","Correcto. La validación debe contrastar la mercadería física con los datos operativos registrados en el LPN.","Pensá en los datos que condicionan trazabilidad, vida útil, presentación y disponibilidad del inventario.")+
       quiz("checkpoint_open_receipt","Si el Recibo continúa abierto y detectás un LPN incorrecto, ¿qué alternativa existe antes de realizar un ajuste?",[["a","Desasignar/cancelar el LPN incorrecto y volver a recibirlo correctamente."],["b","Cerrar el Recibo y luego modificar el pedido."],["c","Cambiar directamente la Ola."]],"a","Correcto. Mientras el Recibo permanece abierto, la corrección puede mantenerse dentro del flujo de Recepción sin recurrir a un ajuste.","Pensá en qué alternativa permite corregir el LPN sin salir todavía del flujo de Recepción.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>El sistema vinculó el inventario recibido con el SKU y sus datos operativos. El LPN queda como unidad trazable y la información registrada condiciona los procesos posteriores.</p></div>`;
  }else if(currentModule==="putaway"){
    detail="Capítulo 7.1 – Guardado / Putaway";
    qs=quiz("put_cp_verify","Después de confirmar el destino, ¿cómo verificarías que el LPN quedó registrado en la ubicación correcta?",[["a","Consultando el LPN en LO y contrastando con la posición física."],["b","Creando otro LPN."],["c","Replaneando una Ola."]],"a","Correcto. La verificación conecta el movimiento operativo con la consulta de inventario.","La pregunta es dónde consultar el LPN después del movimiento, no cómo volver a moverlo.")+
       quiz("put_cp_scan","¿Qué confirma el escaneo de la ubicación destino durante el acomodo?",[["a","Que el operador está frente a la posición física correcta y quiere registrar ese destino en M4N."],["b","Solo que la ubicación existe en el maestro."],["c","Que el LPN ya fue despachado."]],"a","Correcto. El escaneo sincroniza la posición física verificada con el destino registrado.","Pensá por qué el Manual recomienda escanear la etiqueta de ubicación en lugar de escribirla manualmente.")+
       quiz("put_cp_arbitrary","¿Por qué no corresponde elegir arbitrariamente otra posición si M4N sugiere un destino?",[["a","Porque la sugerencia responde a estrategias de almacenamiento y una alternativa es una excepción que debe validarse."],["b","Porque ningún LPN puede cambiar de ubicación."],["c","Porque solo existe una ubicación por Warehouse."]],"a","Correcto. La ubicación sugerida forma parte de la estrategia; desviarse sin validar degrada esa lógica.","Relacioná la sugerencia con las estrategias de almacenamiento del cliente.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>El LPN dejó de estar registrado en Recepción y quedó asociado a la ubicación destino confirmada. La consulta posterior permite comprobar que sistema y físico quedaron alineados.</p></div>`;
  }else if(currentModule==="inventory"){
    detail="Capítulo 8.1 y 8.2 – Gestión y consulta de Inventario";
    qs=quiz("inv_cp_difference","LO indica una ubicación diferente a la ubicación física informada. ¿Qué harías primero?",[["a","Mover el LPN en IV inmediatamente."],["b","Revisar LO, consultar AH y validar físicamente antes de definir la corrección."],["c","Ejecutar un ajuste IJ."]],"b","Correcto. Primero se reconstruye qué ocurrió y se valida el físico; recién después se define una corrección autorizada.","La diferencia todavía no te dice su causa. Priorizá investigación antes de modificar.")+
       quiz("inv_cp_history","Necesitás saber cómo llegó un LPN a su situación actual. ¿Qué consulta utilizarías?",[["a","AH – Historia de Actividad."],["b","WS – Waves."],["c","SE – Shipment."]],"a","Correcto. AH permite investigar movimientos y acciones históricas.","Buscá la consulta que muestra la secuencia de acciones registradas por el sistema.")+
       quiz("inv_cp_types","Detectás que el lote es incorrecto, pero cantidad y ubicación coinciden. ¿Qué tipo de diferencia estás identificando?",[["a","Atributo."],["b","Movimiento."],["c","Cantidad."]],"a","Correcto. Lote y vencimiento son atributos; clasificarlos correctamente evita elegir una herramienta equivocada.","Separá lo que describe al LPN de dónde está y cuánto contiene.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>LO te permitió establecer el estado actual del inventario; AH agregó la secuencia histórica. Juntas, más la validación física, permiten identificar la causa antes de modificar datos.</p></div>`;
  }else if(currentModule==="replenishment"){
    detail="Capítulo 9 – Reposición / Reabastecimiento";
    qs=quiz("rep_cp_process","Existe stock de reserva y la ubicación de Picking alcanzó el mínimo configurado. ¿Qué proceso debería intervenir?",[["a","Reposición automática normal."],["b","Despacho."],["c","Consolidación."]],"a","Correcto. El Manual vincula la reposición automática normal con NORMALMINLEVEL.","Relacioná el mínimo de Picking con el proceso que abastece esa ubicación.")+
       quiz("rep_cp_fefo","¿Por qué FEFO importa en una reposición?",[["a","Porque M4N lo utiliza para seleccionar el inventario origen."],["b","Porque define el rol del usuario."],["c","Porque reemplaza la ubicación de Picking."]],"a","Correcto. FEFO condiciona qué inventario origen debe abastecer Picking.","Pensá qué regla evita que el Maquinista elija simplemente el pallet más cercano.")+
       quiz("rep_cp_after","Ejecutaste una reposición vinculada a Planning pero la tarea dependiente no aparece. ¿Qué indica el Manual revisar?",[["a","Revisar la Ola en WS y volver a Planear y Liberar cuando corresponda."],["b","Generar siempre una reposición manual nueva."],["c","Cambiar el estado del inventario sin investigar."]],"a","Correcto. El Manual documenta el caso de una repo ejecutada cuya tarea no aparece: revisar WS y volver a Planear y Liberar la Ola.","La reposición resuelve disponibilidad física. Si la tarea dependiente no aparece, revisá nuevamente el flujo de la Ola.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>La reposición movió inventario seleccionado por M4N hacia Picking. Si la necesidad estaba vinculada a Planning, el trabajo dependiente puede requerir replaneo y liberación posterior.</p></div>`;
  }else if(currentModule==="planning"){
    detail="Capítulo 10 – Planning y generación de olas";
    qs=quiz("plan_cp_difference","¿Cuál es la diferencia conceptual entre Planear y Liberar?",[["a","Planear asigna inventario; Liberar convierte esa decisión en trabajo ejecutable."],["b","Son dos nombres para la misma acción."],["c","Liberar asigna inventario y Planear genera tareas."]],"a","Correcto. Planning decide qué inventario usar; Liberación genera las tareas de Picking.","Separá la decisión de asignación de la generación de trabajo ejecutable.")+
       quiz("plan_cp_unassigned","Una línea no recibió inventario durante Planning. ¿Qué deberías hacer antes de Liberar?",[["a","Investigar stock, estado, Picking, atributos y reposición según la excepción."],["b","Liberar igual para que el Picker la resuelva."],["c","Cambiar cantidad para que cierre."]],"a","Correcto. La excepción debe investigarse y tratarse antes de liberar trabajo incorrecto.","La línea no asignada es información útil. Buscá la condición que impide la asignación.")+
       quiz("plan_cp_physical","Hay stock físico, pero M4N no lo asigna. ¿Qué conclusión es válida?",[["a","Stock físico no implica necesariamente inventario elegible."],["b","M4N siempre debería asignarlo."],["c","La única causa posible es falta de ruteo."]],"a","Correcto. Estado, ubicación de Picking y atributos pueden volver no elegible un inventario físico existente.","Diferenciá existencia física de elegibilidad bajo las reglas de asignación.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>Planning intentó convertir demanda en inventario específico. Las excepciones mostraron dónde las reglas no permitieron asignar normalmente. Liberar solo corresponde después de revisar ese resultado.</p></div>`;
  }else if(currentModule==="picking"){
    detail="Capítulos 11.1 a 11.5 – Picking / Preparación de pedidos";
    qs=quiz("pick_cp_lpn","M4N indica FULLPICK con un LPN específico y encontrás otro pallet. ¿Qué corresponde?",[["a","No confirmar otro LPN; validar la diferencia y detener el flujo normal."],["b","Tomar el pallet más cercano si es el mismo SKU."],["c","Informar manualmente la cantidad esperada."]],"a","Correcto. En Full Pick se confirma el LPN indicado; un LPN distinto es una inconsistencia.","FULLPICK identifica el pallet completo mediante el LPN asignado.")+
       quiz("pick_cp_relation","¿Qué relación existe entre la Picklist y la tarea de Picking?",[["a","Al liberar la Ola, M4N genera tareas de Picking asociadas a cada Picklist."],["b","La Picklist se crea al cerrar el Picking."],["c","No existe relación documentada."]],"a","Correcto. La Liberación transforma la decisión de Planning en trabajo ejecutable asociado a las Picklists.","Volvé a la secuencia Ola liberada → Picklist/tarea.")+
       quiz("pick_cp_before_qty","Antes de confirmar una cantidad en Picking estándar, ¿qué debe validarse?",[["a","Ubicación, presentación/UDM, SKU y físico disponible."],["b","Solo el pedido comercial."],["c","Solo el Staging final."]],"a","Correcto. La confirmación debe representar exactamente lo retirado de la ubicación indicada.","La cantidad no se valida aislada del producto, presentación y ubicación.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>La tarea ejecutó físicamente la asignación definida por Planning. La confirmación descuenta el inventario de la posición indicada y el Picklist continúa hasta su finalización y entrega a Staging.</p></div>`;
  }else if(currentModule==="exceptions"){
    detail="Capítulo 12.1 – Cómo interpretar una Excepción";
    qs=quiz("exc_cp_task","Una tarea no aparece después de una corrección/reposición. ¿Qué corresponde revisar?",[["a","La Ola en WS y, si corresponde, volver a Planear y Liberar."],["b","Cambiar prioridad arbitrariamente."],["c","Crear una tarea manual sin revisar el proceso origen."]],"a","Correcto. El Manual documenta revisar WS y reconstruir Planning/Liberación cuando se necesitan nuevas tareas.","Corregir inventario no garantiza por sí solo que aparezca trabajo nuevo.")+
       quiz("exc_cp_physical","Existe stock físico pero Planning no asigna. ¿Qué significa?",[["a","Puede no ser elegible por ubicación, estado, atributos u otra condición documentada."],["b","El WMS está necesariamente fallando."],["c","Debe hacerse un ajuste de cantidad."]],"a","Correcto. La existencia física no demuestra elegibilidad para asignación.","Primero identificá qué condición no cumple el inventario.")+
       quiz("exc_cp_replan","¿Cuándo corresponde reconstruir el flujo mediante replaneo y nueva Liberación?",[["a","Después de corregir la causa cuando se necesitan nuevas tareas."],["b","Siempre que aparece cualquier mensaje."],["c","Antes de investigar la causa."]],"a","Correcto. Primero se corrige la causa; luego se replanea, se revisa el resultado y se libera nuevamente cuando corresponde.","La secuencia del Manual pone diagnóstico y corrección antes del replaneo.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>La excepción permitió identificar una condición que impedía continuar. La investigación separó el síntoma de la causa y determinó qué proceso debía corregirse antes de reconstruir el flujo.</p></div>`;
  }else if(currentModule==="consolidation"){
    detail="Capítulo 14 – Consolidación de Contenedores";
    qs=quiz("cons_cp_destination","¿Quién determina el contenedor destino que debe validarse?",[["a","M4N informa el destino en A contenedor."],["b","El operador elige cualquier contenedor compatible."],["c","Siempre lo define Packing."]],"a","Correcto. El destino a validar es el informado por M4N.","No hay una regla documentada que permita elegir libremente otro destino.")+
       quiz("cons_cp_no_message","Seleccionaste Consolidate y no aparece un mensaje adicional. ¿Cómo verificás el resultado?",[["a","Comprobando que el contenedor origen quedó actualizado dentro del destino."],["b","Repitiendo Consolidate hasta ver un mensaje."],["c","Asumiendo que terminó correctamente."]],"a","Correcto. El Manual documenta esa verificación como resultado esperado.","La ausencia de mensaje adicional es parte del comportamiento documentado.")+
       quiz("cons_cp_wrong_dest","El destino mostrado no coincide con el contenedor físico esperado. ¿Qué corresponde?",[["a","Detenerse y validar identificadores antes de consolidar."],["b","Consolidar igual y corregir después."],["c","Escanear otro destino sin validar."]],"a","Correcto. Preservar trazabilidad requiere validar antes de ejecutar Consolidate.","No existe un override documentado para reemplazar libremente el destino.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>Consolidate actualizó la relación entre el contenedor origen y el destino informado. La operación se verifica comprobando la relación resultante.</p></div>`;
  }else if(currentModule==="dispatch"){
    detail="Capítulo 15 – Despacho / Shipping";
    qs=quiz("disp_cp_other","Un LPN pertenece a otro Shipment. ¿Qué corresponde?",[["a","No cargarlo y revisar la asociación."],["b","Cargarlo si físicamente entra en el camión."],["c","Cerrar el Shipment y moverlo después."]],"a","Correcto. M4N valida cada elemento para evitar cargar inventario de otro viaje.","El Shipment define qué elementos pertenecen al viaje.")+
       quiz("disp_cp_pending","¿Qué herramienta permite controlar en vivo qué falta cargar?",[["a","DDC – Dashboard de Carga."],["b","LO exclusivamente."],["c","RT Reposición."]],"a","Correcto. DDC muestra avance por Envío, pedidos, LPN/Contenedores y porcentaje.","Buscá la herramienta de control de carga en vivo.")+
       quiz("disp_cp_close","¿Cuándo puede el Supervisor ejecutar Salida de Envíos?",[["a","Cuando no quedan pendientes y el Shipment está CARGADO."],["b","Cuando el camión parece completo aunque DDC tenga pendientes."],["c","Apenas se asigna el Dock."]],"a","Correcto. No se debe ejecutar Salida de Envíos mientras existan pendientes o el Shipment no esté CARGADO.","Separá condición de carga de condición de cierre.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>Cada lectura quedó validada contra el Shipment. El cierre solo procede después de completar la carga, eliminar pendientes y alcanzar CARGADO.</p></div>`;
  }else if(currentModule==="counts"){
    detail="Capítulo 16 – Inventarios, Conteos y Ajustes";
    qs=quiz("cnt_cp_finish","Terminaste de contar solo parte de una ubicación. ¿Qué hacés?",[["a","No selecciono Fin Conteo hasta informar todo el contenido físico."],["b","Finalizo para que M4N complete el resto."],["c","Ajusto primero y termino después."]],"a","Correcto. Un conteo incompleto puede generar una diferencia artificial.","Fin Conteo exige que el relevamiento físico esté completo.")+
       quiz("cnt_cp_limbo","¿Qué significa que una diferencia pase a LIMBO?",[["a","Que el stock dudoso queda separado para análisis."],["b","Que la mercadería está definitivamente perdida."],["c","Que debe eliminarse con IJ."]],"a","Correcto. LIMBO es una instancia de investigación, no una pérdida definitiva.","Pensá en LIMBO como separación para análisis.")+
       quiz("cnt_cp_tool","Cantidad correcta pero lote incorrecto. ¿Qué herramienta corresponde conceptualmente?",[["a","LD – atributos."],["b","IJ – cantidades."],["c","IV – movimiento."]],"a","Correcto. Lote/vencimiento son atributos; IJ no debe usarse para corregirlos.","Elegí herramienta según el tipo de diferencia.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>El conteo obtuvo una lectura física independiente. Si hubo diferencia, M4N la aisló para análisis; la corrección se define recién después de investigar la causa.</p></div>`;
  }else if(currentModule==="returns"){
    detail="Capítulo 18 – Devoluciones y Redespachos";
    qs=quiz("ret_cp_auto","¿Una devolución vuelve automáticamente al stock disponible?",[["a","No. El cliente define el tratamiento."],["b","Sí, siempre."],["c","Solo si se marca Devolución recibida."]],"a","Correcto. El tratamiento debe definirse antes de mover o modificar inventario.","Stock y redespacho son caminos distintos.")+
       quiz("ret_cp_dev01","¿DEV01 es la ubicación corporativa obligatoria de devoluciones?",[["a","No. Es solo un ejemplo; cada CD define su ubicación."],["b","Sí, debe usarse en todos los Warehouse."],["c","Solo para redespacho."]],"a","Correcto. No debe hardcodearse DEV01.","La ubicación de devoluciones es una definición local del CD.")+
       quiz("ret_cp_reroute","¿Devolución recibida = Sí habilita inmediatamente el reruteo?",[["a","No. El reruteo queda habilitado cuando Orden cerrada = Sí."],["b","Sí, inmediatamente."],["c","Solo si se crea un Recibo nuevo."]],"a","Correcto. Orden cerrada = Sí depende del proceso de Liquidaciones.","La confirmación de devolución recibida no es la condición final de reruteo.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>El tratamiento quedó separado entre reincorporación a stock y redespacho. Cada camino conserva trazabilidad y evita desarmar o disponibilizar inventario indebidamente.</p></div>`;
  }else if(currentModule==="rolesTasks"){
    detail="Capítulo 19 – Roles y Administración de Tareas";
    qs=quiz("rt_cp_pool","Una tarea está asignada al usuario equivocado y debe volver al pool. ¿Qué acción corresponde?",[["a","Desasignar."],["b","Cancelar."],["c","Cambiar prioridad a 200."]],"a","Correcto. Desasignar libera la tarea para que vuelva a ser tomada o reasignada.","Cancelar afecta la instancia; no es lo mismo que devolverla al pool.")+
       quiz("rt_cp_cancel","¿Cancelar una tarea elimina necesariamente la necesidad operativa que la originó?",[["a","No. Si el proceso origen sigue requiriéndola, M4N puede generar una tarea equivalente."],["b","Sí, siempre."],["c","Solo si la prioridad era 200."]],"a","Correcto. Cancelar actúa sobre esa instancia, no necesariamente sobre el requerimiento origen.","El proceso origen puede seguir necesitando el trabajo.")+
       quiz("rt_cp_priority","¿La prioridad 200 es obligatoria para todas las tareas?",[["a","No. Puede aparecer por defecto, pero no es una regla universal."],["b","Sí, es el estándar corporativo."],["c","Solo para Picking."]],"a","Correcto. La prioridad se define por política/estrategia.","No hardcodees 200 como regla universal.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>La tarea quedó interpretada dentro de sus condiciones de asignación. La administración manual se utilizó solo si el caso lo justificaba y sin confundir desasignación con cancelación.</p></div>`;
  }else if(currentModule==="integratedCase"){
    detail="Referencias transversales del Manual según la evidencia utilizada";
    qs=quiz("int_cp_cause","¿Qué demuestra mejor una causa y no solo un síntoma?",[["a","Evidencia coherente entre la consulta del proceso y la condición real del inventario/tarea."],["b","Que el operador diga que no funciona."],["c","Que exista stock físico."]],"a","Correcto. El diagnóstico debe apoyarse en evidencia del proceso real.","Un síntoma inicia la investigación; no prueba la causa.")+
       quiz("int_cp_force","Existe una excepción que impide continuar. ¿Qué principio se mantiene?",[["a","No cambiar cantidad, estado o atributo solo para destrabar."],["b","Modificar el dato más rápido y analizar después."],["c","Cancelar toda tarea relacionada."]],"a","Correcto. Primero se identifica y corrige la causa documentada.","Forzar datos destruye trazabilidad y puede ocultar el problema real.")+
       quiz("int_cp_rebuild","Después de corregir la causa, ¿siempre hay que recorrer todos los módulos siguientes?",[["a","No. Solo se reconstruyen los pasos que correspondan al caso."],["b","Sí, siempre hasta Despacho."],["c","Sí, incluyendo Consolidación aunque no aplique."]],"a","Correcto. El Caso Integrador evalúa criterio para elegir procesos, no recitar toda la Academia.","La reconstrucción depende de la causa y del punto real del flujo.");
    occurred=`<div class="content-card"><h3>Qué ocurrió en M4N</h3><p>El participante separó síntoma y causa, eligió evidencia relevante y reconstruyó únicamente el tramo del flujo afectado.</p></div>`;
  }else{
    detail="Módulo todavía no implementado.";
    qs=`<div class="content-card"><h3>Módulo todavía no implementado.</h3><p>No hay checkpoint funcional disponible para este módulo.</p></div>`;
    occurred="";
  }
  return `<section class="module-stage" data-stage="checkpoint">${stageHead(1,"ETAPA 5","Checkpoint","Confirmá que podés interpretar el resultado y elegir la consulta o decisión correcta.")}${qs}${occurred}
    <button class="milestone-btn" data-checkpoint>Validar checkpoint</button>${ref(m,detail)}${navBtns("guided","scenario")}</section>`;
}

function scenarioHTML(m){
  let intro="",description="",q="",hint="",detail=null,title="Práctica semiguiada",subtitle="Ahora recibís menos indicaciones y tenés que elegir el criterio.";
  if(currentModule==="orientation"){
    intro="Necesitás investigar un objeto sin perder contexto";
    description="Elegí por dónde entrar, verificá Warehouse y explicá qué objeto estás consultando.";
    q=quiz("q_scenario","Conocés el código de la pantalla que necesitás y ya entendés el proceso. ¿Cuál es el acceso más directo documentado?",[["a","Go To"],["b","Crear una tarea"],["c","Cambiar de Warehouse sin verificar"]],"a","Correcto. Go To es el acceso rápido cuando ya conocés el código de la pantalla.","El Manual diferencia explícitamente el uso del menú durante el aprendizaje y Go To cuando el código ya es conocido.");
  }else if(currentModule==="masterdata"){
    intro="Necesitás decidir si el SKU está listo para el flujo operativo";
    description="Revisá clase, UDM, vida útil, Picking y reposición. No modifiques parámetros.";
    q=quiz("q_scenario","El SKU tiene una clase que exige lote y vencimiento. ¿Qué conclusión operativa es válida?",[["a","Esos atributos deben estar disponibles y consistentes durante el flujo"],["b","Se pueden ignorar durante Recepción"],["c","La clase solo afecta reportes"]],"a","Correcto. La clase condiciona Ingreso, Planning, Picking y Conteos.","Pensá en qué función tiene SKU Class: no es descriptiva; define atributos requeridos.");
  }else if(currentModule==="inbound"){
    title="Escenario alternativo";subtitle="Detectaste un dato incorrecto en un LPN. Ahora tenés que decidir cómo encarar la corrección.";
    intro="Un LPN fue recibido con un dato incorrecto.";description="Antes de actuar, identificá si la corrección todavía puede mantenerse dentro del flujo de Recepción.";
    q=quiz("alternative_receipt_status","¿Qué condición determina primero el camino de corrección?",[["a","La distancia física entre el LPN y Recepción."],["b","Si el Recibo continúa abierto o ya fue cerrado."],["c","La cantidad de líneas de la Orden."]],"b","Correcto. El estado del Recibo determina si la corrección puede resolverse dentro de Recepción o si pasa a requerir un Ajuste de Inventario.","Pensá primero en qué documento determina si todavía podés corregir dentro del flujo de Recepción.");
    hint=`<div class="hint-actions"><button class="secondary" data-hint="alternative_hint_1" data-level="hint1">Pista 1</button></div><div class="hint-box" id="alternative_hint_1">Pensá primero en qué documento determina si todavía podés corregir dentro del flujo de Recepción.</div>`; detail="Capítulo 6.4 – Corrección de errores";
  }else if(currentModule==="putaway"){
    title="Escenario alternativo";subtitle="La ubicación sugerida por M4N no puede utilizarse físicamente.";
    intro="Llegás al destino sugerido y la posición está ocupada o no es operable.";description="Decidí qué hacer sin convertir una excepción en una elección libre de ubicación.";
    q=quiz("put_scenario","¿Qué acción corresponde ante una ubicación sugerida que no puede utilizarse?",[["a","Elegir cualquier posición libre y confirmar."],["b","Informar al Supervisor, validar la incidencia y utilizar una alternativa solo si está autorizada."],["c","Dejar el LPN físicamente en otra ubicación pero mantener la sugerida en M4N."]],"b","Correcto. La ubicación alternativa es una excepción validada, no una decisión arbitraria del operador.","El Manual trata la sugerencia como flujo normal. Pensá qué rol interviene antes de usar una alternativa.");
    detail="Capítulo 7.1 – Guardado / Putaway";
  }else if(currentModule==="inventory"){
    title="Escenario alternativo";subtitle="M4N y la realidad física no coinciden. Todavía no conocés la causa.";
    intro="LO muestra una ubicación distinta de la ubicación física informada.";description="Reconstruí la situación antes de proponer cualquier modificación.";
    q=quiz("inv_scenario","¿Cuál es la secuencia más adecuada?",[["a","LO → AH → validación física/conteo → corrección autorizada."],["b","IJ → LO → AH."],["c","IV inmediato y luego revisar historial."]],"a","Correcto. Primero se establece el estado actual, luego la historia y el físico; la corrección viene después de identificar la causa.","No conviertas la diferencia observada en una causa asumida. Seguí la secuencia base de investigación.");
    detail="Capítulo 8.2 – Investigación de diferencias";
  }else if(currentModule==="replenishment"){
    title="Escenario alternativo";subtitle="La operación esperaba una reposición, pero no aparece una tarea.";
    intro="Picking necesita abastecimiento, pero Obtener Tareas no asigna la reposición esperada.";description="Investigá antes de pensar en crear una reposición manual.";
    q=quiz("rep_scenario","¿Cuál es el enfoque correcto antes de forzar una reposición manual?",[["a","Revisar stock FEFO, posición/configuración, existencia de tarea y compatibilidad de rol/área/Warehouse."],["b","Crear una reposición manual inmediatamente."],["c","Elegir cualquier LPN disponible y moverlo a Picking."]],"a","Correcto. El Manual identifica falta de stock FEFO, reposición no generada, posición mal parametrizada o usuario sin rol como causas posibles.","Una tarea ausente puede deberse al inventario, la configuración o la compatibilidad del usuario. Investigá esas condiciones primero.");
    detail="Capítulo 9.3 – Ejecución desde Obtener Tareas";
  }else if(currentModule==="planning"){
    title="Escenario alternativo";subtitle="La Ola tiene líneas sin asignar después del Planning.";
    intro="Existe inventario físico, pero una línea continúa en excepción.";description="Determiná qué condición impide la asignación y si la Ola está lista para liberar.";
    q=quiz("plan_scenario","¿Qué debería investigarse antes de Liberar?",[["a","Stock real, ubicación de Picking, estado, atributos y reposición requerida según la excepción."],["b","Solo si el camión ya llegó."],["c","Nada: Liberar genera automáticamente el inventario faltante."]],"a","Correcto. Las excepciones documentadas incluyen falta de stock, stock fuera de Picking, estado no Disponible, SKU sin Picking y atributos faltantes.","Usá la excepción como diagnóstico. No conviertas la Liberación en un intento de tapar una asignación incompleta.");
    detail="Capítulo 10.4 a 10.8 y Capítulo 12.1 – Excepciones";
  }else if(currentModule==="picking"){
    title="Escenario alternativo";subtitle="M4N indica una cantidad, pero físicamente encontrás menos.";
    intro="La cantidad física no coincide con la cantidad solicitada por M4N.";description="No completes el Picking informando la cantidad que el sistema esperaba.";
    q=quiz("pick_scenario","¿Qué acción documenta el Manual ante una diferencia física de cantidad durante Picking?",[["a","Seleccionar Conteo; la tarea afectada se corta y genera una excepción."],["b","Informar la cantidad esperada para terminar la tarea."],["c","Elegir otro LPN sin registrar la diferencia."]],"a","Correcto. Conteo registra la discrepancia y corta la tarea para preservar trazabilidad.","La diferencia no se resuelve simulando que el físico coincide con M4N.");
    detail="Capítulo 11.5 – Diferencia durante Picking";
  }else if(currentModule==="exceptions"){
    title="Escenario semiguiado";subtitle="Picking no puede continuar porque falta inventario disponible en la posición de Picking.";
    intro="Existe una falta operativa en Picking, pero todavía no conocés la causa.";description="Determiná si existe stock elegible, si corresponde reposición y qué debe ocurrir después.";
    q=quiz("exc_scenario","¿Cuál es el enfoque correcto?",[["a","Revisar inventario y elegibilidad, validar si existe/requiere reposición y reconstruir Planning/Liberación solo después de resolver la causa."],["b","Generar siempre una reposición manual."],["c","Cambiar el estado del inventario a Disponible para destrabar."]],"a","Correcto. No toda falta en Picking demuestra automáticamente que deba generarse una reposición.","Investigá primero si existe inventario utilizable y qué condición impide continuar.");
    detail="Capítulo 12.1 – Cómo interpretar una Excepción";
  }else if(currentModule==="consolidation"){
    title="Escenario alternativo";subtitle="El destino informado no coincide con el contenedor físico que esperabas.";
    intro="Escaneaste el contenedor origen y M4N muestra un destino distinto al esperado físicamente.";description="Decidí cómo preservar la trazabilidad antes de ejecutar Consolidate.";
    q=quiz("cons_scenario","¿Qué acción corresponde?",[["a","Detenerse, validar origen/destino y no ejecutar Consolidate hasta aclarar la relación."],["b","Forzar el destino físico esperado."],["c","Consolidar y revisar luego."]],"a","Correcto. El procedimiento exige validar el destino informado por M4N antes de consolidar.","No existe una función de override documentada.");
    detail="Capítulos 14.1 a 14.4 – Consolidación";
  }else if(currentModule==="dispatch"){
    title="Escenario alternativo";subtitle="El camión parece completo, pero DDC todavía muestra pendientes.";
    intro="Físicamente no ves más elementos por cargar, pero el Dashboard mantiene LPN/Contenedores pendientes.";description="Determiná si corresponde cerrar el Shipment.";
    q=quiz("disp_scenario","¿Qué corresponde hacer?",[["a","No ejecutar Salida de Envíos; investigar los pendientes y validar asociación/lectura."],["b","Cerrar igual porque el físico parece completo."],["c","Cambiar manualmente el Shipment a Despachado."]],"a","Correcto. El Supervisor no debe cerrar mientras existan pendientes o el Shipment no esté CARGADO.","El Dashboard forma parte del control previo al cierre.");
    detail="Capítulos 15.4 a 15.6 – Control de carga y cierre";
  }else if(currentModule==="counts"){
    title="Escenario alternativo";subtitle="Después del conteo aparece una diferencia y el inventario queda en LIMBO.";
    intro="El resultado físico no coincide con el sistema.";description="Investigá antes de decidir cualquier ajuste.";
    q=quiz("cnt_scenario","¿Cuál es la secuencia correcta?",[["a","Revisar LO y AH, validar nuevamente físico cuando corresponda, determinar causa y recién después definir corrección."],["b","Ejecutar IJ inmediatamente."],["c","Eliminar LIMBO para cerrar la diferencia."]],"a","Correcto. La diferencia debe investigarse antes de cualquier ajuste.","LIMBO separa el stock dudoso para análisis; no reemplaza la investigación.");
    detail="Capítulos 16.1, 16.3 y 16.5";
  }else if(currentModule==="returns"){
    title="Escenario semiguiado";subtitle="Llega mercadería despachada y el cliente indica que debe volver a stock.";
    intro="Necesitás reincorporarla sin asumir que sigue vendible.";description="Seguí el flujo de devolución a stock y respetá la validación física.";
    q=quiz("ret_scenario","¿Cuál es el tratamiento correcto?",[["a","Crear Recibo, recibir en ubicación de devoluciones del CD, validar condición física y usar Acomodar LPN hacia Picking solo si está apto."],["b","Mover directamente a Picking al llegar."],["c","Marcar Devolución recibida = Sí y rutear."]],"a","Correcto. La devolución a stock requiere recepción y validación física antes de reincorporación.","No confundas devolución a stock con redespacho.");
    detail="Capítulo 18.3 – Devolución a stock";
  }else if(currentModule==="rolesTasks"){
    title="Escenario semiguiado";subtitle="Una tarea fue asignada al usuario equivocado y necesitás devolverla al pool.";
    intro="La tarea debe quedar disponible para ser tomada o reasignada.";description="Elegí la acción que modifica la asignación sin cancelar la instancia.";
    q=quiz("rt_scenario","¿Qué acción corresponde?",[["a","Desasignar."],["b","Cancelar."],["c","Asignar una prioridad fija de 200."]],"a","Correcto. Desasignar libera la tarea para que vuelva a ser tomada o reasignada.","No confundas administración de asignación con cancelación de la instancia.");
    hint=`<div class="content-card"><h3>Segundo punto conceptual</h3><p>Si una tarea se cancela y más tarde aparece otra equivalente, puede deberse a que el proceso origen continúa requiriendo ese trabajo.</p></div>`;
    detail="Capítulos 19.3 y 19.4";
  }else if(currentModule==="integratedCase"){
    title="Casos secundarios";subtitle="Dos situaciones breves para verificar criterio fuera del caso principal.";
    intro="No se indica qué módulo usar.";description="Elegí primero la evidencia y el principio funcional correcto.";
    q=quiz("int_inv_scenario","Durante la operación se detecta una diferencia física de inventario. ¿Cuál es el enfoque correcto?",[["a","LO → AH → validación física/conteo → causa → elegir la herramienta de corrección si corresponde."],["b","IJ inmediatamente."],["c","Cambiar estado a Disponible y continuar."]],"a","Correcto. Una diferencia se investiga antes de ajustar.","La herramienta depende del tipo de diferencia y de la causa.");
    hint=quiz("int_ret_scenario","Mercadería previamente despachada vuelve al Warehouse, pero no se indicó su tratamiento. ¿Qué necesitás primero?",[["a","La decisión del cliente: vuelta a stock o redespacho."],["b","Crear siempre un Recibo."],["c","Registrar siempre Devolución recibida = Sí."]],"a","Correcto. La decisión del cliente define dos caminos operativos distintos.","No mezcles reincorporación a stock con redespacho.");
    detail="Referencias transversales: capítulos 16 y 18";
  }else{
    title="Módulo todavía no implementado.";subtitle="No hay escenario funcional disponible para este módulo.";
    intro="Módulo todavía no implementado.";description="El escenario se incorporará cuando exista definición funcional validada.";q="";hint="";detail=null;
  }
  return `<section class="module-stage" data-stage="scenario">${stageHead(2,"ETAPA 6",title,subtitle)}
    <div class="scenario-box"><h3>${intro}</h3><p>${description}</p></div>${q}${hint}
    <button class="milestone-btn" data-scenario>Escenario completado</button>${ref(m,detail)}${navBtns("checkpoint","challenge")}</section>`;
}

function challengeHTML(m){
  let txt="",h1="",h2="",proc="";
  if(currentModule==="orientation"){
    txt="Te informan un LPN, un SKU y una necesidad operativa sin decirte qué pantalla usar. Investigá dónde empezar, verificá el Warehouse, elegí la interfaz y dejá registrado qué objeto consultaste y por qué.";
    h1="Separá primero consulta/administración de ejecución en piso."; h2="Confirmá Warehouse antes de usar menú o Go To.";
    proc="1) Confirmá Warehouse. 2) Elegí SCExpert para consulta o RDT para ejecución. 3) Usá menú mientras explorás o Go To si conocés el código. 4) Identificá el objeto y verificá el resultado.";
  }else if(currentModule==="masterdata"){
    txt="Antes de operar el SKU del ejercicio, determiná si controla atributos relevantes, qué presentaciones utiliza, cómo se comportan VU IN/VU OUT y dónde está configurado para Picking. Explicá qué podría afectar a Recepción, Planning o Picking.";
    h1="Empezá por ST y leé el SKU como una configuración que condiciona procesos posteriores."; h2="Seguí este orden de análisis: UDM → SKU Class → VU IN/VU OUT → Picking/reposición.";
    proc="1) Abrí ST y localizá el SKU. 2) Revisá UDM. 3) Interpretá SKU Class. 4) Revisá VU IN/VU OUT. 5) Identificá Picking y parámetros de reposición. 6) No guardes modificaciones.";
  }else if(currentModule==="inbound"){
    txt="Recibís una nueva Orden de Entrada. Debés registrar la mercadería, comprobar los atributos obligatorios, validar los LPN y decidir correctamente qué documentos cerrar.";
    h1="Revisá la secuencia lógica: documento esperado → documento operativo → inventario registrado → validación antes del cierre.";
    h2="Antes de corregir una diferencia, identificá si el Recibo sigue abierto o ya fue cerrado.";
    proc="1) Localizá la Orden de Entrada y creá el Recibo. 2) Desde RDT → Recepción → Crear LPN, registrá y validá los datos operativos. 3) Contrastá M4N con el físico. 4) Cerrá el Recibo y la Orden únicamente cuando corresponda.";
  }else if(currentModule==="putaway"){
    txt="Recibís un nuevo LPN disponible en Recepción. Dejalo correctamente almacenado y verificá el resultado sin recibir el procedimiento paso a paso.";
    h1="La ubicación destino no la elegís libremente: primero identificá el LPN y dejá que M4N aplique la estrategia.";
    h2="No confirmes el destino hasta estar físicamente frente a la posición correcta.";
    proc="1) Identificá el LPN en Reacomodar LPN o continuá desde Crear y Acomodar. 2) Interpretá la ubicación sugerida. 3) Trasladá físicamente el LPN. 4) Escaneá y confirmá destino. 5) Verificá la ubicación final mediante consulta.";
  }else if(currentModule==="inventory"){
    txt="Te informan un LPN con una inconsistencia reportada. Determiná dónde figura, qué contiene, en qué estado está, qué atributos posee y qué movimientos tuvo. Explicá cuál debería ser el siguiente paso sin modificar inventario.";
    h1="Empezá por establecer el estado actual del LPN, no por buscar una transacción de corrección.";
    h2="Después de LO, reconstruí la secuencia histórica y contrastala con el físico.";
    proc="1) Consultá LO y validá SKU, cantidad, ubicación, estado, lote y vencimiento. 2) Consultá AH. 3) Validá físicamente. 4) Clasificá la diferencia. 5) Si requiere modificación, escalá al Responsable autorizado. No ajustes antes de identificar la causa.";
  }else if(currentModule==="replenishment"){
    txt="Picking necesita abastecimiento. Determiná si corresponde reposición, identificá cómo debería generarse o ejecutarse y verificá el resultado. Si no aparece una tarea, explicá qué revisarías antes de escalar.";
    h1="Separá primero la necesidad de reposición de la forma en que esa reposición se genera.";
    h2="Para ejecutar, dejá que Obtener Tareas asigne una reposición compatible y respetá el origen FEFO indicado por M4N.";
    proc="1) Revisá la necesidad de Picking. 2) Identificá el tipo de reposición que corresponde según el caso. 3) Usá Obtener Tareas para ejecución. 4) Validá LPN origen. 5) Trasladá a la ubicación de Picking indicada y confirmá destino. 6) Verificá resultado. Si no aparece tarea, investigá stock FEFO, configuración y compatibilidad de usuario antes de una manual.";
  }else if(currentModule==="planning"){
    txt="Recibís una Ola con líneas sin asignar. Investigá por qué, explicá qué debe resolverse y determiná si corresponde Liberar o no.";
    h1="Primero distinguí si el problema es falta de stock o inventario existente pero no elegible.";
    h2="Revisá Picking, estado, atributos y reposición antes de considerar la Ola lista.";
    proc="1) Abrí la Ola en WS. 2) Verificá Staging si aplica. 3) Revisá el resultado del Planning. 4) Investigá cada excepción con las consultas/procesos documentados. 5) Corregí o aceptá la excepción cuando corresponda. 6) Si corregiste una excepción y volvés a Planear, revisá el nuevo resultado. 7) Volvé a Liberar cuando se necesiten nuevas tareas.";
  }else if(currentModule==="picking"){
    txt="Obtené una tarea de Picking, ejecutala correctamente y documentá qué verificaste antes de confirmar. Si encontrás una diferencia, explicá cómo actuarías según el flujo documentado.";
    h1="Empezá por Obtener Tareas y leé completa la asignación antes de retirar inventario.";
    h2="Diferenciá Picking estándar de FULLPICK: no tienen la misma forma de confirmación.";
    proc="1) Usá Obtener Tareas. 2) Leé ubicación, SKU, presentación/UDM y cantidad. 3) Si es FULLPICK, validá el LPN completo. 4) Ejecutá físicamente lo asignado. 5) Confirmá solo si coincide con el físico. 6) Si hay diferencia de cantidad, usá Conteo. 7) Al finalizar, entregá y confirmá en Staging.";
  }else if(currentModule==="exceptions"){
    txt="Recibís una incidencia: “El operador no puede continuar el Picking”. Sin instrucciones adicionales, diagnosticá la causa utilizando M4N, explicá qué encontraste y definí la acción correcta y el paso posterior necesario.";
    h1="No empieces corrigiendo: primero identificá si el bloqueo viene de inventario, Picking, reposición, Planning o tarea.";
    h2="Usá WS para contexto de Ola y LO/AH para inventario e historia; contrastá con el físico cuando corresponda.";
    proc="1) Identificá el proceso que se detuvo. 2) Revisá WS/tarea. 3) Consultá LO y AH según el caso. 4) Validá físicamente. 5) Clasificá la causa. 6) Aplicá o escalá la acción documentada. 7) Si la corrección afecta la asignación, replaneá, revisá el nuevo resultado y volvé a Liberar cuando se necesiten nuevas tareas.";
  }else if(currentModule==="consolidation"){
    txt="Consolidá correctamente los contenedores asignados y dejá evidencia de cómo verificaste origen, destino y resultado.";
    h1="El destino no se elige libremente: validá el que M4N informa.";
    h2="No uses la aparición de un mensaje como criterio de éxito; el Manual indica que no hay confirmación adicional.";
    proc="1) Ingresá a RDT → Picking → Consolidación. 2) Escaneá De contenedor. 3) Validá A contenedor y LPN cuando corresponda. 4) Confirmá físicamente ambos identificadores. 5) Seleccioná Consolidate. 6) Verificá la relación resultante.";
  }else if(currentModule==="dispatch"){
    txt="Recibís un Shipment listo para comenzar su carga. Controlá Dock, verificá cada elemento y determiná cuándo corresponde ejecutar Salida de Envíos.";
    h1="Antes de cargar, confirmá Shipment, Dock y pendientes en OLS/DDC.";
    h2="Cada LPN/Contenedor debe ser leído físicamente y aceptado por M4N antes de subirlo al vehículo.";
    proc="1) Validá Shipment y Dock. 2) Revisá OLS/DDC. 3) Ingresá a RDT → Picking → Carga Camión. 4) Confirmá Dock cuando corresponda e informá Envío. 5) Escaneá físicamente cada LPN/Contenedor. 6) Si M4N rechaza uno, no lo cargues y revisá asociación. 7) Completá todos los elementos. 8) Verificá DDC sin pendientes y Shipment CARGADO. 9) Supervisor ejecuta Salida de Envíos.";
  }else if(currentModule==="counts"){
    txt="Ejecutá un conteo completo de una ubicación, analizá el resultado y explicá qué harías si surge una diferencia.";
    h1="No mires el conteo como un ajuste: primero registrá todo lo que existe físicamente.";
    h2="Si aparece una diferencia, pensá en LIMBO e investigación antes de elegir una herramienta de corrección.";
    proc="1) Ingresá a Conteo de ubicación. 2) Informá ubicación. 3) Registrá todos los SKU, UDM, cantidades y atributos requeridos. 4) Revisá que no falte contenido. 5) Seleccioná Fin Conteo. 6) Si existe diferencia, revisá LIMBO, LO y AH; validá físico y determiná causa. 7) Definí IJ/LD/IH/IV según corresponda. 8) Si hay ajuste, Razón de Ajuste y Notas son obligatorias.";
  }else if(currentModule==="returns"){
    txt="Recibís una devolución sin instrucciones operativas adicionales. Investigá la definición del cliente, determiná si vuelve a stock o corresponde redespacho y describí/ejecutá el tratamiento correcto.";
    h1="La primera decisión no es técnica: confirmá qué tratamiento definió el cliente.";
    h2="Stock y redespacho usan lógicas opuestas: uno reincorpora después de validar; el otro preserva la preparación.";
    proc="1) Identificá la devolución y la decisión del cliente. 2) Si vuelve a stock: IO → Recibo → recepción → ubicación de devoluciones del CD → validación física → Acomodar LPN si está apto. 3) Si es redespacho: mantener inventario identificado, registrar Devolución recibida = Sí cuando corresponda, esperar Orden cerrada = Sí y luego continuar con nuevo Shipment/carga cuando vuelva a rutearse.";
  }else if(currentModule==="rolesTasks"){
    txt="Un operador dice: “No me cae la tarea”. Investigá el caso sin recibir instrucciones sobre dónde está el problema y justificá la acción final.";
    h1="Separá primero compatibilidad del usuario y estado/asignación de la tarea.";
    h2="Revisá Rol + Área + Warehouse + tipo + prioridad + disponibilidad y después TS.";
    proc="1) Identificá usuario y Warehouse. 2) Revisá Rol/Policy y Área. 3) Localizá la tarea en TS. 4) Interpretá tipo, estado, asignación, usuario y prioridad. 5) Identificá la causa. 6) Definí si se deja disponible, se desasigna, se asigna manualmente o se cancela. 7) Justificá por qué esa acción no rompe el proceso origen.";
  }else if(currentModule==="integratedCase"){
    txt="Caso principal: un pedido incluido en una Ola no logra completar su flujo de salida. No se informa la causa. Investigá, diagnosticá una sola causa principal, resolvela usando procesos ya aprendidos, reconstruí solo el tramo necesario y verificá el resultado. En tus notas registrá: EVIDENCIA, DIAGNÓSTICO, ACCIÓN, VERIFICACIÓN y CRITERIO.";
    h1="Separá primero si el bloqueo está en inventario, asignación o tarea. Indicá qué evidencia necesitás.";
    h2="WS explica Planning; LO/AH explican inventario; TS explica tareas. Elegí solo las consultas necesarias.";
    proc="1) Confirmá Warehouse. 2) Identificá pedido/Ola. 3) Revisá WS y consultá LO/AH para demostrar que existe inventario pero no está disponible en Picking. 4) Confirmá que la causa requiere Reposición. 5) Ejecutá o gestioná la Reposición según el flujo aprobado. 6) Volvé a Planear y Liberar cuando corresponda para generar el trabajo dependiente. 7) Verificá que vuelva a existir trabajo de Picking y confirmá el resultado. 8) Documentá EVIDENCIA, DIAGNÓSTICO, ACCIÓN, VERIFICACIÓN y CRITERIO.";
  }else{
    txt="Módulo todavía no implementado.";h1="No hay pistas funcionales disponibles.";h2="No hay procedimiento funcional disponible.";proc="Este módulo todavía no cuenta con contenido validado.";
  }
  return `<section class="module-stage" data-stage="challenge">${stageHead(3,"ETAPA 7","Desafío autónomo","Resolvé el caso con mínima asistencia. Las ayudas solo aparecen si las solicitás.")}
    <div class="scenario-box"><h3>Misión</h3><p>${txt}</p>
    <div class="hint-actions"><button class="secondary" data-hint="challenge_hint1" data-level="hint1">Pista 1</button><button class="secondary" data-hint="challenge_hint2" data-level="hint2">Pista 2</button><button class="secondary" data-hint="challenge_proc" data-level="procedure">Mostrar procedimiento</button></div>
    <div class="hint-box" id="challenge_hint1">${h1}</div><div class="hint-box" id="challenge_hint2">${h2}</div><div class="hint-box" id="challenge_proc">${proc}</div>
    <textarea id="challengeNotes" style="width:100%;min-height:130px;margin-top:16px" placeholder="${currentModule==="integratedCase"?"EVIDENCIA:\nDIAGNÓSTICO:\nACCIÓN:\nVERIFICACIÓN:\nCRITERIO:":"Registrá qué observaste, cómo lo interpretaste y qué decisión tomaste."}"></textarea>
    <label class="quiz-option"><input type="checkbox" id="challengeDone"> Completé el desafío y puedo explicar mi criterio.</label></div>${ref(m)}
    ${navBtns("scenario","close")}</section>`;
}

function pendingMilestonesHTML(){
  if(calcProgress()>=100)return "";
  const labels=[
    ["context","Situación / Context"],
    ["concepts","Conceptos"],
    ["setup","Setup"],
    ["guided","Práctica guiada"],
    ["checkpoint","Checkpoint"],
    ["scenario","Escenario / Semiguiado"]
  ];
  const pending=labels.filter(([id])=>!state.milestones[id]).map(([,label])=>label);
  if(!state.challengeComplete)pending.push("Desafío");
  return pending.length?`<div class="content-card pending-milestones" role="status"><h3>Todavía quedan etapas pendientes</h3><p>Todavía quedan etapas pendientes para completar este módulo:</p><ul class="clean-list">${pending.map(label=>`<li>${label}</li>`).join("")}</ul></div>`:"";
}

function closeHTML(m){
  let ideas="",occurred="";
  if(currentModule==="orientation"){
    ideas="<li>SCExpert y RDT cumplen funciones distintas.</li><li>Confirmá Warehouse antes de operar.</li><li>Menú para aprender; Go To cuando conocés el código.</li><li>Entender el objeto evita operar a ciegas.</li>";
    occurred="No modificaste el sistema: aprendiste a elegir correctamente el contexto, la interfaz y el objeto de consulta antes de operar.";
  }else if(currentModule==="masterdata"){
    ideas="<li>El maestro del SKU condiciona procesos posteriores.</li><li>UDM, Class y vida útil deben interpretarse antes de operar.</li><li>Picking y reposición dependen de su relación configurada.</li><li>Consultar no implica modificar.</li>";
    occurred="No modificaste el maestro: interpretaste parámetros que M4N utilizará luego para validar y direccionar la operación.";
  }else if(currentModule==="inbound"){
    ideas="<li>La Orden de Entrada representa lo esperado y el Recibo habilita el registro operativo.</li><li>El LPN debe reflejar correctamente la mercadería física y sus atributos.</li><li>Lote, vencimiento, UDM y estado impactan procesos posteriores.</li><li>La validación debe realizarse antes del cierre.</li>";
    occurred="M4N convirtió la recepción física en inventario trazable: el LPN quedó vinculado a SKU, cantidad, UDM, atributos, estado y ubicación, y el estado del Recibo determina cómo puede corregirse una diferencia.";
  }else if(currentModule==="putaway"){
    ideas="<li>La sugerencia de M4N responde a estrategias de almacenamiento.</li><li>El movimiento físico y el registro en M4N deben mantenerse coordinados.</li><li>Escanear el destino confirma la posición física y el destino registrado.</li><li>Una alternativa al destino sugerido requiere validar la incidencia y escalar.</li>";
    occurred="El LPN fue trasladado desde su ubicación origen y quedó registrado en la ubicación destino confirmada. La verificación posterior demuestra si físico y sistema terminaron alineados.";
  }else if(currentModule==="inventory"){
    ideas="<li>LO establece qué cree M4N que existe ahora.</li><li>AH permite reconstruir qué ocurrió antes.</li><li>Una diferencia debe clasificarse como ubicación, cantidad, estado o atributo.</li><li>La corrección se define recién después de LO + AH + validación física/conteo.</li>";
    occurred="La investigación combinó estado actual, historia y realidad física. El objetivo no fue modificar inventario, sino identificar la causa y el tipo de acción que correspondería.";
  }else if(currentModule==="replenishment"){
    ideas="<li>Reposición abastece Picking desde inventario origen seleccionado según FEFO.</li><li>Automática, urgente y manual tienen condiciones distintas documentadas.</li><li>El Maquinista ejecuta mediante Obtener Tareas y no elige libremente la reposición.</li><li>Una tarea ausente se investiga antes de pensar en una manual.</li>";
    occurred="M4N asignó una tarea compatible y direccionó inventario origen hacia Picking. Si el trabajo dependía de Planning, puede requerir replaneo y liberación posterior.";
  }else if(currentModule==="planning"){
    ideas="<li>Planear asigna inventario; Liberar genera trabajo ejecutable.</li><li>Las excepciones son información diagnóstica, no mensajes para ignorar.</li><li>Staging se define antes de Planear cuando corresponde.</li><li>Una excepción corregida puede requerir volver a Planear y volver a Liberar.</li>";
    occurred="Planning transformó cantidades de pedido en inventario específico o en excepciones explicables. La Liberación convirtió únicamente una decisión revisada en tareas de Picking.";
  }else if(currentModule==="picking"){
    ideas="<li>El Picker ejecuta la decisión de Planning y no elige inventario por conveniencia.</li><li>Picking estándar valida ubicación, presentación/UDM, SKU y cantidad.</li><li>FULLPICK confirma el LPN completo indicado.</li><li>Ante diferencia física de cantidad se usa Conteo y no se fuerza la confirmación.</li>";
    occurred="La tarea de Picking convirtió la asignación en extracción física confirmada. Si el flujo terminó normalmente, el pallet/contenedor quedó entregado y confirmado en Staging; si hubo diferencia, la tarea se cortó para preservar trazabilidad.";
  }else if(currentModule==="exceptions"){
    ideas="<li>Una excepción indica que una condición configurada no se cumple.</li><li>WS, LO, AH y validación física permiten separar síntoma de causa.</li><li>No se cambian estados, atributos o cantidades solo para destrabar.</li><li>Después de corregir la causa, se reconstruye Planning/Liberación cuando corresponda.</li>";
    occurred="La excepción fue investigada antes de corregirse. El resultado final no es hacer desaparecer el mensaje, sino recuperar el flujo con una causa identificada y una acción trazable.";
  }else if(currentModule==="consolidation"){
    ideas="<li>El contenedor origen se escanea en De contenedor.</li><li>El destino debe ser el informado por M4N en A contenedor.</li><li>Consolidate actualiza la relación entre ambos contenedores.</li><li>No hay mensaje adicional: la relación resultante debe verificarse.</li>";
    occurred="M4N actualizó la relación entre contenedor origen y destino. La trazabilidad se conserva al validar los identificadores antes de Consolidate y comprobar la relación después.";
  }else if(currentModule==="dispatch"){
    ideas="<li>El Shipment controla qué pedidos, LPN y contenedores pertenecen al viaje.</li><li>Dock informado y Dock no informado siguen flujos diferentes.</li><li>Cada elemento se valida contra el Shipment antes de cargarlo físicamente.</li><li>Salida de Envíos solo corresponde sin pendientes y con Shipment CARGADO.</li>";
    occurred="La carga quedó validada elemento por elemento contra el Shipment. Una vez sin pendientes y en CARGADO, el Supervisor ejecutó Salida de Envíos y el flujo continuó hacia Milonga/Unigis.";
  }else if(currentModule==="counts"){
    ideas="<li>Contar no es ajustar.</li><li>Fin Conteo solo se usa después de registrar todo el contenido físico.</li><li>LIMBO separa diferencias para análisis y no implica pérdida definitiva.</li><li>La corrección se elige después de LO + AH + físico/conteo + causa.</li>";
    occurred="El conteo produjo una lectura física independiente. Una diferencia quedó aislada para investigación y solo después del análisis se determinó si correspondía una corrección trazable.";
  }else if(currentModule==="returns"){
    ideas="<li>Una devolución no vuelve automáticamente a stock.</li><li>El cliente define stock vs. redespacho.</li><li>DEV01 es solo un ejemplo de ubicación de devoluciones.</li><li>Devolución recibida = Sí no habilita inmediatamente el reruteo.</li>";
    occurred="La devolución siguió el tratamiento definido por el cliente: reincorporación a Picking después de validar condición física o preservación del inventario preparado hasta el nuevo flujo de redespacho.";
  }else if(currentModule==="rolesTasks"){
    ideas="<li>Obtener Tareas evalúa más que la existencia de una tarea.</li><li>Rol y Área no son equivalentes.</li><li>Desasignar devuelve la tarea al pool; Cancelar cancela esa instancia.</li><li>La asignación manual es intervención del Supervisor, no el mecanismo habitual.</li>";
    occurred="La asignación fue investigada desde sus condiciones reales y la acción administrativa elegida respetó el proceso origen.";
  }else if(currentModule==="integratedCase"){
    ideas="<li>Síntoma no es causa.</li><li>La evidencia determina el diagnóstico.</li><li>Se corrige la causa, no se fuerzan datos.</li><li>La reconstrucción y la verificación deben corresponder al proceso realmente utilizado.</li>";
    occurred="El participante resolvió una incidencia transversal sin una ruta prefijada: obtuvo evidencia, justificó la causa, eligió el proceso correcto y verificó el resultado.";
  }else{
    ideas="<li>Módulo todavía no implementado.</li>";
    occurred="No existe contenido funcional validado para este módulo.";
  }
  return `<section class="module-stage" data-stage="close">${stageHead(3,"CIERRE DEL MÓDULO",m.title,"Revisá los criterios que deben quedar incorporados al finalizar el módulo.")}
    <div class="content-card split"><div><h3>Lo importante</h3><ul class="clean-list">${ideas}</ul></div><div><h3>Errores a evitar</h3><ul class="clean-list">${m.critical.map(x=>`<li>${x}</li>`).join("")}</ul></div></div>
    <div class="result-banner"><span>QUÉ OCURRIÓ EN M4N</span><strong>${occurred}</strong></div>${ref(m)}
    ${pendingMilestonesHTML()}<div class="summary-card"><h3 id="completionText">${status()}</h3><p>La clasificación de aprobación completa queda disponible en Vista Instructor.</p></div>${navBtns("challenge",null)}</section>`;
}

function navBtns(prev,next){
  return `<div class="stage-actions">${prev?`<button class="secondary" data-prev="${prev}">Anterior</button>`:""}${next?`<button class="primary" data-next="${next}">Siguiente</button>`:""}</div>`;
}
function task(id,title,h1,h2,proc){
  return `<div class="scenario-box"><h3>${title}</h3><div class="hint-actions">
    <button class="secondary" data-hint="${id}_h1" data-level="hint1">Pista 1</button>
    <button class="secondary" data-hint="${id}_h2" data-level="hint2">Pista 2</button>
    <button class="secondary" data-hint="${id}_proc" data-level="procedure">Mostrar procedimiento</button></div>
    <div class="hint-box" id="${id}_h1">${h1}</div><div class="hint-box" id="${id}_h2">${h2}</div><div class="hint-box" id="${id}_proc">${proc}</div></div>`;
}
function quiz(id,q,opts,correct,ok,no){
  return `<div class="scenario-box quiz" data-quiz="${id}" data-correct="${correct}" data-ok="${esc(ok)}" data-no="${esc(no)}"><h3>${q}</h3>
    ${opts.map(o=>`<label class="quiz-option"><input type="radio" name="${id}" value="${o[0]}"> ${o[1]}</label>`).join("")}
    <button class="secondary" data-check-quiz="${id}">Validar respuesta</button><div class="quiz-feedback"></div></div>`;
}
function esc(s){return s.replace(/"/g,"&quot;")}
function escHtml(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/\n/g,"<br>")}
function validateIntegratedNote(notes){
  const required=["EVIDENCIA","DIAGNÓSTICO","ACCIÓN","VERIFICACIÓN","CRITERIO"];
  const missing=required.filter(h=>!new RegExp(`(^|\\n)\\s*${h}\\s*:`,`i`).test(notes));
  return {valid:notes.trim().length>=150&&missing.length===0,missing};
}
function label(k){
  return ({
    warehouse:"Warehouse",user:"Usuario",sampleLpn:"LPN de ejemplo",sampleSku:"SKU de ejemplo",sampleOrder:"Orden de ejemplo",
    sku:"SKU",owner:"Propietario/Cliente",pickingLocation:"Ubicación de Picking",inboundOrder:"Orden de Entrada",
    receipt:"Recibo",lpn:"LPN",receivingLocation:"Ubicación de recepción",originLocation:"Ubicación origen",suggestedLocation:"Ubicación sugerida",physicalLocation:"Ubicación física informada",sourceLpn:"LPN origen",sourceLocation:"Ubicación origen",order:"Orden",wave:"Ola",stagingLocation:"Staging",picklist:"Picklist",task:"Tarea",sourceContainer:"Contenedor origen",destinationContainer:"Contenedor destino",shipment:"Shipment / Envío",dock:"Dock",container:"Contenedor",location:"Ubicación",uom:"UDM",returnLocation:"Ubicación de devoluciones",disposition:"Destino pedagógico",role:"Rol / Policy",area:"Área habilitada",taskId:"ID de tarea",taskType:"Tipo de tarea"
  })[k]||k;
}
function checkpointIds(){
  if(currentModule==="orientation")return ["q_cp","q_obj"];
  if(currentModule==="masterdata")return ["q_cp","q_pick"];
  if(currentModule==="inbound")return ["checkpoint_lookup","checkpoint_attributes","checkpoint_open_receipt"];
  if(currentModule==="putaway")return ["put_cp_verify","put_cp_scan","put_cp_arbitrary"];
  if(currentModule==="inventory")return ["inv_cp_difference","inv_cp_history","inv_cp_types"];
  if(currentModule==="replenishment")return ["rep_cp_process","rep_cp_fefo","rep_cp_after"];
  if(currentModule==="planning")return ["plan_cp_difference","plan_cp_unassigned","plan_cp_physical"];
  if(currentModule==="picking")return ["pick_cp_lpn","pick_cp_relation","pick_cp_before_qty"];
  if(currentModule==="exceptions")return ["exc_cp_task","exc_cp_physical","exc_cp_replan"];
  if(currentModule==="consolidation")return ["cons_cp_destination","cons_cp_no_message","cons_cp_wrong_dest"];
  if(currentModule==="dispatch")return ["disp_cp_other","disp_cp_pending","disp_cp_close"];
  if(currentModule==="counts")return ["cnt_cp_finish","cnt_cp_limbo","cnt_cp_tool"];
  if(currentModule==="returns")return ["ret_cp_auto","ret_cp_dev01","ret_cp_reroute"];
  if(currentModule==="rolesTasks")return ["rt_cp_pool","rt_cp_cancel","rt_cp_priority"];
  if(currentModule==="integratedCase")return ["int_cp_cause","int_cp_force","int_cp_rebuild"];
  return [];
}

function updateInboundGuided(){
  if(currentModule!=="inbound")return;
  const done=["create_receipt","create_lpn","validate_close"].every(k=>state.tasks[k]);
  const validation=!!state.quizzes.guided_validation?.correct;
  state.milestones.guided=done&&validation;
  const el=document.getElementById("guidedStatus");
  if(el)el.textContent=state.milestones.guided?"Práctica guiada completada ✓":"Para completar la práctica: generá Recibo, creá/validá LPN, validá antes del cierre y respondé correctamente la pregunta.";
}
function bindStageActions(){
  document.querySelectorAll("[data-next]").forEach(b=>b.onclick=()=>showStage(b.dataset.next));
  document.querySelectorAll("[data-prev]").forEach(b=>b.onclick=()=>showStage(b.dataset.prev));
  document.querySelectorAll("[data-milestone]").forEach(b=>b.onclick=()=>{state.milestones[b.dataset.milestone]=true;save();b.classList.add("done");b.textContent="Completado ✓";});
  const setupSaveButton=document.querySelector("[data-save-setup]");
  const setupSaveFeedback=document.querySelector("[data-setup-save-feedback]");
  const setSetupSavedVisual=(saved)=>{
    if(!setupSaveButton)return;
    setupSaveButton.textContent=saved?"Guardado ✓":"Guardar setup";
    if(setupSaveFeedback)setupSaveFeedback.hidden=!saved;
  };
  setupSaveButton?.addEventListener("click",()=>{
    document.querySelectorAll("[data-config]").forEach(i=>{if(!i.disabled)state.config[i.dataset.config]=i.value.trim();});
    state.milestones.setup=true;save();
    setSetupSavedVisual(true);
  });
  document.querySelectorAll("[data-config]:not(:disabled)").forEach(i=>i.addEventListener("input",()=>setSetupSavedVisual(false)));
  document.querySelectorAll("[data-generated-config]").forEach(i=>i.addEventListener("input",e=>{state.config[e.target.dataset.generatedConfig]=e.target.value.trim();save();}));
  document.querySelectorAll("[data-task-complete]").forEach(i=>i.addEventListener("change",e=>{state.tasks[e.target.dataset.taskComplete]=e.target.checked;updateInboundGuided();save();}));
  document.querySelectorAll("[data-hint]").forEach(b=>b.onclick=()=>{
    const id=b.dataset.hint,level=b.dataset.level;
    state.hints[id]=state.hints[id]||{count:0,level};
    state.hints[id].count++; state.hints[id].level=level;
    document.getElementById(id).classList.toggle("show");save();
  });
  document.querySelectorAll("[data-check-quiz]").forEach(b=>b.onclick=()=>checkQuiz(b.dataset.checkQuiz));
  document.querySelector("[data-checkpoint]")?.addEventListener("click",()=>{
    state.milestones.checkpoint=checkpointIds().every(id=>state.quizzes[id]?.correct);
    save();alert(state.milestones.checkpoint?"Checkpoint validado.":"Todavía hay respuestas pendientes o incorrectas.");
  });
  document.querySelector("[data-scenario]")?.addEventListener("click",()=>{
    const id=currentModule==="orientation"?"q_scenario":
             currentModule==="inbound"?"alternative_receipt_status":
             currentModule==="putaway"?"put_scenario":
             currentModule==="inventory"?"inv_scenario":
             currentModule==="replenishment"?"rep_scenario":
             currentModule==="planning"?"plan_scenario":
             currentModule==="picking"?"pick_scenario":
             currentModule==="exceptions"?"exc_scenario":
             currentModule==="consolidation"?"cons_scenario":
             currentModule==="dispatch"?"disp_scenario":
             currentModule==="counts"?"cnt_scenario":
             currentModule==="returns"?"ret_scenario":
             currentModule==="rolesTasks"?"rt_scenario":
             null;
    if(currentModule==="integratedCase"){
      state.milestones.scenario=!!state.quizzes.int_inv_scenario?.correct && !!state.quizzes.int_ret_scenario?.correct;
      save();alert(state.milestones.scenario?"Escenarios secundarios validados.":"Resolvé correctamente ambos casos secundarios antes de completarlos.");
      return;
    }
    if(!id){state.milestones.scenario=false;save();alert("Módulo todavía no implementado.");return;}
    state.milestones.scenario=!!state.quizzes[id]?.correct;
    save();
    if(currentModule==="orientation")syncInputs();
    alert(state.milestones.scenario?"Escenario validado.":"Resolvé correctamente el escenario antes de completarlo.");
  });
  document.getElementById("challengeDone")?.addEventListener("change",e=>{
    const notes=document.getElementById("challengeNotes")?.value.trim()||"";
    if(currentModule==="integratedCase"){
      const validation=validateIntegratedNote(notes);
      state.challengeComplete=e.target.checked && validation.valid;
      state.challengeNotes=notes;
      if(e.target.checked&&!validation.valid){
        const missing=validation.missing.length?` Faltan: ${validation.missing.join(", ")}.`:"";
        const lengthMsg=notes.length<150?" El registro debe tener al menos 150 caracteres.":"";
        alert(`Completá el registro estructurado antes de confirmar.${missing}${lengthMsg}`);
      }
    }else{
      state.challengeComplete=e.target.checked && notes.length>=10;
      state.challengeNotes=notes;
      if(e.target.checked&&!state.challengeComplete)alert("Registrá brevemente tu resolución antes de confirmar el desafío.");
    }
    save();syncInputs();
  });
  document.getElementById("challengeNotes")?.addEventListener("input",e=>{
    state.challengeNotes=e.target.value;
    if(currentModule==="integratedCase"&&document.getElementById("challengeDone")?.checked){
      state.challengeComplete=validateIntegratedNote(e.target.value).valid;
    }
    save();
  });
}
function checkQuiz(id){
  const box=document.querySelector(`[data-quiz="${id}"]`),sel=box?.querySelector(`input[name="${id}"]:checked`),fb=box?.querySelector(".quiz-feedback");
  if(!box||!fb)return;
  state.quizzes[id]=state.quizzes[id]||{attempts:0,wrong:0,correct:false,answers:[]};
  state.quizzes[id].attempts++;
  if(!sel){fb.textContent="Seleccioná una opción antes de validar.";fb.className="quiz-feedback show no";save();return;}
  state.quizzes[id].answers.push(sel.value);
  const good=sel.value===box.dataset.correct;
  if(!good)state.quizzes[id].wrong++;
  state.quizzes[id].correct=good;
  fb.textContent=good?box.dataset.ok:box.dataset.no;
  fb.className=`quiz-feedback show ${good?"ok":"no"}`;
  if(currentModule==="inbound"&&id==="guided_validation")updateInboundGuided();
  save();
}
function syncInputs(){
  document.querySelectorAll("[data-config]").forEach(i=>i.value=state.config[i.dataset.config]||"");
  document.querySelectorAll("[data-generated-config]").forEach(i=>i.value=state.config[i.dataset.generatedConfig]||"");
  const setupSaveButton=document.querySelector("[data-save-setup]");
  const setupSaveFeedback=document.querySelector("[data-setup-save-feedback]");
  if(setupSaveButton){
    const setupSaved=!!state.milestones.setup;
    setupSaveButton.textContent=setupSaved?"Guardado ✓":"Guardar setup";
    if(setupSaveFeedback)setupSaveFeedback.hidden=!setupSaved;
  }
  document.querySelectorAll("[data-task-complete]").forEach(i=>i.checked=!!state.tasks[i.dataset.taskComplete]);
  document.querySelectorAll("[data-milestone]").forEach(b=>{if(state.milestones[b.dataset.milestone]){b.classList.add("done");b.textContent="Completado ✓";}});
  if(currentModule==="orientation"&&state.milestones.scenario){
    const scenarioBtn=document.querySelector("[data-scenario]");
    if(scenarioBtn){scenarioBtn.classList.add("done");scenarioBtn.textContent="Completado ✓";}
  }
  document.querySelectorAll("[data-quiz]").forEach(box=>{
    const id=box.dataset.quiz,q=state.quizzes[id];
    if(!q)return;
    const last=q.answers?.[q.answers.length-1];
    if(last){
      const input=box.querySelector(`input[name="${id}"][value="${last}"]`);
      if(input)input.checked=true;
      const fb=box.querySelector(".quiz-feedback");
      if(fb){
        fb.textContent=q.correct?box.dataset.ok:box.dataset.no;
        fb.className=`quiz-feedback show ${q.correct?"ok":"no"}`;
      }
    }
  });
  if(document.getElementById("challengeNotes"))document.getElementById("challengeNotes").value=state.challengeNotes||"";
  if(document.getElementById("challengeDone"))document.getElementById("challengeDone").checked=!!state.challengeComplete;
  updateInboundGuided();
}
function showStage(id){
  injectVisualGuide(id);
  currentStage=id;state.currentStage=id;state.visited[id]=true;
  document.querySelectorAll(".module-stage").forEach(s=>s.classList.toggle("active",s.dataset.stage===id));
  document.querySelectorAll("[data-stage-nav]").forEach(b=>b.classList.toggle("active",b.dataset.stageNav===id));
  syncInputs();save();window.scrollTo({top:0,behavior:"smooth"});
}
function renderInstructor(){
  const root=document.getElementById("instructorRoot"),ids=activeModuleIds();
  root.innerHTML=ids.map(id=>{
    const m=MODS[id],s=loadState(id),old=currentModule,os=state;
    currentModule=id;state=s;
    const p=calcProgress(),ap=approval(),hs=hintStats();
    const attempts=Object.values(s.quizzes||{}).reduce((a,q)=>a+(q.attempts||0),0);
    const correct=Object.values(s.quizzes||{}).filter(q=>q.correct).length;
    const cp=checkpointIds(),cpCount=cp.filter(q=>s.quizzes[q]?.correct).length;
    currentModule=old;state=os;
    return `<section class="content-card" style="margin-bottom:22px">
      <div class="section-title-row"><div><span class="eyebrow">MÓDULO ${m.number}</span><h2>${m.title}</h2></div><span class="status-chip">${ap}</span></div>
      <div class="instructor-dashboard">
        <div class="metric-card"><span>Progreso</span><strong>${p}%</strong></div>
        <div class="metric-card"><span>Checkpoints</span><strong>${cpCount}/${cp.length}</strong></div>
        <div class="metric-card"><span>Respuestas correctas</span><strong>${correct}</strong></div>
        <div class="metric-card"><span>Intentos</span><strong>${attempts}</strong></div>
        <div class="metric-card"><span>Pistas</span><strong>${hs.used}</strong></div>
        <div class="metric-card"><span>Procedimiento</span><strong>${hs.procedure?"Sí":"No"}</strong></div>
        <div class="metric-card"><span>Desafío</span><strong>${s.challengeComplete?"Completo":"Pendiente"}</strong></div>
      </div>
      <div class="content-card split" style="margin-top:16px">
        <div><h3>Setup requerido</h3><ul class="clean-list">${m.setup.map(x=>`<li>${x}</li>`).join("")}</ul>
        <h3>Datos configurados</h3>${Object.entries(s.config).map(([k,v])=>`<div class="data-row"><span>${label(k)}</span><strong>${v||"No configurado"}</strong></div>`).join("")}</div>
        <div><h3>Resultado esperado</h3><p>${m.expected}</p>
        <h3>Errores críticos</h3><ul class="clean-list">${m.critical.map(x=>`<li>${x}</li>`).join("")}</ul>
        <h3>Pistas permitidas</h3><ul class="clean-list">${m.allowedHints.map(x=>`<li>${x}</li>`).join("")}</ul></div>
      </div>
      ${id==="integratedCase"?`<div class="content-card" style="margin-top:16px"><h3>Registro integrador</h3><p>${s.challengeNotes?escHtml(s.challengeNotes):"Sin explicación final registrada."}</p><small>La nota debe documentar evidencia, diagnóstico, acción, verificación y criterio.</small></div>`:""}
      <div class="content-card" style="margin-top:16px"><h3>Respuestas e intentos</h3>
      ${Object.entries(s.quizzes||{}).length?Object.entries(s.quizzes).map(([qid,q])=>`<div class="data-row"><span>${humanQuiz(qid)}</span><strong>${q.correct?"Correcta":"Pendiente"} · ${q.attempts||0} intento(s), ${q.wrong||0} incorrecto(s)</strong></div>`).join(""):"<p>Sin respuestas registradas.</p>"}
      <h3 style="margin-top:16px">Ayudas utilizadas</h3>
      ${Object.entries(s.hints||{}).length?Object.entries(s.hints).map(([hid,h])=>`<div class="data-row"><span>${hid}</span><strong>${h.level||"pista"} · ${h.count||0} consulta(s)</strong></div>`).join(""):"<p>Sin ayudas registradas.</p>"}</div>
      <div class="stage-actions"><button class="secondary" data-reset="${id}">Reset del módulo</button><button class="primary" data-open-module="${id}">Abrir módulo</button></div>
    </section>`;
  }).join("")+`<section class="academy-reset-zone" aria-labelledby="academyResetTitle">
    <div><span class="eyebrow">USO COMPARTIDO DE ESTA PC</span><h2 id="academyResetTitle">Reiniciar progreso local</h2><p>Elimina únicamente el avance de Academia M4N guardado en este navegador para que otra persona pueda comenzar desde cero.</p></div>
    <button class="danger-button academy-reset-button" type="button" data-reset-academy>Reiniciar progreso de esta PC</button>
  </section>`;
  document.querySelector("[data-reset-academy]")?.addEventListener("click",openAcademyResetConfirmation);
  document.querySelectorAll("[data-reset]").forEach(b=>b.onclick=()=>{
    if(confirm("¿Reiniciar progreso y configuración de este módulo?")){
      localStorage.removeItem(key(b.dataset.reset));renderInstructor();renderHome();
    }
  });
  bindOpeners();
}
function openAcademyResetConfirmation(){
  let modal=document.getElementById("academyResetModal");
  if(!modal){
    modal=document.createElement("div");
    modal.id="academyResetModal";
    modal.className="academy-reset-modal";
    modal.setAttribute("aria-hidden","true");
    modal.innerHTML=`<div class="academy-reset-backdrop" data-cancel-academy-reset></div>
      <div class="academy-reset-dialog" role="dialog" aria-modal="true" aria-labelledby="academyResetModalTitle" aria-describedby="academyResetModalText">
        <h2 id="academyResetModalTitle">Reiniciar progreso de esta PC</h2>
        <p id="academyResetModalText">Se eliminará todo el avance guardado localmente en este navegador para los módulos M0–M14.</p>
        <p>Esta acción permitirá que otra persona utilice esta PC y comience la capacitación desde cero.</p>
        <p><strong>Esta acción no se puede deshacer.</strong></p>
        <div class="academy-reset-actions"><button class="secondary" type="button" data-cancel-academy-reset>Cancelar</button><button class="danger-button" type="button" data-confirm-academy-reset>Reiniciar progreso</button></div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-cancel-academy-reset]").forEach(b=>b.addEventListener("click",closeAcademyResetConfirmation));
    modal.querySelector("[data-confirm-academy-reset]").addEventListener("click",resetAcademyProgress);
  }
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  modal.querySelector("[data-cancel-academy-reset]")?.focus();
}
function closeAcademyResetConfirmation(){
  const modal=document.getElementById("academyResetModal");
  if(!modal)return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}
function resetAcademyProgress(){
  Object.keys(localStorage)
    .filter(k=>k.startsWith("iflow_m4n_academy_"))
    .forEach(k=>localStorage.removeItem(k));
  location.reload();
}

function humanQuiz(id){
  return ({
    q_interface:"Interfaz para ejecución en piso",q_cp:"Checkpoint principal",q_obj:"Objeto Tarea",q_pick:"Parámetros de reposición",q_vu:"VU IN",
    q_scenario:"Escenario semiguiado",guided_validation:"Validaciones al crear LPN",checkpoint_lookup:"Checkpoint · Consulta LO",
    checkpoint_attributes:"Checkpoint · Atributos",checkpoint_open_receipt:"Checkpoint · Recibo abierto",
    alternative_receipt_status:"Escenario alternativo · estado del Recibo",
    put_move_order:"Putaway · secuencia de movimiento",put_cp_verify:"Putaway · verificación final",put_cp_scan:"Putaway · confirmación de destino",
    put_cp_arbitrary:"Putaway · respeto de estrategia",put_scenario:"Putaway · ubicación no operable",
    inv_classify:"Inventario · clasificación de diferencia",inv_cp_difference:"Inventario · físico vs sistema",inv_cp_history:"Inventario · Historia de Actividad",
    inv_cp_types:"Inventario · tipo de diferencia",inv_scenario:"Inventario · secuencia de investigación",
    rep_origin:"Reposición · selección FEFO",rep_cp_process:"Reposición · necesidad",rep_cp_fefo:"Reposición · FEFO",
    rep_cp_after:"Reposición · trabajo dependiente",rep_scenario:"Reposición · tarea ausente",
    plan_result:"Planning · línea sin asignar",plan_cp_difference:"Planning · Planear vs Liberar",
    plan_cp_unassigned:"Planning · línea no asignada",plan_cp_physical:"Planning · stock físico no elegible",
    plan_scenario:"Planning · excepción antes de liberar",
    pick_confirm:"Picking · validación previa",pick_cp_lpn:"Picking · LPN en Full Pick",pick_cp_relation:"Picking · tarea y Picklist",
    pick_cp_before_qty:"Picking · validación de cantidad",pick_scenario:"Picking · diferencia física",
    exc_first:"Excepciones · stock físico no elegible",exc_cp_task:"Excepciones · tarea ausente",
    exc_cp_physical:"Excepciones · stock físico vs asignable",exc_cp_replan:"Excepciones · reconstrucción del flujo",
    exc_scenario:"Excepciones · falta en Picking",
    cons_before:"Consolidación · validación previa",cons_cp_destination:"Consolidación · destino informado",
    cons_cp_no_message:"Consolidación · resultado",cons_cp_wrong_dest:"Consolidación · destino inconsistente",
    cons_scenario:"Consolidación · discrepancia de destino",
    disp_reject:"Despacho · elemento rechazado",disp_cp_other:"Despacho · otro Shipment",
    disp_cp_pending:"Despacho · pendientes",disp_cp_close:"Despacho · criterio de cierre",
    disp_scenario:"Despacho · pendientes antes del cierre",
    cnt_finish:"Conteos · Fin Conteo",cnt_cp_finish:"Conteos · cierre completo",cnt_cp_limbo:"Conteos · LIMBO",
    cnt_cp_tool:"Conteos · herramienta correcta",cnt_scenario:"Conteos · diferencia en LIMBO",
    ret_auto_stock:"Devoluciones · stock automático",ret_cp_auto:"Devoluciones · tratamiento",
    ret_cp_dev01:"Devoluciones · ubicación por CD",ret_cp_reroute:"Redespacho · condición de reruteo",
    ret_scenario:"Devoluciones · vuelta a stock",
    rt_rule:"Roles/Tareas · regla de asignación",rt_cp_pool:"Roles/Tareas · desasignar",
    rt_cp_cancel:"Roles/Tareas · efecto de cancelar",rt_cp_priority:"Roles/Tareas · prioridad",
    rt_scenario:"Roles/Tareas · devolución al pool",
    int_evidence:"Integrador · evidencia inicial",int_cp_cause:"Integrador · evidencia de causa",
    int_cp_force:"Integrador · no forzar datos",int_cp_rebuild:"Integrador · reconstrucción",
    int_inv_scenario:"Integrador · diferencia de inventario",int_ret_scenario:"Integrador · devolución"
  })[id]||id;
}

document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>showView(b.dataset.view));
document.getElementById("sidebarOpen").onclick=()=>document.getElementById("sidebar").classList.add("open");
document.getElementById("sidebarClose").onclick=()=>document.getElementById("sidebar").classList.remove("open");
renderHome();
