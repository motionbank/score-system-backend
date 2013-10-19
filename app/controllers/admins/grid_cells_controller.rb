module Admins
  class GridCellsController < BaseController

    before_action :set_grid_cell, only: [:edit, :update, :destroy]

    # GET /admins/cell_sets/1/grid_cells
    def index
      @grid_cells = GridCell.all
    end

    # GET /admins/cell_sets/1/grid_cells/1/edit
    def edit
    end

    # POST /admins/cell_sets/1/grid_cells
    def create
      @grid_cell = GridCell.new(grid_cell_params)

      if @grid_cell.save
        redirect_to @grid_cell, notice: 'Grid cell was successfully created.'
      else
        render action: 'new'
      end
    end

    # PATCH/PUT /admins/cell_sets/1/grid_cells/1
    def update
      if @grid_cell.update(grid_cell_params)
        redirect_to @grid_cell, notice: 'Grid cell was successfully updated.'
      else
        render action: 'edit'
      end
    end

    # DELETE /admins/cell_sets/1/grid_cells/1
    def destroy
      @grid_cell.destroy
      redirect_to grid_cells_url, notice: 'Grid cell was successfully destroyed.'
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_grid_cell
        @grid_cell = GridCell.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def grid_cell_params
        params.require(:grid_cell).permit(:title, :description, :poster_image)
      end
  end
end
