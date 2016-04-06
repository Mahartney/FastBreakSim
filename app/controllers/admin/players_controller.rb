class Admin::PlayersController < AdminController
  def create
    @team = Team.find(params[:team_id])
    @player = @team.players.create(
      first_name: params[:first_name],
      last_name: params[:last_name],
      position: params[:position])


    if request.xhr?
      render :json => {type: 'players', data: @player}
    else
      redirect_to :back
    end
  end
end
