import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const userSchema = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password:varchar({length:255}).notNull()
});

export default userSchema