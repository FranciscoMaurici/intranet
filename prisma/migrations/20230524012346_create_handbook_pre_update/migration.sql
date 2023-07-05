DROP PROCEDURE IF EXISTS Intranet_Handbook_PreUpsert;

CREATE  PROCEDURE Intranet_Handbook_PreUpsert(
		IN _level int,
		IN _new_order tinyint(1),
		IN _old_order tinyint(1),
		IN _parent_id smallint unsigned,
		IN _operation text)
BEGIN
	CASE _operation
   		WHEN 'UPDATE' THEN 
	   		BEGIN 
		   		IF _parent_id is NULL OR _parent_id='' THEN
					IF _new_order > _old_order THEN
						UPDATE handbook h SET h.order = h.order - 1 WHERE h.level = _level AND h.parent_id IS NULL AND h.order >= _old_order AND h.order <= _new_order AND status = 1;
					ELSE
						UPDATE handbook h SET h.order = h.order + 1 WHERE h.level = _level AND h.parent_id IS NULL AND h.order <= _old_order AND h.order >= _new_order AND status = 1;
					END IF;
				ELSE
					IF _new_order > _old_order THEN
						UPDATE handbook h SET h.order = h.order - 1 WHERE h.level = _level AND h.parent_id = _parent_id AND h.order >= _old_order AND h.order <= _new_order AND status = 1;
					ELSE
						UPDATE handbook h SET h.order = h.order + 1 WHERE h.level = _level AND h.parent_id = _parent_id AND h.order <= _old_order AND h.order >= _new_order AND status = 1;
					END IF;
				END IF;
		   	END;
		WHEN 'INSERT' THEN 
			BEGIN
				IF _parent_id is NULL OR _parent_id='' THEN
					UPDATE handbook h SET h.order = h.order + 1 WHERE h.level = _level AND h.parent_id IS NULL AND  h.order >= _new_order AND status = 1;			
				ELSE
					UPDATE handbook h SET h.order = h.order + 1 WHERE h.level = _level AND h.parent_id = _parent_id AND h.order >= _new_order AND status = 1;
				END IF;
			END;
		WHEN 'DELETE' THEN 
			BEGIN
				IF _parent_id is NULL OR _parent_id='' THEN
					UPDATE handbook h SET h.order = h.order - 1 WHERE h.level = _level AND h.parent_id IS NULL AND  h.order >= _new_order AND status = 1;			
				ELSE
					UPDATE handbook h SET h.order = h.order - 1 WHERE h.level = _level AND h.parent_id = _parent_id AND h.order >= _new_order AND status = 1;
				END IF;
			END;
   	END CASE;
END;
