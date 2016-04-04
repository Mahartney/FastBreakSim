class Admin::ConferencesController < AdminController
  def index
    @conferences = Conference.all
  end

  def create
    @league = League.find(params[:league_id])
    @conference = @league.conferences.create(name: params[:name])


    if request.xhr?
      render :json => {type: 'conferences', data: @conference}
    else
      redirect_to :back
    end
  end

  def destroy
    @league = League.find(params[:league_id])
    @conference = Conference.find(params[:id])
    @conference.destroy

    @data = {
      leagues: League.all,
      conferences: Conference.all,
      teams: Team.all,
      players: Player.all
    }
    
    if request.xhr?
      render :json => {data: @data}
    else
      redirect_to :back
    end

  end
end
