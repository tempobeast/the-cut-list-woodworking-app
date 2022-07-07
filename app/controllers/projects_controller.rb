class ProjectsController < ApplicationController

    before_action :authorize

    def create
        user = User.find_by(id: session[:user_id])
        project = user.projects.create!(project_params)
        render json: project, status: :created
    end

    def index
        projects = Project.all
        render json: projects, status: :ok
    end

    # def show
    #     user = User.find_by(id: session[:user_id])
    #     if user
    #         render json: user
    # end

    private

    def project_params
        params.permit( :title, :tools_recommended, :tools_required, :time, :materials, :instructions, :img_url )
    end

end
