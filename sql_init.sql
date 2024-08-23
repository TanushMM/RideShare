create database ride_share;

use ride_share;

create table drivers(
id Int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(100),
cabID varchar(20) not null,
email varchar(150),
dob DATE,
location varchar(200)
);

insert into drivers values(NULL, 'ABC','CB1','abc@gmail.com','2000-10-12','chennai');