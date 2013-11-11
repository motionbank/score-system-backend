module Admins
  class CellsController < BaseController

    before_action :set_cell, only: [:new , :edit, :update, :destroy]
    before_action :build_additional_field, only: [:new, :edit]

    # GET /cells
    def index
      @cells = Cell.order_by(title: 1).paginate(page: params[:page], per_page: PER_PAGE)
    end

    # GET /cells/new
    def new
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

    # This is done to assert that at least one additional field (key-value pair) is in the form
    def build_additional_field
      @cell.additional_fields[""] = ""
    end


    def set_cell
      @cell = action_name == "new" ? Cell.new : Cell.find(params[:id])
    end


    # Only allow a trusted parameter "white list" through.
    def cell_params
      attrs = params.dup

      attrs[:cell][:additional_fields] ||= {}

      # pre-process additional_fields to be a standard hash, instead of an array containing {key: KEY, value: VALUE} hashes
      attrs[:cell][:additional_fields] = attrs[:cell][:additional_fields].inject({}) do |result, element|
        result[element[:key]] = element[:value] if element[:key].present? && element[:value].present?
        result
      end

      # ActionController::StrongParameters#permit requires to specify all keys when permitting a hash field
      all_additional_keys = attrs[:cell][:additional_fields].keys

      attrs.require(:cell).permit(:type, :title, :description, :poster_image, :remove_poster_image, additional_fields: all_additional_keys)
    end
  end
end
