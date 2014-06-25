class FulldatasetsController < ApplicationController
	respond_to :json

	def index
		@metrics = Fulldataset.all
		respond_with @metrics
 	end

	def goal1target1ab
		@metrics = Fulldataset.find_by_sql("SELECT * FROM fulldatasets WHERE targetset='1ab'")
		respond_with @metrics
 	end

 	def goal1target1cb
		@metrics = Fulldataset.find_by_sql("SELECT * FROM fulldatasets WHERE targetset='1cb'")
		respond_with @metrics
 	end

 	def show
 		@targetset = params[:id]
		# @metrics = Fulldataset.find_by_sql(["SELECT * FROM fulldatasets WHERE targetset = ?", @targetset])
		@metrics = Fulldataset.where(:targetset => @targetset)
		respond_with @metrics
 	end

end
