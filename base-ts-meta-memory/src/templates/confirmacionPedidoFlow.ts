import { addKeyword, EVENTS } from "@builderbot/bot";
import { pedidoProductoFlow } from "./pedidoProductoFlow";

const confirmacionPedidoFlow = addKeyword('PEDIDO')
  .addAnswer("🛍️ ¿Quieres hacer un pedido?", {
    capture: true,
    buttons: [
      { body: "Sí" },
      { body: "No" },
    ]
  }, async (ctx, ctxFn) => {
    if (ctx.body.toLowerCase() === "sí") {
      return ctxFn.gotoFlow(pedidoProductoFlow);
    }
    return ctxFn.endFlow("👍 ¡Perfecto! Si cambiás de idea, escribí *Menú* para ver opciones.");
  });

export { confirmacionPedidoFlow };