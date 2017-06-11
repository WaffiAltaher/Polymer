module.exports = function(grunt) {

grunt.initConfig({
  exec: {
    remove_logs: {
      command: 'rm -f *.log',
      stdout: false,
      stderr: false
    },
    list_files: {
      cmd: 'ls -l **'
    },
    list_all_files: 'ls -la',
    echo_grunt_version: {
      cmd: function() { return 'echo ' + this.version; }
    },
    prepare_aws: {
	   cmd: 'tar -czf ../polymerdemo.tar.gz . --exclude=node_modules'	
	},
	send_aws: {
	   cmd: 'scp ../polymerdemo.tar.gz ubuntu@www.waffi.nl:/tmp'
	},
	deploy_aws : 'ssh ubuntu@www.waffi.nl "tar -xzf /tmp/polymerdemo.tar.gz --directory=/opt/website/ --no-overwrite-dir"',
    echo_name: {
      cmd: function(firstName, lastName) {
        var formattedName = [
          lastName.toUpperCase(),
          firstName.toUpperCase()
        ].join(', ');
 
        return 'echo ' + formattedName;
      }
    }
  }
});

grunt.loadNpmTasks('grunt-exec');

// Default task(s).
grunt.registerTask('default', ['exec:prepare_aws','exec:send_aws','exec:deploy_aws']);

};
