// =============================
// REFERENCIAS DOM
// =============================

const container = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");

const detailModal = new bootstrap.Modal(
    document.getElementById("detailModal")
);

const detailTitle = document.getElementById("detailTitle");
const detailContent = document.getElementById("detailContent");

let filtroActual = "todos";
let loadoutActual = "default"; // ninguno | default | chico | grande | custom
let balasCustomActual = 10;

// =============================
// IMÁGENES (Proporcionadas por lo que se guarda en la carpeta de /mods en MTA)
// =============================

const imagenes = {

  // Las subi a IMGURL por que gasta recursos alpedo y es más rápido

    // Pistolas
    "Beretta 96": "https://i.imgur.com/bvOGOfL.png",
    "Beretta 9": "https://i.imgur.com/sbp3c8c.png",
    "M1911": "https://i.imgur.com/kOegrYB.png",
    "Magnum 44": "https://i.imgur.com/T0iMSIb.png",
    "Magnum 357": "https://i.imgur.com/Pebj2Fk.png",
    "Desert Eagle": "https://i.imgur.com/DMFmTZh.png",
    "Desert Eagle Dorada": "https://i.imgur.com/YiuNbw9.png",
    "Mauser C96": "https://i.imgur.com/vrxMSgF.png",
    "Bersa 380 (No hay en BIG) solo ARGRP": "https://i.imgur.com/sw7RtFv.png", // No hay en BIG

    // Armas largas
    "AK-47": "https://i.imgur.com/CBfPAfy.png",
    "AK-107": "https://i.imgur.com/ZFyiWNm.png",
    "AKM": "https://i.imgur.com/ysy6rlc.png",
    "M16A4": "https://i.imgur.com/RiuJoqp.png",
    "Mauser 1909": "https://i.imgur.com/5TVIIcY.png",
    "Thompson 1928": "https://i.imgur.com/FW4OjWH.png",
    "Degtyarev": "https://i.imgur.com/R5Di4uY.png",
    "FMK": "https://i.imgur.com/tvK1IRW.png",

    // munición grande
    ".9mm": "https://i.imgur.com/TT4W0H1.png",
    ".380": "https://i.imgur.com/ZGSIMD6.png",
    ".45": "https://i.imgur.com/bz79IYq.png",
    ".44": "https://i.imgur.com/QUnxsnv.png",
    ".357": "https://i.imgur.com/KJ3yitC.png",
    "7.65": "https://i.imgur.com/s6QVdql.png",
    "7.62": "https://i.imgur.com/uk5FNT7.png",
    "5.56": "https://i.imgur.com/JfZ99UF.png",

    // munición chica

    ".9mm chica": "https://i.imgur.com/8kMFf6U.png",
    ".380 chica": "https://i.imgur.com/Jgrzzt9.png",
    ".45 chica": "https://i.imgur.com/PqrDLXP.png",
    ".44 chica": "https://i.imgur.com/h6OoMVA.png",
    ".357 chica": "https://i.imgur.com/9ubM8bD.png",
    "7.65 chica": "https://i.imgur.com/cFq4BTd.png",
    "7.62 chica": "https://i.imgur.com/LLDksxK.png",
    "5.56 chica": "https://i.imgur.com/cFq4BTd.png",

    // Otros
    "Machete": "https://i.imgur.com/KzJbN48.png",
    // La bersa tambien se considera otros pero lo deje junto las pistolas.

    // Drogas
    "Cocaina": "https://i.imgur.com/7kU4rje.png",
    "Marihuana": "https://i.imgur.com/uHUQjZX.png",
    "Premezcla": "https://i.imgur.com/wCbWFsD.png",
    "Hojas de coca": "https://i.imgur.com/UqZDNy3.png",
    "Semillas Marihuana": "https://i.imgur.com/HdLENmD.png",
    "Semillas de cocaina": "https://i.imgur.com/UqZDNy3.png",

};


// Icono por nsi no llega a cargar la imagén
const iconoPorCategoria = {
    pistolas: "bi-crosshair",
    armas: "bi-crosshair2",
    municion: "bi-circle-fill",
    municion_chica: "bi-circle",
    otros: "bi-circle"
};

