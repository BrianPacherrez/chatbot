import { createFlow } from "@builderbot/bot";
import { mainFlow } from "./mainFlow";
import { faqFlow } from "./faqFlow";
import { registerFlow } from "./registerFlow";
import { DetectIntention } from "./intentionFlow";
import { productoFlow } from "./option_templates/productoFlow";
import { contactoFlow, contactoLinkFlow } from "./option_templates/contactoFlow";
import { menuFlow } from "./menuFlow";
import { cuadrosFlow } from "./option_templates/cuadrosFlow";
import { cafeFlow } from "./option_templates/cafeFlow";
import { prendasFlow } from "./option_templates/prendasFlow";
import { sendImageFlow } from "./list_templates/sendImageFlow";
import { sendPdfFlow } from "./list_templates/sendPdfFlow";
import { pedidoProductoFlow } from "./pedidoProductoFlow";
import { confirmacionPedidoFlow } from "./confirmacionPedidoFlow";
import { productosCatalogoFlow, registrarCuadroFlow } from "./productosCatalogoFlow";
import { seguimientoFlow } from "./seguimientoFlow";

export default createFlow([
    mainFlow,
    faqFlow,
    registerFlow,
    menuFlow,
    productoFlow,
    contactoFlow,
    seguimientoFlow,
    contactoLinkFlow,
    cuadrosFlow,
    sendImageFlow,
    prendasFlow,
    sendPdfFlow,
    cafeFlow,
    confirmacionPedidoFlow,
    pedidoProductoFlow,
    productosCatalogoFlow,
    registrarCuadroFlow,
    DetectIntention
]);