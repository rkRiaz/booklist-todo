# booklist-todo
Book List TODO App

1.	Download the folder
2.	Install NodeJs. My version is 16.14.0.
3.	Open command line interface of root folder and install the packages using `npm install`
4.	Then go to client folder and again install the packages using `npm install`
5.	Setup your mysql database. Copy and paste the below queries. I used the xampp-control-panel.

create database bookrdr    // bookrdr is the database name

create table books (
    	book_id varchar(255) not null primary key,
	title varchar(255) not null,
    	author varchar(255) not null,
   	published_year int not null,
    	book_summary varchar(5000),
        createTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_id varchar(255) not null
)

create table users (
	user_id varchar(255) not null unique,
   	name varchar(255) not null,
   	email varchar(255) not null,
    	user_password varchar(255) not null,
    	primary key(user_id)
)

create table favBooks (
	fav_id varchar(255) not null primary key,
    	book_id varchar(255) not null,
   	user_id varchar(255) not null,
    	foreign key (book_id) references books(book_id),
   	foreign key (user_id) references users(user_id),
	createTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

6.	Then make the default.env to .env and input your credential following the default.env files instruction.
7.	Finally open command line interface of root folder and command `npm run dev`. This will start the node-server and also the front-end react-app.


