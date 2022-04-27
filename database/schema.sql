set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


 CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamp with time zone NOT NULL,
	"profilePicUrl" TEXT,
	"location" TEXT NOT NULL,
	"position" TEXT NOT NULL,
	"availability" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."messages" (
	"messageId" serial NOT NULL,
	"senderId" integer NOT NULL,
	"recipientId" integer NOT NULL,
	"content" TEXT NOT NULL,
	"sentAt" timestamp with time zone NOT NULL,
	CONSTRAINT "messages_pk" PRIMARY KEY ("messageId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."notifications" (
	"notificationId" serial NOT NULL,
	"senderId" integer NOT NULL,
	"recipientId" integer NOT NULL,
	CONSTRAINT "notifications_pk" PRIMARY KEY ("notificationId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("senderId") REFERENCES "users"("userId");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("recipientId") REFERENCES "users"("userId");

ALTER TABLE "notifications" ADD CONSTRAINT "notifications_fk0" FOREIGN KEY ("senderId") REFERENCES "users"("userId");
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_fk1" FOREIGN KEY ("recipientId") REFERENCES "users"("userId");
