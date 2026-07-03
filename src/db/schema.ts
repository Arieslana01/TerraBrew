import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const recommendationHistory = pgTable("recommendation_history", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  rainfall: integer("rainfall").notNull(),
  water: integer("water").notNull(),
  temperature: integer("temperature").notNull(),
  humidity: integer("humidity").notNull(),
  grade: text("grade").notNull(),
  recommendedMethod: text("recommended_method").notNull(),
  score: integer("score").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
