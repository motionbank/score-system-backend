# encoding: utf-8
module Admins::FormHelper

  def base_errors(form)
    errors = form.error :base
    if errors.present?
      haml_tag(:div, errors, class: 'alert alert-error')
    end
  end

end
