Rails.application.routes.draw do
  root 'ideas#index'

  resources :ideas

  get 'thumbs_up/:id', to: 'ideas#thumbs_up', as: 'thumbs_up'
end
