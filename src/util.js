export function checkOptions(mandatory, config) {
  mandatory.forEach((mandatory) => {
    if (!config[mandatory]) {
      throw new Error(`${mandatory} option is mandatory`);
    }
  });
}
