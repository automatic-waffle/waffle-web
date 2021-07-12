export function overrideExistingStyle(
    style,
    [styleProperty, property],
    setNewValue,
) {
    return Object.fromEntries(
        Object.entries(style)
            .filter(
                ([key, value]) =>
                    key === (styleProperty === "" ? property : styleProperty) ||
                    typeof value === "object",
            )
            .map(([key, value]) =>
                typeof value === "object"
                    ? [key, overrideExistingStyle(value, property, setNewValue)]
                    : [property, setNewValue(value)],
            ),
    )
}
