require "rake"

desc "Build the application files"
task :build do
  system "cd public/js && sprocketize application.sprockets.js > application.js && cd ../.."
end