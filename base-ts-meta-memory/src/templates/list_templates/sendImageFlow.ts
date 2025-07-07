import { addKeyword } from "@builderbot/bot";
import { registrarEnExcel } from "../registrarEnExcel";

const sendImageFlow = addKeyword(['CUADRO_1','CUADRO_2','CUADRO_3','CUADRO_4','CUADRO_5','CUADRO_6','ESPECIALIDAD_1','ESPECIALIDAD_2','ESPECIALIDAD_3','DERIVADO_1','DERIVADO_2'])
    .addAction(async (ctx, ctxFn) => {
        const responses: Record<string, { text: string; media: string }> = {
            'CUADRO_1': {
                text: '*Cuadro Cosecha Viva* - S/ 300.00',
                media: './assets/imagenes_cuadro/Cosecha Viva.jpg'
            },
            'CUADRO_2': {
                text: '*Cuadro Guardiana del Bosque Cafetalero* - S/ 300.00',
                media: './assets/imagenes_cuadro/Guardiana del Bosque Cafetalero.jpg'
            },
            'CUADRO_3': {
                text: '*Cuadro Madre Café* - S/ 45.00',
                media: './assets/imagenes_cuadro/Madre Cafe.jpg'
            },
            'CUADRO_4': {
                text: '*Cuadro Manos que Siembran Esperanza* - S/ 300.00',
                media: './assets/imagenes_cuadro/Manos que Siembran Esperanza.jpg'
            },
            'CUADRO_5': {
                text: '*Cuadro Renacer entre Hojas de Café* - S/ 300.00',
                media: './assets/imagenes_cuadro/Renacer entre Hojas de Café.jpg'
            },
            'CUADRO_6': {
                text: '*Cuadro Colibrí* - S/ 45.00',
                media: './assets/imagenes_cuadro/Colibrí.jpg'
            },
            'ESPECIALIDAD_1': {
                text: 'Café de especialidad - *Bourbon* - S/ 20.00',
                media: './assets/imagenes_cafe/Café de especialidad - Bourbon.png'
            },
            'ESPECIALIDAD_2': {
                text: 'Café de especialidad - *Geisha* - S/ 30.00',
                media: './assets/imagenes_cafe/Café de especialidad - Geisha.png'
            },
            'ESPECIALIDAD_3': {
                text: 'Café de especialidad - *Proceso Natural* - S/ 25.00',
                media: './assets/imagenes_cafe/Café de especialidad - Proceso Natural.png'
            },
            'DERIVADO_1': {
                text: 'Derivado de Café - *Crema de Café* - S/ 30.00',
                media: './assets/imagenes_cafe/Derivado de Café - Crema de Café.jpg'
            },
            'DERIVADO_2': {
                text: 'Derivado de Café - *Jabón Exfoliante de Café* - S/ 9.00',
                media: './assets/imagenes_cafe/Derivado de Café - Jabón Exfoliante de Café.jpg'
            }
        };

        
        const response = responses[ctx.body];
        if (response) {
            await registrarEnExcel(ctx, `${response.text}`);
            // await ctxFn.flowDynamic([{ body: response.text }]);
            await ctxFn.flowDynamic([
                {
                    body: response.text,
                    media: response.media
                }
            ]);
        } else {
            await ctxFn.flowDynamic('❌ Opción no válida');
        }
    });

export { sendImageFlow };