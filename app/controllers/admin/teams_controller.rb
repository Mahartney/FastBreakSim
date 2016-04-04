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
end
