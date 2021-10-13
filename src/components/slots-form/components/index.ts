
const components = import.meta.globEager('./*.vue')
const modules = {}
Object.keys(components).forEach(path => {
    const fileName = 'hooks-form-' + path.replace(/(.*\/)*([^.]+).*/ig, "$2")
    modules[fileName] = components[path].default
})
export default modules