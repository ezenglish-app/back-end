import type { Context } from "hono";
import type { ICard, Vocabulary } from "@/pkg/vocabulary/Vocabulary.ts";
import { newErrorResponse, newSuccessResponse } from "@/response/response.ts";

export const Get = async (c: Context) => {
  try {
    const files = Deno.readDirSync("./data/Vocabulary");
    const vocabulary: Vocabulary = { totalCards: 0, cards: {} };
    for (const file of files) {
      if (file.isFile) {
        const cards: ICard[] = [];
        const category = file.name.split(".")[0];
        const data = await Deno.readTextFile(
          `./data/Vocabulary/${category}.json`
        );
        const jsonData = JSON.parse(data);
        cards.push(...jsonData);
        vocabulary.totalCards += [...jsonData].length * 2;
        vocabulary.cards[category] = cards;
      }
    }
    c.header("Cache-Control", `public, immutable, max-age=31536000`);
    return newSuccessResponse(c, vocabulary);
  } catch (e) {
    console.error(e);
    return newErrorResponse(c, "Error reading files", 500);
  }
};