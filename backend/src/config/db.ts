import { Pool } from "pg";
import { connectionString } from "./env";

export const db = new Pool({
  connectionString
});