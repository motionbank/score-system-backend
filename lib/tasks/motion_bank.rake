# encoding: utf-8


namespace :motion_bank do

  desc "Imports the legacy MySQL database"
  task :import_legacy => :environment do
    require 'legacy_import'
    begin
      score_key = "deborah_hay"
      MultiTenancy.current_score = Score.find(score_key)
      source_config = YAML::load_file("config/config.yml").fetch(score_key)
      importer = LegacyImport.new(source_config)
      importer.run
    rescue Errno::ENOENT => e
      puts "Config file config/config.yml not found. #{LegacyImport.config_format_message}"
    rescue KeyError => e
      puts "Config file config/config.yml found, but missing key #{score_key}. #{LegacyImport.config_format_message}"
    end
  end

end
