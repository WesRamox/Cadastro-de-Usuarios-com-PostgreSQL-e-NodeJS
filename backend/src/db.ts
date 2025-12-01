import { Pool } from "pg";

export const db = new Pool({
  connectionString: "postgresql://postgres:root@localhost:5432/users_registration"
});