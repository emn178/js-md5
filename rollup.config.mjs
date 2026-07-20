import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const featureNames = {
  legacy: 'FEATURE_LEGACY',
  hmac: 'FEATURE_HMAC',
  base64: 'FEATURE_BASE64',
  buffer: 'FEATURE_BUFFER'
};

const variants = [
  {
    name: 'md5',
    features: {legacy: true, hmac: true, base64: true, buffer: true}
  },
  {
    name: 'md5.modern',
    features: {legacy: false, hmac: true, base64: true, buffer: true}
  },
  {
    name: 'md5-lite',
    features: {legacy: false, hmac: false, base64: false, buffer: false}
  }
];

const disableNodeJs = {
  name: 'disable-node-js',
  transform(code, id) {
    if (id.endsWith('/src/md5.js')) {
      const nodeJsDeclaration = /^\s*var NODE_JS = .*;$/m;
      if (!nodeJsDeclaration.test(code)) {
        this.error('Could not find the NODE_JS declaration');
      }
      return code.replace(nodeJsDeclaration, '  var NODE_JS = false;');
    }
  }
};

const setFeatures = (features) => {
  return {
    name: 'set-features',
    transform(code, id) {
      if (id.endsWith('/src/md5.js')) {
        Object.entries(featureNames).forEach(([feature, name]) => {
          const declaration = `var ${name} = true;`;
          if (!code.includes(declaration)) {
            throw new Error(`Could not find declaration for ${name}`);
          }
          code = code.replace(declaration, `var ${name} = ${features[feature]};`);
        });
        return code;
      }
    }
  }
};

function build(variant) {
  return [
    {
      input: 'src/md5.js',
      output: {
        file: `build/${variant.name}.js`
      },
      plugins: [setFeatures(variant.features)]
    },
    {
      input: 'src/md5.mjs',
      external: ['crypto', 'buffer'],
      output: {
        file: `build/${variant.name}.node.mjs`,
        format: 'es'
      },
      plugins: [setFeatures(variant.features), commonjs({
        strictRequires: false
      })]
    },
    {
      input: 'src/md5.mjs',
      output: {
        file: `build/${variant.name}.mjs`,
        format: 'es'
      },
      plugins: [setFeatures(variant.features), disableNodeJs, commonjs({
        strictRequires: false,
        ignore: ['crypto', 'buffer']
      })]
    },
    {
      input: `build/${variant.name}.js`,
      output: {
        file: `build/${variant.name}.min.js`
      },
      plugins: [terser()]
    },
    {
      input: `build/${variant.name}.mjs`,
      output: {
        file: `build/${variant.name}.min.mjs`,
        format: 'es'
      },
      plugins: [terser()]
    }
  ]
}

export default [...variants.map((variant) => build(variant))].flat();
