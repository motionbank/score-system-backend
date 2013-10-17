# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :cell_set do
    title "MyString"
    description "MyString"
    poster_image "MyString"
    path "MyString"
    rows 3
    columns 3
    cell_width 300
    cell_height 200
  end
end
