require 'test_helper'

module Admins
  class CellsControllerTest < ActionController::TestCase
    setup do
      @cell = FactoryGirl.create(:cell)
      sign_in :user, FactoryGirl.create(:user)
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:cells)
    end

    test "should get new" do
      get :new
      assert_response :success
    end

    test "should create cell" do
      assert_difference('Cell.count') do
        post :create, cell: {description: @cell.description, kind: @cell.kind, title: @cell.title}
      end

      assert_redirected_to edit_cell_path(assigns(:cell))
    end

    test "should get edit" do
      get :edit, id: @cell
      assert_response :success
    end

    test "should update cell" do
      patch :update, id: @cell, cell: {description: @cell.description, kind: @cell.kind, title: @cell.title}
      assert_redirected_to edit_cell_path(assigns(:cell))
    end

    test "should destroy cell" do
      assert_difference('Cell.count', -1) do
        delete :destroy, id: @cell
      end

      assert_redirected_to cells_path
    end
  end
end
