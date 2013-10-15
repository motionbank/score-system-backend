module Admins
  class CellSetsController < BaseController

    before_action :set_cellset, only: [:edit, :update, :destroy]

    # GET /cell_sets
    def index
      @cell_sets = CellSet.all
    end


    # GET /sets/new
    def new
      @cell_set = CellSet.new
    end


    # GET /sets/1/edit
    def edit
    end


    # POST /sets
    def create
      @cell_set = CellSet.new(cellset_params)

      if @cell_set.save
        redirect_to edit_cell_set_url(@set), notice: 'Set was successfully created.'
      else
        render action: 'new'
      end
    end


    # PATCH/PUT /sets/1
    def update
      if @cell_set.update(cellset_params)
        redirect_to edit_cell_set_url(@set), notice: 'Set was successfully updated.'
      else
        render action: 'edit'
      end
    end


    # DELETE /sets/1
    def destroy
      @cell_set.destroy
      redirect_to cell_sets_url, notice: 'Set was successfully destroyed.'
    end


    private


    def set_cellset
      @cell_set = CellSet.find(params[:id])
    end


    # Only allow a trusted parameter "white list" through.
    def cellset_params
      params.require(:cell_set).permit(:title, :description, :poster, :image, :path, :width, :height)
    end
  end
end
