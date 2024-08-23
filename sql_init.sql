create database ride_share;

use ride_share;

create table drivers(
id Int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(100) not null,
cabID varchar(20) not null,
email varchar(150) not null,
dob DATE not null,
location varchar(200) not null
);

insert into drivers values(NULL, 'ABC','C1','abc@gmail.com','2000-10-12','chennai');

create table riders (
id Int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(100) not null,
email varchar(150) not null
);

insert into riders values (NULL, 'Customer_ABC', 'custoABC@gmail.com');