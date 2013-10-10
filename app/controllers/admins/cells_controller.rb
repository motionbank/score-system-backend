module Admins
  class CellsController < BaseController
    include Concerns::ResourceControllerAccessors

    before_action :set_cell, only: [:show, :edit, :update, :destroy]

    # GET /cells
    def index
      @cells = Cell.all.paginate(page: params[:page], per_page: PER_PAGE)
    end

    # GET /cells/1
    def show
    end

    # GET /cells/new
    def new
      @cell = Cell.new
    end

    # GET /cells/1/edit
    def edit
    end

    # POST /cells
    def create
      @cell = Cell.new(cell_params)

      if @cell.save
        redirect_to edit_cell_path(@cell), notice: 'Cell was successfully created.'
      else
        render action: 'new'
      end
    end

    # PATCH/PUT /cells/1
    def update
      if @cell.update(cell_params)
        redirect_to edit_cell_path(@cell), notice: 'Cell was successfully updated.'
      else
        render action: 'edit'
      end
    end

    # DELETE /cells/1
    def destroy
      @cell.destroy
      redirect_to cells_url, notice: 'Cell was successfully destroyed.'
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_cell
      @cell = Cell.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def cell_params
      params.require(:cell).permit(:kind, :title, :description)
    end
  end
end
