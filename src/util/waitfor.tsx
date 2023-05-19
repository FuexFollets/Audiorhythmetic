export async function waitFor(conditionalFunction: () => boolean) {
  return new Promise<void>((resolve) => {
    if (conditionalFunction()) {
      resolve();
    } else {
      setTimeout(async () => {
        await waitFor(conditionalFunction);
        resolve();
      }, 100);
    }
  });
}
