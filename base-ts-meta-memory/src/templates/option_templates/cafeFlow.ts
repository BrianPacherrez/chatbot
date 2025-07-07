import { addKeyword } from '@builderbot/bot';
import { registrarEnExcel } from '../registrarEnExcel';

const cafeFlow = addKeyword (['☕ Cafés'])
    .addAction (async (ctx, { provider }) => {
        
        const mensaje =
            "☕ Especialidades y derivados de café\n\n" +
            "Descubre nuestros especialidades y derivados de café ☕🌱. Desliza para ver los productos disponibles:\n\n";
            "✨ ¿Cuál te gustó más? 🍒 Escribe *Catálogo* para ver los productos disponibles y hacer tu pedido 🛒."

        await registrarEnExcel(ctx, mensaje);
        
        const list = { 
            "header": {
                "type":"text",
                "text": "☕ Especialidades y derivados de café"
            },
            "body": {
                "text": "Descubre nuestros especialidades y derivados de café ☕🌱. Desliza para ver los productos disponibles:"
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
                                "id": "ESPECIALIDAD_1",
                                "title": "Café Bourbon",
                                "description": "Perfil dulce, complejo y afrutado. Presentación de 250 gr."
                            },
                            {
                                "id": "ESPECIALIDAD_2",
                                "title": "Café Geisha",
                                "description": "Perfil floral y complejo. Presentación de 250 gr."
                            },
                            {
                                "id": "ESPECIALIDAD_3",
                                "title": "Café Proceso Natural",
                                "description": "Perfil afrutado y complejo. Presentación de 250 gr."
                            },
                            {
                                "id": "DERIVADO_1",
                                "title": "Crema de Café",
                                "description": "Crema de café con pisco quebranda."
                            },
                            {
                                "id": "DERIVADO_2",
                                "title": "Jabón Exfoliante de Café",
                                "description": "Elimina Toxinas y Grasas. 100% Artesanal."
                            }
                        ]
                    }
                ]   
            }
        }
        await provider.sendList(`${ctx.from}@s.whatsapp.net`, list)
    })
    .addAction(async (ctx, ctxFn) => {
        await ctxFn.state.update({ categoria: "Cafés ☕" });
        await ctxFn.flowDynamic("✨ ¿Cuál te gustó más? 🍒 Escribe *Catálogo* para ver los productos disponibles y hacer tu pedido 🛒.");
    }); 
    
export { cafeFlow };


// const cafeFlow = addKeyword(['☕ Cafés'])
//     .addAnswer(`☕ Especialidades de Café:
//         - Café de especialidad - *Bourbon*
//         - Café de especialidad - *Geisha*
//         - Café de especialidad - *Proceso Natural*`)
//     .addAnswer(`☕ Derivados de Café:
//         - Derivado de Café - *Crema de Café*
//         - Derivado de Café - *Jabón Exfoliante de Café*`)
//     .addAction(async (ctx, ctxFn) => {
//         await ctxFn.state.update({ categoria: "Cafés ☕" });
//         await ctxFn.flowDynamic("✨ ¿Cuál te gustó más? 🍒 Escribe *Catálogo* para ver los productos disponibles.");
//     });   

// export { cafeFlow };