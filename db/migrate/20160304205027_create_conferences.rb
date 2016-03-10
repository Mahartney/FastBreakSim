class CreateConferences < ActiveRecord::Migration
  def change
    create_table :conferences do |t|
      t.string :name
      t.references :league, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
