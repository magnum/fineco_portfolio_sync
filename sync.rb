require 'rubygems'
require 'mechanize'
require 'nokogiri'
require 'json'

a = Mechanize.new
a.agent.http.verify_mode = OpenSSL::SSL::VERIFY_NONE
a.get('https://fineco.it/') do |page|
  # Submit the login form
  homepage_logged = page.form_with(:action => 'https://finecobank.com/portalelogin') do |f|
    f.LOGIN = ENV['FINECO_USERNAME']
    f.PASSWD = ENV['FINECO_PASSWORD']
  end.click_button

  json = JSON.parse(a.get("https://finecobank.com/portafoglio/i-miei-investimenti/json/portafoglio-elenco-json?sintesi=true").body)
  json[0].each do |t|
    value = t["qty"].to_i * t["avgPriceEur"].to_f
    puts "#{t["titolo"]}, #{t["qty"]} x #{t["avgPriceEur"]} #{value}"
  end
end