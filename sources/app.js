
var app = new Vue({

    el: '.app',
    data () {
        return {
            users: [],
            name: null,
            new_id: null,
            to_deleted: [],
            deleted: false,
            count_deleted: 0
        }
    },

    methods: {
        loadUsers() {
            axios
                .get('https://jsonplaceholder.typicode.com/users/')
                .then(response => {
                    listOfUsers = [];
                    response.data.forEach((user) => {
                    	if(user.email.endsWith('.biz')) {
                       		listOfUsers.push(user);
                    	}
                        
                    });
                    this.users = listOfUsers;
                })
                .catch(error => {
                    console.log(error)
                })
        },

        register: async function (event) {
           try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/users/', {name: this.name});

                console.log(response.data);
                if(response.status == 201) {
                	this.new_id = response.data.id;
                }
            } catch(err) {
                console.log(err);
            }
        },

        loadUsersFromNorth() {
        	const ids = [];
        	axios
                .get('https://jsonplaceholder.typicode.com/users/')
                .then(response => {
                    listOfUsers = [];
                    response.data.forEach((user) => {
                    	if(user.address.geo.lat > 0) {
                       		ids.push(user.id);
                    	}
                    });
                    this.to_deleted = ids;
                })
                .catch(error => {
                    console.log(error)
                })
        },

        deleteFromNorth: async function (event) {
        	try {

        		var ok = 0;
        		for(var index in this.to_deleted) {
					const response = await axios.delete('https://jsonplaceholder.typicode.com/users/' + this.to_deleted[index]);
        			if(response.status = 200) {
        				ok++;
        			}
        		}
                this.deleted = true;
                this.count_deleted = ok;
            } catch(err) {
                console.log(err);
            }
        }
    },
    created: function() {
		this.loadUsers();
		this.loadUsersFromNorth();
	}
});
