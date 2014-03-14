MotionBank::Application.routes.draw do
  devise_for :users
  root 'admins/cells#index'

  scope ':score_id' do
    root to: 'admins/cells#index', as: :score_root

    scope module: 'admins' do
      root 'cells#index', as: :admins_root
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

      post 'cell/new', to: 'api#create_cell'
      post 'cell/:id/update', to: 'api#update_cell'
      put 'cell/:id/remove_poster_image', to: 'api#remove_poster_image'
    end
  end

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