// Nombres por categorías
const nombrePorCategoria = {
    pistolas: "Pistolas",
    armas: "Armas",
    municion: "Munición",
    municion_chica: "Munición Chica",
    otros: "otros"
};

function nombreCategoria(categoria) {
    return nombrePorCategoria[categoria] || capitalizar(categoria);
}

// =============================
// PRECIOS / CONFIGURACIÓN
// =============================
// Esto solo es de referencia para tener en la página
// asi con esto tener una base de como se calculan los precios (y que no salga error xd)

const preciosDefault = {
    acero: 2500,
    aluminio: 1800,
    cobre: 500,
    polvora: 1800,
    madera: 500,
    oro: 1000,
    ventaPorcentaje: 30,

    // Drogas
    semillas_coca: 100,
    semillas_mari: 100,
    bidon_gasolina: 500,
};

let precios = cargarPreciosGuardados();

function cargarPreciosGuardados() {
    try {
        const guardado = JSON.parse(localStorage.getItem("precios"));
        if (!guardado) return { ...preciosDefault };
        return { ...preciosDefault, ...guardado };
    } catch (e) {
        return { ...preciosDefault };
    }
}

function cargarConfiguracion() {
    precioAcero.value = precios.acero;
    precioAluminio.value = precios.aluminio;
    precioCobre.value = precios.cobre;
    precioPolvora.value = precios.polvora;
    precioMadera.value = precios.madera;
    precioOro.value = precios.oro;
    ventaPorcentaje.value = precios.ventaPorcentaje;
}

cargarConfiguracion();

// =============================
// CÁLCULO DE COSTOS / RENTABILIDAD
// =============================

function buscarItemPorNombre(nombre) {
    return items.find(i => i.nombre === nombre);
}

// Calcula el costo de fabricar un item. Si el item usa como "material"
// otro item fabricable (ej: Desert Eagle Dorada usa "Desert Eagle"),
// calcula recursivamente el costo de ese item también.

function calcularCosto(item, visitados = new Set()) {
    if (visitados.has(item.nombre)) return 0; // evita loops infinitos (Lo descubri a las malas :,v)
    visitados.add(item.nombre);

    let total = 0;

    for (let material in item.materiales) {
        const cantidad = item.materiales[material];
        const key = material.toLowerCase();

        if (precios.hasOwnProperty(key)) {
            total += cantidad * precios[key];
        } else {
            const subItem = buscarItemPorNombre(material);
            if (subItem) {
                total += cantidad * calcularCosto(subItem, visitados);
            }
        }
    }
    return total;
}

// Convierte el string de tiempo ("8 min", "1.40 min" = 1:40) a minutos decimales
function parseTiempoMinutos(tiempo) {
    const numStr = tiempo.replace(/[^0-9.]/g, "");
    if (numStr.includes(".")) {
        let [min, seg] = numStr.split(".");
        seg = (seg + "00").slice(0, 2); // para que sean dos digitos (mm:ss)
        return parseInt(min) + parseInt(seg) / 60;
    }
    return parseFloat(numStr) || 0;
}

function calcularEconomia(item, loadout) {
    const costoArmaConDefault = calcularCosto(item);
    const municion = calcularCostoMunicion(item, loadout, costoArmaConDefault);

    const costoArma = municion ? municion.costoArmaSinBalas : costoArmaConDefault;
    const costoMunicion = municion ? municion.costoLinea : 0;
    const costo = costoArma + costoMunicion;
    const precioVenta = costo * (1 + precios.ventaPorcentaje / 100);
    const ganancia = precioVenta - costo;
    const minutos = parseTiempoMinutos(item.tiempo);
    const gananciaPorMinuto = minutos > 0 ? ganancia / minutos : ganancia;

    return {
        costoArma,
        costoMunicion,
        costo,
        precioVenta,
        ganancia,
        gananciaPorMinuto,
        // "balas"/"calibre" solo tienen valor si el arma tiene datos de
        // munición en municionPorArma (las armas de fuego). El costo del
        // arma (costoArma, arriba) es SIEMPRE el arma sola, sin balas:
        // las balas que tenga puestas se suman aparte como costoMunicion.
        balas: municion ? municion.cantidadBalas : null,
        balasDefault: municion ? municion.balasDefault : null,
        calibre: municion ? municion.calibre : null,
        sinMunicion: municion ? municion.sinMunicion : false,
        pisoAplicado: municion ? municion.pisoAplicado : false,
        precioBalaChica: municion ? municion.precioBalaChica : null,
        precioBalaNormal: municion ? municion.precioBalaNormal : null,
        precioBalaUsado: municion ? municion.precioPorBala : null
    };
}

