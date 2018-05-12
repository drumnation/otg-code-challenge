/* a) The number of orders made by each customer. */
SELECT name, count(orders.id)
FROM customers
INNER JOIN orders ON orders.customer_id = customers.ID
group by customers.name;

/* b) The list of all customers who have three or more orders. */
SELECT name, COUNT(orders.id)
FROM customers
INNER JOIN orders ON orders.customer_id = customers.ID
GROUP BY name
HAVING COUNT(orders.id) >= 3

/* c) The list of all customers who have ordered the item named “test item”. */
SELECT name, COUNT(orders.id)
FROM customers
INNER JOIN orders ON orders.customer_id = customers.ID
WHERE item_name = 'test item'
GROUP BY name;

/* d) The list of all customers who have NOT ordered the item named “test item”. */
SELECT name, COUNT(customers.id) AS Customers_No_Test_Item_Orders_Count
FROM customers
INNER JOIN orders ON orders.customer_id = customers.ID
WHERE orders.item_name != 'test item'
GROUP BY customers.NAME