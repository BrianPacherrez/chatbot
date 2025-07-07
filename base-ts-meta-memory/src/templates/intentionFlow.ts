import { createFlowRouting } from "@builderbot-plugins/langchain"; 
import { EVENTS } from "@builderbot/bot";
import { config } from "../config";
import path from "path";
import fs from "fs";
import { menuFlow } from "./menuFlow";
import { faqFlow } from "./faqFlow";
import { confirmacionPedidoFlow } from "./confirmacionPedidoFlow";
import { cafeFlow } from "./option_templates/cafeFlow";
import { cuadrosFlow } from "./option_templates/cuadrosFlow";
import { prendasFlow } from "./option_templates/prendasFlow";
import { productoFlow } from "./option_templates/productoFlow";

const Prompt_DETECTED = path.join( 
    process.cwd(),
    "assets/prompts",
    "prompt_Detection.txt"
);

const promptDetected = fs.readFileSync(Prompt_DETECTED, "utf8");

export const DetectIntention = createFlowRouting
    .setKeyword (EVENTS.ACTION)
    .setIntentions({
        intentions: ["MENU_OPCIONES", "FAQ", "CAFE", "CUADROS", "PRENDAS", "NO_DETECTED"],
        description: promptDetected,
    })
    .setAIModel({
        modelName: "openai" as any,
        args: {
            modelName: config.Model,
            apikey: config.Apikey,
        },
    })
    .create({
        afterEnd(flow) {
            return flow.addAction(async (ctx, { state, endFlow, gotoFlow }) => { 
                try {
                    console.log("INTENCION DETECT", await state.get("intention"));

                    if ((await state.get("intention")) === "NO_DETECTED") {
                        return gotoFlow(faqFlow);
                    }

                    if ((await state.get("intention")) == "MENU_OPCIONES") {
                        return gotoFlow(menuFlow);
                    }
                    if ((await state.get("intention")) === "FAQ") {
                        return gotoFlow(faqFlow);
                    }
                    // if ((await state.get("intention")) === "CONFIRMACION_PEDIDO") {
                    //     return gotoFlow(productoFlow);
                    // }
                    if ((await state.get("intention")) === "CAFE") {
                        return gotoFlow(cafeFlow);
                    }
                    if ((await state.get("intention")) === "CUADROS") {
                        return gotoFlow(cuadrosFlow);
                    }
                    if ((await state.get("intention")) === "PRENDAS") 
                        return gotoFlow(prendasFlow);
                    }
                    catch (error) {
                        console.error("Error en DetectIntention: ", error);
                    }
                });
            },
        });