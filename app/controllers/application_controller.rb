class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include Controllers::MultiTenancy

  include ResourceHelper

  before_action :init_js_framework_settings

  layout :layout_by_resource

  def init_js_framework_settings
    @js_framework_settings ||= {}
    @js_framework_settings = {
      controller: controller_name,
      action: action_name,
      partial: partial_name,
      request_url: request.try(:url)
    }
  end

  protected

  def layout_by_resource
    if devise_controller?
      "devise/sessions"
    else
      "admins"
    end
  end

  def allow_cors
    headers["Access-Control-Allow-Origin"] = "*"
    headers["Access-Control-Allow-Methods"] = 'GET, POST, PUT, DELETE'
    headers["Access-Control-Allow-Headers"] =
      'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

    head(:ok) if request.request_method == "OPTIONS"
    # or, render text: ''
    # if that's more your style
  end
end
