# encoding: utf-8

require 'will_paginate/array'

module Admins
  class BaseController < ApplicationController

    # the base views include resource_class helpers and such
    include Concerns::ResourceControllerAccessors

    PER_PAGE = 20

    layout 'admins'

    before_filter :add_admin_view_path
    before_action :authenticate_user!
    before_action :set_current_navigation

    helper 'admins/form'


    protected


    def set_current_navigation
      @current_navigation = resource_sym
    end


    def after_sign_out_path_for(resource_or_scope)
      admins_root_url
    end


    def add_admin_view_path
      prepend_view_path "app/views/admins"
    end

  end
end
