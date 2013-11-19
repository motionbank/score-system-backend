# encoding: utf-8


namespace :motion_bank do

  desc 'Imports from the legacy MySQL database that is defined in config.yml for the SCORE_SLUG="my_score" key'
  task :import_legacy, [:score_slug] => :environment do |t, args|
    score_slug = args[:score_slug] || ENV['SCORE_SLUG']
    raise ArgumentError.new('SCORE_SLUG has to be specified like this SCORE_SLUG="my_score"') unless score_slug
    require 'legacy_import'
    begin
      MultiTenancy.current_score = Score.find(score_slug)
      source_config = YAML::load_file("config/config.yml").fetch(score_slug)
      importer = LegacyImport.new(source_config)
      importer.run
    rescue Errno::ENOENT => e
      puts "Config file config/config.yml not found. #{LegacyImport.config_format_message}"
    rescue KeyError => e
      puts "Config file config/config.yml found, but missing key #{score_slug}. #{LegacyImport.config_format_message}"
    end
  end

  desc 'Remove all missing.jpg poster images from db'
  task :remove_missing_jpg_images_from_db => :environment do |t, args|
    scores = Score.all
    scores.each do |score|
      MultiTenancy.current_score = score
      cells = Cell.where(poster_image_filename: 'missing.jpg')
      remove_missing_jpg(cells)
      cell_sets = CellSet.where(poster_image_filename: 'missing.jpg')
      remove_missing_jpg(cell_sets)
    end
  end

private
 def remove_missing_jpg(cl)
    cl.each do |c|
      c.remove_poster_image=true
      c.save
    end
  end
end
