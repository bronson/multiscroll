Gem::Specification.new do |s|
  s.name        = "multiscroll"
  s.version     = 0.1
  s.authors     = ["Scott Bronson"]
  s.email       = ["bronsmultiscrollspec@rinspin.com"]
  s.homepage    = "http://github.com/bronson/multiscroll"
  s.summary     = "Adds multiscroll.js to your Rails app"
  s.description = "Installs multiscroll.js and dependencies into your Rails application's asset pipeline."
  s.required_rubygems_version = ">= 1.3.6"
  s.files       = ['README.md', 'vendor/assets/multiscroll.js', 'vendor/assets/jquery.mousewheel.js', 'lib/multiscroll.rb', 'lib/multiscroll/engine.rb']
end
