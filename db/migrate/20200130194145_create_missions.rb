class CreateMissions < ActiveRecord::Migration[6.0]
  def change
    create_table :missions do |t|
      t.string :name
      t.string :tags
      t.boolean :state

      t.timestamps
    end
  end
end
