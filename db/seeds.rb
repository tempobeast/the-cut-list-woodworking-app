require 'faker'

puts "start the seeding"

10.times do 
    User.create(
        username: "#{Faker::DcComics.hero.gsub(/\s+/, "").concat(Faker::Number.number(digits: 3).to_s)}",
        password_digest: "password",
        bio: Faker::Restaurant.description,
        img_url: Faker::Fillmurray.image
    )
end

10.times do    
    Project.create(
        title: "#{Faker::House.room}" + " " + "#{Faker::House.furniture}",
        tools_required: Faker::Hipster.words(number: 2..4).join(", "),
        tools_recommended: Faker::Hipster.words(number: 4..8).join(", "),
        materials: Faker::Creature::Bird.order,
        time: Faker::Number.between(from: 1, to: 20),
        instructions: Faker::Lorem.paragraph(sentence_count: 2),
        img_url: Faker::Placeholdit.image
    )
end

10.times do
    Review.create(
        body: Faker::Lorem.paragraph(sentence_count: 2),
        rating: Faker::Number.between(from: 1, to: 5),
        img_url: Faker::Placeholdit.image,
        project_id: Faker::Number.between(from: 1, to: 8),
        user_id: Faker::Number.between(from: 1, to: 10)
    )
end

puts "finished seeding"