import { CONFIG } from "../constants";

export const isProduction = () => CONFIG.environment === "production";
