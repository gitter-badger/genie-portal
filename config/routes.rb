Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: 'sessions/sessions',
    # Commented back in
    # sessions: 'devise/registrations',
    # Commented out
    # registrations: 'users/registrations'
  }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api do
    # resources :users, defaults: {format: :json}, only: [:show]
    # resources :users, defaults: {format: :json}, only: [:show, :edit] do
    resources :users, defaults: {format: :json}, only: [:show, :edit] do
      collection do
        patch 'update_info'
      end
    end

    resources :projects, defaults: {format: :json}, only: [:create, :show, :index]
  end
end
