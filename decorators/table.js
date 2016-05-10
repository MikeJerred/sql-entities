export function table(name) {
    return (target) => {
        if (!name) {
            // error
        }

        target.__sqlTableName = name;
    };
}