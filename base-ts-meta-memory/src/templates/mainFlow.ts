import { addKeyword, EVENTS } from "@builderbot/bot"
import { faqFlow } from "./faqFlow";
import sheetsService from "~/services/sheetsService";
import { registerFlow } from "./registerFlow";
import { DetectIntention } from "./intentionFlow";


const mainFlow = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, ctxFn) => {
        const isUser = await sheetsService.userExists(ctx.from);
        if (!isUser) {
            return ctxFn.gotoFlow(registerFlow);
        } else {
            ctxFn.gotoFlow(DetectIntention);
        }
    });

export { mainFlow };