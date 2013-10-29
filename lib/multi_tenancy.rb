module MultiTenancy
  COLLECTION_SEGMENTS = [:score]#TODO this app specific information should actually be set in a place
                                # effective for console, task and request environment e.g. in an
                                # initializer but over there the constant got lost often in development
                                # research a better way


  def self.included(base)
    base.extend(ClassMethods)
    base.store_in collection: lambda { base.dynamic_collection_name }
    base.class_attribute :collection_hierarchy, instance_writer: false
  end

  class MultiTenancyError < RuntimeError; end

  class << self
    attr_accessor :collection_setup


    def collection_segments
      self.collection_setup.keys
    end


    def collection_segments=(segments)
      # make a hash with the segments being the keys
      self.collection_setup = Hash[segments.collect {|v| [v, nil]}]

      singleton_class.class_eval do
        # define getter and setter methods for each segment
        segments.each do |name|
          # GETTER
          define_method "current_#{name}" do
            self.collection_setup[name]
          end

          # SETTER
          define_method "current_#{name}=" do |value|
            self.collection_setup[name] = value
          end
        end
      end
    end
  end


  module ClassMethods
    def dynamic_collection_name
      raise_if_uninitialized

      if respond_to?(:storage_options_defaults)
        # from Mongoid 4.x on
        original_collection_name = storage_options_defaults[:collection].to_s
      else
        # before Mongoid 4.x
        original_collection_name = default_collection_name.to_s
      end

      relevant_segments = MultiTenancy.collection_setup.slice(*collection_hierarchy)
      dynamic_part = relevant_segments.values.map(&:slug).join(".")

      if original_collection_name.starts_with?(dynamic_part)
        return original_collection_name
      end
      original_collection_name_part = original_collection_name
      if original_collection_name.split('.').length > 1
        original_collection_name_part = original_collection_name.split('.').last
      end

      return "#{dynamic_part}.#{original_collection_name_part}"
    end


    # THIS IS JUST HERE TO HAVE A CLASS MACRO
    def set_collection_hierarchy(hierarchy)
      self.collection_hierarchy = hierarchy
    end


    private


      def raise_if_uninitialized
        missing_segments = collection_hierarchy.select {|seg| MultiTenancy.send("current_#{seg}").nil? }
        if missing_segments.present?
          raise MultiTenancyError.new("#{self} includes #{MultiTenancy} but the collection setup of #{MultiTenancy} " \
                                      "lacks values for #{missing_segments}")
        end
      end
  end
end
