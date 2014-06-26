class ChangeColumnNameofApiKey < ActiveRecord::Migration
  def change
  	rename_column :apikeys, :secretkey, :secretkey_digest
  end
end
