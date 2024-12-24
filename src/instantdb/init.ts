import { init } from "@instantdb/react";

const appId = import.meta.env.VITE_INSTANTDB_APP_ID;

console.log(appId, "sdsd");

export const db = init({ appId });
