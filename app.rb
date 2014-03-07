require 'sinatra'
get'/' do
	erb :index
end
get '/test' do
  erb :test
end

__END__