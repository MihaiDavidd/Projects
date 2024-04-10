export const expectStringOrNull = (value) => value === null || typeof value === "string"
export const expectNumberOrNull = (value) => value === null || typeof value === "number"
export const expectObjectOrNull = (value) => value === null || typeof value === 'object'
export const expectBooleanOrNull = (value) => value === null || typeof value === 'boolean'
export const expectArrayOrNull = (value) => value === null || Array.isArray(value)