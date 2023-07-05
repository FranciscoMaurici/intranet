DROP PROCEDURE IF EXISTS Intranet_Handbook_UpdateMenuIndex;

CREATE PROCEDURE Intranet_Handbook_UpdateMenuIndex()
BEGIN
	update handbook h1 
LEFT JOIN handbook h2
ON h1.parent_id = h2.id 
LEFT JOIN handbook h3 
ON h2.parent_id = h3.id

set h1.menu_index = CONCAT_WS('.', 
  h3.`order`,
  h2.`order`,
  h1.`order`);
END
