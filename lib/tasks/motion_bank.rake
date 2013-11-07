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
      puts "Config file config/config.yml found, but missing key #{score_key}. #{LegacyImport.config_format_message}"
    end
  end

end
