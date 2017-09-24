MotionBank::Application.routes.draw do
  devise_for :users
  root 'admins/cell_sets#index'

  scope ':score_id' do
    root to: 'admins/cell_sets#index', as: :score_root

    scope module: 'admins' do
      root 'cell_sets#index', as: :admins_root
      resources :cells, except: :show
      resources :cell_sets, except: :show do
        resources :grid_cells, except: [:show, :new]
      end
    end

    scope :api do
      ["sets", "cells"].each do |model|
        get "#{model}" => "api##{model}", as: "#{model}_api"
        get "#{model}/:id" => "api##{model.singularize}", as: "#{model.singularize}_api"
      end

      post 'cell/new',                    to: 'api#create_cell'
      post 'cell/:id/update',             to: 'api#update_cell'
      put  'cell/:id/remove_poster_image',to: 'api#remove_poster_image'
      delete 'cell/:id/delete',           to: 'api#destroy_cell'

      post 'set/new',                     to: 'api#create_set'
      post 'set/:id/update',              to: 'api#update_set'
      put  'set/:id/remove_poster_image', to: 'api#remove_set_poster_image'
      delete 'set/:id/delete',            to: 'api#destroy_set'

      get 'set/:cell_set_id/cells',              to: 'api#grid_cells_index'

      post 'set/:cell_set_id/cell/new',          to: 'api#grid_cells_create'
      get 'set/:cell_set_id/cell/:id',           to: 'api#grid_cells_get'
      post 'set/:cell_set_id/cell/:id/update',   to: 'api#grid_cells_update'
      delete 'set/:cell_set_id/cell/:id/delete', to: 'api#grid_cells_destroy'
    end
  end
end
