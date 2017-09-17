# encoding: utf-8
CarrierWave.configure do |config|
  config.storage = :fog

  # config.fog_provider = 'fog/aws'                        # required
  config.fog_credentials = {
      provider:              'AWS',                        # required
      aws_access_key_id:     ENV['AWS_KEY'],                        # required
      aws_secret_access_key: ENV['AWS_SECRET'],                        # required
      region:                ENV['AWS_REGION'], # 'eu-west-1',                  # optional, defaults to 'us-east-1'
      host:                  ENV['AWS_HOST'], # 's3-eu-west-1.amazonaws.com',             # optional, defaults to nil
      endpoint:              ENV['AWS_ENDPOINT'] # 'http://s3-eu-west-1.amazonaws.com' # optional, defaults to nil
  }
  config.fog_directory  = ENV['AWS_FOG_DIRECTORY']                          # required
  # config.fog_public     = false                                        # optional, defaults to true
  config.fog_attributes = { cache_control: "public, max-age=#{365.day.to_i}" } # optional, defaults to {}
end

# source: https://github.com/jnicklas/carrierwave/wiki/How-to%3A-Specify-the-image-quality
module CarrierWave
  module MiniMagick
    def quality(percentage)
      manipulate! do |img|
        img.quality(percentage.to_s)
        img = yield(img) if block_given?
        img
      end
    end


    # NOTE: this does not work somehow
    def rgb
      rgb_profile = ::Rails.root.to_s + '/vendor/icc_profiles/RGB/ColorMatchRGB.icc'

      manipulate! do |img|
        if img['colorspace'].upcase.include?('CMYK')
          img.combine_options do |options|
            options.push('+profile "' + rgb_profile + '"')
            options.colorspace('RGB')
          end
        end

        img = yield(img) if block_given?
        img
      end
    end

  end
end


CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/

# testing uploaders in isolation. Taken from https://github.com/jnicklas/carrierwave#Testing with CarrierWave
if Rails.env.test? or Rails.env.cucumber?
  CarrierWave.configure do |config|
    config.storage = :file
    config.root = "#{Rails.root}/test/support/carrierwave"
    config.enable_processing = false
  end

  class ActiveSupport::TestCase
    # delete uploaded files
    def teardown
      super
      if Rails.env.test?
        FileUtils.rm_rf(CarrierWave::Uploader::Base.root)
      end
    end
  end
end
