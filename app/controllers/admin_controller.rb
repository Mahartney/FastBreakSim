class AdminController < ApplicationController
  before_action :admin_user

  def index
    @data = {
      leagues: League.all,
      conferences: Conference.all,
      teams: Team.all,
      players: Player.all,
      users: User.all
    }
  end

  private
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
