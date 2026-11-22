-- Allow gifts to be hidden from public lists without deleting them
ALTER TABLE gifts ADD COLUMN hidden INTEGER NOT NULL DEFAULT 0;
