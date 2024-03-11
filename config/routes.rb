Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :shop, only: [:index, :show, :create] do
        resources :products, only: [:index, :show, :create, :update, :destroy]
      end
      resources :products, only: [:show]
    end
  end
end
