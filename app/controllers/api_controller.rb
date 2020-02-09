class ApiController < ApplicationController

	# disable the CSRF token
	skip_before_action :verify_authenticity_token

	def getProject
		@project = Project.find(1)
		render json: @project, status: '200 OK'
	end

	def postName
		@project = Project.update(1, name: params[:name])
		render json: @project, status: '200 OK'
	end

	def postDate
		@project = Project.update(1, date: params[:date])
		render json: @project, status: '200 OK'
	end

	def getMissions
		@missions = Mission.all
		render json: @missions, status: '200 OK'
	end

	def getLast
		@mission = Mission.last
		render json: @mission, status: '200 OK'
	end

	def postMission
		@mission = Mission.create({
			name: params[:name],
			tags: params[:tags].join(','),
			state: false
		})
		render json: @mission, status: '200 OK'
	end

	def postState
		@mission = Mission.update(params[:id], state: params[:state])
		render json: @mission, status: '200 OK'
	end

	def deleteMission
		@mission = Mission.delete(params[:id])
		render json: @mission, status: '200 OK'
	end

end