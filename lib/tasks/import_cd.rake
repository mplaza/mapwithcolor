namespace :import_cd do
  desc "Import Country Data"
  task :import_raw => :environment do
  	require 'csv'

  	files_to_load = Hash.new
  	files_to_load["lib/assets/poverty2.csv"] = Goal1target1aa

  	files_to_load.each do |filename, modelName|
      modelName.delete_all
  		lines = File.new(filename).readlines
  		header = lines.shift.strip
  		keys = header.split(',')
      fixedkeys = []
      keys.each do |key|
          if key.to_i > 0
            key = "year" + key
            fixedkeys.push(key)
          else
            fixedkeys.push(key)
          end
        end
        puts fixedkeys

  		lines.each do |line|
  			values = line.strip.split(',')
        newvalues = []; 
        values.each do |value|
          if value == ""
            value = nil
            newvalues.push(value)
          else
            newvalues.push(value)
          end
        end  
  			attributes = Hash[fixedkeys.zip newvalues]
  			modelName.create(attributes)
  		end


  	end


  end


end