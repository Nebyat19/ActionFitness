ALTER TABLE "branches" ADD COLUMN "image_media_id" integer;--> statement-breakpoint
ALTER TABLE "branches" ADD COLUMN "is_primary" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;