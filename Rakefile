require "rake"

desc "Build the application files"
task :build do
  system "cd public/js && sprocketize application.sprockets.js > application.js.tmp && yui-compressor application.js.tmp > application.js && rm -f application.js.tmp && cd ../.."
end