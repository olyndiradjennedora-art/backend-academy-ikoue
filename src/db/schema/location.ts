import {sqliteTable, text} from "drizzle-orm/sqlite-core"
import { vehiculeTable } from "./vehicule"
import { userTable } from "./user"

export const locationTable = sqliteTable ("location_table", {
   loca_id: text().primaryKey(),
   loca_date: text().notNull(),
   veh_id: text().notNull().references(() => vehiculeTable.veh_id, {onDelete: "cascade"}),
   user_id: text().notNull().references(() => userTable.user_id, {onDelete: "cascade"}),
})