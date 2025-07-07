import { addKeyword, EVENTS } from '@builderbot/bot';
import sheetsService from '~/services/sheetsService';

const registerFlow = addKeyword(EVENTS.ACTION)
  .addAnswer("¡Hola! 👋 Bienvenido a Pardo Coffee ☕✨")
  .addAnswer("Soy tu asistente virtual y estoy aquí para ayudarte con tus pedidos, dudas o cualquier consulta 😊")
  
  // 👉 Pregunta directa por el nombre
  .addAnswer('Para comenzar, ¿podrías decirme tu nombre?', { capture: true },
    async (ctx, ctxFn) => {
      const nombre = ctx.body.trim();
      const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,50}$/.test(nombre);  // Acepta letras y espacios
      
      if (!nombreValido) {
        return ctxFn.fallBack("Por favor, ingresa un nombre válido (solo letras y espacios, sin números ni símbolos).");
      }

      await ctxFn.state.update({ name: nombre });
      await ctxFn.flowDynamic(`Perfecto, ${nombre}! 🙌`);
    }
  )

  // 👉 Luego pide el correo y valida
  .addAnswer('Ahora, ¿cuál es tu correo electrónico?', { capture: true },
    async (ctx, ctxFn) => {
      const email = ctx.body.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        return ctxFn.fallBack("Por favor, ingresa un correo electrónico válido.");
      }

      const state = ctxFn.state.getMyState();
      await sheetsService.createUser(ctx.from, state.name, email);
      await ctxFn.flowDynamic("¡Excelente! Tus datos ya fueron cargados ✅ Ahora ya puedes comenzar a usar el bot.");
    }
  );

export { registerFlow };
