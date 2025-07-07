import { addKeyword, EVENTS } from "@builderbot/bot";
import { registrarEnExcel } from "../registrarEnExcel";

const sendPdfFlow = addKeyword(["POLO_CAFETERO"])
    .addAction(async (ctx, ctxFn) => {
    const mensaje =
        "😊 Te adjunto un PDF con todas nuestras prendas disponibles 👇🏻"
            
    await registrarEnExcel(ctx, mensaje);})

    .addAnswer("😊 Te adjunto un PDF con todas nuestras prendas disponibles 👇🏻", {
        media: "./assets/pdf_prenda/Prendas Cafetera Partdo.pdf"
    })

export { sendPdfFlow };