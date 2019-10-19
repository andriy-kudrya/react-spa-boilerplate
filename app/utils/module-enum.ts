type ModuleEnum<Module, Base = number> = Extract<Module[keyof Module], Base>

export { ModuleEnum }
