require 'json'
require 'date'

file = File.read('birthdays.json')
data_hash = JSON.parse(file)

month_count = {}

data_hash.each do |key, value|
  monthNumber = value.split("").slice(0, 2).join("").to_i
  monthName = Date::MONTHNAMES[monthNumber]
  if month_count[monthName]
    month_count[monthName] = month_count[monthName] + 1
  else
    month_count[monthName] = 1
  end
end

puts month_count
# {"March"=>1, "January"=>2, "December"=>1, "June"=>1}

