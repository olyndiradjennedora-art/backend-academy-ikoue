import { real, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const vehiculeTable = sqliteTable ("vehicule_table", {
   veh_id: text().primaryKey(),
   veh_marque: text().notNull(),
   veh_categorie: text().notNull(),
   veh_anFabri: text().notNull(),
   veh_couleur: text().notNull(),
   veh_carburant: text().notNull(),
   veh_nmbrePlace: text().notNull(),
   veh_statut: text().notNull(),
   veh_prix: real().notNull(),
   veh_photo: text().notNull(),
   veh_description: text().notNull(),
});