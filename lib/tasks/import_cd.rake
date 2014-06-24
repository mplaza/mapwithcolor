namespace :import_cd do
  desc "Import Country Data"
  task :import_raw => :environment do
  	require 'csv'

  	files_to_load = Hash.new
  	files_to_load["lib/assets/goal1target1ab.csv"] = Fulldataset

  	files_to_load.each do |filename, modelName|
      modelName.delete_all
  		lines = File.new(filename).readlines
      filenamearray =  filename.split("/")[2].split(".")[0].split(/l|t/)
      goalnum = filenamearray[1]
      targetnum = filenamearray[3]
  		header = lines.shift.strip
  		keys = header.split(',')
      fixedkeys = ['goal', 'targetset']
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
        newvalues = [goalnum, targetnum]; 
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