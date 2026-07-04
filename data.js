const items = [

    // ==========================
    // PISTOLAS
    // ==========================

    {
        categoria: "pistolas",
        nombre: "Beretta 96",
        materiales: {
            aluminio: 10,
            cobre: 5,
            acero: 20,
            polvora: 16
        },
        reputacion: 300,
        pd: 2,
        tiempo: "8 min",
        horas: 100
    },

    {
        categoria: "pistolas",
        nombre: "Beretta 9",
        materiales: {
            aluminio: 10,
            cobre: 5,
            acero: 25,
            polvora: 18
        },
        reputacion: 300,
        pd: 2,
        tiempo: "8 min",
        horas: 100
    },

    {
        categoria: "pistolas",
        nombre: "M1911",
        materiales: {
            aluminio: 15,
            cobre: 8,
            acero: 25,
            polvora: 9
        },
        reputacion: 300,
        pd: 3,
        tiempo: "8 min",
        horas: 100
    },

    {
        categoria: "pistolas",
        nombre: "Magnum 44",
        materiales: {
            aluminio: 20,
            cobre: 10,
            acero: 20,
            polvora: 14
        },
        reputacion: 300,
        pd: 3,
        tiempo: "8 min",
        horas: 100
    },

    {
        categoria: "pistolas",
        nombre: "Magnum 357",
        materiales: {
            aluminio: 25,
            cobre: 14,
            acero: 25,
            polvora: 15
        },
        reputacion: 300,
        pd: 3,
        tiempo: "8 min",
        horas: 100
    },

    {
        categoria: "pistolas",
        nombre: "Desert Eagle",
        materiales: {
            aluminio: 20,
            cobre: 10,
            acero: 20,
            polvora: 14
        },
        reputacion: 300,
        pd: 3,
        tiempo: "9 min",
        horas: 600
    },

    {
        categoria: "pistolas",
        nombre: "Desert Eagle Dorada",
        materiales: {
            "Desert Eagle": 1,
            oro: 5
        },
        reputacion: 300,
        pd: 3,
        tiempo: "1 min",
        horas: 600
    },
        {
        categoria: "pistolas",
        nombre: "Mauser C96",
        materiales: {
            aluminio: 35,
            cobre: 15,
            acero: 20,
            polvora: 10,
            madera: 2
        },
        reputacion: 300,
        pd: 5,
        tiempo: "10 min",
        horas: 100
    },

        {
        categoria: "otros", /// Lo dejo acá para que salg ajunto las pistolas nomas.
        nombre: "Bersa 380 (No hay en BIG) solo ARGRP",
        materiales: {
            aluminio: 7,
            cobre: 5,
            acero: 18,
            polvora: 15,
        },
        reputacion: 300,
        pd: 5,
        tiempo: "8 min",
        horas: 500
    },

    // ==========================
    // ARMAS LARGAS
    // ==========================

    {
        categoria: "armas",
        nombre: "AK-47",
        materiales: {
            aluminio: 35,
            cobre: 18,
            acero: 35,
            polvora: 15,
            madera: 10
        },
        reputacion: 300,
        pd: 4,
        tiempo: "20 min",
        horas: 100
    },

    {
        categoria: "armas",
        nombre: "AK-107",
        materiales: {
            aluminio: 35,
            cobre: 18,
            acero: 35,
            polvora: 15,
            madera: 10
        },
        reputacion: 300,
        pd: 4,
        tiempo: "20 min",
        horas: 100
    },

    {
        categoria: "armas",
        nombre: "AKM",
        materiales: {
            aluminio: 35,
            cobre: 18,
            acero: 35,
            polvora: 15,
            madera: 10
        },
        reputacion: 300,
        pd: 4,
        tiempo: "20 min",
        horas: 100
    },

    {
        categoria: "armas",
        nombre: "M16A4",
        materiales: {
            aluminio: 60,
            cobre: 35,
            acero: 60,
            polvora: 50,
            madera: 10
        },
        reputacion: 300,
        pd: 5,
        tiempo: "30 min",
        horas: 100
    },

    {
        categoria: "armas",
        nombre: "Mauser 1909",
        materiales: {
            aluminio: 15,
            cobre: 10,
            acero: 15,
            polvora: 18,
            madera: 25
        },
        reputacion: 300,
        pd: 5,
        tiempo: "20 min",
        horas: 100
    },

    {
        categoria: "armas",
        nombre: "Thompson 1928",
        materiales: {
            aluminio: 40,
            cobre: 20,
            acero: 40,
            polvora: 10
        },
        reputacion: 300,
        pd: 5,
        tiempo: "20 min",
        horas: 100
    },

    {
        categoria: "armas",
        nombre: "Degtyarev",
        materiales: {
            aluminio: 50,
            cobre: 15,
            acero: 50,
            polvora: 15,
            madera: 20
        },
        reputacion: 300,
        pd: 5,
        tiempo: "20 min",
        horas: 100
    },

    {
        categoria: "armas",
        nombre: "FMK",
        materiales: {
            aluminio: 20,
            cobre: 15,
            acero: 25,
            polvora: 10
        },
        reputacion: 300,
        pd: 3,
        tiempo: "12 min",
        horas: 100
    },

    // ==========================
    // OTROS (creo que era asi machete no me acuerdo)
    // ==========================

    {
        categoria: "otros",
        nombre: "Machete",
        materiales: {
            aluminio: 0,
            cobre: 0,
            acero: 5,
            polvora: 0,
            madera: 5
        },
        reputacion: 100,
        pd: 2,
        tiempo: "5 min",
        horas: 100
    },



    // ==========================
    // MUNICION (GRANDE Y CHICAS)
    // ==========================

    {
        categoria: "municion",
        nombre: ".9mm",
        materiales:{cobre:7,acero:5,polvora:10},
        reputacion:100,
        pd:2,
        tiempo:"5 min",
        horas:100
    },

    {
        categoria: "municion",
        nombre: ".380",
        materiales:{cobre:4,acero:7,polvora:9},
        reputacion:100,
        pd:2,
        tiempo:"5 min",
        horas:100
    },

    {
        categoria: "municion",
        nombre: ".45",
        materiales:{cobre:4,acero:10,polvora:8},
        reputacion:100,
        pd:2,
        tiempo:"5 min",
        horas:100
    },

    {
        categoria: "municion",
        nombre: ".44",
        materiales:{cobre:4,acero:11,polvora:8},
        reputacion:100,
        pd:2,
        tiempo:"5 min",
        horas:100
    },

    {
        categoria: "municion",
        nombre: ".357",
        materiales:{cobre:3,acero:5,polvora:2},
        reputacion:100,
        pd:2,
        tiempo:"5 min",
        horas:100
    },

    {
        categoria: "municion",
        nombre: "7.65",
        materiales:{cobre:10,acero:7,polvora:13},
        reputacion:100,
        pd:2,
        tiempo:"6 min",
        horas:100
    },

    {
        categoria: "municion",
        nombre: "7.62",
        materiales:{cobre:9,acero:12,polvora:13},
        reputacion:100,
        pd:2,
        tiempo:"6 min",
        horas:100
    },

    {
        categoria: "municion",
        nombre: "5.56",
        materiales:{cobre:13,acero:10,polvora:15},
        reputacion:100,
        pd:2,
        tiempo:"6 min",
        horas:100
    },

    {
        categoria: "municion_chica",
        nombre: ".9mm chica",
        materiales:{cobre:3,acero:2,polvora:4},
        reputacion:100,
        pd:2,
        tiempo:"1.40 min",
        horas:100
    },

    {
        categoria: "municion_chica",
        nombre: ".380 chica",
        materiales:{cobre:2,acero:3,polvora:4},
        reputacion:100,
        pd:2,
        tiempo:"1.40 min",
        horas:100
    },

    {
        categoria: "municion_chica",
        nombre: ".45 chica",
        materiales:{cobre:2,acero:4,polvora:3},
        reputacion:100,
        pd:2,
        tiempo:"1.40 min",
        horas:100
    },

    {
        categoria: "municion_chica",
        nombre: ".44 chica",
        materiales:{cobre:2,acero:5,polvora:3},
        reputacion:100,
        pd:2,
        tiempo:"1.40 min",
        horas:100
    },

    {
        categoria: "municion_chica",
        nombre: ".357 chica",
        materiales:{cobre:3,acero:5,polvora:2},
        reputacion:100,
        pd:2,
        tiempo:"1.40 min",
        horas:100
    },

    {
        categoria: "municion_chica",
        nombre: "7.65 chica",
        materiales:{cobre:7,acero:3,polvora:6},
        reputacion:100,
        pd:2,
        tiempo:"1.40 min",
        horas:100
    },

    {
        categoria: "municion_chica",
        nombre: "7.62 chica",
        materiales:{cobre:5,acero:5,polvora:6},
        reputacion:100,
        pd:2,
        tiempo:"1.40 min",
        horas:100
    },

    {
        categoria: "municion_chica",
        nombre: "5.56 chica",
        materiales:{cobre:6,acero:4,polvora:6},
        reputacion:100,
        pd:2,
        tiempo:"1.40 min",
        horas:100
    },


    /// Drogas
    {
        categoria: "otros",
        nombre: "Marihuana",
        materiales:{gasolina:0,semillas:1},
        reputacion:0,
        pd:0,
        tiempo:"30 min",
        horas:0
    },

    {
        categoria: "otros",
        nombre: "Hojas de coca",
        materiales:{gasolina:0,semillas:1},
        reputacion:0,
        pd:0,
        tiempo:"20 min",
        horas:0
    },
 
    {
        categoria: "otros",
        nombre: "Premezcla",
        materiales:{gasolina:2,hojas_coca:15},
        reputacion:0,
        pd:0,
        tiempo:"5 min",
        horas:100
    },   
    
        {
        categoria: "otros",
        nombre: "Cocaina",
        materiales:{premezcla:1},
        reputacion:0,
        pd:2,
        tiempo:"10 min",
        horas:100
    },    
];

