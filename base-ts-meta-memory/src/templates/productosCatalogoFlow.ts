import { addKeyword } from "@builderbot/bot";
import sheetManager from "../services/sheetsService";

const productosPorId: Record<string, string> = {
    // Cuadros
    "PRODUCTO_1": "Cuadro Cosecha Viva",
    "PRODUCTO_2": "Cuadro Guardiana del Bosque Cafetalero",
    "PRODUCTO_3": "Cuadro Madre Café",
    "PRODUCTO_4": "Cuadro Manos que Siembran Esperanza",
    "PRODUCTO_5": "Cuadro Renacer entre Hojas de Café",
    "PRODUCTO_6": "Cuadro Colibrí",
    // Cafés
    "CAFE_1": "Café de especialidad - Geisha",
    "CAFE_2": "Café de especialidad - Bourbon",
    "CAFE_3": "Café de especialidad - Proceso Natural",
    "CAFE_4": "Crema de Café",
    "CAFE_5": "Jabón Exfoliante de Café",
    // Polos Cafeteros
    "POLO_1": "Polos Cafeteros"
};

const registrarCuadroFlow = addKeyword(["PRODUCTO_1","PRODUCTO_2","PRODUCTO_3","PRODUCTO_4","PRODUCTO_5","PRODUCTO_6","CAFE_1","CAFE_2","CAFE_3","CAFE_4","CAFE_5","POLO_1"])
  .addAction(async (ctx, ctxFn) => {
    const seleccionado = productosPorId[ctx.body];

    if (seleccionado) {
      await ctxFn.state.update({ producto: seleccionado });
      await ctxFn.flowDynamic(`🛒 Elegiste: *${seleccionado}*\nEscribe *PEDIDO* para confirmar tu compra.`);
    } else {
      await ctxFn.flowDynamic("⚠️ No pude reconocer ese producto. Prueba de nuevo escribiendo *Catálogo*.");
    }
  });

export { registrarCuadroFlow };


export const productosPorCategoria: Record<string, { id: string; title: string; description: string }[]> = {
  "Cafés ☕": [
    { id: "CAFE_1", title: "Geisha", description: "Café de especialidad - Geisha" },
    { id: "CAFE_2", title: "Bourbon", description: "Café de especialidad - Bourbon" },
    { id: "CAFE_3", title: "Proceso Natural", description: "Café de especialidad - Proceso Natural" },
    { id: "CAFE_4", title: "Crema de Café", description: "Derivado de Café - Crema de Café" },
    { id: "CAFE_5", title: "Jabón Exfoliante de Café", description: "Derivado de Café - Exfoliante de Café" }
  ],
  "Cuadros 🌆": [
    { id: "PRODUCTO_1", title: "Cosecha Viva", description: "Cuadro Cosecha Viva" },
    { id: "PRODUCTO_2", title: "Guardiana del bosque", description: "Cuadro Guardiana del Bosque Cafetalero" },
    { id: "PRODUCTO_3", title: "Madre Café", description: "Cuadro Madre Café" },
    { id: "PRODUCTO_4", title: "Manos Esperanza", description: "Cuadro Manos que Siembran Esperanza" },
    { id: "PRODUCTO_5", title: "Renacer entre Hojas", description: "Cuadro Renacer entre Hojas de Café" },
    { id: "PRODUCTO_6", title: "Colibrí", description: "Cuadro Colibrí" }
  ],
  "Prendas 🥼": [
    { id: "POLO_1", title: "Polos Cafeteros", description: "Polos de algodón, corté clásico, manga corta y cuello redondo" }
  ]
};


const productosCatalogoFlow = addKeyword(['Catalogo', 'Catálogo', 'catálogo', 'catalogo'])
  .addAction(async (ctx, { state, provider }) => {
    const categoria = await state.get("categoria");

    if (!categoria || !productosPorCategoria[categoria]) {
      await provider.sendText(`${ctx.from}@s.whatsapp.net`, "⚠️ No hay una categoría activa. Escribí *Menú* y seleccioná una categoría.");
      return;
    }

    const productos = productosPorCategoria[categoria];

    const list = {
      header: {
        type: "text",
        text: `📦 Productos disponibles - ${categoria}`
      },
      body: {
        text: "📝 Elige tu favorito haciendo clic en una opción 👇 para completar tu pedido 🖱️:"
      },
      footer: {
        text: "Partdo Coffee"
      },
      action: {
        button: "Opciones",
        sections: [
          {
            title: "Productos",
            rows: productos.map((p) => ({
              id: p.id,
              title: p.title,
              description: p.description
            }))
          }
        ]
      }
    };

    await provider.sendList(`${ctx.from}@s.whatsapp.net`, list);
  });

export { productosCatalogoFlow };