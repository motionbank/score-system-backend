# encoding: utf-8

require 'will_paginate/array'

module Admins
  class BaseController < ApplicationController

    # the base views include resource_class helpers and such
    include Concerns::ResourceControllerAccessors

    PER_PAGE = 80

    layout 'admins'

    before_filter :add_admin_view_path
    before_action :authenticate_user!

    helper 'admins/form'


    protected


    def after_sign_out_path_for(resource_or_scope)
      admins_root_url
    end


    def add_admin_view_path
      prepend_view_path "app/views/admins"
    end

  end
end
