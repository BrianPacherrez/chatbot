import { addKeyword, EVENTS } from '@builderbot/bot';
import { productoFlow } from './option_templates/productoFlow';
import { contactoFlow } from './option_templates/contactoFlow';
import { faqFlow } from './faqFlow';
import { registrarEnExcel } from './registrarEnExcel';
import { seguimientoFlow } from './seguimientoFlow';

const menuFlow = addKeyword(EVENTS.ACTION)

  .addAction(async (ctx) => {
        const respuesta = 
        "👋 ¡Hola! Bienvenido/a a *Partdo*, donde el café ☕ se encuentra con el arte 🎨 y la moda 👗\n" +
        "🌟 Somos más que una cafetería: somos una experiencia multisensorial ubicada en Villa Rica, Pasco.\n" +
        "💬 ¿Qué te gustaría hacer hoy? Puedes escribirme si tienes una duda o quieres saber más sobre nuestros productos.\n" +
        "🛍️ O también puedes elegir una opción de aquí abajo 👇";
    
    await registrarEnExcel(ctx, respuesta);
  })   

  .addAnswer('👋 ¡Hola! Bienvenido/a a *Partdo*, donde el café ☕ se encuentra con el arte 🎨 y la moda 👗')
  .addAnswer('🌟 Somos más que una cafetería: somos una experiencia multisensorial ubicada en Villa Rica, Pasco.')
  .addAnswer('💬 ¿Qué te gustaría hacer hoy? Puedes escribirme si tienes una duda o quieres saber más sobre nuestros productos.')
  .addAnswer('🛍️ O también puedes elegir una opción de aquí abajo 👇', {
    capture: true,
    buttons: [
      { body: '☕ Ver Productos' },
      { body: '🌐 Contáctanos' },
      { body: '⚡ Ver Pedidos' },
    ]
  }, async (ctx, ctxFn) => {
    let respuesta = "";

    if (ctx.body === '☕ Ver Productos') {
      return ctxFn.gotoFlow(productoFlow);
    }

    if (ctx.body === '🌐 Contáctanos') {
      return ctxFn.gotoFlow(contactoFlow);
    }

    if (ctx.body === '⚡ Ver Pedidos') {
      return ctxFn.gotoFlow(seguimientoFlow);
    }

    // Por si escribe algo fuera del menú
    respuesta = "Derivando tu mensaje a atención personalizada 🤖";
    await registrarEnExcel(ctx, respuesta);
    return ctxFn.gotoFlow(faqFlow);
  });

export { menuFlow };