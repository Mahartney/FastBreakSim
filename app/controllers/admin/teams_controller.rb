class Admin::TeamsController < AdminController
  def create
    @conference = Conference.find(params[:conference_id])
    @team = @conference.teams.create(name: params[:name])


    if request.xhr?
      render :json => {type: 'teams', data: @team}
    else
      redirect_to :back
    end
  end

  def destroy
    Team.find(params[:id]).destroy!

    @data = {
      leagues: League.all,
      conferences: Conference.all,
      teams: Team.all,
      players: Player.all,
      users: User.all
    }

    if request.xhr?
      render :json => {data: @data}
    else
      redirect_to :back
    end
  end


end
