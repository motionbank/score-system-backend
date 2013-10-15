class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include ResourceHelper

  before_action :authenticate_user!
  before_action :init_js_framework_settings


  def init_js_framework_settings
    @js_framework_settings ||= {}
    @js_framework_settings = {
      controller: controller_name,
      action: action_name,
      partial: partial_name,
      request_url: request.try(:url)
    }
  end

end
