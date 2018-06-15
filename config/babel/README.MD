Helpers that come with babel-runtime 6 are polifilled with pure version of core-js 2
which increases bundle size by 20 kB or so.
In other hand it is planned to use global core-js 2 shim, so this is the sole reason for this custom helpers build.

Helpers should be build before application itself.

It is expected that babel 7 will have option to choose non-polifilled version of helpers
so this generator will not be required in the future.

To rebuild helpers use ```npm run helpers```

IT IS REQUIRED TO REBUILD HELPERS EVERY TIME BABEL IS UPDATED.
