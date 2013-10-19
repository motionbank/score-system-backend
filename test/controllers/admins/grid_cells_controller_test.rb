require 'test_helper'

module Admins
  class GridCellsControllerTest < ActionController::TestCase
    setup do
      @grid_cell = FactoryGirl.create(:grid_cell)
    end

    test "should get index" do
      get :index
      assert_response :success
      assert_not_nil assigns(:grid_cells)
    end

    test "should create grid_cell" do
      assert_difference('Admins::GridCell.count') do
        post :create, grid_cell: {description: @grid_cell.description, poster_image: @grid_cell.poster_image, title: @grid_cell.title}
      end

      assert_redirected_to grid_cell_path(assigns(:grid_cell))
    end

    test "should get edit" do
      get :edit, id: @grid_cell
      assert_response :success
    end

    test "should update grid_cell" do
      patch :update, id: @grid_cell, grid_cell: {description: @grid_cell.description, poster_image: @grid_cell.poster_image, title: @grid_cell.title}
      assert_redirected_to grid_cell_path(assigns(:grid_cell))
    end

    test "should destroy grid_cell" do
      assert_difference('Admins::GridCell.count', -1) do
        delete :destroy, id: @grid_cell
      end

      assert_redirected_to grid_cells_path
    end
  end
end

