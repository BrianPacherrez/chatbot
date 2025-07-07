import { addKeyword } from '@builderbot/bot';
import { cuadrosFlow } from './cuadrosFlow';
import { cafeFlow } from './cafeFlow';
import { prendasFlow } from './prendasFlow';
import { faqFlow } from '../faqFlow';
import { menuFlow } from '../menuFlow';
import { registrarEnExcel } from '../registrarEnExcel';

const productoFlow = addKeyword(['☕ Ver Productos'])
    
    .addAction(async (ctx) => {
        const respuesta = 
            "🌱 En Partdo fusionamos café, arte y moda. ☕ Donde cada categoría es una experiencia única.\n" +
            "🔁 Para regresar al menú principal, escribe *Menú*.\n" +
            "📌 O elige una categoría para descubrir lo que tenemos para ti 👇";
    
    await registrarEnExcel(ctx, respuesta);
    })   

    .addAnswer('🌱 En Partdo fusionamos café, arte y moda. ☕ Donde cada categoría es una experiencia única.')
    .addAnswer('🔁 Para regresar al menú principal, escribe *Menú*.')
    .addAnswer('📌 O elige una categoría para descubrir lo que tenemos para ti 👇', {
    capture: true,
    buttons: [
        { body: "🖼️ Cuadros" },
        { body: "☕ Cafés" },
        { body: "👕 Prendas" }
    ],
}, async (ctx, ctxFn) => {
        const input = ctx.body.toLowerCase().trim();

        if (input === 'menú' || input === 'menu') {
        return ctxFn.gotoFlow(menuFlow);
        }

        if (ctx.body === '🖼️ Cuadros') {
            return ctxFn.gotoFlow(cuadrosFlow);
        }
        if (ctx.body === '☕ Cafés') {
            return ctxFn.gotoFlow(cafeFlow);
        }
        if (ctx.body === '👕 Prendas') {
            return ctxFn.gotoFlow(prendasFlow);
        }

        return ctxFn.fallBack('Por favor, selecciona alguna de las opciones del menú.');
});

export { productoFlow };