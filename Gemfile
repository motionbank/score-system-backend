source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'


# PERSISTENCE
gem 'mongoid', github: 'mongoid/mongoid', ref: '484aa0721e899202cd9579617de1fc0addb1ffbf' # the next commit cc7a0e709066aff444bc21cd9826e1568603934d breaks the rails console and rake invocations
gem "mongoid-indifferent-access", require: "mongoid_indifferent_access"
gem "mongoid_slug"
gem "mongoid_rails_migrations"

# SERIALIZATION
gem 'rabl' # API building
gem 'oj' # JSON-Parser, faster than `yajl-ruby`

# file uploads
gem 'carrierwave'
gem 'mini_magick', '>= 3.4'
gem 'carrierwave-mongoid', :require => 'carrierwave/mongoid'

# FRONTEND
gem 'jquery-rails'
gem 'haml-rails'

# TESTING
gem 'factory_girl_rails'


# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'


# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby


# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'


group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

# Use unicorn as the app server
gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
