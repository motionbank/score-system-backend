class SaveAllCellsAndSetsToSetTheirCssClassName < Mongoid::Migration
  def self.up
    Score.all.each do |score|
      MultiTenancy.current_score = score
      [Cell, CellSet].each do |model|
        resave_model(model)
      end
    end
  end

  def self.down
  end


  def self.resave_model(model)
    model.all.each do |doc|
      unless doc.save
        css_class_name_taken = model.where(:_id.ne => doc.id, css_class_name: doc.css_class_name).exists?
        "#{doc.class} couldn't be saved. id: #{doc.id }legacy_id: #{doc.legacy_id} css_class_name: #{doc.css_class_name} css_class_name_taken: #{css_class_name_taken}. Errors: #{doc.errors.full_messages}"
      end
    end
  end
end
