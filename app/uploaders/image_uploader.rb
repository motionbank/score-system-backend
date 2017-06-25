# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick

  IMAGE_EXTENSIONS = %w{jpg jpeg png}
  ALLOWED_EXTENSIONS = IMAGE_EXTENSIONS

  UPLOAD_SETTINGS = {
    allowed_extensions: ALLOWED_EXTENSIONS,
    wrong_extension_message: I18n.t(
      'errors.messages.carrierwave_integrity_error',
      extension_white_list: ALLOWED_EXTENSIONS.join(',')
    )
  }


  attr_accessor :width, :height

  # s3 storage on heroku
  storage :fog

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  #@override
  def store_dir
    "#{base_dir}/full"
  end


  def base_dir
    "system/uploads/#{MultiTenancy.current_score.to_param}/#{model.class}/#{mounted_as}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  end


  version :small do
    process :resize_to_fill => [80, 80]
    process :rgb

    def store_dir
      "#{base_dir}/small"
    end

    def full_filename(for_file)
      for_file
    end
  end


  version :medium do
    process :resize_to_fit => [400, 300]
    process :rgb

    def store_dir
      "#{base_dir}/medium"
    end

    def full_filename(for_file)
      for_file
    end
  end


  def switch_extension(file_name, extension)
    return file_name.chomp(File.extname(file_name)) + '.' + extension
  end


  def thumb_url
    if image_or_video?
      small.url
    end
  end


  # white list of extensions which are allowed to be uploaded.
  def self.extension_white_list
    ALLOWED_EXTENSIONS
  end


  def extension_white_list
    self.class.extension_white_list
  end


  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end
