# encoding: utf-8

require 'test_helper'
require 'functional/default_url_options'

class ApplicationControllerTest < ActionController::TestCase
  include DefaultUrlOptions

  # default_url_options hash gets injected to the params because of DefaultUrlOptions lib
  def self.default_url_options
    {app_id: MultiTenancy.current_tenant.id}
  end


  setup do
    return if skip_tests

    @admin = FactoryGirl.create(:user)
    sign_in :user, @admin

    @dummy_app = FactoryGirl.create(:app, name: "dummy app")

    # this is done in order for the factories to work, otherwise the models can't be created because the
    # MultiTenancy lib will throw
    MultiTenancy.current_tenant = @dummy_app

    assign_controller_and_model
  end


  teardown do
    return if skip_tests

    sign_out :user
    @admin.destroy if @admin
  end


  def setup_base(test_request = {})
    @test_request = {
      action: :index,
      params: {}
    }.merge(test_request)
  end


  test "should set current tenant" do
    return if skip_tests
    assert @test_request.present?, "call setup_base first"

    get @test_request[:action], @test_request[:params]
    assert_equal MultiTenancy.current_tenant, @dummy_app
  end


  # this class is no real testcase, so don't do tests for it
  def skip_tests
    @skip_base_tests ||= false
    return ((self.class == ApplicationControllerTest) || @skip_base_tests)
  end
end
