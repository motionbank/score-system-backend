require 'test_helper'

module Admins
  class CellSetsControllerTest < ActionController::TestCase
    setup do
      @cell_set = FactoryGirl.create(:cell_set)
      sign_in :user, FactoryGirl.create(:user)
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:cell_sets)
    end

    test "should get new" do
      get :new
      assert_response :success
    end

    test "should create cell_set" do
      assert_difference('CellSet.count') do
        post :create, cell_set: {description: @cell_set.description, height: @cell_set.height, path: @cell_set.path, poster_image: @cell_set.poster_image, title: @cell_set.title, width: @cell_set.width}
      end

      assert_redirected_to edit_cell_set_path(assigns(:cell_set))
    end

    test "should show cell_set" do
      get :show, id: @cell_set
      assert_response :success
    end

    test "should get edit" do
      get :edit, id: @cell_set
      assert_response :success
    end

    test "should update cell_set" do
      patch :update, id: @cell_set, cell_set: {description: @cell_set.description, height: @cell_set.height, path: @cell_set.path, poster_image: @cell_set.poster_image, title: @cell_set.title, width: @cell_set.width}
      assert_redirected_to edit_cell_set_path(assigns(:cell_set))
    end

    test "should destroy cell_set" do
      assert_difference('CellSet.count', -1) do
        delete :destroy, id: @cell_set
      end

      assert_redirected_to cell_sets_path
    end
  end
end
