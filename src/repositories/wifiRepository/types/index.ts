import { Wifi } from "@prisma/client";
export type wifiData = Omit<Wifi, 'id' | 'createdAt'>