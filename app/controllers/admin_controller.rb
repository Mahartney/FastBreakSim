class AdminController < ApplicationController
  before_action :admin_user

  def index
    @league = League.new
    @leagues = League.all
  end

  private
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
