import { addKeyword } from "@builderbot/bot";
import { registrarEnExcel } from "../registrarEnExcel";

const cuadrosFlow = addKeyword (['🖼️ Cuadros'])
    .addAction (async (ctx, { provider }) => {
        
        const mensaje =
            "👨‍🎨 Cuadros con tinta de café\n\n" +
            "Descubre nuestras obras originales pintadas con tinta de café ☕🎨. Deslizá para ver los cuadros disponibles:\n\n";
            "✨ ¿Cuál te gustó más? Escribe *Catálogo* para elegir tu cuadro favorito y hacer tu pedido 🛒."

        await registrarEnExcel(ctx, mensaje);
        
        const list = { 
            "header": {
                "type":"text",
                "text": "👨‍🎨 Cuadros con tinta de café"
            },
            "body": {
                "text": "Descubre nuestras obras originales pintadas con tinta de café ☕🎨. Desliza para ver los cuadros disponibles:"
            },
            "footer": {
                "text": ""
            },
            "action": {
                "button": "Opciones",
                "sections": [
                    {
                        "title": "Acciones", 
                        "rows": [
                            {
                                "id": "CUADRO_1",
                                "title": "Cosecha Viva",
                                "description": "Pintura de cada etapa del cafeto. Tamaño A3."
                            },
                            {
                                "id": "CUADRO_2",
                                "title": "Guardiana del bosque",
                                "description": "Pintura de el espíritu de la caficultura. Tamaño real A3."
                            },
                            {
                                "id": "CUADRO_3",
                                "title": "Madre Café",
                                "description": "Pintura de mujer y naturaleza. Tamaños A4, A3 y A2."
                            },
                            {
                                "id": "CUADRO_4",
                                "title": "Manos Esperanza",
                                "description": "Pintura de el acto de sembrar. Tamaño A3."
                            },
                            {
                                "id": "CUADRO_5",
                                "title": "Renacer entre Hojas",
                                "description": "Pintura de la conexión íntima con la tierra. Tamaño A3."
                            },
                            {
                                "id": "CUADRO_6",
                                "title": "Colibrí",
                                "description": "Pintura pintado con café y acuarela. Tamaño A4."
                            }
                        ]
                    }
                ]   
            }
        }
        await provider.sendList(`${ctx.from}@s.whatsapp.net`, list)
    })
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.state.update({ categoria: "Cuadros 🌆" });
        await ctxFn.flowDynamic("✨ ¿Cuál te gustó más? Escribe *Catálogo* para elegir tu cuadro favorito y hacer tu pedido 🛒.");
    }); 
    
export { cuadrosFlow };