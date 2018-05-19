function squash<A, B, C, D, E, F, G>(a?: A, b?: B, c?: C, d?: D, e?: E, f?: F, g?: G): A & B & C & D & E & F & G
function squash(...objects: any[]): any {
    return Object.assign({}, ...objects)
}

export { squash }
