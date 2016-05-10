import "acorn";
import "reflect-metadata";

const tableNameMetaData = Symbol("TableName");
const primaryKeyMetaData = Symbol("PrimaryKey");

function Table(tableName: string) {
    return (target: Object) => {
        Reflect.defineMetadata(tableNameMetaData, tableName, target);
    };
}


function Key(target: Object, name: string) {
    Reflect.defineMetadata(primaryKeyMetaData, name, target);
}



export class SqlEnumerable<T> {
    constructor(private table: (new () => T)) {
    }

    public filter(predicate: (x: T) => boolean, lol: Function) {
        var program = acorn.parse(predicate.toString()).body;
        if (program.length !== 1) {
            // error
        }

        if (program[0].type !== 'ExpressionStatement') {
            // error
        }

        var expression = (<ESTree.ExpressionStatement>program[0]).expression;

        if (expression.type !== 'ArrowFunctionExpression') {
            // error
        }

        var params = (<ESTree.ArrowFunctionExpression>expression).params;
        var body = (<ESTree.ArrowFunctionExpression>expression).body;

        if (params.length !== 1) {
            // error
        }







        var target = new this.table();
        var handler = {
            get(target: T, key: string) {

            }
        };

        var proxy = new Proxy(target, handler);

        var dummy = predicate(proxy);

        return this;
    };

    public async toList(): Promise<Array<T>> {
        // calculate sql string
    };

    private getSqlString(): string {

    }
};


@Table('test')
class Person {
    @Key id: number;
    name: string;
}

let db = new SqlDatabase('connection string', {
    people: Person
});

db.people.filter(x => x.name === 'Mike').toList().then(results => {

});