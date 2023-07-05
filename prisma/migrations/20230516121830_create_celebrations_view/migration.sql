-- Create View
CREATE VIEW celebration AS
SELECT
  u.id,
  u.email,
  u.name,
  COALESCE(j.name, '') AS job_title,
  u.avatar,
  u.avatar_file,
  MONTH(u.birth_date) AS birth_date_month,
  DAY(u.birth_date) AS birth_date_day,
  MONTH(u.hire_date) AS hire_date_month,
  DAY(u.hire_date) AS hire_date_day,
  YEAR(u.hire_date) AS hire_date_year,
	TIMESTAMPDIFF(YEAR, u.hire_date, CURDATE()) AS years_difference
FROM user u
LEFT JOIN job_title j ON u.job_title_id = j.id
WHERE u.status = 1;