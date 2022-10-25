require 'faker'

puts "start the seeding"

project_essentials = [
    {title: "Easy Timber Bench", img_url: "https://www.familyhandyman.com/wp-content/uploads/2018/02/FH17JAU_580_54_001.jpg?w=1200"}, 
    {title: "Modern-Style Birdhouse", img_url: "https://www.familyhandyman.com/wp-content/uploads/2018/02/ModernBirdhouse_Features.jpg?w=1200"},
    {title: "Raised Planter", img_url: "https://www.familyhandyman.com/wp-content/uploads/2018/02/FH17APR_577_51_526.jpg?w=1200"},
    {title: "Mixed-Medium Garden Trellis", img_url: "https://www.familyhandyman.com/wp-content/uploads/2017/06/0004_009-1.jpg?w=1000"},
    {title: "Garden Closet", img_url: "https://www.familyhandyman.com/wp-content/uploads/2018/02/FH08MAR_486_50_013.jpg?w=1200"},
    {title: "Patio Garden Pond and Planter", img_url: "https://www.familyhandyman.com/wp-content/uploads/2017/05/FH15APR_PATIOP_01.jpg?w=1000"},
    {title: "Cornhole Boards", img_url: "https://www.familyhandyman.com/wp-content/uploads/2018/01/cornhole-lead.jpg?w=1200"},
    {title: "Pedestal Picnic Table", img_url: "https://www.familyhandyman.com/wp-content/uploads/2017/03/FH99JUN_01643leadfade.jpg?w=1200"},
    {title: "Stripped-Down Window Planter", img_url: "https://www.familyhandyman.com/wp-content/uploads/2017/05/FH09MAR_WINPLA_01.jpg?w=1000"},
    {title: "Planter Trellis Combo", img_url: "https://www.familyhandyman.com/wp-content/uploads/2017/06/fh09apr_497_51_010.jpg?w=1000"}
]



10.times do 
    User.create(
        username: "#{Faker::DcComics.hero.gsub(/\s+/, "").concat(Faker::Number.number(digits: 3).to_s)}",
        password: "password",
        bio: Faker::Restaurant.description,
        img_url: Faker::Fillmurray.image
    )
end

10.times do |index|   
    Project.create(
        title: project_essentials[index][:title],
        tools_required: Faker::Hipster.words(number: 2..4).join(", "),
        description: Faker::Lorem.paragraph(sentence_count: 4),
        materials: Faker::Creature::Bird.order,
        time: Faker::Number.between(from: 1, to: 20),
        img_url: project_essentials[index][:img_url],
        user_id: Faker::Number.between(from: 1, to: 10)
    )
end


# 10.times do
#     Follow.create(
#         follow_type: "todo",
#         project_id: Faker::Number.between(from: 1, to: 8),
#         user_id: Faker::Number.between(from: 1, to: 10)
#     )
# end

# 10.times do
#     Review.create(
#         body: Faker::Lorem.paragraph(sentence_count: 2),
#         rating: Faker::Number.between(from: 1, to: 5),
#         img_url: Faker::Placeholdit.image,
#         project_id: Faker::Number.between(from: 1, to: 8),
#         user_id: Faker::Number.between(from: 1, to: 10)
#     )
# end

puts "finished seeding"