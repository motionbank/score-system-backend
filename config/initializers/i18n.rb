# encoding: utf-8
module I18n

  # the current i18n SimpleBackend doesn't support omitting the :count option,
  # when the locale is defined as a hash.
  # this monkeypatch fixes that issue.
  class << self
    alias :translate_without_optional_pluralization :translate
    def translate(key, options = {})
      result = self.translate_without_optional_pluralization(key, options)

      if !options[:count].present?
        if result.is_a?(Hash) && result.include?(:one)
          # wants singular, but will return hash if {:one, :other, ...} is defined in yml
          return result[:one]
        else
          # result is no hash, or hash is not for pluralization purposes
          return result
        end
      else
        return result
      end
    end

    alias_method :t, :translate
  end


  class I18n::TooFewLocalesError < StandardError; end


  # executes a given block with the supplied locale
  def self.with_locale(locale, &block)
    orig_locale = I18n.locale

    I18n.locale = locale
    result = yield

    I18n.locale = orig_locale
    return result
  end


  # taken from: https://gist.github.com/276191
  # E.g.:
  #   I18n.name_for_locale(:en)  # => "English"
  def self.name_for_locale(locale)
    key = "i18n.language.name"
    begin
      return I18n.backend.translate(locale, key)
    rescue
      return locale.to_s
    end
  end


  # if the locale parameter is omitted, the current locale will be used
  # returns a locale that is not the current locale
  # raises an error if there's only one locale available
  def self.alternative_locale(locale = I18n.locale)
    raise I18n::TooFewLocalesError if I18n.available_locales.size == 1
    other_locale = I18n.available_locales.select {|locale| locale != I18n.locale}.first
    return other_locale || I18n.default_locale
  end


  # returns t('record.with_class_name.create', ...)
  # where class_name and gender are derived from item
  # item can be a string, instance or class
  def self.record_action(item, action_name, options = {})
    item_class = self.item_to_class(item)
    class_name = self.model_name(item, options)
    return I18n.t("record.with_class_name.#{action_name.to_s}",
           gender: item_class.gender, class_name: class_name)
  end


  # returns the translated attribute name
  # item can be a string, instance or class, but must reference a valid model
  def self.attribute_name(item, attribute)
    klass = self.item_to_class(item)
    model_path = klass.to_s.underscore

    defaults = []
    defaults << :"#{klass.i18n_scope}.attributes.#{model_path}.#{attribute.to_s}"

    # try with superclasses also
    while klass.superclass != nil && klass.superclass != Object
      defaults << :"#{klass.i18n_scope}.attributes.#{klass.superclass.to_s.underscore}.#{attribute.to_s}"
      klass = klass.superclass
    end
    defaults << "#{attribute.to_s.humanize} #{item}"

    return I18n.t(defaults.shift, default: defaults)
  end


  # returns the translated model name from [itemclass.i18n_scope].models.[itemclass]
  # item can be a string, instance or class, but must reference a valid model
  #
  # if options are supplied, they are forwarded to I18n.t()
  #
  # NOTE: item.class.model_name.human doesn't work, because it's overwritten
  # to be able to use the same routes etc.
  def self.model_name(item, options = {})
    item_class = self.item_to_class(item)

    unless item_class.respond_to?(:model_name)
      raise ::ArgumentError.new("couldnt convert param to valid model: " + item.inspect)
    end

    path = "#{item_class.i18n_scope}.models.#{item_class.to_s.underscore}"
    return I18n.t(path, options)
  end


  private


    # gets the class of strings, instances, classes
    def self.item_to_class(item)
      if item.is_a?(String)
        begin
          item_class = item.singularize.camelize.constantize
        rescue
          raise ::ArgumentError.new("couldnt convert item to valid class: " + item)
        end
      elsif item.is_a?(Class)
        return item
      else
        return item.class
      end
    end

end
