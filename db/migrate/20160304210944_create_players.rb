class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.references :team, index: true, foreign_key: true
      #biographical
      t.string :first_name
      t.string :last_name
      t.string :position
      t.integer :age
      t.string :hometown
      #physical
      t.integer :height
      t.integer :weight
      t.integer :wingspan
      t.integer :strength
      t.integer :jumping
      t.integer :agility
      t.integer :speed
      t.integer :endurance
      #offensive
      t.integer :passing
      t.integer :catch_and_shoot
      t.integer :isolation
      t.integer :offensive_off_ball_movement
      t.integer :perception
      #defensive
      t.integer :man_to_man
      t.integer :zone
      t.integer :help_defense
      t.integer :defensive_off_ball_movement
      t.integer :anticipation


      t.timestamps null: false
    end
  end
end
