# Preview all emails at http://localhost:3000/rails/mailers/welocome_mailer
class WelocomeMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/welocome_mailer/welcome_message
  def welcome_message
    WelocomeMailer.welcome_message
  end

end
