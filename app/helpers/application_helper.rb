# encoding: utf-8
module ApplicationHelper

  # TODO test, doc
  def locale_switch
    if I18n.available_locales.count != 2
      raise I18n::TooFewLocalesError.new("need exactly two locales for locale toggle")
    end

    resources = [:page].collect do |model_sym|
      instance_variable = "@#{model_sym}"

      if defined?(instance_variable)
        instance_variable_get(instance_variable)
      else
        nil
      end
    end

    resource = resources.compact.uniq.first

    loc = I18n.alternative_locale

    target = I18n.with_locale(loc) do
      resource.present? ? polymorphic_path(resource, locale: I18n.locale) : root_url(locale: I18n.locale)
    end

    return link_to(loc.upcase, target)
  end


  def device_detection_classes
    return nil if !instance_variable_defined?(:@js_framework_settings)

    return 'mobile' if @js_framework_settings[:isMobile]
    return 'tablet' if @js_framework_settings[:isTablet]

    return nil
  end


  # TODO test, doc
  def page_title(sub_title = nil)
    combined_title = I18n.t('page_title')
    combined_title += " - " + @title if @title
    combined_title += " - " + sub_title if sub_title.present?
    return combined_title
  end


  # global application settings that get rendered as javascript into the layout
  # (stuff that needs to be available for javascript)
  def js_framework_settings(additional_settings_hash = {}, override = true)
    settings = @js_framework_settings
    settings.merge!(additional_settings_hash)

    if override
      return javascript_tag("APPLICATION = #{settings.to_json};")
    else
      return javascript_tag("$.extend(true, APPLICATION, #{settings.to_json});")
    end
  end


  def js_i18n_initialization(additional_settings_hash = {})
    return javascript_tag(
      %Q{
        I18n.defaultLocale = '#{I18n.default_locale.to_s.html_safe}';
        I18n.locale = '#{I18n.locale.to_s.html_safe}';
        I18n.availableLocales = #{I18n.available_locales.to_json.html_safe};
      }
    )
  end


  def url_to_image(source)
    raise ArgumentError.new("no image filename given") if !source.present?

    abs_path = image_path(source)
    unless abs_path =~ /^http/
      abs_path = "#{request.protocol}#{request.host_with_port}#{abs_path}"
    end

    return abs_path
  end

end
