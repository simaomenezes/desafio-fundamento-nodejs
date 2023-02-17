export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g

    //console.log("routeParametersRegex: ", routeParametersRegex)

    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')


    //console.log("pathWithParams: ", pathWithParams)

    const pathRegex = new RegExp(`^${pathWithParams}`)

    //console.log("pathRegex:", pathRegex)

    return pathRegex
}