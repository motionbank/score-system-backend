module Admins
  class GridCellsController < BaseController

    before_action :set_cell_set
    before_action :set_grid_cell, only: [:edit, :update, :destroy]

    # GET /admins/cell_sets/1/grid_cells
    def index
      @grid_cells = @cell_set.grid_cells
    end

    # GET /admins/cell_sets/1/grid_cells/1/edit
    def edit
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
        render nothing: true
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
        params.require(:grid_cell).permit(:title, :description, :poster_image, :remove_poster_image, :cell_id, :x, :y, :width, :height)
      end
  end
end
