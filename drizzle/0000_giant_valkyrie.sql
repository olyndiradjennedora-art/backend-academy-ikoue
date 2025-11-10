CREATE TABLE `location_table` (
	`loca_id` text PRIMARY KEY NOT NULL,
	`loca_date` text NOT NULL,
	`veh_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`veh_id`) REFERENCES `vehicule_table`(`veh_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user_table`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_table` (
	`user_id` text PRIMARY KEY NOT NULL,
	`user_nom` text NOT NULL,
	`user_prenom` text NOT NULL,
	`user_email` text NOT NULL,
	`user_password` text NOT NULL,
	`user_role` text NOT NULL,
	`created_at` text DEFAULT 'active'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_table_user_email_unique` ON `user_table` (`user_email`);--> statement-breakpoint
CREATE TABLE `vehicule_table` (
	`veh_id` text PRIMARY KEY NOT NULL,
	`veh_marque` text NOT NULL,
	`veh_categorie` text NOT NULL,
	`veh_anFabri` text NOT NULL,
	`veh_couleur` text NOT NULL,
	`veh_carburant` text NOT NULL,
	`veh_nmbrePlace` text NOT NULL,
	`veh_statut` text NOT NULL,
	`veh_prix` real NOT NULL,
	`veh_photo` text NOT NULL,
	`veh_description` text NOT NULL
);
