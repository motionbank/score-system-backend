module Admins
  class GridCellsController < BaseController

    before_action :set_cell_set
    before_action :set_grid_cell, only: [:get, :edit, :update, :destroy]

    # GET /admins/cell_sets/1/grid_cells
    def index
      @grid_cells = @cell_set.grid_cells
    end

    # GET /admins/cell_sets/1/grid_cells/1/edit
    def edit
    end

    # GET /admins/cell_sets/1/grid_cells/1
    def get
      render json: @grid_cell, status: 201
    end

    # POST /admins/cell_sets/1/grid_cells
    def create
      @grid_cell = @cell_set.grid_cells.build(grid_cell_params)
      if @grid_cell.save
        render @grid_cell, notice: 'Grid cell was successfully created.'
      else
        render json: {errors: @grid_cell.errors.full_messages}, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /admins/cell_sets/1/grid_cells/1
    def update
      if @grid_cell.update(grid_cell_params)
        render @grid_cell, notice: 'Grid cell was successfully updated.'
      else
        render json: {errors: @grid_cell.errors.full_messages}, status: :unprocessable_entity
      end
    end

    # DELETE /admins/cell_sets/1/grid_cells/1
    def destroy
      @grid_cell.destroy
      render nothing: true, notice: 'Grid cell was successfully destroyed.'
    end

    private

      def set_cell_set
        @cell_set = CellSet.find(params[:cell_set_id])
      end


      def set_grid_cell
        @grid_cell = @cell_set.grid_cells.find(params[:id])
      end


      # Only allow a trusted parameter "white list" through.
      def grid_cell_params
        attrs = params.dup

        attrs[:grid_cell][:additional_fields] ||= {}

        # pre-process additional_fields to be a standard hash, instead of an array containing {key: KEY, value: VALUE} hashes
        attrs[:grid_cell][:additional_fields] = attrs[:grid_cell][:additional_fields].inject({}) do |result, element|
          result[element[:key]] = element[:value] if element[:key].present? && element[:value].present?
          result
        end

        # ActionController::StrongParameters#permit requires to specify all keys when permitting a hash field
        all_additional_keys = attrs[:grid_cell][:additional_fields].keys

        # If the additional_fields param wasn't nil, but an empty hash, then we want to clear the additional_fields
        # We have to test using 'params' because the value from 'attrs' was overwritten.
        # Set the keys array to one nil value allows the hash to be cleared
        all_additional_keys = [nil] if params[:grid_cell][:additional_fields] == {}


        attrs.require(:grid_cell).permit(:title, :description, :poster_image, :remove_poster_image, :cell_id, :x, :y, :width, :height, additional_fields: all_additional_keys)
      end
  end
end
