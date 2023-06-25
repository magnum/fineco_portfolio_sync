require 'rubygems'
require 'puppeteer-ruby'
require 'json'
require 'pry'

Puppeteer.launch(headless: true) do |browser|
  page = browser.new_page
  page.goto("https://it.finecobank.com/login/")
  #page.screenshot(path: "YusukeIwaki.png")
  page.query_selector("input[name=LOGIN]").type_text(ENV["FINECO_USERNAME"])
  page.query_selector("input[name=PASSWD]").type_text(ENV["FINECO_PASSWORD"])
  cookies_btn = page.wait_for_selector("#onetrust-accept-btn-handler")
  cookies_btn.click
  page.wait_for_timeout(1000)
  page.query_selector("[type=submit]").click
  value1_selector = "#main-widget .col-8 .PUC-title-row .text-right.col-6 h3.graph-detail-title"
  page.wait_for_selector(value1_selector)
  #value1 = page.eval_on_selector(value1_selector, "el => el.innerText").to_f
  json = page.goto("https://finecobank.com/portafoglio/i-miei-investimenti/json/portafoglio-elenco-json?sintesi=true").text
  data = JSON.parse(json)
  value1 = data.first.reduce(0){|sum, item| sum += item["marketValueSintesiEur"].to_f}
  puts value1
end

