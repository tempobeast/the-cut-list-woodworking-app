class ToolsController < ApplicationController

    def create
        user = find_user
        tool = Tool.create!(tool_params)
        render json: tool, status: :created
    end

    def index
        tools = Tool.all
        render json: tools, status: :ok
    end

    private

    def tool_params
        params.permit( :name, :image )
    end
end
