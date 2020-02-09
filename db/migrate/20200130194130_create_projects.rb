class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.timestamp :date

      t.timestamps
    end
  end
end
