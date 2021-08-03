USE [master]
GO

IF db_id('SwagSwap') IS NULL
  CREATE DATABASE [SwagSwap]
GO

USE [SwagSwap]
GO

---------------------------------------------------------------------------

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Posts];
DROP TABLE IF EXISTS [Messages];
DROP TABLE IF EXISTS [Categories];
GO 



CREATE TABLE [UserProfile] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [FirstName] NVARCHAR(50) NOT NULL,
  [LastName] NVARCHAR(50) NOT NULL,
  [DisplayName] NVARCHAR(50) NOT NULL,
  [ImageUrl] NVARCHAR(255) NOT NULL,
  [Email] NVARCHAR(255) NOT NULL,
  [UserZip] INTEGER NOT NULL,
  [Rating] INTEGER NOT NULL

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Posts] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [UserId] INTEGER NOT NULL,
  [Title] NVARCHAR(50) NOT NULL,
  [Description] NVARCHAR(255) NOT NULL,
  [Value] INTEGER NOT NULL,
  [ImageUrl] NVARCHAR(255) NOT NULL,
  [PostedDate] Datetime,
  [CategoryId] INTEGER NOT NULL,
  [Size] NVARCHAR(50) NOT NULL,

    CONSTRAINT FK_Posts_UserProfile FOREIGN KEY (UserId) REFERENCES UserProfile(id),
    CONSTRAINT FK_Posts_Categories FOREIGN KEY (CategoryId) REFERENCES Categories(id)
)
GO

CREATE TABLE [Messages] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [SenderId] INTEGER NOT NULL,
  [RecipientId] INTEGER NOT NULL,
  [PostId] INTEGER NOT NULL,
  [Content] NVARCHAR(255) NOT NULL,
  [CreateDateTime] DATETIME  NOT NULL

  CONSTRAINT FK_Messages_UserProfile FOREIGN KEY (SenderId) REFERENCES UserProfile(id),
  CONSTRAINT FK_Messages_UserProfile FOREIGN KEY (RecipientId) REFERENCES UserProfile(id),
  CONSTRAINT FK_Messages_Posts FOREIGN KEY (PostId) REFERENCES Posts(id)
)
GO

CREATE TABLE [Categories] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Name] NVARCHAR(50) NOT NULL
)
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (1,'csJkhiyZxdUcZw7UrMq8hXG4TMa2' ,'Gustopher', 'Lewis', 'Gus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8-43Omz_nLQLOH6cYPAZZciA0U93CxNEGA&usqp=CAU', 'gus@gus.com', 37216, 10);
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (2, 'JU5Urf9AasVPQZfm34RyDegnkm33', 'Earl', 'Henry', 'Earl','https://www.thegoodypet.com/wp-content/uploads/2020/05/baby-pug-a-complete-guide-to-caring-your-young-pug-1200x900.jpg','earl@earl.com', 37216, 10);
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (3, 'JU5Urf9AasVPQZfm34RyDegnkm33', 'Earl', 'Henry', 'Earl','https://www.thegoodypet.com/wp-content/uploads/2020/05/baby-pug-a-complete-guide-to-caring-your-young-pug-1200x900.jpg','earl@earl.com', 37216, 10);
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (4, 'JU5Urf9AasVPQZfm34RyDegnkm33', 'Earl', 'Henry', 'Earl','https://www.thegoodypet.com/wp-content/uploads/2020/05/baby-pug-a-complete-guide-to-caring-your-young-pug-1200x900.jpg','earl@earl.com', 37216, 10);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Posts] ON
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (1, 1, 'WildFang Coveralls', 'Never worn. Long sleeved, orchid pink coveralls.', 55, 'https://di2ponv0v5otw.cloudfront.net/posts/2020/09/16/5f628cb6cc9aa24d686c4b92/s_5f628d0d6f6c917c687ff7c0.jpg', SYSDATETIME(), 3, 'Large');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://content.backcountry.com/images/items/900/ETS/ETS000B/WAL.jpg', SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, , SYSDATETIME(), , '');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, , SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, , SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, , SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, , SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, , SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://content.backcountry.com/images/items/900/ETS/ETS000B/WAL.jpg', SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://content.backcountry.com/images/items/900/ETS/ETS000B/WAL.jpg', SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://content.backcountry.com/images/items/900/ETS/ETS000B/WAL.jpg', SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://content.backcountry.com/images/items/900/ETS/ETS000B/WAL.jpg', SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://content.backcountry.com/images/items/900/ETS/ETS000B/WAL.jpg', SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://content.backcountry.com/images/items/900/ETS/ETS000B/WAL.jpg', SYSDATETIME(), 6, '7');
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://content.backcountry.com/images/items/900/ETS/ETS000B/WAL.jpg', SYSDATETIME(), 6, '7');
SET IDENTITY_INSERT [Posts] OFF

SET IDENTITY_INSERT [Messages] ON
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (1, 2, 1, 1,'Hey Gus. I am interested in this jumpsuit. Take a look at my posts and hopefully we can work out a trade. There is some good stuff in there. Thanks!', SYSDATETIME());
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (2, 4, 1, 1,'I am loving this jumpsuit. Is it still available?', SYSDATETIME());
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (3, 4, 2, 2,'Hey Earl. Any chance this hat is still available?', SYSDATETIME());
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (4, 2, 4, 2,'Hey Haley. It is still available. I will look at your posts and get back with you.', SYSDATETIME());
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (5, 1, 2, 1,'Earl. Love your two-toned jeans. I would be up for a trade. When are you free?', SYSDATETIME());
SET IDENTITY_INSERT [Messages] OFF

SET IDENTITY_INSERT [Categories] on
INSERT [Categories] ([Id], [Name]) 
VALUES (1, 'Shirts'), (2, 'Pants'), (3, 'Jumpsuits'), (4, 'Sweaters'), (5, 'Hoodies'), (6, 'Dresses'), (7, 'Shorts'), (8, 'Skirts), (9, 'Jackets')
SET IDENTITY_INSERT [Categories] off
