CREATE TABLE `stack_item` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`link` text,
	`description` text,
	`position` integer,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
