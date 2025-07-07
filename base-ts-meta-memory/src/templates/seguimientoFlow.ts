import { addKeyword, EVENTS } from '@builderbot/bot';
import { registrarEnExcel } from './registrarEnExcel';

const seguimientoFlow = addKeyword(['⚡ Ver Pedidos'])

    .addAction(async (ctx) => {
        const respuesta = 
            "📦 *Seguimiento de Pedido*\n" +
            "¿Ya realizaste una compra y completaste el pago? ✅ Puedes rastrear tu pedido con tu *ID de pedido* (lo encontrás en tu recibo o correo de confirmación).\n" +
            "🔗 Haz clic en el siguiente enlace para ver el estado de tu pedido en tiempo real:\n👉 [Rastrear Envío] (https://partdo.org.pe/?page_id=9079)";
        
        await registrarEnExcel(ctx, respuesta);
    })

    .addAnswer(`📦 *Seguimiento de Pedido*`)
    .addAnswer(`¿Ya realizaste una compra y completaste el pago? ✅ Puedes rastrear tu pedido con tu *ID de pedido* (lo encontrás en tu recibo o correo de confirmación).`)
    .addAnswer(`🔗 Haz clic en el siguiente enlace para ver el estado de tu pedido en tiempo real:\n👉 [Rastrear Envío] (https://partdo.org.pe/?page_id=9079)`);

export { seguimientoFlow };