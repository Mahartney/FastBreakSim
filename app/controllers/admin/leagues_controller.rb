class Admin::LeaguesController < AdminController
  before_action :admin_user

  def index
    @leagues = League.paginate(page: params[:page])
    @conferences =Conference.all
    if params[:search]
      @leagues = League.search(params[:search]).order("created_at DESC")
    else
      @Leagues = League.all.order('created_at DESC')
    end
  end

  def create
    @league = League.new(name: params[:name])
    @league.save()

    if request.xhr?
      render :json => {type: 'leagues', data: @league }
    else
      redirect_to :back
    end
  end

  def destroy
    League.find(params[:id]).destroy!

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
