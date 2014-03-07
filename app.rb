require 'sinatra'
get'/' do
	erb :index
end
get '/test' do
  html :index
end

__END__