# encoding: utf-8

module Concerns
  module ResourceControllerAccessors
    extend ActiveSupport::Concern

    included do
      def resource_class
        @resource_class = self.class.to_s.demodulize.gsub(/Controller/, '').singularize.constantize
      end


      def resource_sym
        resource_class.to_s.underscore.to_sym
      end


      def resources_sym
        resource_class.to_s.underscore.pluralize.to_sym
      end


      def set_collection(value)
        instance_variable_set(:"@#{resource_sym.to_s.pluralize}", value)
      end


      def get_collection
        instance_variable_get(:"@#{resource_sym.to_s.pluralize}")
      end


      def set_resource(value)
        instance_variable_set(:"@#{resource_sym}", value)
      end


      def get_resource
        instance_variable_get(:"@#{resource_sym}")
      end
    end

  end
end
