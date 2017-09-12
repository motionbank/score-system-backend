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
      request_url: request.try(:url),
      frontend: {
          :path => FRONTEND_URL
      }
    }
    if current_user
      @js_framework_settings.merge!({
          user: {
              :name => current_user.name,
              :id => current_user.id.to_s,
              :email => current_user.email,
              :is_admin => current_user.admin,
              :token => current_user.authentication_token
          }
      })
    end
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

  private

  # For this example, we are simply using token authentication
  # via parameters. However, anyone could use Rails's token
  # authentication features to get the token from a header.
  def authenticate_user_from_token!
    user_token = params[:user_token].presence
    user       = user_token && User.find_by_authentication_token(user_token.to_s)

    if user
      # Notice we are passing store false, so the user is not
      # actually stored in the session and a token is needed
      # for every request. If you want the token to work as a
      # sign in token, you can simply remove store: false.
      sign_in user, store: false
    end
  end

end
