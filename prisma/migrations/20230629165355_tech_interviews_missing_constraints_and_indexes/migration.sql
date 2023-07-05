-- Add  missing unique keys to position and position_skill tables
ALTER TABLE position_skill  ADD CONSTRAINT position_skill_secondary_unique_key UNIQUE KEY (primary_skill_id, primary_skill_seniority_id, secondary_skill_id, secondary_skill_seniority_id, is_tech_lead);
ALTER TABLE `position`  ADD CONSTRAINT position_bullhorn_id_unique_key UNIQUE KEY (bullhorn_id);