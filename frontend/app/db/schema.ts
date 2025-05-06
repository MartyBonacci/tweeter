import {char, pgTable, uuid, varchar} from "drizzle-orm/pg-core";

export const profileTable = pgTable("profile", {
    profileId: uuid().primaryKey(),
    profileAbout: varchar({ length: 255 }),
    profileActivationToken: char({length:32}),
    profileEmail: varchar({ length: 255 }).notNull().unique(),
    profileImageUrl: varchar({ length: 255 }),
    profileName: varchar({ length: 127 }).notNull(),
    profilePasswordHash: char({ length: 97 }).notNull(),
});
