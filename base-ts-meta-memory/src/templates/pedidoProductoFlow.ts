import { addKeyword } from "@builderbot/bot";
import sheetManager from "../services/sheetsService";

const pedidoProductoFlow = addKeyword("__PEDIDO_PRODUCTO__")
  .addAction(async (ctx, ctxFn) => {
    const state = await ctxFn.state.getMyState();

    if (!state || !state.producto) {
      await ctxFn.flowDynamic("❌ No tengo registrado ningún producto. Escribí *Menú* para ver opciones.");
      return;
    }

    const { producto } = state;

    // Guardar el pedido en Google Sheets
    await sheetManager.addProductEntry(ctx.from, producto);

    // Notificar automáticamente al administrador
    await ctxFn.provider.sendText('51984365778@s.whatsapp.net', 
      `📦 Nuevo pedido registrado:\n👤 Cliente: ${ctx.from}\n🛍️ Producto: *${producto}*`);

    // Mensaje al cliente
    await ctxFn.endFlow(`✅ ¡Gracias! Tu pedido de *${producto}* fue registrado correctamente. 
    👤📞 En breve, un asesor te atenderá personalmente para concretarlo 💬.`);
  });

export { pedidoProductoFlow };
