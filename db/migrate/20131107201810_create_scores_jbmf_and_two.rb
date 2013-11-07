class CreateScoresJbmfAndTwo < Mongoid::Migration
  def self.up
    ["jbmf", "two"].each do |name|
      unless Score.where(name: name).exists?
        score = Score.create!(name: name)
        puts "Score #{name} with slug #{score.slug} was created."
      end
    end
  end

  def self.down
  end
end