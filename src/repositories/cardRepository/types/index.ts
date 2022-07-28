import { Card } from "@prisma/client";
export type cardData = Omit<Card,'id' | 'createdAt'>