// ==========================
// MUNICIÓN POR ARMA (Default / Chico / Grande)
// Guía del server y sistema de balas (de referencia) https://bigroleplay.com/index.php?topic=870.0

// Cada valor es la cantidad de balas que entran con ese cargador.
// El "calibre" tiene que matchear con el nombre de un item de
// categoria "municion" para poder calcular su costo.
// ==========================

const municionPorArma = {

    // Pistolas
    "Beretta 96": { calibre: ".380", default: 15, chico: 30, grande: 45 },
    "Beretta 9": { calibre: ".9mm", default: 15, chico: 30, grande: 45 },
    "M1911": { calibre: ".45", default: 7, chico: 14, grande: 21 },
    "Magnum 44": { calibre: ".44", default: 6, chico: 12, grande: 18 },
    "Magnum 357": { calibre: ".357", default: 6, chico: 12, grande: 18 },
    "Desert Eagle": { calibre: ".44", default: 7, chico: 14, grande: 60 },
    "Bersa 380 (No hay en BIG) solo ARGRP": { calibre: ".380", default: 16, chico: 8, grande: 16 },
    // La Dorada es la misma arma pero con skin asi que usa la misma munición que la Desert Eagle base
    "Desert Eagle Dorada": { calibre: ".44", default: 7, chico: 14, grande: 60 },
    "Mauser C96": { calibre: "7.65", default: 10, chico: 20, grande: 30 },

    // Armas largas
    "AK-47": { calibre: "7.62", default: 30, chico: 60, grande: 120 },
    "AK-107": { calibre: "7.62", default: 30, chico: 60, grande: 120 },
    "AKM": { calibre: "7.62", default: 30, chico: 60, grande: 120 },
    "M16A4": { calibre: "5.56", default: 30, chico: 60, grande: 120 },
    "Thompson 1928": { calibre: "7.62", default: 20, chico: 40, grande: 120 },
    "FMK": { calibre: ".9mm", default: 20, chico: 40, grande: 60 },
    "Degtyarev": { calibre: "7.62", default: 47, chico: 94, grande: 120 },
    "Mauser 1909": { calibre: "7.65", default: 10, chico: 20, grande: 30 },

};


const DrogaPrepa = {
    // drogas
    "premezcla": { material: "gasolina"},
    "cocaina": { material: "premezcla"},

    "Marihuana": { material: "semillas_mari"},
    "Hojas de coca": { material: "Semillas_coca"},
};