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

      post 'set/new',                     to: 'api#create_set'
      post 'set/:id/update',              to: 'api#update_set'
      put  'set/:id/remove_poster_image', to: 'api#remove_set_poster_image'
    end
  end
end
