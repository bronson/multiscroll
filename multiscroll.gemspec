Gem::Specification.new do |s|
  s.name        = "multiscroll"
  s.version     = "0.0.3"
  s.authors     = ["Scott Bronson"]
  s.email       = ["bronsmultiscrollspec@rinspin.com"]
  s.homepage    = "http://github.com/bronson/multiscroll"
  s.summary     = "Adds multiscroll.js to your Rails app"
  s.description = "Installs multiscroll.js and dependencies into your Rails application's asset pipeline."

  #s.files       = ["README.md", "vendor/assets/multiscroll.js", "vendor/assets/jquery.mousewheel.js", "lib/multiscroll.rb", "lib/multiscroll/engine.rb"]
  #s.require_paths = ["lib"]

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

end
