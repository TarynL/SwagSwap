USE [master]
GO

IF db_id('SwagSwap') IS NULL
CREATE DATABASE [SwagSwap]
GO

USE [SwagSwap]
GO

DROP TABLE IF EXISTS [Messages];
DROP TABLE IF EXISTS [Posts];
DROP TABLE IF EXISTS [Categories];
DROP TABLE IF EXISTS [UserProfile];

GO
---------------------------------------------------------------------------

CREATE TABLE [userProfile] (
  [id] int PRIMARY KEY,
  [firebaseUserId] int,
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [displayName] nvarchar(255),
  [imageUrl] nvarchar(255),
  [email] nvarchar(255),
  [userZip] int,
  [rating] int
)
GO
CREATE TABLE [posts] (
  [id] int PRIMARY KEY,
  [userId] int,
  [title] nvarchar(255),
  [description] nvarchar(255),
  [value] int,
  [imageUrl] nvarchar(255),
  [postedDate] datetime,
  [categoryId] int,
  [size] nvarchar(255)
)
GO
CREATE TABLE [messages] (
  [id] int PRIMARY KEY,
  [senderId] int,
  [recipientId] int,
  [postId] int,
  [content] nvarchar(255),
  [createDateTime] datetime
)
GO
CREATE TABLE [categories] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255)
)
GO
ALTER TABLE [messages] ADD FOREIGN KEY ([senderId]) REFERENCES [userProfile] ([id])
GO
ALTER TABLE [messages] ADD FOREIGN KEY ([postId]) REFERENCES [posts] ([id])
GO
ALTER TABLE [posts] ADD FOREIGN KEY ([userId]) REFERENCES [userProfile] ([id])
GO
ALTER TABLE [messages] ADD FOREIGN KEY ([recipientId]) REFERENCES [userProfile] ([id])
GO
ALTER TABLE [posts] ADD FOREIGN KEY ([categoryId]) REFERENCES [categories] ([id])
GO
---------------------------------------------------------------------------
