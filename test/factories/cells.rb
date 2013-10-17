# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :cell do
    type Cell::TYPES.first
    title "MyString"
    description "MyString"
  end
end
