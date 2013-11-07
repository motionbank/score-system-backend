class ApiController < ApplicationController
  # GET /api/sets
  def sets
    @sets = CellSet.all
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