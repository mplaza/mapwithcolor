require "bcrypt"

class Apikey < ActiveRecord::Base
	belongs_to :User

  # def secretkey
  #   @secretkey
  # end

  # def secretkey=(new_secretkey)
  #   @secretkey = new_secretkey
  #   self.secretkey_digest = BCrypt::Password.create(new_secretkey)
  # end

  # def authenticate(test_secretkey)
  #   if BCrypt::Password.new(self.secretkey_digest) == test_secretkey
  #     self
  #   else
  #     false
  #   end
  # end






end
