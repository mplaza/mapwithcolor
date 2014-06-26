class FulldatasetsController < ApplicationController
	respond_to :json

	def index
		@metrics = Fulldataset.all
		respond_with @metrics
 	end

 	def show
 		@targetset = params[:id]
		@metrics = Fulldataset.find_by_sql(["SELECT * FROM fulldatasets WHERE targetset = ?", @targetset])
		# @metrics = Fulldataset.where(:targetset => @targetset)
		respond_with @metrics
 	end

 	def country
 		@targetcountry = params[:id]
		# @metrics = Fulldataset.find_by_sql(["SELECT * FROM fulldatasets WHERE targetset = ?", @targetset])
		@metrics = Fulldataset.where(:CountryCode => @targetcountry)
		respond_with @metrics
 	end


end
