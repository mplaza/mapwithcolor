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

  def targetforcountry
    @targetset = params[:target_id]
    @targetcountry = params[:id]
    # @metrics = Fulldataset.find_by_sql(["SELECT * FROM fulldatasets WHERE targetset = ?", @targetset])
    @metrics = Fulldataset.where(:targetset => @targetset).where(:CountryCode => @targetcountry)
    respond_with @metrics
  end

 	# def authenticate_user
  #   	if !current_user
  #     		flash[:danger] = "Please sign up or sign in to access our full API."
  #     		redirect_to new_user_registration_path
  #   	end
  # 	end

  	def checkforsecretkey
      if current_user
  		  @secretkey = Apikey.where(:user_id => current_user.id)
      end
  		@requesturl = request.original_url
  		# puts @requesturl.split("?")[1]
      if @secretkey
        if (@requesturl.split("?")[1] != @secretkey[0].secretkey_digest)
      			flash[:danger] = "Wrong secretkey."
         		respond_with '{"error": "wrong secretkey"}'
        end
      end
      if !@secretkey
        flash[:danger] = "Please sign up or sign in to access our full API."
            respond_with '{"error": "wrong secretkey"}'
      end
  	end



end
