// Docs: https://orm.drizzle.team/docs/schemas
// Schema is the structure of the database table.
import { serial, text, pgTable, integer, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum('user_system_enumm', ['system', 'user'])

// Created the column types and names for the "chats" database table.
export const chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  pdfName: text('pdf_name').notNull(),
  pdfUrl: text('pdf_url').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  userId: varchar('user_id', {length:256}).notNull(),
  fileKey: text('file_key').notNull(),
})

// Created the column types and names for the "messages" database table.
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  chatId: integer('chat_id').references(() => chats.id).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  role: userSystemEnum('role').notNull(),
});


// Notes: There is two parts to Drizzle:
// 1. drizzle-orm - interacts with our database
// 2. dizzle-kit - npm package that provide utility functions to create migrations and make sure that all our database are synced with the schema created. "a CLI companion for DrizzleORM, it lets generate SQL statements for schema creation and alternations or apply changes directly to the database." Docs: https://orm.drizzle.team/docs/migrations