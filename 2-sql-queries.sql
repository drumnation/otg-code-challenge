/* a) The number of orders made by each customer. */
select  name, count(orders.id)
from    customers
INNER JOIN orders ON orders.customer_id = customers.ID
group by customers.name;

/* b) The list of all customers who have three or more orders. */
select  name, count(orders.id)
from    customers
INNER JOIN orders ON orders.customer_id = customers.ID
group by name
having  count(orders.id) >= 3

/* c) The list of all customers who have ordered the item named “test item”. */
SELECT name, count(orders.id)
FROM customers
INNER JOIN orders ON orders.customer_id = customers.ID
WHERE item_name = 'test item'
GROUP BY name;

/* d) The list of all customers who have NOT ordered the item named “test item”. */
SELECT name, COUNT(customers.id) as Customers_No_Test_Item_Orders_Count
FROM customers
INNER JOIN orders ON orders.customer_id = customers.ID
WHERE orders.item_name != 'test item'
GROUP BY customers.NAME