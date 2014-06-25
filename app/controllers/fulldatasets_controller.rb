class FulldatasetsController < ApplicationController
	respond_to :json

	def goal1target1ab
		@metrics = Fulldataset.find_by_sql("SELECT * FROM fulldatasets WHERE targetset='1ab'");
		respond_with @metrics
 	end

 	def goal1target1cb
		@metrics = Fulldataset.find_by_sql("SELECT * FROM fulldatasets WHERE targetset='1cb'");
		respond_with @metrics
 	end


end