// Un crafteo de "X chica" (o de "X" normal) no produce 1 bala suelta:
// produce una carga COMPLETA, del tamaño de la munición default de esa
// arma (así esta puesto en la guía que hice, básicamente es 1 arma mas las balas chicas)
// A partir de ahí, el costo del arma SIN balas se saca
// restándole al costo total fabricado el valor de esa carga default (a
// precio de bala chica, la referencia base), y cualquier cantidad de
// balas que el usuario quiera (0, default, chico, grande o un número
// personalizado) se cobra aparte, balas × precio por bala.*]

function calcularCostoMunicion(item, loadout, costoArmaConDefault) {
    const info = typeof municionPorArma !== "undefined" ? municionPorArma[item.nombre] : null;
    if (!info) return null;

    const itemNormal = buscarItemPorNombre(info.calibre);
    const itemChica = buscarItemPorNombre(info.calibre + " chica");

    const costoCargaNormal = itemNormal ? calcularCosto(itemNormal) : 0;
    const costoCargaChica = itemChica ? calcularCosto(itemChica) : costoCargaNormal;

    const precioBalaChica = costoCargaChica / info.default;
    const precioBalaNormal = costoCargaNormal / info.default;

    const costoArmaSinBalasCrudo = costoArmaConDefault - costoCargaChica;
    const costoArmaSinBalas = Math.max(0, costoArmaSinBalasCrudo);
    const pisoAplicado = costoArmaSinBalasCrudo < 0;

    let cantidadBalas;
    let precioPorBala;

    if (loadout === "ninguno") {
        cantidadBalas = 0;
        precioPorBala = precioBalaChica;
    } else if (loadout === "custom") {
        cantidadBalas = balasCustomActual;
        precioPorBala = precioBalaChica;
    } else {
        // "default" / "chico" / "grande": cantidades tal cual la guía
        cantidadBalas = info[loadout];
        precioPorBala = loadout === "grande" ? precioBalaNormal : precioBalaChica;
    }

    return {
        calibre: info.calibre,
        cantidadBalas,
        balasDefault: info.default,
        sinMunicion: cantidadBalas === 0,
        pisoAplicado,
        costoArmaSinBalas,
        costoLinea: cantidadBalas * precioPorBala,
        precioBalaNormal,
        precioBalaChica,
        precioPorBala
    };
}

// Calcula los umbrales de rentabilidad en base a TODOS los items,
// para poder clasificar cada arma de forma relativa en vez de usar números fijos que dejarían 
// de tener sentido si el usuario cambia los precios.

function calcularUmbralesRentabilidad() {
    const valores = items
        .map(item => calcularEconomia(item, loadoutActual).gananciaPorMinuto)
        .sort((a, b) => a - b);

    const percentil = p => valores[Math.floor((valores.length - 1) * p)];

    return {
        p25: percentil(0.25),
        p50: percentil(0.50),
        p75: percentil(0.75)
    };
}

function clasificarRentabilidad(gananciaPorMinuto, umbrales) {
    if (gananciaPorMinuto >= umbrales.p75) {
        return { texto: "Muy rentable", clase: "rentabilidad-excelente" };
    } else if (gananciaPorMinuto >= umbrales.p50) {
        return { texto: "Rentable", clase: "rentabilidad-buena" };
    } else if (gananciaPorMinuto >= umbrales.p25) {
        return { texto: "Regular", clase: "rentabilidad-regular" };
    } else {
        return { texto: "Poco rentable", clase: "rentabilidad-baja" };
    }
}

