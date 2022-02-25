export function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatErrorMessage(value, name) {
  const newName = capitalizeFirstLetter(name);
  return value.replace("Value", newName) + " !";
}
