type Any = any

export default function Bind(
  _: Any,
  _2: Any,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const original = descriptor.value

  return {
    configurable: true,
    enumerable: false,
    get() {
      return original.bind(this)
    },
  }
}
