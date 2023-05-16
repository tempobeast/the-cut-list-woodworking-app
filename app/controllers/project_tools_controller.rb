class ProjectToolsController < ApplicationController

    def create
        user = find_user
        project_tool = ProjectTool.create!(project_tool_params)
        render json: project_tool
    end


    private

    def project_tool_params
        params.permit(:project_id, :tool_id)
    end
end
