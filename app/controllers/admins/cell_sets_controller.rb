module Admins
  class CellSetsController < BaseController

    before_action :set_cellset, only: [:edit, :update, :destroy]
    before_action :extend_js_framework_settings, only: [:edit, :update]

    # GET /cell_sets
    def index
      @cell_sets = CellSet.order_by(title: 1).paginate(page: params[:page], per_page: PER_PAGE)
    end


    # GET /sets/new
    def new
      @cell_set = CellSet.new
    end


    # GET /sets/1/edit
    def edit
      @available_cells = Cell.order_by(title: 1) # cells available to be dragged to the set
    end


    # POST /sets
    def create
      @cell_set = CellSet.new(cellset_params)

      if @cell_set.save
        redirect_to edit_cell_set_url(@cell_set), notice: 'Set was successfully created.'
      else
        render action: 'new'
      end
    end


    # PATCH/PUT /sets/1
    def update
      if @cell_set.update(cellset_params)
        redirect_to edit_cell_set_url(@cell_set), notice: 'Set was successfully updated.'
      else
        render action: 'edit'
      end
    end


    # DELETE /sets/1
    def destroy
      @cell_set.destroy
      redirect_to cell_sets_url, notice: 'Set was successfully destroyed.'
    end


    def extend_js_framework_settings
      @js_framework_settings.merge!({
        score_id: MultiTenancy.current_score.to_param, # will be needed by the grid editor to pass it to named routes
        resource_id: @cell_set.id.to_s, # will be needed by the grid editor to pass it to named routes
        rows: @cell_set.rows,
        columns: @cell_set.columns
      })
    end


    private


    def set_cellset
      @cell_set = CellSet.find(params[:id])
    end


    # Only allow a trusted parameter "white list" through.
    def cellset_params
      params.require(:cell_set).permit(:title, :description, :poster_image, :path, :width, :height, :remove_poster_image)
    end
  end
end
