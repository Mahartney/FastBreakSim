class Admin::LeaguesController < AdminController
  before_action :admin_user

  def index
    @leagues = League.paginate(page: params[:page])
    if params[:search]
      @leagues = League.search(params[:search]).order("created_at DESC")
    else
      @Leagues = League.all.order('created_at DESC')
    end
  end

  def create
    @league = League.create(name: params[:name])
    redirect_to admin_index_path
  end

  def destroy
    League.find(params[:id]).destroy
    flash[:success] = "Team Deleted"
    redirect_to admin_index_path
  end


end
