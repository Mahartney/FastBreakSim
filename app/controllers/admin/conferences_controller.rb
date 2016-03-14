class Admin::ConferencesController < AdminController
  def index
    @conferences = Conference.all
  end

  def create
    @league = League.find(params[:league_id])
    @conference = @league.conferences.create(name: params[:name])

    if request.xhr?
      render :json => @league.conferences
    else
      redirect_to :back
    end
  end
end
