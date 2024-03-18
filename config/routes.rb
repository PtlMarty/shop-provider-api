Rails.application.routes.draw do
  resources :users
  post '/login', to: "sessions#create"
  get '/auto_login', to: "sessions#auto_login"
  namespace :api do
    namespace :v1 do
      resources :shops, only: [:index, :show, :create] do
        resources :products, only: [:index, :new, :show, :create, :update, :destroy]
      end
    end
  end
end