// La dificultad ya viene en los datos como "pd" (Policía básicamente)
function clasificarDificultad(pd) {
    if (pd <= 2) return { texto: "Fácil", clase: "dificultad-facil" };
    if (pd === 3) return { texto: "Media", clase: "dificultad-media" };
    if (pd === 4) return { texto: "Difícil", clase: "dificultad-dificil" };
    return { texto: "Muy difícil", clase: "dificultad-muydificil" };
}

function formatearMoneda(valor) {
    return "$" + Math.round(valor).toLocaleString("es-AR");
}

// =============================
// RENDER
// =============================

function render() {

    container.innerHTML = "";

    const texto = searchInput.value.toLowerCase();
    const umbrales = calcularUmbralesRentabilidad();

    const lista = items.filter(item => {
        const okNombre = item.nombre.toLowerCase().includes(texto);
        const okCategoria = filtroActual === "todos" || item.categoria === filtroActual;
        return okNombre && okCategoria;
    });

    if (lista.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center text-secondary py-5">
                <i class="bi bi-search fs-1 d-block mb-2"></i>
                No se encontraron resultados.
            </div>
        `;
        return;
    }

    lista.forEach(item => crearCard(item, umbrales));

}

// =============================
// LA CARD DE LAS COSAS
// =============================

function crearCard(item, umbrales) {

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    const img = imagenes[item.nombre] || "";
    const iconoFallback = iconoPorCategoria[item.categoria] || "bi-question-circle";

    const economia = calcularEconomia(item, loadoutActual);
    const {
        costoArma, costoMunicion, costo, precioVenta, ganancia, gananciaPorMinuto,
        balas, calibre, sinMunicion, precioBalaUsado
    } = economia;
    const rentabilidad = clasificarRentabilidad(gananciaPorMinuto, umbrales);
    const dificultad = clasificarDificultad(item.pd);

    const cantidadMateriales = Object.keys(item.materiales).length;

    col.innerHTML = `

<div class="card bg-dark text-light h-100 shadow border-secondary arma-card">

    <div class="arma-img-wrap">
        ${img
            ? `<img src="${img}" class="arma-img" onerror="this.replaceWith(crearIconoFallback('${iconoFallback}'))">`
            : crearIconoFallbackHTML(iconoFallback)
        }
    </div>

    <div class="card-body d-flex flex-column">

        <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h5 class="card-title mb-0">${item.nombre}</h5>
            <span class="badge bg-success text-uppercase">${nombreCategoria(item.categoria)}</span>
        </div>

        <div class="d-flex flex-wrap gap-2 mb-3">
            <span class="badge dificultad-badge ${dificultad.clase}">
                <i class="bi bi-bar-chart-fill"></i> ${dificultad.texto}
            </span>
            <span class="badge rentabilidad-badge ${rentabilidad.clase}">
                <i class="bi bi-graph-up-arrow"></i> ${rentabilidad.texto}
            </span>
            ${calibre ? `
            <span class="badge balas-badge">
                <i class="bi bi-magazine"></i>
                ${sinMunicion ? `Usa ${calibre} (sin cargar)` : `${balas} balas ${calibre}`}
            </span>
            ` : ""}
        </div>

        <p class="small text-secondary mb-3">
            <i class="bi bi-clock"></i> ${item.tiempo}
            &nbsp;·&nbsp;
            <i class="bi bi-box-seam"></i> ${cantidadMateriales} materiales
            &nbsp;·&nbsp;
            <i class="bi bi-star-fill"></i> ${item.pd} PD
        </p>

        <div class="economia-resumen mb-3">
            <div class="economia-fila">
                <span>Costo arma${calibre ? " (sin balas)" : ""}</span>
                <strong>${formatearMoneda(costoArma)}</strong>
            </div>
            ${costoMunicion > 0 ? `
            <div class="economia-fila">
                <span>+ ${balas} balas (${formatearMoneda(precioBalaUsado)}/u)</span>
                <strong>${formatearMoneda(costoMunicion)}</strong>
            </div>
            ` : ""}
            <div class="economia-fila economia-fila-total">
                <span>Costo total</span>
                <strong>${formatearMoneda(costo)}</strong>
            </div>
            <div class="economia-fila">
                <span>Precio de venta (+${precios.ventaPorcentaje}%)</span>
                <strong class="text-warning">${formatearMoneda(precioVenta)}</strong>
            </div>
            <div class="economia-fila">
                <span>Ganancia neta</span>
                <strong class="text-success">${formatearMoneda(ganancia)}</strong>
            </div>
        </div>

        <button class="btn btn-warning w-100 mt-auto ver-detalle">
            Ver información
        </button>

    </div>

</div>

`;

    col.querySelector(".ver-detalle").onclick = () => {
        abrirDetalle(item, umbrales);
    };
    container.appendChild(col);
}

function crearIconoFallbackHTML(icono) {
    return `<div class="arma-img arma-img-fallback"><i class="bi ${icono}"></i></div>`;
}


function crearIconoFallback(icono) {
    const div = document.createElement("div");
    div.className = "arma-img arma-img-fallback";
    div.innerHTML = `<i class="bi ${icono}"></i>`;
    return div;
}

// =============================
// MODAL DE DETALLE
// =============================

function abrirDetalle(item, umbrales) {

    detailTitle.innerHTML = item.nombre;

    const economia = calcularEconomia(item, loadoutActual);
    const {
        costoArma, costoMunicion, costo, precioVenta, ganancia, gananciaPorMinuto,
        balas, calibre, sinMunicion, pisoAplicado, precioBalaChica, precioBalaNormal, precioBalaUsado
    } = economia;
    const rentabilidad = clasificarRentabilidad(gananciaPorMinuto, umbrales);
    const dificultad = clasificarDificultad(item.pd);

    let html = "";

    // --- Materiales ---
    html += `<div class="mb-4"><h5 class="mb-3"><i class="bi bi-box-seam"></i> Materiales</h5>`;

    for (let material in item.materiales) {

        const cantidad = item.materiales[material];
        const key = material.toLowerCase();
        const esMaterialBase = precios.hasOwnProperty(key);
        const subtotal = esMaterialBase
            ? cantidad * precios[key]
            : (() => {
                const subItem = buscarItemPorNombre(material);
                return subItem ? cantidad * calcularCosto(subItem) : 0;
            })();

        html += `
        <div class="d-flex justify-content-between align-items-center border-bottom border-secondary py-2">
            <span>
                ${capitalizar(material)}
                <span class="text-secondary">x${cantidad}</span>
                ${esMaterialBase ? "" : '<span class="badge bg-secondary ms-1">fabricado</span>'}
            </span>
            <strong>${formatearMoneda(subtotal)}</strong>
        </div>
        `;

    }

    html += "</div>";

    // --- Datos generales ---
    html += `
    <div class="row text-center g-2 mb-4">

        <div class="col-6 col-md-3">
            <div class="p-3 bg-secondary bg-opacity-25 rounded h-100">
                <h6 class="text-secondary small mb-1">Reputación</h6>
                -${item.reputacion}
            </div>
        </div>

        <div class="col-6 col-md-3">
            <div class="p-3 bg-secondary bg-opacity-25 rounded h-100">
                <h6 class="text-secondary small mb-1">Dificultad</h6>
                <span class="badge ${dificultad.clase}">${item.pd} PD · ${dificultad.texto}</span>
            </div>
        </div>

        <div class="col-6 col-md-3">
            <div class="p-3 bg-secondary bg-opacity-25 rounded h-100">
                <h6 class="text-secondary small mb-1">Tiempo</h6>
                ${item.tiempo}
            </div>
        </div>

        <div class="col-6 col-md-3">
            <div class="p-3 bg-secondary bg-opacity-25 rounded h-100">
                <h6 class="text-secondary small mb-1">Horas requeridas</h6>
                ${item.horas} Hs
            </div>
        </div>

    </div>
    `;

    // --- Análisis económico ---
    html += `
    <h5 class="mb-3"><i class="bi bi-cash-coin"></i> Análisis económico</h5>
    `;

    if (calibre) {
        const lineaMunicion = sinMunicion
            ? `<strong>${calibre}</strong> <span class="badge bg-secondary ms-1">sin cargar</span>`
            : `${balas} balas ${calibre} · <strong>${formatearMoneda(costoMunicion)}</strong>`;

        html += `
        <div class="d-flex justify-content-between align-items-center border-bottom border-secondary py-2 mb-3">
            <span><i class="bi bi-magazine"></i> Munición que usa</span>
            <span>${lineaMunicion}</span>
        </div>
        `;

        html += `
        <div class="economia-resumen mb-3">
            <div class="economia-fila">
                <span><i class="bi bi-circle"></i> Bala chica ${calibre} (referencia)</span>
                <strong>${formatearMoneda(precioBalaChica)} / u</strong>
            </div>
            <div class="economia-fila">
                <span><i class="bi bi-circle-fill"></i> Bala normal ${calibre}</span>
                <strong>${formatearMoneda(precioBalaNormal)} / u</strong>
            </div>
            ${!sinMunicion ? `
            <div class="economia-fila economia-fila-total">
                <span>${balas} balas × ${formatearMoneda(precioBalaUsado)}</span>
                <strong>${formatearMoneda(costoMunicion)}</strong>
            </div>
            ` : ""}
        </div>
        ${pisoAplicado ? `
        <div class="alert alert-warning small py-2 mb-3" role="alert">
            <i class="bi bi-exclamation-triangle"></i>
            Con los precios actuales, la munición default vale más que el arma fabricada, así que
            el costo del arma sin balas se muestra en $0 en vez de un número negativo.
        </div>
        ` : ""}
        `;
    }

    html += `
    <div class="row text-center g-2">

        <div class="col-6 col-md-3">
            <div class="p-3 bg-dark border border-secondary rounded h-100">
                <h6 class="text-secondary small mb-1">Costo arma${calibre ? " (sin balas)" : ""}</h6>
                <span class="fs-5">${formatearMoneda(costoArma)}</span>
            </div>
        </div>

        <div class="col-6 col-md-3">
            <div class="p-3 bg-dark border border-secondary rounded h-100">
                <h6 class="text-secondary small mb-1">Costo total</h6>
                <span class="fs-5">${formatearMoneda(costo)}</span>
            </div>
        </div>

        <div class="col-6 col-md-3">
            <div class="p-3 bg-dark border border-secondary rounded h-100">
                <h6 class="text-secondary small mb-1">Venta (+${precios.ventaPorcentaje}%)</h6>
                <span class="fs-5 text-warning">${formatearMoneda(precioVenta)}</span>
            </div>
        </div>

        <div class="col-6 col-md-3">
            <div class="p-3 bg-dark border border-secondary rounded h-100">
                <h6 class="text-secondary small mb-1">Ganancia neta</h6>
                <span class="fs-5 text-success">${formatearMoneda(ganancia)}</span>
            </div>
        </div>

    </div>

    <div class="text-center mt-3">
        <span class="badge ${rentabilidad.clase} fs-6">${rentabilidad.texto}</span>
    </div>

    <p class="small text-secondary mt-3 mb-0">
        <i class="bi bi-info-circle"></i>
        ${formatearMoneda(gananciaPorMinuto)}/min de ganancia.
        ${calibre ? "El costo del arma nunca incluye balas: se suman aparte según la cantidad elegida, a precio de bala chica (o normal en cargador grande)." : ""}
    </p>
    `;

    detailContent.innerHTML = html;

    detailModal.show();

}

// =============================
// BUSCADOR Y FILTRAR LAS BUSQUEDAS
// =============================

searchInput.addEventListener("input", render);

// Dropdown custom de munición/cargador
const loadoutToggleLabel = document.getElementById("loadoutToggleLabel");
const balasCustomWrap = document.getElementById("balasCustomWrap");
const balasCustomInput = document.getElementById("balasCustomInput");

document.querySelectorAll(".loadout-option").forEach(opcion => {

    opcion.addEventListener("click", () => {

        loadoutActual = opcion.dataset.value;

        document.querySelectorAll(".loadout-option").forEach(o => o.classList.remove("active"));
        opcion.classList.add("active");

        loadoutToggleLabel.innerHTML = opcion.innerHTML;

        balasCustomWrap.classList.toggle("d-none", loadoutActual !== "custom");
        if (loadoutActual === "custom") balasCustomInput.focus();

        render();

    });

});

balasCustomInput.addEventListener("input", () => {
    balasCustomActual = Math.max(0, Number(balasCustomInput.value) || 0);
    render();
});

document.querySelectorAll(".filter-btn").forEach(btn => {

    btn.onclick = () => {

        document.querySelectorAll(".filter-btn").forEach(b => {
            b.classList.remove("active");
            b.classList.remove("btn-success");
            b.classList.add("btn-outline-success");
        });

        btn.classList.remove("btn-outline-success");
        btn.classList.add("btn-success");
        btn.classList.add("active");

        filtroActual = btn.dataset.filter;

        render();

    };

});

// =============================
// CONFIGURACIÓN DE PRECIOS
// =============================

const configModalEl = document.getElementById("configModal");
const configModal = new bootstrap.Modal(configModalEl);
const configFeedback = document.getElementById("configFeedback");

function mostrarFeedbackConfig(mensaje) {
    configFeedback.textContent = mensaje;
    configFeedback.classList.remove("d-none");

    // Cierra el modal solo y avisa, para que quede claro que se guardó. (A revisar esto)
    setTimeout(() => {
        configModal.hide();
    }, 900);
}

configModalEl.addEventListener("hidden.bs.modal", () => {
    configFeedback.classList.add("d-none");
});

// Muestra los precios por defecto del server como referencia, junto a
// los inputs editables, para que el usuario sepa de dónde parte cada
// valor aunque después lo cambie a su gusto.

function mostrarPresetsReferencia() {
    const contenedor = document.getElementById("presetsReferenciaValores");
    if (!contenedor) return;

    const etiquetas = {
        acero: "Acero", aluminio: "Aluminio", cobre: "Cobre",
        polvora: "Pólvora", madera: "Madera", oro: "Lingote Oro",
        ventaPorcentaje: "Venta %"
    };

    contenedor.innerHTML = Object.keys(etiquetas).map(key => `
        <div class="col-6 col-md-3">
            ${etiquetas[key]}: <strong class="text-light">${
                key === "ventaPorcentaje" ? preciosDefault[key] + "%" : formatearMoneda(preciosDefault[key])
            }</strong>
        </div>
    `).join("");
}

mostrarPresetsReferencia();

saveConfig.onclick = () => {

    precios = {
        acero: Number(precioAcero.value) || 0,
        aluminio: Number(precioAluminio.value) || 0,
        cobre: Number(precioCobre.value) || 0,
        polvora: Number(precioPolvora.value) || 0,
        madera: Number(precioMadera.value) || 0,
        oro: Number(precioOro.value) || 0,
        ventaPorcentaje: Number(ventaPorcentaje.value) || 0
    };

    localStorage.setItem("precios", JSON.stringify(precios));

    render();
    mostrarFeedbackConfig("✅ Configuración guardada correctamente.");

};

resetConfig.onclick = () => {

    precios = { ...preciosDefault };
    cargarConfiguracion();
    localStorage.setItem("precios", JSON.stringify(precios));
    render();
    mostrarFeedbackConfig("↺ Precios restaurados a los valores por defecto.");

};

// =============================
// UTILIDADES extras
// =============================

function capitalizar(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function etiquetaLoadout(loadout) {
    switch (loadout) {
        case "default": return "Default";
        case "chico": return "Cargador Chico";
        case "grande": return "Cargador Grande";
        case "custom": return "Cantidad personalizada";
        default: return capitalizar(loadout);
    }
}

// =============================
// PRIMER RENDER
// =============================

render();
