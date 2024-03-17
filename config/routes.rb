Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :shops, only: [:index, :show, :create] do
        resources :products, only: [:index, :new, :show, :create, :update, :destroy]
      end
    end
  end
end
