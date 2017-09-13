# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# email = "mosys@motionbank.org"
# password = SecureRandom.hex(8)
# unless User.where(email: email).exists?
#   User.create!(email: email, password: password, password_confirmation: password, admin: true)
#   puts "Created default user #{email} with password #{password}"
# end

["After Care"].each { |score_name|
  unless Score.where(name: score_name).exists?
    score = Score.create!(name: score_name)
    puts "Created default score #{score_name} with URL slug #{score.slug}"
  end
}
