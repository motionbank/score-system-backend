class ApiController < ApplicationController
  before_filter :allow_cors
  respond_to :json

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

  # POST /api/cell/new
  def create_cell
    @cell = Cell.new(cell_params)

    if @cell.save
      render json: @cell, status: 201
    else
      render json: { errors: @cell.errors }, status: 422
    end
  end

  # POST /api/cell/:id/update
  def update_cell
    @cell = Cell.find(params[:id].to_s)
    if @cell.update(cell_params)
      render json: 'Cell was successfully updated.'
    else
      render json: { errors: @cell.errors }, status: 422
    end
  end


  private

  # Only allow a trusted parameter "white list" through.
  def cell_params
    attrs = params.dup

    attrs[:cell][:additional_fields] ||= {}

    # ActionController::StrongParameters#permit requires to specify all keys when permitting a hash field
    all_additional_keys = attrs[:cell][:additional_fields].keys

    # If the additional_fields param wasn't nil, but an empty hash, then we want to clear the additional_fields
    # We have to test using 'params' because the value from 'attrs' was overwritten.
    # Set the keys array to one nil value allows the hash to be cleared
    all_additional_keys = [nil] if params[:cell][:additional_fields] == {}

    attrs.require(:cell).permit(:type, :title, :description, :css_class_name, additional_fields: all_additional_keys)
  end
end
