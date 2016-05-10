//@table('Person')
class Person extends Table<'Person'> {
    @key() id: number;
    name: string;
    age: number;
    parentId: number;

    @foreignKey('parentId') parent: Person;
    children: Person[];
    pets: Pet[];
}

@table('Pet')
class Pet {
    @key() id: number;
    name: string;
    ownerId: number

    @foreignKey('ownerId') owner: Person;
}

var db = new tSqlDb('connection string?', {
    people: Person,
    pets: Pet
});


// ----------------------------------------------------------------

var peopleOver25WithTheirPets = db.people.filter(x => x.age > 25).include(x => x.pets).run();


select *
from Person as p
left join Pet as a on a.ownerId = p.id
where p.age > 25
