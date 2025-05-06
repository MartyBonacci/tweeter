CREATE TABLE "profile" (
	"profileId" uuid PRIMARY KEY NOT NULL,
	"profileAbout" varchar(255),
	"profileActivationToken" char(32),
	"profileEmail" varchar(255) NOT NULL,
	"profileImageUrl" varchar(255),
	"profileName" varchar(127) NOT NULL,
	"profilePasswordHash" char(97) NOT NULL,
	CONSTRAINT "profile_profileEmail_unique" UNIQUE("profileEmail")
);
