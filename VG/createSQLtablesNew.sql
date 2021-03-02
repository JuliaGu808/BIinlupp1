CREATE TABLE Devices (
	DeviceId varchar(50) not null primary key,
	Name nvarchar(100) not null,
	School nvarchar(max) not null,
	LastActivityTime bigint not null
)
GO

CREATE TABLE MessageTypes (
	Id smallint not null identity(1,1) primary key,
	Type varchar(50) not null unique,
	Unit varchar(50) not null
)
GO

CREATE TABLE Messages (
	Id bigint not null identity(1,1) primary key,
	DeviceId varchar(50) not null references Devices(DeviceId),
	Created bigint not null
)
GO

CREATE TABLE MessageLines (
	MessageId bigint not null references Messages(Id),
	DateNr datetime not null,
	TypeName varchar(50) not null,
	Data nvarchar(max) not null
	primary key(MessageId, DateNr, TypeName)
)
GO

DELETE FROM MessageLines
DELETE FROM Devices
DELETE FROM MessageTypes
DELETE FROM Messages

SELECT * FROM MessageLines
SELECT * FROM Devices
SELECT * FROM MessageTypes
SELECT * FROM Messages