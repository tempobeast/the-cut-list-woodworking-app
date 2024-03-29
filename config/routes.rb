Rails.application.routes.draw do
  resources :project_tools
  resources :tools
  resources :instruction_steps, :except => [:destroy]
  # resources :follows
  # resources :reviews

  resources :projects
  resources :users, :except => [:create]
  resources :follows, :only => [:destroy, :create]
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
