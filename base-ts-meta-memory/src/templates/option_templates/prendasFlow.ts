import { addKeyword, EVENTS} from "@builderbot/bot";
import { registrarEnExcel } from "../registrarEnExcel";

const prendasFlow = addKeyword ('👕 Prendas')
    .addAction (async (ctx, { provider }) => { 
        
        const mensaje =
            "👨‍💼 Prendas con temáticas de café\n\n" +
            "Descubre nuestras prendas estampadas con temáticas de café 🥼👚. Desliza para ver los cuadros disponibles:";
        
        await registrarEnExcel(ctx, mensaje);
                
        const list = {
            "header": {
                "type":"text",
                "text": "👨‍💼 Prendas con temáticas de café"
            },
            "body": {
                "text": "Descubre nuestras prendas estampadas con temáticas de café 🥼👚. Desliza para ver los cuadros disponibles:"
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
                                "id": "POLO_CAFETERO",
                                "title": "Polos cafeteros",
                                "description": "Polos de algodón, corté clásico, manga corta y cuello redondo."
                            }
                        ]
                    }
                ]   
            }
        }
        await provider.sendList(`${ctx.from}@s.whatsapp.net`, list)
    })
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.state.update({ categoria: "Prendas 🥼" });
        await ctxFn.flowDynamic("✨ ¿Cuál te gustó más? Escribe *Catálogo* para elegir tu pedido y consultar con un asesor 🛒.");
    }); 
    
export { prendasFlow };