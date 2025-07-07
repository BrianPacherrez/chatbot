import sheetsService from "~/services/sheetsService";

export async function registrarEnExcel(ctx, respuestaBot: string) {
  await sheetsService.addConverToUser(ctx.from, [
    { role: "user", content: ctx.body },
    { role: "assistant", content: respuestaBot }
  ]);
}