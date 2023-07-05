-- Insert the values needed to grant access for recruiters, stack managers and interviewers to the tech interviews module. It also creates the module to be shwon on the navigation bar.

INSERT INTO module (description, constant, `path`, menu) VALUES
('Tech Interviews', 'TECH_INTERVIEW/RECRUITER', '/tech-interviews', 'CONTENT'),
('Tech Interviews', 'TECH_INTERVIEW/STACK_MANAGER', '/tech-interviews', 'CONTENT'),
('Tech Interviews', 'TECH_INTERVIEW/INTERVIEWER', '/tech-interviews', 'CONTENT');