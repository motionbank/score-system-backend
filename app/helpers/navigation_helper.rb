# encoding: utf-8
module NavigationHelper

  # TODO doc
  # TODO test
  # TODO wrapper options (merge active_class into class)
  # TODO link options
  def navigation_tag(title, url, identifier = nil, options = {})
    options = {
      wrapper_options: {},
      link_options: {}
    }.merge(options)

    options[:wrapper_options].merge!({:class => ''})

    active_class = nil

    if identifier.present?
      if identifier.is_a?(Symbol)
        active_class = (@current_navigation == identifier ? 'active' : nil)
        options[:wrapper_options][:class] += " #{active_class}"
      end
    end

    options[:wrapper_options][:class] = options[:wrapper_options][:class].strip.presence

    result = content_tag(:li, options[:wrapper_options]) do
      link_to(title, url, options[:link_options])
    end

    return result.html_safe
  end


end
