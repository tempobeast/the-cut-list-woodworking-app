class ProjectsController < ApplicationController

    def create
        user = find_user
        project = user.projects.create!(project_params)
        render json: project, status: :created
    end

    def index
        projects = Project.all
        render json: projects, status: :ok
    end

    def destroy
        user = find_user
        project = user.projects.find(params[:id])
        project.destroy
        render json: project, head: :no_content
    end 

    def update
        user = find_user
        project = user.projects.find(params[:id])
        project.update!(project_params)
        render json: project, status: :accepted
    end

    def show
        project = Project.find(params[:id])
        render json: project, status: :ok
    end

    private

    def project_params
        params.permit( :title, :description, :tools_required, :time, :materials, :instructions, :img_url )
    end

    def render_not_found_response
        render json: { errors: ["Project not found"] }, status: :not_found
    end

    def find_user
        User.find_by(id: session[:user_id])
    end

end
