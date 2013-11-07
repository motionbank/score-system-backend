require 'test_helper'

class ApiControllerTest < ActionController::TestCase
  setup do
    @score = FactoryGirl.create(:score)
    MultiTenancy.current_score = @score
    @set = FactoryGirl.create(:cell_set)
    @cell = FactoryGirl.create(:cell)
  end

  test "should get sets index" do
    get :sets, score_id: @score, format: :json
    assert_response :success
    assert_not_nil assigns(:sets)
  end

  test "should get set show" do
    get :set, id: @set, score_id: @score, format: :json
    assert_response :success
    assert_not_nil assigns(:set)
  end

  test "should get cells index" do
    get :cells, score_id: @score, format: :json
    assert_response :success
    assert_not_nil assigns(:cells)
  end

  test "should get cell show" do
    get :cell, id: @cell, score_id: @score, format: :json
    assert_response :success
    assert_not_nil assigns(:cell)
  end

end
