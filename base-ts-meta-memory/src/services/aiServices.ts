import OpenAI from "openai"; 
import { config } from "~/config";

class aiServices {
    private static apikey: string; 
    private openAI: OpenAI;

    constructor (apikey: any) { 
        aiServices.apikey = apikey; 
        this.openAI = new OpenAI ( { 
            apiKey: aiServices.apikey,
        });
    }

    async chat (prompt: string, messages: any []): Promise<string> {
        try {
            const completion = await this.openAI.chat.completions.create({ 
                model: config.Model,
                messages: [
                    { role: "system", content: prompt },
                    ...messages,
                ],
            });

            const answer = completion.choices [0].message?.content || 'No response';
            return answer;
        } catch (err) {
            console.error("Error al conectar con OpenAI:", err);
            return "ERROR";
        }
    }
}    

export default aiServices;