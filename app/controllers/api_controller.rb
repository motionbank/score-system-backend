class ApiController < ApplicationController
  before_filter :allow_cors

  # GET /api/sets
  def sets
    @sets = CellSet.published
  end

  # GET /api/sets/:id
  def set
    @set = CellSet.find(params[:id].to_s)
  end

  # GET /api/cells
  def cells
    @cells = Cell.all
  end

  # GET /api/cells/:id
  def cell
    @cell = Cell.find(params[:id].to_s)
  end
end
