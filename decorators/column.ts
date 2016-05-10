export function key(primaryKeyName: string) {
    return (target: any, name: string, descriptor: PropertyDescriptor) => {
        if (target.__sqlPrimaryKey) {
            // error
        }
        target.__sqlPrimaryKey = primaryKeyName || name;

        return column(primaryKeyName)(target, name, descriptor);
    };
}

export function column(columnName: string) {
    return (target: any, name: string, descriptor: PropertyDescriptor) => {
        name = columnName || name;

        target.__sqlColumns = target.__sqlColumns || {};
        if (target.__sqlColumns[name]) {
            // error
        }

        target.__sqlColumns[name] = name;
    };
}

export function foreignKey(keyName: string) {
    return (target: any, name: string, descriptor: PropertyDescriptor) => {

    };
}