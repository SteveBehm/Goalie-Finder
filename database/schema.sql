set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"joinedAt" timestamp with time zone NOT NULL,
	"profilePicUrl" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	"position" TEXT NOT NULL,
	"availability" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."conversations" (
	"conversationId" serial NOT NULL,
	"senderId" integer NOT NULL,
	"recipientId" integer NOT NULL,
	"content" TEXT NOT NULL,
	"sentAt" timestamp with time zone NOT NULL,
	CONSTRAINT "conversations_pk" PRIMARY KEY ("conversationId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "conversations" ADD CONSTRAINT "conversations_fk0" FOREIGN KEY ("senderId") REFERENCES "users"("userId");
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_fk1" FOREIGN KEY ("recipientId") REFERENCES "users"("userId");
