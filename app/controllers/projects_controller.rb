class ProjectsController < ApplicationController

    def create
        user = find_user
        project = user.projects.create!(project_params)
        render json: [project, user], status: :created
    end

    def index
        user = find_user
        projects = Project.where.missing(:follows).where.not(user_id: user.id) + Project.where(follows: Follow.where.not(user_id: user.id)).where.not(user_id: user.id)
        render json: projects, status: :ok
    end

    def destroy
        user = find_user
        project = user.projects.find(params[:id])
        project.destroy
        render json: user, head: :no_content
    end 

    def update
        user = find_user
        project = user.projects.find(params[:id])
        project.update!(project_params)
        render json: [project, user], status: :accepted
    end

    def show
        project = Project.find(params[:id])
        render json: project, status: :ok
    end

    private

    def project_params
        params.permit( :title, :description, :tools_required, :time, :materials, :img_url )
    end

    def render_not_found_response
        render json: { errors: ["Project not found"] }, status: :not_found
    end

   

end
