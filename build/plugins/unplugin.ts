import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import { getSrcPath } from '../utils';

export default function unplugin(viteEnv: ImportMetaEnv) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;

  const srcPath = getSrcPath();
  const localIconPath = `${srcPath}/assets/svg-icon`;

  /** 本地svg图标集合名称 */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

  return [
    Icons({
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      scale: 1,
      defaultClass: 'inline-block'
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })
      ]
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__'
    }),
    AutoImport({
      imports: [
        'vue', // 导入内置的所有api
        'vue-router',
        'pinia',
        '@vueuse/core',
        {
          'vue-router': ['createRouter'] // 导入指定的api
          /* 自定义模块 */
          // '@/hooks/api.ts': ['defineApi'], // 导入指定文件下的指定api
          // '@/api/index.ts': [['*', 'api']], // 导入指定文件下的api，并重命名
          // '@/store/index.ts': [['*', 'store']]
        }
      ],
      include: [/\.[tj]sx?$/, /\.vue$/],
      eslintrc: {
        enabled: true // <-- this
      }
    })
  ];
}
