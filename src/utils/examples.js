const modules = import.meta.glob('./*', { eager: true });
console.log(modules);
export const examples = Object.values(modules).map((mod) => mod.default || Object.values(mod)[0]);
