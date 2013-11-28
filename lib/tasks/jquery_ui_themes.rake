#
# Derived from https://github.com/fatdude/jquery-ui-themes-rails
#
namespace :jquery_ui_themes do
  namespace :import do
    desc 'Import jQuery themeroller theme'
    task :themeroller, [:path, :name] => :environment do |t, args|
      path = args[:path] || ENV['PATH']
      name = args[:name] || ENV['NAME']
      abort 'Please specify a path to the file to import' if path.blank?
      abort 'Please specify a name' if name.blank?
      abort ('Import file not found!') unless File.exist?(File.expand_path(path))

      require 'fileutils'

      FileUtils.mkdir_p(File.expand_path('./app/assets/stylesheets/jquery-ui/'))
      FileUtils.mkdir_p(File.expand_path('./app/assets/images/jquery-ui/' + name))

      css = File.read(File.expand_path(path))

      File.open(File.expand_path("./app/assets/stylesheets/jquery-ui/#{name}.css.scss"), "w") do |file|
        file.puts css.gsub(/url\(images\/(.*)\)/, 'url(image-path(\'jquery-ui/' + name + '/\1\'))')
      end

      FileUtils.cp_r(File.dirname(File.expand_path(path)) + '/images/.', File.expand_path('./app/assets/images/jquery-ui/' + name))
    end
  end
end
