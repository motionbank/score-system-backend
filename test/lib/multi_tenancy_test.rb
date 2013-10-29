# encoding: utf-8

require 'test_helper'
require 'rspec_mock_integration'

module MultiTenancyTest
  extend ActiveSupport::Concern
  include RSpecMockIntegration

  included do
    setup do
      @score = FactoryGirl.create(:score)
      MultiTenancy.current_score = @score
      set_resource_variables
    end

    teardown do
      MultiTenancy.current_score = nil
    end

    test "raises_if_current_score_is_not_set" do
      MultiTenancy.current_score = nil
      assert_raises MultiTenancy::MultiTenancyError do
        @klass.find(@record.id)
      end
    end


    test "collection name should include something specific to the tenant" do
      assert_not_equal original_collection_name, @klass.collection.name, "The collection name shouldn't be equal to a standard collection name."
      tenant_collection_prefix = MultiTenancy.current_score.name.parameterize.underscore
      assert_includes @klass.collection.name, tenant_collection_prefix, "The collection name should include something specific to the score."
    end


    test "all_query_methods_work_on_proper_collection" do
      query_methods_to_test = Mongoid::Contextual::Mongo.methods - [:fields, :ignore, :only, :limit, :sort, :order, :reverse, :skip, :offset, :paginate, :per_page, :to_a]

      do_test_query_method(:find, query_methods_to_test) do
        @klass.find(@record.id)
      end

      do_test_query_method(:find_by, query_methods_to_test) do
        @klass.find_by(id: @record.id)
      end

      do_test_query_method(:all, query_methods_to_test) do
        @klass.all
      end

      do_test_query_method(:each, query_methods_to_test) do
        @klass.each
      end

      do_test_query_method(:where, query_methods_to_test) do
        @klass.where
      end

      do_test_query_method(:filter, query_methods_to_test) do
        @klass.filter
      end

      do_test_query_method(:first, query_methods_to_test) do
        @klass.first
      end

      do_test_query_method(:last, query_methods_to_test) do
        @klass.last
      end

      do_test_query_method(:remove, query_methods_to_test) do
        @klass.remove
      end

      do_test_query_method(:count, query_methods_to_test) do
        @klass.count
      end

      do_test_query_method(:size, query_methods_to_test) do
        @klass.size
      end

      do_test_query_method(:empty?, query_methods_to_test) do
        @klass.empty?
      end

      do_test_query_method(:exist?, query_methods_to_test) do
        @klass.exist?
      end

      do_test_query_method(:exists?, query_methods_to_test) do
        @klass.exists?
      end

      do_test_query_method(:find_each, query_methods_to_test) do
        @klass.find_each()
      end

      do_test_query_method(:find_one, query_methods_to_test) do
        @klass.find_one()
      end

      do_test_query_method(:distinct, query_methods_to_test) do
        @klass.distinct(:id)
      end

      assert_empty query_methods_to_test, "there shouldn't be any untested query methods left."
    end


    def do_test_query_method(query_method, query_methods_to_test, &block)
      # the klass should be called with query_method otherwise a typo, copy-paster-bug has occured
      @klass.should_receive(query_method).ordered.and_call_original

      # because our implementation relies on the assumption that all query methods use our setting store_in collection: name
      @klass.should_receive(:collection).at_least(1).times.ordered.and_call_original

      # It's assumed that the collection method from the moped Ruby driver is called after the
      # collection_name method visible to the class. We verify this to reveal changes in Mongoid code that go
      # against the assumptions that the MultiTenancy module makes. The major assumption being that any query method
      # will call collection_name in the beginning.
      @klass.should_receive(:storage_options).at_least(1).times.ordered.and_call_original

      # assert that the collection name is set properly
      score_collection_prefix = @score.name.parameterize.underscore
      exp_collection_name = "#{score_collection_prefix}.#{original_collection_name}"

      block.call

      begin
        RSpec::Mocks.verify # verifying our call expectations are satisfied
      rescue RSpec::Mocks::MockExpectationError
        puts "#{@klass}.#{query_method} didn't satisfy call expectations"
      end

      assert_equal exp_collection_name, @klass.collection.name, "#{query_method} didn't use the proper collection name"

      query_methods_to_test.delete(query_method)
    end


    test "saves_to_proper_collection" do
      skip "NYI"
    end


    test "all db queries within a with_tenant block only act on the proper collection" do
      skip "NYI"
    end


    private


      def set_resource_variables
        @klass = base.class.to_s.match(/^(.*)(Test)$/)[1].constantize
      end


      def original_collection_name
        @klass.name.tableize.gsub(/\//, '.')
        @klass_sym = @klass.to_s.underscore.to_sym

        record = options[:record]
        unless record.present?
          record = FactoryGirl.create(@klass_sym)
        end

        @record = record
      end
  end
end
