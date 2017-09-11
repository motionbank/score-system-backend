source 'https://rubygems.org'
ruby '2.1.10'

# Bundle edge Rails instcompasead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# PERSISTENCE
gem 'mongoid', '~> 4.0.0'
gem "mongoid-indifferent-access", require: "mongoid_indifferent_access"
gem "mongoid-slug", '>= 3.2.0'
gem "mongoid_rails_migrations"
gem "publish", "~> 0.3.0"

# SERIALIZATION
gem 'rabl' # API building
gem 'oj' # JSON-Parser, faster than `yajl-ruby`

# file uploads
gem 'carrierwave'
gem 'mini_magick', '>= 3.4'
gem 'carrierwave-mongoid', :require => 'carrierwave/mongoid'

# file uploads on heroku
gem 'fog'
gem 'fog-aws'

# AUTH
gem 'devise'
gem 'cancan'

# FRONTEND
gem 'jquery-rails'
gem 'haml-rails'
gem 'ruby-haml-js'
gem "js-routes"

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# TWITTER BOOTSTRAP
gem 'compass_twitter_bootstrap'
gem "compass-rails"
gem 'compass-960-plugin'
gem 'bootstrap-will_paginate'

# SIMPLE FORM
gem 'simple_form', '>= 2.0.3'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
# gem 'turbolinks'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

# Use unicorn as the app server
gem 'unicorn'

group :development do
  # LEGACY IMPORT
  # gem "mysql2"

  gem 'quiet_assets'

  # Use Capistrano for deployment
  gem 'capistrano', '~>2.15.4'
  gem 'capistrano-deploytags'
end

group :production do
  gem 'exception_notification'
  gem 'rails_12factor'
end

group :test do
  gem 'factory_girl_rails'
  gem 'database_cleaner'
end

# Use debugger
# gem 'debugger', group: [:development, :test]
