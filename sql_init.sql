create database rideshare;

use rideshare;

create table drivers(
_id varchar(100) NOT NULL PRIMARY KEY,
name varchar(100) not null,
cabID varchar(20) not null,
email varchar(150) not null,
dob DATE not null,
location varchar(200) not null
);

insert into drivers values('66c9a2da52e0a18f8c3b0639', 'ABC','C1','abc@gmail.com','2000-10-12','chennai');

create table riders (
_id varchar(100) NOT NULL PRIMARY KEY,
name varchar(100) not null,
email varchar(150) not null
);

insert into riders values ('66c9a2da52e0a18f8c3b0639' , 'Customer_ABC', 'custoABC@gmail.com');

create table cabs (
_id varchar(100) NOT NULL PRIMARY KEY,
aadhar_ID varchar(20) not null, 
vehicle_number varchar(40) not null,
vehicle_type varchar(40) not null,
vehicle_model varchar(60) not null
);

insert into cabs values('66c9a2da52e0a18f8c3b0639', '123412341234', 'TN22AB4321', 'Sedan', 'BMW 750d');