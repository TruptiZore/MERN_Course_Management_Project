CREATE DATABASE Project;
SET SQL_SAFE_UPDATES = 0;
USE Project;
SET SQL_SAFE_UPDATES = 0;

RENAME TABLE User TO users;
RENAME TABLE Student TO students;
SELECT* FROM Courses;
SELECT* FROM Videos;

ALTER TABLE users MODIFY password VARCHAR(255);

UPDATE Users
SET password = SHA2(password, 256);

SHOW tables;

--------------------------------------------------------
-- USER TABLE
--------------------------------------------------------
CREATE TABLE Users(
  email VARCHAR(50) PRIMARY KEY,
  password VARCHAR(20),
  role ENUM("User","Admin")
);

INSERT INTO Users (email,password,role) VALUES
("paraspatil1344@gmail.com","paras1234","User"),
("truptizore@gmail.com","trupti_9644","Admin"),
("omkarphalle77@gmail.com","omkar@1087","User"),
("artiphalle60@gmail.com","arati976","User"),
("shreya46@gmail.com","shreya4576","Admin");

--------------------------------------------------------
-- COURSES TABLE
--------------------------------------------------------
CREATE TABLE Courses(
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  course_name VARCHAR(20),
  description VARCHAR(20),
  fees INT,
  start_date DATE,
  end_date DATE,
  video_expire_days INT
) AUTO_INCREMENT = 101;

INSERT INTO Courses(course_name,description,fees,start_date,end_date,video_expire_days) VALUES
("MERN-STACK","Internship course",4000,"2025-12-10","2026-01-05",25),
("AGENTIC AI","Internship course",8000,"2025-12-11","2026-01-06",55),
("CYBER SECURITY","Internship course",14000,"2025-12-12","2026-01-07",56),
("DATA SCIENCE","Internship course",20000,"2025-12-13","2026-01-08",23),
("ANDROID","Internship course",16000,"2025-12-14","2026-01-09",12);

--------------------------------------------------------
-- STUDENT TABLE
--------------------------------------------------------
CREATE TABLE Students(
  reg_no INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20),
  email VARCHAR(50),
  course_id INT NOT NULL,
  mobile_no VARCHAR(15) NOT NULL,
  profile_pic BLOB NULL,
  FOREIGN KEY(email) REFERENCES Users(email),
  FOREIGN KEY(course_id) REFERENCES Courses(course_id)
);

INSERT INTO Students(name,email,course_id,mobile_no) VALUES
("Paras","paraspatil1344@gmail.com",101,"8624921344"),
("Trupti","truptizore@gmail.com",102,"7020996244"),
("Omkar","omkarphalle77@gmail.com",103,"9156812476"),
("Arati","artiphalle60@gmail.com",104,"9945647646"),
("Shreya","shreya46@gmail.com",105,"7653876243"); 

--------------------------------------------------------
-- VIDEOS TABLE
--------------------------------------------------------
CREATE TABLE Videos(
  video_id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT,
  title VARCHAR(50),
  description VARCHAR(100),
  youtube_url VARCHAR(200),
  added_at DATE,
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
) AUTO_INCREMENT = 1001;

INSERT INTO Videos(course_id,title,description,youtube_url,added_at) VALUES
(101,"MERN STACK ONE SHOT","Internship course","https://youtu.be/Vi9bxu-M-ag?si=1ONgkameo5NJxaCY","2025-12-01"),
(102,"AGENTIC AI ONE SHOT","Internship course","https://youtu.be/D1eL1EnxXXQ?si=CGeNuFKrbgYS6mgZ","2025-12-02"),
(103,"CYBER SECURITY ONE SHOT","Internship course","https://youtu.be/Vi9bxu-M-ag?si=1ONgkameo5NJxaCY","2025-12-03"),
(104,"DATA SCIENCE ONE SHOT","Internship course","https://youtu.be/-ETQ97mXXF0?si=TpEFcv0hqS4NRq5N","2025-12-04"),
(105,"ANDROID ONE SHOT","Internship course","https://youtu.be/mXjZQX3UzOs?si=WPsubgBp1aqp9dT_","2025-12-05");

SELECT* from Videos;
-----------------------------------------------------
-- QUESTION OF ASSIGNMENT 2
-----------------------------------------------------

-- QUETION 1:
SELECT* FROM Courses;
-- OR
SELECT course_id,course_name,description,fees,start_date,end_date,video_expire_daysFROM Courses
WHERE start_date >= CURDATE()
ORDER BY start_date;

-- QUETION 2:
SELECT s.reg_no,s.name,s.email,s.mobile_no,c.course_id,c.course_name FROM Student s
INNER JOIN Courses c
ON c.course_id = s.course_id
ORDER BY s.reg_no;

-- QUETION 3:
SELECT s.reg_no,s.name,s.email,s.mobile_no,s.course_id,c.course_name,c.description,c.fees,c.start_date,c.end_date,c.video_expire_days
FROM Student s
LEFT JOIN Courses c
  ON s.course_id = c.course_id
WHERE s.email = 'paraspatil1344@gmail.com';


-- QUETION 4:
SELECT c.course_id,c.course_name,c.start_date,c.end_date,c.video_expire_days,v.video_id,v.title,v.added_at
FROM Student AS s
INNER JOIN Courses AS c
  ON s.course_id = c.course_id
INNER JOIN Videos AS v
  ON v.course_id = c.course_id
WHERE s.email = 'paraspatil1344@gmail.com'
ORDER BY v.added_at DESC;





-- ON DELETE CASCADE AND ON UPDATE CASECADE-------------------------------------
  -- 1st drop old forign key constraint
ALTER TABLE Students DROP FOREIGN KEY students_ibfk_1;
ALTER TABLE Students DROP FOREIGN KEY students_ibfk_2;
ALTER TABLE Videos DROP FOREIGN KEY videos_ibfk_1;
-- create new foreign key constraint with on delete and on update cascade
ALTER TABLE Students
ADD CONSTRAINT students_ibfk_1
FOREIGN KEY (email)
REFERENCES Users(email)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE Students
ADD CONSTRAINT students_ibfk_2
FOREIGN KEY (course_id)
REFERENCES Courses(course_id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE Videos
ADD CONSTRAINT videos_ibfk_1
FOREIGN KEY (course_id)
REFERENCES Courses(course_id)
ON DELETE CASCADE
ON UPDATE CASCADE;