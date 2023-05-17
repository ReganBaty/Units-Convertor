const t0 = performance.now();

Bun.build({
  entrypoints: ["./src/index.ts", "/src/background.ts"],
  outdir: "./dist",
  minify: true,
}).then((d) => {
  const t1 = performance.now();
  console.log(`Bundled in ${t1 - t0} milliseconds.`);
});
