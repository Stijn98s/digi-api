db.container.insert({ myfield: 'hello', thatfield: 'testing' });
db.createUser(
	{
		user: "root",
		pwd: "example",
		roles: [
			{
				role: "readWrite",
				db: "nest"
			}
		]
	}
);
