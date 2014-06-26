class FulldatasetsController < ApplicationController
	respond_to :json
    before_action :checkforsecretkey, :only => [:index, :country]


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

 	# def authenticate_user
  #   	if !current_user
  #     		flash[:danger] = "Please sign up or sign in to access our full API."
  #     		redirect_to new_user_registration_path
  #   	end
  # 	end

  	def checkforsecretkey
  		@secretkey = Apikey.where(:user_id => 1)
  		@requesturl = request.original_url
  		# puts @requesturl.split("?")[1]
  		if @requesturl.split("?")[1] != @secretkey[0].secretkey_digest
  			flash[:danger] = "Please sign up or sign in to access our full API."
     		redirect_to new_user_registration_path
  		end
  	end



end
