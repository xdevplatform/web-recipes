// Roland Yonaba - 2012
// Base code (http://aboutcode.net/2010/11/11/list-github-projects-using-javascript.html)
// Fix for compatibility with Github API v3 (http://developer.github.com/v3/)
// Fix getJSOn link request for compatibility with Github API v3 (thanks to MJoyce : http://stackoverflow.com/questions/11850527/use-javascript-to-get-the-list-of-a-users-github-repositories)

jQuery.githubUser = function(username, callback) {
	jQuery.getJSON('https://api.github.com/users/' + username
			+ '/repos?callback=?', callback)
}

jQuery.fn.loadRepositories = function(username) {
	$("#status").html(
			"<span>Querying GitHub for " + username
					+ "'s repositories...</span>");

	var target = this;
	$.githubUser(username, function(data) {
		var repos = data.data; // JSON Parsing
		sortByName(repos);

		var template = $('#template').html();
		Mustache.parse(template); // optional, speeds up future uses

		var list = $('<dl/>');
		target.empty().append(list);
		$(repos).each(
				function() {
					if (this.name != (username.toLowerCase() + '.github.com')) {

						this.size_str = this.size < 1000 ? (this.size + ' kB')
								: Math.round((this.size / 1000) * 100) / 100
										+ ' MB';
						var rendered = Mustache.render(template, {
							repo : this
						});
						list.append(rendered);
					}
				});
	});

	function sortByName(repos) {
		repos.sort(function(a, b) {
			return a.name - b.name;
		});
	}
};