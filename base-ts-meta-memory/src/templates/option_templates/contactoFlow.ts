import { addKeyword } from "@builderbot/bot";
import { registrarEnExcel } from "../registrarEnExcel";

const contactoFlow = addKeyword(['🌐 Contáctanos'])
    .addAction (async (ctx, { provider }) => { 

        const mensaje =
            "🌍 ¡Conocé más sobre lo que hacemos!\n\n" +
            "📲 Explorá nuestra web\n" +
            "📍 Encontrá nuestra ubicación\n" +
            "🏡 Visitá nuestra finca\n\n" +
            "↩️ Escribí *Menú* para volver al inicio";

        await registrarEnExcel(ctx, mensaje);

        const list = { 
            "header": {
                "type":"text",
                "text": "🌍 ¡Conocé más sobre lo que hacemos!"
            },
            "body": {
                "text": "📲 Explorá nuestra web\n📍 Encontrá nuestra ubicación\n🏡 Visitá nuestra finca\n\n↩️ Escribí *Menú* para volver al inicio"
            },
            "footer": {
                "text": ""
            },
            "action": {
                "button": "Opciones disponibles",
                "sections": [
                    {
                        "title": "Acciones", 
                        "rows": [
                            {
                                "id": "Página Web",
                                "title": "🌍 Página Web",
                                "description": "Visita nuestra web"
                            },
                            {
                                "id": "Ubicación",
                                "title": "🧳 Ubicación",
                                "description": "Mira nuestra ubicación"
                            },
                            {
                                "id": "Finca",
                                "title": "🏡 Finca",
                                "description": "Conoce nuestra finca"
                            }
                        ]
                    }
                ]   
            }
        }
        await provider.sendList(`${ctx.from}@s.whatsapp.net`, list)
        })

export { contactoFlow };


const contactoLinkFlow = addKeyword(['Página Web', 'Ubicación', 'Finca'])
    .addAction(async (ctx, ctxFn) => {
        const responses: Record<string, { text: string; media: string }> = {
            'Página Web': {
                text: '🌐 Visita nuestra web: https://partdo.org.pe',
                media: ''
            },
            'Ubicación': {
                text: '🏘️ Estamos ubicados aquí: https://n9.cl/2svfkd',
                media: ''
            },
            'Finca': {
                text: '🚐 Conoce nuestra finca: https://partdo.org.pe/?page_id=10876',
                media: ''
            }
        };

        const response = responses[ctx.body];
        if (response) {
            await registrarEnExcel(ctx, `${response.text}`);
            await ctxFn.flowDynamic([{ body: response.text }]);
        } else {
            await ctxFn.flowDynamic('❌ Opción no válida');
        }
    });

export { contactoLinkFlow };