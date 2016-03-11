class Admin::ConferencesController < AdminController
  def index
    @conferences = Conference.all
  end

  def create
    @league = League.find(params[:league_id])
    @conference = @league.conferences.create(name: params[:name])
    redirect_to :back
  end
end
