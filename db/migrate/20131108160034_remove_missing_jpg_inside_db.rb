class RemoveMissingJpgInsideDb < Mongoid::Migration
  def self.up
    scores = Score.all
    scores.each do |score|
      MultiTenancy.current_score = score
      cells = Cell.where(poster_image_filename: 'missing.jpg')
      remove_missing(cells)
      cell_sets = CellSet.where(poster_image_filename: 'missing.jpg')
      remove_missing(cell_sets)
    end
  end

  def self.down
  end

private

  def self.remove_missing(cl)
    cl.each do |c|
      c.remove_poster_image=true
      c.save
    end
  end
end
