Rails.application.routes.draw do
  root 'web#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'get/project' => 'api#getProject'
  post 'post/name' => 'api#postName'
  post 'post/date' => 'api#postDate'

  get 'get/missions' => 'api#getMissions'
  get 'get/last' => 'api#getLast'
  post 'post/mission' => 'api#postMission'
  post 'post/state' => 'api#postState'
  delete 'delete/mission' => 'api#deleteMission'
end
