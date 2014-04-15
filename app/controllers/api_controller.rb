class ApiController < ApplicationController
  before_action :allow_cors
  before_action :authenticate_user_from_token!, only: [ :create_cell,
                                                        :update_cell,
                                                        :remove_poster_image
                                                      ]
  #SKIP CSRF protection for JSON POST&PUT
  skip_before_filter :verify_authenticity_token,  only: [ :create_cell,
                                                          :update_cell,
                                                          :remove_poster_image
                                                        ]

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

  # PUT /api/cell/:id/remove_poster_image
  def remove_poster_image
    @cell = Cell.find(params[:id].to_s)
    @cell.remove_poster_image!
    if @cell.save
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

    if attrs[:cell][:poster_image]
      path = attrs[:cell][:image_name] || attrs[:cell][:title].parameterize + ".jpg"
      io = AppSpecificStringIO.new(path, Base64.decode64(attrs[:cell][:poster_image]))
      attrs[:cell][:poster_image] = io
    end

    attrs[:cell].delete :image_name if attrs[:cell][:image_name]

    attrs.require(:cell).permit(:type, :title, :description, :css_class_name, :poster_image, :image_name, additional_fields: all_additional_keys)
  end
end
