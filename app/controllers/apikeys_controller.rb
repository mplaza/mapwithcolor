class ApikeysController < ApplicationController


	def new
		@user = current_user
		@apikey = Apikey.new
	end

	def create
		@user = current_user
		@apikey = Apikey.new(apikey_params)
		if @apikey.save
			redirect_to apikey_path(@apikey)
		else 
			render 'new'
		end
	end

	def show
		@secretkey = Apikey.where(:user_id => current_user.id)	   
	end

	def apidocs	
		@apikey = Apikey.new
		@user = current_user
		if current_user
			@secretkey = Apikey.where(:user_id => current_user.id)
		end
	end

	def apikey_params
		params.require(:apikey).permit(:user_id, :secretkey_digest)
	end


end
