USE [master]
GO

IF db_id('SwagSwap') IS NULL
  CREATE DATABASE SwagSwap
GO

USE [SwagSwap]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Posts];
DROP TABLE IF EXISTS [Messages];
DROP TABLE IF EXISTS [Categories];
GO 

CREATE TABLE [Categories] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Name] NVARCHAR(50) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [FirstName] NVARCHAR(50) NOT NULL,
  [LastName] NVARCHAR(50) NOT NULL,
  [DisplayName] NVARCHAR(50) NOT NULL,
  [ImageUrl] NVARCHAR(255) NOT NULL,
  [Email] NVARCHAR(50) NOT NULL,
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
  [value] INTEGER NOT NULL,
  [imageUrl] NVARCHAR(255) NOT NULL,
  [postedDate] datetime,
  [categoryId] INTEGER NOT NULL,
  [size] NVARCHAR(50) NOT NULL,

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
  CONSTRAINT FK_Messages_Posts FOREIGN KEY (PostId) REFERENCES Posts(id)

)
GO
ALTER TABLE [MESSAGES] ADD FOREIGN KEY ([RecipientId]) REFERENCES [UserProfile] ([id]);


SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (1,'csJkhiyZxdUcZw7UrMq8hXG4TMa2' ,'Gustopher', 'Lewis', 'Gus', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8-43Omz_nLQLOH6cYPAZZciA0U93CxNEGA&usqp=CAU', 'gus@gus.com', 37216, 10);
INSERT INTO UserProfile (Id, FirebaseUserId, FirstName, LastName, DisplayName, ImageUrl, Email, UserZip, Rating) values (2, 'JU5Urf9AasVPQZfm34RyDegnkm33', 'Earl', 'Henry', 'Earl','https://www.thegoodypet.com/wp-content/uploads/2020/05/baby-pug-a-complete-guide-to-caring-your-young-pug-1200x900.jpg','earl@earl.com', 37216, 10);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Posts] ON
INSERT INTO Posts (Id, UserId, Title, Description, Value, ImageUrl, PostedDate, CategoryId, Size) values (1, 1, 'WildFang Coveralls', 'Never worn. Long sleeved, orchid pink coveralls.', 55, 'https://di2ponv0v5otw.cloudfront.net/posts/2020/09/16/5f628cb6cc9aa24d686c4b92/s_5f628d0d6f6c917c687ff7c0.jpg', SYSDATETIME(), 3, 'Large');
SET IDENTITY_INSERT [Posts] OFF

SET IDENTITY_INSERT [Messages] ON
INSERT INTO Messages (Id, SenderId, RecipientId, PostId, Content, CreateDateTime) values (1, 2, 1, 1,'Hey Gus. I am interested in this jumpsuit. Take a look at my posts and hopefully we can work out a trade. There is some good stuff in there. Thanks!', SYSDATETIME());
SET IDENTITY_INSERT [Messages] OFF

SET IDENTITY_INSERT [Categories] on
INSERT [Categories] ([Id], [Name]) 
VALUES (1, 'Shirts'), (2, 'Pants'), (3, 'Jumpsuits')
SET IDENTITY_INSERT [Categories] off
