class DatasetsController < ApplicationController
	respond_to :json

	def povertyindicatorone
		@metrics = Goal1target1aa.all
		respond_with @metrics
 	end




end
