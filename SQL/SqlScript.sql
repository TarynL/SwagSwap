USE [master]
GO

IF db_id('SwagSwap') IS NULL
  CREATE DATABASE [SwagSwap]
GO

USE [SwagSwap]
GO

---------------------------------------------------------------------------

DROP TABLE IF EXISTS [Categories];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Posts];
DROP TABLE IF EXISTS [Messages];
GO 

CREATE TABLE [Categories] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Name] NVARCHAR(50) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] NVARCHAR(50) NOT NULL,
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
  [IsDeleted] BIT NOT NULL DEFAULT 0

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

  CONSTRAINT FK_Messages_SenderUserProfile FOREIGN KEY (SenderId)  REFERENCES UserProfile(id),
  CONSTRAINT FK_Messages_RecipientUserProfile FOREIGN KEY (RecipientId) REFERENCES UserProfile(id),
  CONSTRAINT FK_Messages_Posts FOREIGN KEY (PostId) REFERENCES Posts(id)
)
GO



SET IDENTITY_INSERT [Categories] ON
INSERT [Categories] ([Id], [Name]) 
VALUES (1, 'Shirts'), (2, 'Pants'), (3, 'Jumpsuits'), (4, 'Sweaters'), (5, 'Hoodies'), (6, 'Dresses'), (7, 'Shorts'), (8, 'Skirts'), (9, 'Jackets')
SET IDENTITY_INSERT [Categories] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (1,'csJkhiyZxdUcZw7UrMq8hXG4TMa2' ,'Gustopher', 'Lewis', 'Gus', 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628024310/swagSwap/v5tljp5z9c0i22omowo0.jpg', 'gus@gus.com', 37216, 10);
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (2, 'JU5Urf9AasVPQZfm34RyDegnkm33', 'Earl', 'Henry', 'Earl','https://res.cloudinary.com/dzayiv7cv/image/upload/v1628024310/swagSwap/v5tljp5z9c0i22omowo0.jpg','earl@earl.com', 37216, 10);
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (3, '08jj9LBdyBXLFw0m15WPjt7si9F2', 'Taryn', 'Lytle', 'Taryn','https://res.cloudinary.com/dzayiv7cv/image/upload/v1628024310/swagSwap/v5tljp5z9c0i22omowo0.jpg','taryn@taryn.com', 37216, 10);
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (4, 'gcHvNpTAZHYTSmWFwe259uNBQSn2', 'Haley', 'Louise', 'Haley','https://res.cloudinary.com/dzayiv7cv/image/upload/v1628024310/swagSwap/v5tljp5z9c0i22omowo0.jpg','cutie@cutie.com', 37216, 10);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Posts] ON
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (1, 1, 'WildFang Coveralls', 'Never worn. Long sleeved, orchid pink coveralls.', 55, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1627938109/swagSwap/rndq7qlevz1jrfhhkrcw.jpg', SYSDATETIME(), 3, 'Large', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (2, 2, 'Stetson Hat', 'Stetson Open Road Royal Deluxe Hat', 150, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628027297/swagSwap/iawfqxs4lmgcii1afkxm.jpg', SYSDATETIME(), 6, '7', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (3, 1, 'Everlane T-Shirt', 'Olive green, short sleeve shirt', 10, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628028463/swagSwap/l9hkvv2dvdmnzw6osafg.jpg', SYSDATETIME(), 1 , 'Small',0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (4, 1, 'Dewber Pants','Bottle green, linen pants', 30, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628035868/swagSwap/os0leynx1lb509g6jqfy.jpg',SYSDATETIME(), 2, 'Small', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (5, 2, 'E.L.V. Denim','Frayed two-tone high-rise straight-leg jeans', 100, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628027014/swagSwap/imlldv5pocv4ciqt483o.jpg', SYSDATETIME(), 2, '28', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (6, 2, 'Richer Poorer Tee', 'Long sleeved relaxed tee', 30, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628086885/swagSwap/iddin1yqkidwejoyijob.jpg', SYSDATETIME(), 1, 'Medium', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (7, 3, 'Knit Sweater', 'Long sleeved, mustard knit sweater with wide neckline', 20, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628027113/swagSwap/lxpmmqktyt5ydv17uvob.jpg', SYSDATETIME(), 4, 'Medium', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (8, 3, 'Schott N.Y.C. Leather Jacket', '50s black leather motorcycle jacket', 150, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628031261/swagSwap/osbk9tsb3wkmz6f8frej.jpg', SYSDATETIME(), 9, 'Small', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (9, 4, 'Pierson Bomber Jacket', 'Brown leather with shearling collar', 200, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628030525/swagSwap/pogqliwlx7ayi249c5ux.jpg', SYSDATETIME(), 9, 'X-Large', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (10, 4, 'Collectif Skirt','Red, short skirt', 40, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628086616/swagSwap/cd54vxl36stx1cgkmvda.jpg', SYSDATETIME(), 8, 'Small', 0);
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size, IsDeleted) values (11, 1, 'Khaki Button Up', 'Italian two pocket utility short sleeve', 70, 'https://res.cloudinary.com/dzayiv7cv/image/upload/v1628087192/swagSwap/wvppribn4lvac2uh7feh.jpg', SYSDATETIME(), 1, 'Medium', 0);
SET IDENTITY_INSERT [Posts] OFF

SET IDENTITY_INSERT [Messages] ON
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (1, 2, 1, 1,'Hey Gus. I am interested in this jumpsuit. Take a look at my posts and hopefully we can work out a trade. There is some good stuff in there. Thanks!', SYSDATETIME());
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (2, 4, 1, 1,'I am loving this jumpsuit. Is it still available?', SYSDATETIME());
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (3, 4, 2, 2,'Hey Earl. Any chance this hat is still available?', SYSDATETIME());
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (4, 2, 4, 2,'Hey Haley. It is still available. I will look at your posts and get back with you.', SYSDATETIME());
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (5, 1, 2, 1,'Earl. Love your two-toned jeans. I would be up for a trade. When are you free?', SYSDATETIME());
SET IDENTITY_INSERT [Messages] OFF

