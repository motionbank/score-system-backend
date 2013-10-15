# encoding: utf-8

module Admins::NavigationHelper

  # DO NOT MODIFY THIS LINE EXCEPT FOR ADDING MODELS (line is used by generator)
  NAVIGATION_MODELS = [Cell]


  def admin_navigation_left
    result = ""

    NAVIGATION_MODELS.each do |model|
      if can?(:read, model)
        result << navigation_tag(
          I18n.model_name(model, count: 2),
          polymorphic_url(model.to_s.underscore.pluralize.to_sym),
          model.to_s.underscore.to_sym
        )
      end
    end

    return result.html_safe
  end


  def admin_navigation_right
    result = ""

    result << navigation_tag(
      I18n.t('my_account'),
      edit_user_registration_path,
      :my_account
    )

    result << navigation_tag(
      I18n.t('logout'),
      destroy_session_path(:user),
      nil,
      link_options: {:method => :delete}
    )

    return result.html_safe
  end

end
