# Calculadora BIG Roleplay

Calculadora web de costos de fabricación para armas y munición del servidor **BIG Roleplay**. Calcula cuánto sale craftear cada arma, cuánto sale su munición según la carga elegida, y a qué precio conviene venderla, una herramientas bastante útil y para vivirla más.

## Qué hace

- Lista todas las armas y municiones con su costo de fabricación, calculado en base al precio de cada material.
- Calcula el costo de un arma **sin balas**, y aparte el costo de cargarla con munición default, cargador chico, cargador grande, o una cantidad personalizada (la que el usuario tenga).
- Muestra precio de venta sugerido, ganancia neta y una clasificación de rentabilidad, comparando cada item contra el resto.
- Precios de materiales configurables y editables (se guardan en el navegador), con los valores de referencia del server precargados.
- Buscador y filtros por categoría (pistolas, armas largas, munición, munición chica).

## Cómo está armado

- **HTML + CSS + JavaScript** puro, sin build ni frameworks.
- [Bootstrap 5](https://getbootstrap.com/) para la maquetación y los componentes (modales, dropdown, grid responsive).
- [Bootstrap Icons](https://icons.getbootstrap.com/) para los íconos.
- `data.js`: contiene los items (armas y munición) con sus materiales, y la tabla de munición por arma (calibre y cantidades default/chico/grande).
- `script.js`: toda la lógica de cálculo de costos, render de las cards y del modal de detalle.
- `style.css`: tema oscuro custom sobre Bootstrap.

## Lógica de precios (resumen)

El costo de un arma nunca incluye sus balas: es solo la suma de sus materiales. Las balas se suman aparte según la cantidad elegida, usando como referencia el precio de la **bala chica** (o bala normal en el caso del cargador grande). Un crafteo de munición equivale a una carga completa (la cantidad default del arma), así que el precio por bala individual sale de dividir ese costo entre esa cantidad default. Está todo el có0digo comentado, asi que es fácil de entender o aportar.

## Referencias

- [Guía de armas y munición de BIG Roleplay](https://bigroleplay.com/index.php?topic=870.0) — fuente de los calibres, cantidades default/chico/grande y el sistema de abastecimiento.
- [Discord de BIG Roleplay](https://discord.gg/bigrp)

## Autor

Hecho por **Mz** para la comunidad de BIG Roleplay.
